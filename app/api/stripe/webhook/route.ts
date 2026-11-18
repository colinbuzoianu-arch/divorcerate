import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { markPaid } from "@/lib/kv";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Stripe webhook (Phase 1.2). Verifies the signature, then on
 * `checkout.session.completed` marks the associated result as paid in KV.
 * This is the ONLY thing that grants access to the full report — the old
 * localStorage trust model is gone.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!secret || !stripeSecretKey) {
    console.error("Stripe webhook not configured (missing STRIPE_WEBHOOK_SECRET or STRIPE_SECRET_KEY).");
    return NextResponse.json({ error: "Not configured." }, { status: 500 });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  // Raw body is required for signature verification.
  const rawBody = await req.text();
  const stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err) {
    console.error("Stripe signature verification failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const resultId = session.metadata?.resultId;
    if (session.payment_status === "paid" && resultId) {
      try {
        await markPaid(resultId);
      } catch (err) {
        console.error("Failed to mark result paid:", err);
        // Return 500 so Stripe retries.
        return NextResponse.json({ error: "Could not record payment." }, { status: 500 });
      }
    } else {
      console.warn("checkout.session.completed without paid status or resultId.");
    }
  }

  return NextResponse.json({ received: true });
}
