import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { buildPrompt } from "@/lib/prompt";
import { AnalysisResult, toFreeResult, ResultResponse } from "@/lib/types";
import { validateAnalyzeRequest } from "@/lib/validation";
import { checkAnalyzeRateLimit } from "@/lib/ratelimit";
import { saveResult, kvConfigured } from "@/lib/kv";

// Use Node.js runtime — no timeout limit on Vercel hobby plan (vs 30s edge limit)
export const runtime = "nodejs";
export const maxDuration = 60;

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured. Add ANTHROPIC_API_KEY to your environment variables." },
        { status: 500 }
      );
    }

    // Server-side results require KV. Fail loudly rather than silently leaking
    // a full report to the browser as the old flow did.
    if (!kvConfigured()) {
      console.error("KV (Upstash) not configured — refusing to generate a result.");
      return NextResponse.json(
        { error: "Result storage is not configured. Please try again later." },
        { status: 503 }
      );
    }

    // 1.3 — rate limit by IP (5/hour, 20/day).
    const rl = await checkAnalyzeRateLimit(clientIp(req));
    if (!rl.success) {
      return NextResponse.json(
        { error: "You've reached the limit for now. Please try again later." },
        { status: 429, headers: rl.retryAfter ? { "Retry-After": String(rl.retryAfter) } : undefined }
      );
    }

    // 1.3 — validate input (+ honeypot / timing bot check).
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }
    const validation = validateAnalyzeRequest(body);
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: validation.status });
    }
    const answers = validation.answers;

    const prompt = buildPrompt(answers);
    const model = process.env.ANTHROPIC_MODEL ?? "claude-haiku-4-5-20251001";

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 3000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text();
      console.error("Anthropic API error:", anthropicRes.status, errText);
      return NextResponse.json(
        { error: `Analysis service error (${anthropicRes.status}). Please try again.` },
        { status: 502 }
      );
    }

    const data = await anthropicRes.json();

    if (data.type === "error") {
      console.error("Anthropic error body:", JSON.stringify(data));
      return NextResponse.json(
        { error: data.error?.message ?? "Analysis service returned an error." },
        { status: 502 }
      );
    }

    if (!data.content || !Array.isArray(data.content)) {
      console.error("Unexpected Anthropic response shape:", JSON.stringify(data));
      return NextResponse.json(
        { error: "Unexpected response from analysis service." },
        { status: 502 }
      );
    }

    const rawText: string = data.content
      .map((block: { type: string; text?: string }) => (block.type === "text" ? block.text ?? "" : ""))
      .join("");

    // Strip markdown fences if present
    const clean = rawText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();

    let result: AnalysisResult;
    try {
      result = JSON.parse(clean);
    } catch {
      console.error("JSON parse failed. Raw text length:", rawText.length);
      return NextResponse.json(
        { error: "Could not parse the analysis. Please try again." },
        { status: 500 }
      );
    }

    // Validate required fields
    if (
      typeof result.probability !== "number" ||
      !result.riskLevel ||
      !result.headline ||
      !result.summary ||
      !Array.isArray(result.factors) ||
      !Array.isArray(result.recommendations)
    ) {
      console.error("Validation failed. Result keys:", Object.keys(result));
      return NextResponse.json(
        { error: "Analysis was incomplete. Please try again." },
        { status: 500 }
      );
    }

    // 1.2 — store the FULL result server-side under a random id (30-day TTL),
    // and return ONLY the free fields to the browser. The paid content never
    // leaves the server until the result is marked paid.
    const resultId = randomUUID();
    await saveResult(resultId, result);

    const payload: ResultResponse = {
      resultId,
      paid: false,
      result: toFreeResult(result),
    };
    return NextResponse.json(payload);
  } catch (err) {
    console.error("Unhandled route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
