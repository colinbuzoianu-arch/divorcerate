/**
 * Minimal Anthropic Messages client (Phase 3.2). Centralises the model (from
 * ANTHROPIC_MODEL) and error handling. Used for the short free headline and the
 * paid narrative. Throws on failure so callers can fall back.
 */
export async function callAnthropic(prompt: string, maxTokens: number): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY not configured");
  const model = process.env.ANTHROPIC_MODEL ?? "claude-haiku-4-5-20251001";

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({ model, max_tokens: maxTokens, messages: [{ role: "user", content: prompt }] }),
  });

  if (!res.ok) throw new Error(`Anthropic API error ${res.status}`);
  const data = await res.json();
  if (data.type === "error") throw new Error(data.error?.message ?? "Anthropic error");
  if (!Array.isArray(data.content)) throw new Error("Unexpected Anthropic response shape");

  return (data.content as { type: string; text?: string }[])
    .map((b) => (b.type === "text" ? b.text ?? "" : ""))
    .join("");
}

/** Parse model JSON output, tolerating accidental ```json fences. */
export function parseJsonLoose<T>(raw: string): T {
  const clean = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  return JSON.parse(clean) as T;
}
