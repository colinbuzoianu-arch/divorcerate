"use client";

import { useEffect, useRef, useState } from "react";
import { AnalysisResult } from "@/lib/types";

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

const urgencyConfig: Record<string, { color: string; bg: string; icon: string }> = {
  "keep doing what you are doing": { color: "#1d9e75", bg: "#e1f5ee", icon: "✓" },
  "worth being aware of":          { color: "#ba7517", bg: "#faeeda", icon: "~" },
  "worth addressing soon":         { color: "#d85a30", bg: "#faece7", icon: "!" },
  "worth addressing urgently":     { color: "#a32d2d", bg: "#fcebeb", icon: "!!" },
};

const weightLabel: Record<string, string> = {
  critical: "Critical",
  significant: "Significant",
  moderate: "Moderate",
};

const weightColor: Record<string, string> = {
  critical: "#a32d2d",
  significant: "#d85a30",
  moderate: "#ba7517",
};

interface Props {
  result: AnalysisResult;
  isPaid: boolean;
  onUnlock: () => void;
  onRestart: () => void;
}

export default function ResultScreen({ result, isPaid, onUnlock, onRestart }: Props) {
  const markerRef = useRef<HTMLDivElement>(null);
  const avgMarkerRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  const pct = Math.min(100, Math.max(0, result.probability));
  const avg = Math.min(100, Math.max(0, result.nationalAverage ?? 42));
  const color = riskColors[result.riskLevel] ?? "#534ab7";
  const bg = riskBg[result.riskLevel] ?? "#eeedfe";
  const urgency = urgencyConfig[result.urgency] ?? urgencyConfig["worth being aware of"];
  const vsAvg = pct - avg;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true);
      if (markerRef.current) markerRef.current.style.left = `${pct}%`;
      if (avgMarkerRef.current) avgMarkerRef.current.style.left = `${avg}%`;
    }, 150);
    return () => clearTimeout(timer);
  }, [pct, avg]);

  const positiveFactors = result.factors.filter((f) => f.positive);
  const negativeFactors = result.factors.filter((f) => !f.positive);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

      {/* HEADLINE */}
      <div style={{ background: bg, border: `1px solid ${color}30`, borderRadius: 14, padding: "1.25rem 1.5rem", textAlign: "center" }}>
        <p style={{ fontSize: 12, color, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
          {result.riskLevel} risk relationship
        </p>
        <p style={{ fontSize: 17, fontWeight: 500, color: "#1a1a1a", lineHeight: 1.5, marginBottom: 12 }}>
          {result.headline}
        </p>
        <p style={{ fontSize: 14, color: "#444", lineHeight: 1.7 }}>
          {result.summary}
        </p>
      </div>

      {/* GAUGE */}
      <div style={{ background: "#f8f8f6", borderRadius: 14, padding: "1.25rem 1.5rem", border: "0.5px solid #e5e5e5" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 12, marginBottom: 4 }}>
          <span style={{ fontSize: 52, fontWeight: 500, color, lineHeight: 1 }}>{pct}%</span>
          <div>
            <div style={{ fontSize: 13, color: "#777" }}>estimated risk</div>
            <div style={{ fontSize: 12, fontWeight: 500, color: vsAvg > 0 ? "#d85a30" : "#1d9e75", marginTop: 2 }}>
              {vsAvg > 0 ? `+${vsAvg}%` : `${vsAvg}%`} vs national avg ({avg}%)
            </div>
          </div>
        </div>

        <div style={{ position: "relative", margin: "1.25rem 0 0.5rem" }}>
          <div style={{ height: 8, borderRadius: 4, background: "linear-gradient(to right, #9fe1cb, #fac775, #f09595, #e24b4a)" }} />
          <div ref={avgMarkerRef} style={{ position: "absolute", top: -3, left: `${avg}%`, width: 14, height: 14, borderRadius: "50%", background: "#888", border: "2px solid #fff", transform: "translateX(-50%)", transition: "left 1.2s ease" }} />
          <div ref={markerRef} style={{ position: "absolute", top: -5, left: "0%", width: 18, height: 18, borderRadius: "50%", background: color, border: "2.5px solid #fff", transform: "translateX(-50%)", transition: "left 1.2s ease", boxShadow: "0 1px 6px rgba(0,0,0,0.18)" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#bbb" }}>
          <span>Low risk</span><span>High risk</span>
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 12, fontSize: 12, color: "#777", justifyContent: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: color, display: "inline-block" }} /> Your score
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#888", display: "inline-block" }} /> National average
          </span>
        </div>
      </div>

      {/* PATTERN */}
      <div style={{ border: "0.5px solid #e5e5e5", borderRadius: 14, padding: "1.25rem 1.5rem", background: "#fff" }}>
        <p style={{ fontSize: 11, fontWeight: 500, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Your relationship pattern</p>
        <p style={{ fontSize: 16, fontWeight: 500, color: "#534ab7", marginBottom: 8 }}>{result.dynamicPattern}</p>
        <p style={{ fontSize: 14, color: "#444", lineHeight: 1.7 }}>{result.dynamicPatternDetail}</p>
      </div>

      {/* STRENGTH + RISK CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ background: "#e1f5ee", border: "0.5px solid #9fe1cb", borderRadius: 12, padding: "1rem" }}>
          <p style={{ fontSize: 11, fontWeight: 500, color: "#0f6e56", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Biggest strength</p>
          <p style={{ fontSize: 14, fontWeight: 500, color: "#085041", marginBottom: 6 }}>{result.biggestStrength}</p>
          <p style={{ fontSize: 12, color: "#0f6e56", lineHeight: 1.6 }}>{result.biggestStrengthDetail}</p>
        </div>
        <div style={{ background: "#fcebeb", border: "0.5px solid #f7c1c1", borderRadius: 12, padding: "1rem" }}>
          <p style={{ fontSize: 11, fontWeight: 500, color: "#a32d2d", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Biggest risk</p>
          <p style={{ fontSize: 14, fontWeight: 500, color: "#501313", marginBottom: 6 }}>{result.biggestRisk}</p>
          <p style={{ fontSize: 12, color: "#a32d2d", lineHeight: 1.6 }}>{result.biggestRiskDetail}</p>
        </div>
      </div>

      {/* PAYWALL GATE — locks everything below */}
      {!isPaid ? (
        <PaywallGate onUnlock={onUnlock} riskLevel={result.riskLevel} color={color} />
      ) : (
        <>
          {/* FACTOR BREAKDOWN */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 500, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Full breakdown</p>
            {negativeFactors.length > 0 && (
              <div style={{ marginBottom: 10 }}>
                <p style={{ fontSize: 12, color: "#aaa", marginBottom: 6 }}>Risk factors</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {negativeFactors.map((f, i) => <FactorRow key={i} factor={f} />)}
                </div>
              </div>
            )}
            {positiveFactors.length > 0 && (
              <div>
                <p style={{ fontSize: 12, color: "#aaa", marginBottom: 6, marginTop: negativeFactors.length > 0 ? 14 : 0 }}>Protective factors</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {positiveFactors.map((f, i) => <FactorRow key={i} factor={f} />)}
                </div>
              </div>
            )}
          </div>

          {/* RECOMMENDATIONS */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 500, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>What to do next</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {result.recommendations.map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "12px 14px", background: "#f8f8f6", borderRadius: 12, border: "0.5px solid #e8e8e5", alignItems: "flex-start" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#534ab7", color: "#fff", fontSize: 11, fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    {i + 1}
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a", marginBottom: 4 }}>{r.title}</p>
                    <p style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>{r.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* URGENCY */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", background: urgency.bg, borderRadius: 10, border: `0.5px solid ${urgency.color}40` }}>
            <span style={{ width: 28, height: 28, borderRadius: "50%", background: urgency.color, color: "#fff", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {urgency.icon}
            </span>
            <div>
              <p style={{ fontSize: 12, fontWeight: 500, color: urgency.color, textTransform: "capitalize" }}>Overall: {result.urgency}</p>
              <p style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
                {result.urgency === "keep doing what you are doing"
                  ? "Your relationship has strong protective factors. Keep investing in what's working."
                  : result.urgency === "worth being aware of"
                  ? "No immediate crisis, but a few patterns are worth watching. Small adjustments now prevent drift later."
                  : result.urgency === "worth addressing soon"
                  ? "These patterns tend to compound over time. Addressing them proactively makes a real difference."
                  : "One or more serious risk factors are present. This is where professional support tends to help most."}
              </p>
            </div>
          </div>
        </>
      )}

      <p style={{ fontSize: 12, color: "#bbb", textAlign: "center", lineHeight: 1.6 }}>{result.disclaimer}</p>

      {/* SHARE — full card for paid, teaser for free */}
      {isPaid ? (
        <ShareButton result={result} pct={pct} color={color} bg={bg} full={true} />
      ) : (
        <ShareButton result={result} pct={pct} color={color} bg={bg} full={false} />
      )}

      <button onClick={onRestart} style={{ background: "transparent", border: "0.5px solid #ddd", borderRadius: 10, padding: "11px 20px", fontSize: 14, color: "#999", width: "100%", cursor: "pointer" }}>
        Start over
      </button>
    </div>
  );
}

/* ─── Paywall Gate ──────────────────────────────────────────────────────────── */

function PaywallGate({
  onUnlock,
  riskLevel,
  color,
}: {
  onUnlock: () => void;
  riskLevel: string;
  color: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    onUnlock();
  };

  const lockedItems = [
    "Full risk & protective factor breakdown",
    "3 personalised, named action steps",
    "Overall urgency verdict",
    "Shareable result card",
  ];

  return (
    <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid #e5e5e5" }}>
      {/* Blurred preview */}
      <div style={{ position: "relative" }}>
        <div style={{ filter: "blur(4px)", pointerEvents: "none", padding: "1.25rem 1.5rem", background: "#f8f8f6", userSelect: "none" }}>
          <p style={{ fontSize: 11, fontWeight: 500, color: "#999", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Full breakdown</p>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "11px 14px", background: "#fff", borderRadius: 10, border: "0.5px solid #e8e8e5", marginBottom: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: i % 2 === 0 ? "#1d9e75" : "#e24b4a", marginTop: 5, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ height: 12, background: "#e5e5e5", borderRadius: 4, marginBottom: 6, width: "40%" }} />
                <div style={{ height: 10, background: "#efefef", borderRadius: 4, width: "85%" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.85) 40%, rgba(255,255,255,0.98) 100%)", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: "1.5rem" }}>
        </div>
      </div>

      {/* CTA card */}
      <div style={{ background: "#fff", padding: "1.5rem", borderTop: "0.5px solid #f0f0f0" }}>
        <p style={{ fontSize: 16, fontWeight: 500, color: "#1a1a1a", textAlign: "center", marginBottom: 6 }}>
          Unlock your full report
        </p>
        <p style={{ fontSize: 13, color: "#777", textAlign: "center", marginBottom: "1.25rem", lineHeight: 1.6 }}>
          Your {riskLevel.toLowerCase()} risk result comes with a detailed breakdown of every factor and a personalised action plan.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "1.25rem" }}>
          {lockedItems.map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#444" }}>
              <span style={{ width: 18, height: 18, borderRadius: "50%", background: "#e1f5ee", color: "#1d9e75", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 600, flexShrink: 0 }}>✓</span>
              {item}
            </div>
          ))}
        </div>

        <button
          onClick={handleClick}
          disabled={loading}
          style={{
            width: "100%",
            background: loading ? "#afa9ec" : "#534ab7",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: "14px 20px",
            fontSize: 15,
            fontWeight: 500,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.15s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {loading ? (
            <>
              <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
              Opening checkout…
            </>
          ) : (
            "Unlock full report — $4.99"
          )}
        </button>
        <p style={{ fontSize: 11, color: "#bbb", textAlign: "center", marginTop: 10 }}>
          One-time payment · Secure checkout via Stripe
        </p>
      </div>
    </div>
  );
}

/* ─── Factor Row ────────────────────────────────────────────────────────────── */

function FactorRow({ factor }: { factor: AnalysisResult["factors"][0] }) {
  const isPositive = factor.positive;
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "11px 14px", background: "#fff", borderRadius: 10, border: `0.5px solid ${isPositive ? "#9fe1cb" : "#f0a0a0"}` }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: isPositive ? "#1d9e75" : "#e24b4a", marginTop: 5, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#1a1a1a" }}>{factor.label}</span>
          {!isPositive && factor.weight !== "moderate" && (
            <span style={{ fontSize: 10, fontWeight: 500, color: weightColor[factor.weight], background: `${weightColor[factor.weight]}15`, padding: "1px 7px", borderRadius: 20 }}>
              {weightLabel[factor.weight]}
            </span>
          )}
        </div>
        <p style={{ fontSize: 13, color: "#555", lineHeight: 1.5 }}>{factor.detail}</p>
      </div>
    </div>
  );
}

/* ─── Share Button ─────────────────────────────────────────────────────────── */

function ShareButton({
  result,
  pct,
  color,
  bg,
  full,
}: {
  result: AnalysisResult;
  pct: number;
  color: string;
  bg: string;
  full: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "generating" | "copied" | "shared">("idle");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw the share card on a hidden canvas
  function drawCard(): HTMLCanvasElement {
    const W = 1080;
    const H = 1080;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;

    // Background
    ctx.fillStyle = "#f0efed";
    ctx.fillRect(0, 0, W, H);

    // White card
    const pad = 72;
    const cardX = pad;
    const cardY = pad;
    const cardW = W - pad * 2;
    const cardH = H - pad * 2;
    roundRect(ctx, cardX, cardY, cardW, cardH, 40);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    // Colored top stripe
    roundRect(ctx, cardX, cardY, cardW, 220, 40);
    ctx.fillStyle = bg;
    ctx.fill();
    ctx.fillRect(cardX, cardY + 180, cardW, 40);

    // Risk level pill
    const pillW = 220;
    const pillH = 44;
    const pillX = W / 2 - pillW / 2;
    const pillY = cardY + 36;
    roundRect(ctx, pillX, pillY, pillW, pillH, 22);
    ctx.fillStyle = color + "22";
    ctx.fill();
    ctx.fillStyle = color;
    ctx.font = "600 22px -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${result.riskLevel.toUpperCase()} RISK`, W / 2, pillY + 30);

    // Big percentage
    ctx.fillStyle = color;
    ctx.font = "700 180px -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${pct}%`, W / 2, cardY + 360);

    // Label under pct
    ctx.fillStyle = "#888";
    ctx.font = "400 36px -apple-system, sans-serif";
    ctx.fillText("estimated divorce risk", W / 2, cardY + 420);

    // Divider
    ctx.strokeStyle = "#e8e8e5";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cardX + 60, cardY + 460);
    ctx.lineTo(cardX + cardW - 60, cardY + 460);
    ctx.stroke();

    if (full) {
      // PAID: full card with headline, pattern, strength/risk
      ctx.fillStyle = "#1a1a1a";
      ctx.font = "500 44px -apple-system, sans-serif";
      ctx.textAlign = "center";
      wrapText(ctx, result.headline, W / 2, cardY + 540, cardW - 160, 58);

      ctx.fillStyle = "#534ab7";
      ctx.font = "500 34px -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(result.dynamicPattern, W / 2, cardY + 700);

      const rowY = cardY + 760;
      const halfW = cardW / 2 - 20;

      roundRect(ctx, cardX + 20, rowY, halfW, 140, 16);
      ctx.fillStyle = "#e1f5ee";
      ctx.fill();
      ctx.fillStyle = "#0f6e56";
      ctx.font = "600 22px -apple-system, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("STRENGTH", cardX + 44, rowY + 38);
      ctx.fillStyle = "#085041";
      ctx.font = "500 28px -apple-system, sans-serif";
      wrapText(ctx, result.biggestStrength, cardX + 44, rowY + 76, halfW - 48, 36, 2);

      const rBoxX = cardX + halfW + 40;
      roundRect(ctx, rBoxX, rowY, halfW, 140, 16);
      ctx.fillStyle = "#fcebeb";
      ctx.fill();
      ctx.fillStyle = "#a32d2d";
      ctx.font = "600 22px -apple-system, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText("RISK", rBoxX + 24, rowY + 38);
      ctx.fillStyle = "#501313";
      ctx.font = "500 28px -apple-system, sans-serif";
      wrapText(ctx, result.biggestRisk, rBoxX + 24, rowY + 76, halfW - 48, 36, 2);
    } else {
      // FREE teaser: blurred placeholder boxes + lock message
      ctx.fillStyle = "#1a1a1a";
      ctx.font = "500 40px -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("See the full breakdown at", W / 2, cardY + 560);
      ctx.fillStyle = "#534ab7";
      ctx.font = "600 44px -apple-system, sans-serif";
      ctx.fillText("splitornot.com", W / 2, cardY + 620);

      // Greyed placeholder rows to suggest locked content
      [700, 760, 820].forEach((y) => {
        roundRect(ctx, cardX + 60, cardY + y, cardW - 120, 44, 10);
        ctx.fillStyle = "#f0efed";
        ctx.fill();
        ctx.fillStyle = "#ccc";
        ctx.font = "400 24px -apple-system, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("🔒 unlock for full analysis", W / 2, cardY + y + 30);
      });
    }

    // Footer branding
    ctx.fillStyle = "#bbb";
    ctx.font = "400 28px -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("splitornot.com · relationship health analyzer", W / 2, cardY + cardH - 40);

    return canvas;
  }

  async function handleShare() {
    setStatus("generating");
    await new Promise((r) => setTimeout(r, 50)); // let state render

    const canvas = drawCard();
    const blob = await new Promise<Blob>((resolve) =>
      canvas.toBlob((b) => resolve(b!), "image/png")
    );
    const file = new File([blob], "my-relationship-result.png", { type: "image/png" });

    // Try native share (mobile) first
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "My relationship health result",
          text: full
            ? `I got ${pct}% divorce risk on splitornot.com. ${result.headline}`
            : `I got ${pct}% divorce risk on splitornot.com — see if your relationship is at risk.`,
        });
        setStatus("shared");
        setTimeout(() => setStatus("idle"), 2500);
        return;
      } catch {
        // User cancelled or error — fall through to download
      }
    }

    // Desktop fallback: download the image
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-relationship-result.png";
    a.click();
    URL.revokeObjectURL(url);

    // Also copy link to clipboard
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus("copied");
    } catch {
      setStatus("idle");
    }
    setTimeout(() => setStatus("idle"), 2500);
  }

  const label =
    status === "generating" ? "Generating card…"
    : status === "copied"   ? "Image saved · Link copied!"
    : status === "shared"   ? "Shared!"
    : full ? "Share my result" : "Share my score";

  const btnColor = status === "idle" ? "#534ab7" : status === "generating" ? "#afa9ec" : "#1d9e75";

  return (
    <button
      onClick={handleShare}
      disabled={status === "generating"}
      style={{
        width: "100%",
        background: btnColor,
        color: "#fff",
        border: "none",
        borderRadius: 10,
        padding: "13px 20px",
        fontSize: 15,
        fontWeight: 500,
        cursor: status === "generating" ? "not-allowed" : "pointer",
        transition: "background 0.2s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      {status === "generating" ? (
        <>
          <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
          {label}
        </>
      ) : status === "idle" ? (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
          {label}
        </>
      ) : label}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </button>
  );
}

/* ─── Canvas helpers ────────────────────────────────────────────────────────── */

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines = 3
) {
  const words = text.split(" ");
  let line = "";
  let lineCount = 0;
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + " ";
    if (ctx.measureText(testLine).width > maxWidth && i > 0) {
      ctx.fillText(line.trim(), x, y + lineCount * lineHeight);
      line = words[i] + " ";
      lineCount++;
      if (lineCount >= maxLines) {
        ctx.fillText(line.trim() + "…", x, y + lineCount * lineHeight);
        return;
      }
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, y + lineCount * lineHeight);
}
