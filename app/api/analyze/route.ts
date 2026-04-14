import { NextRequest, NextResponse } from "next/server";
import { buildPrompt } from "@/lib/prompt";
import { Answers, AnalysisResult } from "@/lib/types";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured. Add ANTHROPIC_API_KEY to your environment variables." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const answers: Answers = body.answers;

    if (!answers || typeof answers !== "object") {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const prompt = buildPrompt(answers);

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text();
      console.error("Anthropic API error:", errText);
      return NextResponse.json({ error: "Analysis service unavailable. Please try again." }, { status: 502 });
    }

    const data = await anthropicRes.json();
    const rawText: string = data.content
      .map((block: { type: string; text?: string }) => (block.type === "text" ? block.text : ""))
      .filter(Boolean)
      .join("");

    const clean = rawText.replace(/```json|```/g, "").trim();
    const result: AnalysisResult = JSON.parse(clean);

    // Validate required fields
    if (
      typeof result.probability !== "number" ||
      !result.riskLevel ||
      !result.headline ||
      !result.summary ||
      !Array.isArray(result.factors) ||
      !Array.isArray(result.recommendations)
    ) {
      throw new Error("Malformed response from model");
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("Route error:", err);
    return NextResponse.json(
      { error: "Failed to process analysis. Please try again." },
      { status: 500 }
    );
  }
}
