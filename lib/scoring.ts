import type { Answers } from "@/lib/types";

/**
 * Deterministic scoring engine (Phase 3.1).
 *
 * The same answers always produce the same score — the AI never computes
 * numbers. Each answer maps to points (0–100, higher = healthier); points roll
 * up into 8 dimension scores, and a weighted mean gives the overall
 * Relationship Health Score (0–100). The band and the relationship pattern are
 * also chosen here by fixed rules; the AI only explains them (Phase 3.2).
 */

export type DimensionKey =
  | "communication" | "conflictRepair" | "contempt" | "friendship"
  | "respect" | "trust" | "support" | "vision";

export interface DimensionScore {
  key: DimensionKey;
  label: string;
  score: number; // 0–100
}

export type Band = "Critical Point" | "Fault Line" | "Amber Zone" | "Stable Foundation" | "Solid Ground";

export type Pattern =
  | "Validated Couple" | "Volatile Couple" | "Conflict Avoiders" | "Pursuer–Withdrawer"
  | "Drifting Couple" | "Crisis-Bonded" | "Hostile–Detached";

export interface ScoreResult {
  healthScore: number; // 0–100
  band: Band;
  dimensions: DimensionScore[];
  pattern: Pattern;
  patternSlug: string;
  biggestStrength: DimensionKey;
  biggestRisk: DimensionKey;
}

const DIMENSION_LABELS: Record<DimensionKey, string> = {
  communication: "Communication",
  conflictRepair: "Conflict & repair",
  contempt: "Contempt",
  friendship: "Friendship & intimacy",
  respect: "Respect",
  trust: "Trust",
  support: "Support & stress",
  vision: "Shared vision",
};

/**
 * Overall-score weights. Contempt, repair and friendship carry the most weight
 * (the strongest signals in the research themes we draw on). Documented and in
 * one place by design.
 */
export const WEIGHTS: Record<DimensionKey, number> = {
  contempt: 1.5,
  conflictRepair: 1.5,
  friendship: 1.5,
  respect: 1.25,
  trust: 1.25,
  communication: 1.0,
  support: 0.75,
  vision: 0.75,
};

/** Exact-match option → points maps (0–100, higher = healthier). */
const OPT: Record<string, Record<string, number>> = {
  conflict_style: {
    "We talk it through calmly and reach an understanding": 100,
    "It escalates into arguments, then we cool down": 55,
    "We rarely disagree on anything significant": 62,
    "One of us goes quiet and avoids the topic": 40,
    "We criticize or blame each other harshly": 20,
  },
  contempt: { "Never": 100, "Rarely": 80, "Sometimes": 50, "Often": 25, "Almost always": 5 },
  repair: {
    "Within hours — we apologize and move on": 100,
    "Within a day or two": 80,
    "It takes a week or more": 45,
    "We often never fully resolve it": 15,
    "We don't really argue": 62,
  },
  friendship: { "Yes, absolutely": 100, "Mostly yes": 80, "Somewhat": 55, "Not really": 30, "No": 10 },
  finances: { "Rarely or never": 100, "Occasionally": 70, "Regularly": 40, "It's a major source of conflict": 15 },
  external_stress: { "None significant": 100, "Minor stress": 75, "Moderate stress": 45, "Major ongoing stress": 20 },
  support: { "Always": 100, "Usually": 80, "Sometimes": 55, "Rarely": 25, "Never": 5 },
  alignment: { "Very aligned": 100, "Mostly aligned": 80, "Somewhat aligned": 55, "Often misaligned": 30, "Very different visions": 10 },
};

/** Score an options answer; falls back to a neutral 50 if unrecognised. */
function optScore(id: string, answers: Answers): number {
  const v = answers[id];
  const map = OPT[id];
  if (typeof v === "string" && map && v in map) return map[v];
  return 50;
}

/** Score a 1–10 range answer onto 0–100; neutral 50 if missing. */
function rangeScore(id: string, answers: Answers): number {
  const raw = answers[id];
  const n = typeof raw === "number" ? raw : typeof raw === "string" ? Number(raw) : NaN;
  if (!Number.isFinite(n)) return 50;
  const clamped = Math.min(10, Math.max(1, n));
  return Math.round(((clamped - 1) / 9) * 100);
}

function bandFor(score: number): Band {
  if (score < 30) return "Critical Point";
  if (score < 50) return "Fault Line";
  if (score < 65) return "Amber Zone";
  if (score < 80) return "Stable Foundation";
  return "Solid Ground";
}

const PATTERN_SLUGS: Record<Pattern, string> = {
  "Validated Couple": "validated-couple",
  "Volatile Couple": "volatile-couple",
  "Conflict Avoiders": "conflict-avoiders",
  "Pursuer–Withdrawer": "pursuer-withdrawer",
  "Drifting Couple": "drifting-couple",
  "Crisis-Bonded": "crisis-bonded",
  "Hostile–Detached": "hostile-detached",
};

export function computeScore(answers: Answers): ScoreResult {
  const communication = optScore("conflict_style", answers);
  const conflictRepair = optScore("repair", answers);
  const contempt = optScore("contempt", answers);
  const friendship = Math.round((rangeScore("intimacy", answers) + optScore("friendship", answers)) / 2);
  const respect = rangeScore("respect", answers);
  const trust = rangeScore("trust", answers);
  const support = Math.round((optScore("support", answers) * 2 + optScore("finances", answers) + optScore("external_stress", answers)) / 4);
  const vision = optScore("alignment", answers);

  const scores: Record<DimensionKey, number> = {
    communication, conflictRepair, contempt, friendship, respect, trust, support, vision,
  };

  const weightSum = Object.values(WEIGHTS).reduce((a, b) => a + b, 0);
  const weighted = (Object.keys(scores) as DimensionKey[]).reduce((acc, k) => acc + scores[k] * WEIGHTS[k], 0);
  const healthScore = Math.round(weighted / weightSum);

  const dimensions: DimensionScore[] = (Object.keys(scores) as DimensionKey[]).map((k) => ({
    key: k, label: DIMENSION_LABELS[k], score: scores[k],
  }));

  // Strength = highest dimension, risk = lowest (deterministic, no AI).
  const sorted = [...dimensions].sort((a, b) => b.score - a.score);
  const biggestStrength = sorted[0].key;
  const biggestRisk = sorted[sorted.length - 1].key;

  const pattern = choosePattern(answers, scores);

  return {
    healthScore,
    band: bandFor(healthScore),
    dimensions,
    pattern,
    patternSlug: PATTERN_SLUGS[pattern],
    biggestStrength,
    biggestRisk,
  };
}

/** Rule-based pattern selection (priority order; the AI only explains it). */
function choosePattern(answers: Answers, s: Record<DimensionKey, number>): Pattern {
  const style = typeof answers.conflict_style === "string" ? answers.conflict_style : "";
  const repair = typeof answers.repair === "string" ? answers.repair : "";
  const stressMajor = answers.external_stress === "Major ongoing stress";
  const escalates = style === "It escalates into arguments, then we cool down";
  const quiet = style === "One of us goes quiet and avoids the topic";
  const rarely = style === "We rarely disagree on anything significant";
  const fastRepair = repair.startsWith("Within hours") || repair === "Within a day or two";
  const noArgue = repair === "We don't really argue";

  // 1. Hostile–Detached: contempt present and the friendship has gone.
  if (s.contempt <= 40 && s.friendship <= 45) return "Hostile–Detached";
  // 2. Volatile: high heat but genuine, fast repair.
  if (escalates && fastRepair) return "Volatile Couple";
  // 3. Crisis-Bonded: held together under major external pressure.
  if (stressMajor && s.trust >= 55 && s.friendship <= 60) return "Crisis-Bonded";
  // 4. Pursuer–Withdrawer: one goes quiet, with an emotional-connection gap.
  if (quiet && s.friendship <= 60) return "Pursuer–Withdrawer";
  // 5. Conflict Avoiders: peace on the surface, problems underground.
  if ((quiet || rarely || noArgue) && s.contempt >= 50) return "Conflict Avoiders";
  // 6. Drifting: coexisting, friendship fading, but not hostile.
  if (s.friendship <= 50 && s.contempt >= 55) return "Drifting Couple";
  // 7. Validated, else by score.
  if (s.respect >= 65 && s.friendship >= 65 && s.contempt >= 70) return "Validated Couple";
  if (s.contempt <= 45) return "Hostile–Detached";
  return s.friendship >= 60 ? "Validated Couple" : "Drifting Couple";
}
