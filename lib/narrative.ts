import { callAnthropic, parseJsonLoose } from "@/lib/anthropic";
import { buildNarrativePrompt } from "@/lib/prompt";
import { getNarrative, saveNarrative } from "@/lib/kv";
import type { Narrative, StoredResult } from "@/lib/types";
import { localizeScoreView } from "@/lib/i18n/scoring";

/**
 * Returns the paid narrative for a result, generating it once (lazily, after
 * payment) and caching it in KV (Phase 3.2 cost control). Returns null if
 * generation fails, so the caller can show a graceful retry. The stored result
 * satisfies ScoreView, so no raw answers are needed (we don't store them).
 */
export async function getOrCreateNarrative(id: string, result: StoredResult): Promise<Narrative | null> {
  const cached = await getNarrative(id);
  if (cached) return cached;

  try {
    const locale = result.locale ?? "en";
    const view = locale === "en" ? result : localizeScoreView(result, locale);
    const raw = await callAnthropic(buildNarrativePrompt(view, result.safetyFlag, locale), 1600);
    const parsed = parseJsonLoose<Partial<Narrative>>(raw);
    if (!parsed || typeof parsed.summary !== "string" || !Array.isArray(parsed.recommendations)) {
      return null;
    }
    const narrative: Narrative = {
      summary: parsed.summary,
      dimensionNotes: Array.isArray(parsed.dimensionNotes)
        ? parsed.dimensionNotes.map((d) => ({ key: d.key, note: String(d.note ?? "") }))
        : [],
      riskDetail: typeof parsed.riskDetail === "string" ? parsed.riskDetail : "",
      recommendations: parsed.recommendations.slice(0, 3).map((r) => ({
        title: String(r.title ?? ""),
        detail: String(r.detail ?? ""),
      })),
    };
    await saveNarrative(id, narrative);
    return narrative;
  } catch (err) {
    console.error("Narrative generation failed:", err);
    return null;
  }
}
