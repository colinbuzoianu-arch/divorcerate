import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://splitornot.com";
    if (!stripeSecretKey) {
      return NextResponse.json({ error: "Payment not configured." }, { status: 500 });
    }

    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" });
    const body = await req.json();
    // Locale prefix for return URLs: "" for English (default), "/de" for German.
    const localePrefix = body.locale === "de" ? "/de" : "";

    // Couple comparison (Phase 6.2) uses its own Stripe price.
    if (body.kind === "comparison") {
      const compId = typeof body.compId === "string" ? body.compId : "";
      const comparisonPriceId = process.env.STRIPE_COMPARISON_PRICE_ID;
      if (!compId) return NextResponse.json({ error: "Missing comparison id." }, { status: 400 });
      if (!comparisonPriceId) {
        // Not set up yet — tell the UI to show "launching soon" rather than error.
        return NextResponse.json({ error: "Couple comparison isn't available yet.", comingSoon: true }, { status: 503 });
      }
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{ price: comparisonPriceId, quantity: 1 }],
        mode: "payment",
        success_url: `${appUrl}${localePrefix}/compare/${compId}?paid=1`,
        cancel_url: `${appUrl}${localePrefix}/compare/${compId}`,
        metadata: { kind: "comparison", compId },
      });
      return NextResponse.json({ url: session.url });
    }

    // Default: the single full report.
    const priceId = process.env.STRIPE_PRICE_ID;
    if (!priceId) return NextResponse.json({ error: "Payment not configured." }, { status: 500 });

    const resultId = typeof body.resultId === "string" ? body.resultId : "";
    if (!resultId) {
      return NextResponse.json({ error: "Missing result id." }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      success_url: `${appUrl}${localePrefix}/success?session_id={CHECKOUT_SESSION_ID}&result=${resultId}`,
      // Back/cancel from Stripe returns to the user's result, not the homepage.
      cancel_url: `${appUrl}${localePrefix}/r/${resultId}`,
      metadata: { resultId },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session." },
      { status: 500 }
    );
  }
}
