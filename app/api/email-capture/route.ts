import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { AnalysisResult } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const riskColors: Record<string, string> = {
  Low: "#1d9e75",
  Moderate: "#ba7517",
  Elevated: "#d85a30",
  High: "#a32d2d",
};

const riskBg: Record<string, string> = {
  Low: "#e1f5ee",
  Moderate: "#faeeda",
  Elevated: "#faece7",
  High: "#fcebeb",
};

function buildEmailHtml(result: AnalysisResult): string {
  const color  = riskColors[result.riskLevel] ?? "#534ab7";
  const bg     = riskBg[result.riskLevel]     ?? "#eeedfe";
  const vsAvg  = result.probability - (result.nationalAverage ?? 42);
  const vsText = vsAvg > 0 ? `+${vsAvg}%` : `${vsAvg}%`;

  const factorRows = result.factors.map((f) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f5f5f3;vertical-align:top;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="14" style="vertical-align:top;padding-top:3px;">
              <div style="width:8px;height:8px;border-radius:50%;background:${f.positive ? "#1d9e75" : "#e24b4a"};margin-top:2px;"></div>
            </td>
            <td style="padding-left:10px;">
              <span style="font-size:13px;font-weight:600;color:#1a1a1a;">${f.label}</span>
              ${!f.positive && f.weight !== "moderate" ? `<span style="font-size:10px;font-weight:600;color:${f.weight === "critical" ? "#a32d2d" : "#d85a30"};background:${f.weight === "critical" ? "#fcebeb" : "#faece7"};padding:2px 7px;border-radius:20px;margin-left:6px;">${f.weight.charAt(0).toUpperCase() + f.weight.slice(1)}</span>` : ""}
              <p style="font-size:13px;color:#666;margin:4px 0 0;line-height:1.55;">${f.detail}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>`).join("");

  const recRows = result.recommendations.map((r, i) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #f5f5f3;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="28" style="vertical-align:top;">
              <div style="width:24px;height:24px;border-radius:50%;background:#534ab7;color:#fff;font-size:11px;font-weight:700;text-align:center;line-height:24px;">${i + 1}</div>
            </td>
            <td style="padding-left:12px;">
              <p style="font-size:14px;font-weight:600;color:#1a1a1a;margin:0 0 3px;">${r.title}</p>
              <p style="font-size:13px;color:#666;margin:0;line-height:1.6;">${r.detail}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>`).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Your relationship health report — splitornot.com</title>
</head>
<body style="margin:0;padding:0;background:#f0efed;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0efed;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">

        <!-- Header -->
        <tr><td style="padding-bottom:24px;text-align:center;">
          <span style="font-size:20px;font-weight:800;color:#1a1a1a;letter-spacing:-0.02em;">split<span style="color:#534ab7;">or</span>not</span>
          <p style="font-size:12px;color:#aaa;margin:4px 0 0;">Your relationship health report</p>
        </td></tr>

        <!-- Headline card -->
        <tr><td style="background:${bg};border:1px solid ${color}22;border-radius:16px;padding:24px;text-align:center;margin-bottom:16px;">
          <p style="font-size:11px;color:${color};font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 10px;">${result.riskLevel} risk relationship</p>
          <p style="font-size:20px;font-weight:700;color:#1a1a1a;line-height:1.4;margin:0 0 10px;letter-spacing:-0.01em;">${result.headline}</p>
          <p style="font-size:14px;color:#555;line-height:1.75;margin:0;">${result.summary}</p>
        </td></tr>

        <tr><td height="16"></td></tr>

        <!-- Score card -->
        <tr><td style="background:#fff;border:1px solid #efefed;border-radius:16px;padding:24px;text-align:center;">
          <p style="font-size:60px;font-weight:800;color:${color};line-height:1;margin:0;letter-spacing:-0.03em;">${result.probability}%</p>
          <p style="font-size:13px;color:#888;margin:6px 0 4px;">estimated divorce risk</p>
          <p style="font-size:12px;font-weight:600;color:${vsAvg > 0 ? "#d85a30" : "#1d9e75"};margin:0;">${vsText} vs national average (${result.nationalAverage ?? 42}%)</p>
        </td></tr>

        <tr><td height="16"></td></tr>

        <!-- Pattern card -->
        <tr><td style="background:#fff;border:1px solid #efefed;border-radius:16px;padding:24px;">
          <p style="font-size:11px;font-weight:700;color:#bbb;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 10px;">Your relationship pattern</p>
          <p style="font-size:17px;font-weight:700;color:#534ab7;margin:0 0 8px;letter-spacing:-0.01em;">${result.dynamicPattern}</p>
          <p style="font-size:14px;color:#555;line-height:1.75;margin:0;">${result.dynamicPatternDetail}</p>
        </td></tr>

        <tr><td height="16"></td></tr>

        <!-- Strength + Risk -->
        <tr><td>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="49%" style="background:#e1f5ee;border:1px solid #b5ddd0;border-radius:14px;padding:16px;vertical-align:top;">
                <p style="font-size:10px;font-weight:700;color:#0f6e56;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 6px;">Biggest strength</p>
                <p style="font-size:14px;font-weight:700;color:#085041;margin:0 0 6px;">${result.biggestStrength}</p>
                <p style="font-size:12px;color:#0f6e56;line-height:1.6;margin:0;">${result.biggestStrengthDetail}</p>
              </td>
              <td width="2%"></td>
              <td width="49%" style="background:#fcebeb;border:1px solid #f0c0c0;border-radius:14px;padding:16px;vertical-align:top;">
                <p style="font-size:10px;font-weight:700;color:#a32d2d;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 6px;">Biggest risk</p>
                <p style="font-size:14px;font-weight:700;color:#501313;margin:0 0 6px;">${result.biggestRisk}</p>
                <p style="font-size:12px;color:#a32d2d;line-height:1.6;margin:0;">${result.biggestRiskDetail}</p>
              </td>
            </tr>
          </table>
        </td></tr>

        <tr><td height="16"></td></tr>

        <!-- Full factor breakdown -->
        <tr><td style="background:#fff;border:1px solid #efefed;border-radius:16px;padding:24px;">
          <p style="font-size:11px;font-weight:700;color:#bbb;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 14px;">Full factor breakdown</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            ${factorRows}
          </table>
        </td></tr>

        <tr><td height="16"></td></tr>

        <!-- Recommendations -->
        <tr><td style="background:#fff;border:1px solid #efefed;border-radius:16px;padding:24px;">
          <p style="font-size:11px;font-weight:700;color:#bbb;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 14px;">What to do next</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            ${recRows}
          </table>
        </td></tr>

        <tr><td height="16"></td></tr>

        <!-- Urgency verdict -->
        <tr><td style="background:#fafaf8;border:1px solid #efefed;border-radius:14px;padding:18px 20px;">
          <p style="font-size:12px;font-weight:700;color:#534ab7;text-transform:capitalize;margin:0 0 4px;">Overall verdict: ${result.urgency}</p>
          <p style="font-size:13px;color:#666;line-height:1.6;margin:0;">${result.disclaimer}</p>
        </td></tr>

        <tr><td height="32"></td></tr>

        <!-- CTA -->
        <tr><td style="text-align:center;">
          <p style="font-size:14px;color:#888;margin:0 0 16px;line-height:1.6;">Want to track your relationship health over time?<br/>Retake the assessment monthly and see how patterns shift.</p>
          <a href="https://splitornot.com" style="display:inline-block;background:#534ab7;color:#fff;text-decoration:none;border-radius:12px;padding:14px 32px;font-size:15px;font-weight:700;letter-spacing:0.01em;">Back to splitornot.com</a>
        </td></tr>

        <tr><td height="32"></td></tr>

        <!-- Footer -->
        <tr><td style="text-align:center;border-top:1px solid #e8e8e5;padding-top:24px;">
          <p style="font-size:12px;color:#ccc;margin:0 0 4px;">splitornot.com · Powered by Claude AI</p>
          <p style="font-size:11px;color:#ddd;margin:0;">This report is for informational purposes only and is not a substitute for professional couples counseling.</p>
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
    const { email, result }: { email: string; result: AnalysisResult } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (!result || typeof result.probability !== "number") {
      return NextResponse.json({ error: "Invalid result data." }, { status: 400 });
    }

    const resend = new Resend(resendKey);
    const html   = buildEmailHtml(result);

    // Send the report email
    const { error: sendError } = await resend.emails.send({
      from:    fromEmail,
      to:      email,
      subject: `Your relationship health report — ${result.probability}% risk · splitornot.com`,
      html,
    });

    if (sendError) {
      console.error("Resend send error:", sendError);
      return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 502 });
    }

    // Add to Resend contacts audience (best-effort — don't fail if this errors)
    try {
      await resend.contacts.create({
        email,
        unsubscribed: false,
        audienceId:   process.env.RESEND_AUDIENCE_ID ?? "",
      });
    } catch (contactErr) {
      console.warn("Could not add to contacts (audience not set up yet):", contactErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email capture error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
