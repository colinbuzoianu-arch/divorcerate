import { describe, it, expect } from "vitest";
import { detectSafetyFlag } from "@/lib/safety";
import type { Answers } from "@/lib/types";

/** A baseline "healthy" set of answers that must NOT trigger the safety layer. */
const safe: Answers = {
  respect: 8,
  trust: 9,
  extra: "We argue about chores sometimes but we always make up.",
};

describe("detectSafetyFlag", () => {
  it("does not trigger on a healthy profile", () => {
    expect(detectSafetyFlag(safe)).toBe(false);
  });

  it("triggers when respect is 2 or below", () => {
    expect(detectSafetyFlag({ ...safe, respect: 2 })).toBe(true);
    expect(detectSafetyFlag({ ...safe, respect: 1 })).toBe(true);
  });

  it("triggers when trust is 2 or below", () => {
    expect(detectSafetyFlag({ ...safe, trust: 2 })).toBe(true);
    expect(detectSafetyFlag({ ...safe, trust: 1 })).toBe(true);
  });

  it("does not trigger at respect/trust of 3 or above", () => {
    expect(detectSafetyFlag({ ...safe, respect: 3, trust: 3 })).toBe(false);
  });

  it("handles numeric strings for range answers", () => {
    expect(detectSafetyFlag({ ...safe, trust: "2" })).toBe(true);
    expect(detectSafetyFlag({ ...safe, trust: "7" })).toBe(false);
  });

  it("triggers on fear / abuse keywords in free text", () => {
    expect(detectSafetyFlag({ ...safe, extra: "I'm afraid of my partner." })).toBe(true);
    expect(detectSafetyFlag({ ...safe, extra: "He hits me when he's angry." })).toBe(true);
    expect(detectSafetyFlag({ ...safe, extra: "She controls all our money." })).toBe(true);
    expect(detectSafetyFlag({ ...safe, extra: "He threatens to leave with the kids." })).toBe(true);
    expect(detectSafetyFlag({ ...safe, extra: "Sometimes I want to kill myself." })).toBe(true);
    expect(detectSafetyFlag({ ...safe, extra: "I feel unsafe at home." })).toBe(true);
  });

  it("is case-insensitive", () => {
    expect(detectSafetyFlag({ ...safe, extra: "I am AFRAID of him." })).toBe(true);
  });

  it("does not trigger on benign free text", () => {
    expect(detectSafetyFlag({ ...safe, extra: "We want to buy a house next year." })).toBe(false);
    expect(detectSafetyFlag({ ...safe, extra: "" })).toBe(false);
  });

  it("does not trigger when respect/trust are absent and text is benign", () => {
    expect(detectSafetyFlag({ extra: "all good here" })).toBe(false);
    expect(detectSafetyFlag({})).toBe(false);
  });
});
