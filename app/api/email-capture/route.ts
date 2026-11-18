import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import type { StoredResult } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BAND_COLOR: Record<string, string> = {
  "Critical Point": "#C23A54",
  "Fault Line": "#C85A2A",
  "Amber Zone": "#B98900",
  "Stable Foundation": "#2E8B63",
  "Solid Ground": "#1E7A58",
};

function buildEmailHtml(result: StoredResult): string {
  const color = BAND_COLOR[result.band] ?? "#4B3FB0";

  const dimRows = result.dimensions.map((d) => `
    <tr>
      <td style="padding:6px 0;font-size:13px;color:#555;">${d.label}</td>
      <td style="padding:6px 0;font-size:13px;color:#1a1a1a;font-weight:600;text-align:right;">${d.score}</td>
    </tr>`).join("");

  const recRows = (result.narrative?.recommendations ?? []).map((r, i) => `
    <tr><td style="padding:10px 0;border-bottom:1px solid #f5f5f3;">
      <p style="font-size:14px;font-weight:600;color:#1a1a1a;margin:0 0 3px;">${i + 1}. ${r.title}</p>
      <p style="font-size:13px;color:#666;margin:0;line-height:1.6;">${r.detail}</p>
    </td></tr>`).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Your relationship health report — CoupleIQ</title>
</head>
<body style="margin:0;padding:0;background:#f3eee6;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3eee6;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

        <tr><td style="padding-bottom:24px;text-align:center;">
          <span style="font-size:22px;color:#1a1a1a;">CoupleIQ</span>
          <p style="font-size:12px;color:#aaa;margin:4px 0 0;">Your relationship health report</p>
        </td></tr>

        <tr><td style="background:#fff;border:1px solid ${color}33;border-radius:16px;padding:24px;text-align:center;">
          <p style="font-size:11px;color:${color};font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 10px;">${result.band}</p>
          <p style="font-size:56px;font-weight:800;color:#1a1a1a;line-height:1;margin:0;letter-spacing:-0.03em;">${result.healthScore}<span style="font-size:16px;color:#999;font-weight:400;"> / 100</span></p>
          <p style="font-size:15px;font-weight:500;color:#1a1a1a;line-height:1.5;margin:14px 0 0;">${result.headline}</p>
        </td></tr>

        <tr><td height="16"></td></tr>

        <tr><td style="background:#fff;border:1px solid #efefed;border-radius:16px;padding:24px;">
          <p style="font-size:11px;font-weight:700;color:#bbb;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 10px;">Your relationship pattern</p>
          <p style="font-size:18px;font-weight:700;color:#4B3FB0;margin:0;">${result.pattern}</p>
        </td></tr>

        <tr><td height="16"></td></tr>

        <tr><td style="background:#fff;border:1px solid #efefed;border-radius:16px;padding:24px;">
          <p style="font-size:11px;font-weight:700;color:#bbb;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 10px;">Eight dimensions</p>
          <table width="100%" cellpadding="0" cellspacing="0">${dimRows}</table>
        </td></tr>

        ${result.narrative ? `
        <tr><td height="16"></td></tr>
        <tr><td style="background:#fff;border:1px solid #efefed;border-radius:16px;padding:24px;">
          <p style="font-size:14px;color:#333;line-height:1.7;margin:0 0 16px;">${result.narrative.summary}</p>
          <p style="font-size:11px;font-weight:700;color:#bbb;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px;">What to do next</p>
          <table width="100%" cellpadding="0" cellspacing="0">${recRows}</table>
        </td></tr>` : ""}

        <tr><td height="28"></td></tr>

        <tr><td style="text-align:center;">
          <a href="https://splitornot.com/relationship-test" style="display:inline-block;background:#4B3FB0;color:#fff;text-decoration:none;border-radius:999px;padding:14px 32px;font-size:15px;font-weight:600;">Take the test again</a>
        </td></tr>

        <tr><td height="28"></td></tr>

        <tr><td style="text-align:center;border-top:1px solid #e8e8e5;padding-top:24px;">
          <p style="font-size:12px;color:#ccc;margin:0 0 4px;">CoupleIQ · splitornot.com</p>
          <p style="font-size:11px;color:#ddd;margin:0;">For self-reflection only — not a substitute for professional help.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}


export async function POST(req: NextRequest) {
  try {
    const resendKey   = process.env.RESEND_API_KEY;
    const fromEmail   = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

    if (!resendKey) {
      return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
    }

    const body = await req.json();
    const { email, result, mode, consent, reminderConsent }: { email: string; result?: StoredResult; mode?: string; consent?: boolean; reminderConsent?: boolean } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    // "notify" mode: a waitlist opt-in (e.g. the couple-comparison form). No
    // report is sent; we just add the address to the Resend audience, and only
    // with explicit consent (Phase 5 will build on this).
    if (mode === "notify") {
      if (!consent) {
        return NextResponse.json({ error: "Please tick the box to opt in." }, { status: 400 });
      }
      try {
        const resend = new Resend(resendKey);
        await resend.contacts.create({
          email,
          unsubscribed: false,
          audienceId: process.env.RESEND_AUDIENCE_ID ?? "",
        });
      } catch (contactErr) {
        console.warn("Notify signup: could not add contact:", contactErr);
      }
      return NextResponse.json({ success: true });
    }

    if (!result || typeof result.healthScore !== "number") {
      return NextResponse.json({ error: "Invalid result data." }, { status: 400 });
    }

    const resend = new Resend(resendKey);
    const html   = buildEmailHtml(result);

    // Send the report email
    const { error: sendError } = await resend.emails.send({
      from:    fromEmail,
      to:      email,
      subject: `Your relationship health report — ${result.band} · CoupleIQ`,
      html,
    });

    if (sendError) {
      console.error("Resend send error:", sendError);
      return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 502 });
    }

    // Only add to the Resend audience (the re-check reminder list) with an
    // explicit opt-in. Best-effort — don't fail the send if this errors.
    if (reminderConsent) {
      try {
        await resend.contacts.create({
          email,
          unsubscribed: false,
          audienceId: process.env.RESEND_AUDIENCE_ID ?? "",
        });
      } catch (contactErr) {
        console.warn("Could not add to reminder audience:", contactErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email capture error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
