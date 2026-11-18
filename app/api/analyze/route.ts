import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { StoredResult, ResultResponse, ResultDimension, toFreeResult } from "@/lib/types";
import { computeScore } from "@/lib/scoring";
import { buildHeadlinePrompt } from "@/lib/prompt";
import { callAnthropic } from "@/lib/anthropic";
import { validateAnalyzeRequest } from "@/lib/validation";
import { checkAnalyzeRateLimit } from "@/lib/ratelimit";
import { saveResult, kvConfigured } from "@/lib/kv";
import { detectSafetyFlag } from "@/lib/safety";

export const runtime = "nodejs";
export const maxDuration = 60;

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: NextRequest) {
  try {
    if (!kvConfigured()) {
      console.error("KV (Upstash) not configured — refusing to generate a result.");
      return NextResponse.json({ error: "Result storage is not configured. Please try again later." }, { status: 503 });
    }

    // 1.3 — rate limit by IP.
    const rl = await checkAnalyzeRateLimit(clientIp(req));
    if (!rl.success) {
      return NextResponse.json(
        { error: "You've reached the limit for now. Please try again later." },
        { status: 429, headers: rl.retryAfter ? { "Retry-After": String(rl.retryAfter) } : undefined }
      );
    }

    // 1.3 — validate input (+ honeypot / timing).
    let body: unknown;
    try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }
    const validation = validateAnalyzeRequest(body);
    if (!validation.ok) return NextResponse.json({ error: validation.error }, { status: validation.status });
    const answers = validation.answers;

    // 3.1 — deterministic scoring (no AI). 1.4 — safety flag.
    const safetyFlag = detectSafetyFlag(answers);
    const score = computeScore(answers);

    const dimByKey = (k: typeof score.biggestStrength): ResultDimension => {
      const d = score.dimensions.find((x) => x.key === k)!;
      return { key: d.key, label: d.label, score: d.score };
    };
    const strength = dimByKey(score.biggestStrength);
    const risk = dimByKey(score.biggestRisk);

    const view = { band: score.band, pattern: score.pattern, strength, risk, dimensions: score.dimensions };

    // 3.2 — exactly one short AI call for the free headline; fall back if it fails.
    let headline: string;
    try {
      headline = (await callAnthropic(buildHeadlinePrompt(view, safetyFlag), 120)).trim().replace(/^["']|["']$/g, "");
      if (!headline) throw new Error("empty headline");
    } catch (err) {
      console.warn("Headline generation failed, using fallback:", err instanceof Error ? err.message : err);
      headline = `Your relationship lands in the ${score.band}, with ${strength.label.toLowerCase()} as your strongest area and ${risk.label.toLowerCase()} the one to focus on.`;
    }

    const result: StoredResult = {
      healthScore: score.healthScore,
      band: score.band,
      pattern: score.pattern,
      patternSlug: score.patternSlug,
      dimensions: score.dimensions.map((d) => ({ key: d.key, label: d.label, score: d.score })),
      strength,
      risk,
      headline,
      safetyFlag,
      createdAt: Date.now(),
    };

    // 1.2 — store the full result; return only free fields + resultId.
    const resultId = randomUUID();
    await saveResult(resultId, result);

    const payload: ResultResponse = { resultId, paid: false, result: toFreeResult(result) };
    return NextResponse.json(payload);
  } catch (err) {
    console.error("Unhandled analyze error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
