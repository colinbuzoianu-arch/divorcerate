import { NextRequest, NextResponse } from "next/server";
import { saveFeedback, kvConfigured } from "@/lib/kv";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Stores a short post-result feedback entry (Phase 5.4): was it useful, an
 * optional comment, and whether the person consents to being quoted. This is
 * the source of future, real testimonials. Fails soft if KV isn't configured.
 */
export async function POST(req: NextRequest) {
  if (!kvConfigured()) return NextResponse.json({ success: true });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid body." }, { status: 400 }); }

  const { useful, comment, consentToQuote, resultId } = (body ?? {}) as {
    useful?: boolean; comment?: string; consentToQuote?: boolean; resultId?: string;
  };

  if (typeof useful !== "boolean") {
    return NextResponse.json({ error: "Missing feedback." }, { status: 400 });
  }

  try {
    await saveFeedback({
      useful,
      comment: typeof comment === "string" ? comment.slice(0, 1000) : "",
      consentToQuote: Boolean(consentToQuote),
      resultId: typeof resultId === "string" ? resultId.slice(0, 64) : "",
    });
  } catch (err) {
    console.error("Feedback save failed:", err);
    // Don't surface storage errors to the user for a non-critical action.
  }
  return NextResponse.json({ success: true });
}
