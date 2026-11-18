import { describe, it, expect } from "vitest";
import { scoreMiniQuiz } from "@/lib/quizzes/types";
import { shouldIBreakUpQuiz } from "@/lib/quizzes/should-i-break-up";

function pick(points: number): Record<string, number> {
  return Object.fromEntries(shouldIBreakUpQuiz.questions.map((q) => [q.id, points]));
}

describe("scoreMiniQuiz", () => {
  it("all-healthy answers land in the lowest band at 0%", () => {
    const r = scoreMiniQuiz(shouldIBreakUpQuiz, pick(0));
    expect(r.percent).toBe(0);
    expect(r.band.title).toBe("More of a rough patch");
  });

  it("all-concerning answers land in the highest band at 100%", () => {
    const r = scoreMiniQuiz(shouldIBreakUpQuiz, pick(3));
    expect(r.percent).toBe(100);
    expect(r.band.title).toBe("Signals worth taking seriously");
  });

  it("mid answers land in the middle band", () => {
    const r = scoreMiniQuiz(shouldIBreakUpQuiz, pick(1.5));
    expect(r.percent).toBeGreaterThanOrEqual(34);
    expect(r.percent).toBeLessThan(67);
    expect(r.band.title).toBe("Worth a serious conversation");
  });

  it("is deterministic", () => {
    const a = scoreMiniQuiz(shouldIBreakUpQuiz, pick(2));
    const b = scoreMiniQuiz(shouldIBreakUpQuiz, pick(2));
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });
});
