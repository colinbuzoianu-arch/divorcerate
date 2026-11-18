/**
 * Prompt builders (Phase 3.2). The AI writes the narrative ONLY — it never
 * computes scores, probabilities or statistics, and never claims clinical
 * authority. It is fed the deterministic scores (not the raw answers, which we
 * do not store), and explains what they mean.
 *
 * ScoreView is the minimal shape both the computed ScoreResult and the stored
 * result satisfy, so the same builders serve the free headline and the paid
 * narrative.
 */
export interface ScoreView {
  band: string;
  pattern: string;
  strength: { label: string };
  risk: { label: string };
  dimensions: { key: string; label: string; score: number }[];
}

const PERSONA =
  "You are a careful relationship-education writer. You explain what a set of relationship scores means in warm, plain, honest language. You do NOT invent numbers, probabilities, percentages or statistics; you do NOT claim to be a therapist or to diagnose anything; and you never predict whether a relationship will end. You write about patterns and next steps, grounded in well-known relationship-research themes (the Gottman \"Four Horsemen\", repair, emotional friendship, attachment).";

function scoreTable(score: ScoreView): string {
  return score.dimensions.map((d) => `- ${d.label} (${d.key}): ${d.score}/100`).join("\n");
}

function safetyBlock(safetyFlag: boolean): string {
  return safetyFlag
    ? `\nSAFETY OVERRIDE — this person may be unsafe. Do NOT suggest staying, "working on it", patience, or couples therapy as a fix, and do not minimise. Gently centre their safety and point them to professional support and a confidential helpline. Keep the tone steady.\n`
    : "";
}

/** One short, specific headline for the free result. No numbers. */
export function buildHeadlinePrompt(score: ScoreView, safetyFlag = false): string {
  return `${PERSONA}
${safetyBlock(safetyFlag)}
A person completed a relationship self-reflection. Computed results:
- Overall band: ${score.band}
- Relationship pattern: ${score.pattern}
- Strongest area: ${score.strength.label}
- Area needing the most attention: ${score.risk.label}
Dimension scores (0–100, higher is healthier):
${scoreTable(score)}

Write ONE short, honest sentence (max ~20 words) that captures the core finding for this person. No numbers, no percentages, no clinical claims, no prediction. Respond with the sentence only — no quotes, no preamble.`;
}

/** The paid long-form narrative, as strict JSON. */
export function buildNarrativePrompt(score: ScoreView, safetyFlag = false): string {
  const keys = score.dimensions.map((d) => `"${d.key}"`).join(", ");
  return `${PERSONA}
${safetyBlock(safetyFlag)}
A person completed a relationship self-reflection. Computed results:
- Overall band: ${score.band}
- Relationship pattern: ${score.pattern}
- Strongest area: ${score.strength.label}
- Area needing the most attention: ${score.risk.label}
Dimension scores (0–100, higher is healthier):
${scoreTable(score)}

Write their full report. Be specific to this pattern and these scores, warm but honest. Do NOT output any numbers, percentages, probabilities or statistics, and do NOT claim clinical authority or predict outcomes.

Respond with ONLY valid JSON (no markdown, no code fences, no preamble) in exactly this shape:
{
  "summary": "<2–3 sentences that make this person feel seen and orient them to their result>",
  "dimensionNotes": [
    { "key": <one of ${keys}>, "note": "<1–2 sentences explaining what this dimension's score means for them>" }
    // one object for EACH of the ${score.dimensions.length} dimensions above, in the same order
  ],
  "riskDetail": "<2–3 sentences on why '${score.risk.label}' is the area to focus on, and what tends to drive it>",
  "recommendations": [
    { "title": "<short action title>", "detail": "<one concrete, specific next step, 1–2 sentences; may name a real, well-known technique or book>" }
    // exactly 3 recommendations
  ]
}`;
}
