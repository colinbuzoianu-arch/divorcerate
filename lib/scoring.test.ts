import { describe, it, expect } from "vitest";
import { computeScore } from "@/lib/scoring";
import type { Answers } from "@/lib/types";

const solid: Answers = {
  conflict_style: "We talk it through calmly and reach an understanding",
  contempt: "Never",
  repair: "Within hours — we apologize and move on",
  intimacy: 10, respect: 10, trust: 10,
  friendship: "Yes, absolutely",
  finances: "Rarely or never",
  external_stress: "None significant",
  support: "Always",
  alignment: "Very aligned",
};

const stable: Answers = {
  conflict_style: "We talk it through calmly and reach an understanding",
  contempt: "Rarely",
  repair: "Within a day or two",
  intimacy: 6, respect: 7, trust: 7,
  friendship: "Somewhat",
  finances: "Occasionally",
  external_stress: "Minor stress",
  support: "Usually",
  alignment: "Mostly aligned",
};

const amber: Answers = {
  conflict_style: "It escalates into arguments, then we cool down",
  contempt: "Sometimes",
  repair: "It takes a week or more",
  intimacy: 5, respect: 6, trust: 6,
  friendship: "Somewhat",
  finances: "Regularly",
  external_stress: "Moderate stress",
  support: "Sometimes",
  alignment: "Somewhat aligned",
};

const faultLine: Answers = {
  conflict_style: "One of us goes quiet and avoids the topic",
  contempt: "Sometimes",
  repair: "It takes a week or more",
  intimacy: 3, respect: 4, trust: 4,
  friendship: "Not really",
  finances: "Regularly",
  external_stress: "Moderate stress",
  support: "Rarely",
  alignment: "Often misaligned",
};

const critical: Answers = {
  conflict_style: "We criticize or blame each other harshly",
  contempt: "Almost always",
  repair: "We often never fully resolve it",
  intimacy: 1, respect: 1, trust: 1,
  friendship: "No",
  finances: "It's a major source of conflict",
  external_stress: "Major ongoing stress",
  support: "Never",
  alignment: "Very different visions",
};

describe("computeScore", () => {
  it("is deterministic — identical answers give an identical result", () => {
    const a = computeScore(amber);
    const b = computeScore(amber);
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });

  it("lands the 5 fixture profiles in the expected bands", () => {
    expect(computeScore(solid).band).toBe("Solid Ground");
    expect(computeScore(stable).band).toBe("Stable Foundation");
    expect(computeScore(amber).band).toBe("Amber Zone");
    expect(computeScore(faultLine).band).toBe("Fault Line");
    expect(computeScore(critical).band).toBe("Critical Point");
  });

  it("orders the fixtures monotonically by health score", () => {
    const scores = [solid, stable, amber, faultLine, critical].map((a) => computeScore(a).healthScore);
    for (let i = 1; i < scores.length; i++) expect(scores[i - 1]).toBeGreaterThan(scores[i]);
  });

  it("keeps every score within 0–100", () => {
    for (const fx of [solid, stable, amber, faultLine, critical]) {
      const r = computeScore(fx);
      expect(r.healthScore).toBeGreaterThanOrEqual(0);
      expect(r.healthScore).toBeLessThanOrEqual(100);
      for (const d of r.dimensions) {
        expect(d.score).toBeGreaterThanOrEqual(0);
        expect(d.score).toBeLessThanOrEqual(100);
      }
    }
  });

  it("selects sensible patterns at the extremes", () => {
    expect(computeScore(solid).pattern).toBe("Validated Couple");
    expect(computeScore(critical).pattern).toBe("Hostile–Detached");
  });

  it("falls back safely on empty/garbage answers", () => {
    const r = computeScore({} as Answers);
    expect(r.healthScore).toBeGreaterThanOrEqual(0);
    expect(r.healthScore).toBeLessThanOrEqual(100);
    expect(r.band).toBeTruthy();
    expect(r.pattern).toBeTruthy();
  });
});
