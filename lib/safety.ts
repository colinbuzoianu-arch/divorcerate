import type { Answers } from "@/lib/types";

/**
 * Safety layer (Phase 1.4). Relationship self-assessment is a sensitive,
 * "your money or your life" (YMYL) context: if someone's answers suggest they
 * may be in an abusive or dangerous situation, we show crisis resources for
 * free, above everything, and steer the AI away from "keep working on it"
 * advice. False positives are acceptable here — safety comes first.
 *
 * Detection is deterministic: it never depends on the AI.
 */

/** A range answer at or below this (on the 1–10 scales) counts as a trigger. */
const LOW_SCORE_THRESHOLD = 2;

/** Keyword / phrase patterns scanned (case-insensitive) in the free-text `extra`. */
export const SAFETY_PATTERNS: RegExp[] = [
  /\bhits?\b/, /\bhitting\b/, /\bbeats?\b/, /\bbeaten\b/,
  /\bafraid\b/, /\bscared\b/, /\bterrified\b/, /\bunsafe\b/,
  /\bthreaten/, /\bintimidat/, /\bcontrol(s|ling|led)?\b/,
  /\bforce(s|d)?\b/, /\bforcing\b/, /\bmake(s)? me\b/,
  /\bhurt(s|ing)? me\b/, /\bharm/, /\babus/, /\bviolen/,
  /\brape(s|d)?\b/, /\bchoke/, /\bstrangl/, /\bweapon/, /\bgun\b/, /\bknife\b/,
  /\bkill (myself|me)\b/, /\bsuicid/, /\bend (my|it all)\b/, /\bself[\s-]?harm/,
  /\bwon'?t let me\b/, /\bnot allowed\b/, /\btrapped\b/,
];

function toNumber(v: unknown): number | null {
  if (typeof v === "number") return v;
  if (typeof v === "string" && v.trim() !== "" && !Number.isNaN(Number(v))) return Number(v);
  return null;
}

/**
 * Returns true when the answers should trigger the safety block.
 * Triggers: respect <= 2, trust <= 2, or a safety keyword in `extra`.
 */
export function detectSafetyFlag(answers: Answers): boolean {
  const respect = toNumber(answers.respect);
  const trust = toNumber(answers.trust);
  if (respect !== null && respect <= LOW_SCORE_THRESHOLD) return true;
  if (trust !== null && trust <= LOW_SCORE_THRESHOLD) return true;

  const extra = typeof answers.extra === "string" ? answers.extra.toLowerCase() : "";
  if (extra && SAFETY_PATTERNS.some((re) => re.test(extra))) return true;

  return false;
}
