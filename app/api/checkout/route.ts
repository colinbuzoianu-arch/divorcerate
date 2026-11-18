import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const priceId = process.env.STRIPE_PRICE_ID;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://splitornot.com";

    if (!stripeSecretKey || !priceId) {
      return NextResponse.json(
        { error: "Payment not configured." },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" });

    // Store the result id in metadata so the webhook can mark it paid, and in
    // the success URL so /success can poll for it.
    const body = await req.json();
    const resultId = typeof body.resultId === "string" ? body.resultId : "";
    if (!resultId) {
      return NextResponse.json({ error: "Missing result id." }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}&result=${resultId}`,
      cancel_url: `${appUrl}?cancelled=true`,
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
