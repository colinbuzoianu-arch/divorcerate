"use client";

import { useEffect, useRef, useState } from "react";
import { AnalysisResult } from "@/lib/types";

const riskColors: Record<string, string> = {
  Low: "#1d9e75", Moderate: "#ba7517", Elevated: "#d85a30", High: "#a32d2d",
};
const riskBg: Record<string, string> = {
  Low: "#e1f5ee", Moderate: "#faeeda", Elevated: "#faece7", High: "#fcebeb",
};

/* Named tiers — people identify with these far more than raw percentages */
const tiers: { max: number; name: string; description: string }[] = [
  { max: 20,  name: "Solid Ground",       description: "Your relationship shows strong protective factors and low risk. You're doing the important things right." },
  { max: 35,  name: "Stable Foundation",  description: "Your relationship is fundamentally sound, with some areas worth keeping an eye on." },
  { max: 50,  name: "Amber Zone",         description: "There are meaningful risk factors present alongside genuine strengths. This is the zone where small changes make the biggest difference." },
  { max: 70,  name: "Fault Line",         description: "Several significant patterns are putting strain on the relationship. These are worth addressing sooner rather than later." },
  { max: 100, name: "Critical Point",     description: "Your relationship is under serious stress. The patterns here tend to compound — but awareness is the first step to change." },
];

function getTier(pct: number) {
  return tiers.find((t) => pct <= t.max) ?? tiers[tiers.length - 1];
}
const urgencyConfig: Record<string, { color: string; bg: string; icon: string }> = {
  "keep doing what you are doing": { color: "#1d9e75", bg: "#e1f5ee", icon: "✓" },
  "worth being aware of":          { color: "#ba7517", bg: "#faeeda", icon: "~" },
  "worth addressing soon":         { color: "#d85a30", bg: "#faece7", icon: "!" },
  "worth addressing urgently":     { color: "#a32d2d", bg: "#fcebeb", icon: "!!" },
};
const weightLabel: Record<string, string> = {
  critical: "Critical", significant: "Significant", moderate: "Moderate",
};
const weightColor: Record<string, string> = {
  critical: "#a32d2d", significant: "#d85a30", moderate: "#ba7517",
};

interface Props {
  result: AnalysisResult;
  isPaid: boolean;
  onUnlock: () => void;
  onRestart: () => void;
}

export default function ResultScreen({ result, isPaid, onUnlock, onRestart }: Props) {
  const markerRef    = useRef<HTMLDivElement>(null);
  const avgMarkerRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  const pct    = Math.min(100, Math.max(0, result.probability));
  const avg    = Math.min(100, Math.max(0, result.nationalAverage ?? 42));
  const color  = riskColors[result.riskLevel] ?? "#534ab7";
  const bg     = riskBg[result.riskLevel]     ?? "#eeedfe";
  const urgency = urgencyConfig[result.urgency] ?? urgencyConfig["worth being aware of"];
  const vsAvg  = pct - avg;
  const tier   = getTier(pct);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true);
      if (markerRef.current)    markerRef.current.style.left    = `${pct}%`;
      if (avgMarkerRef.current) avgMarkerRef.current.style.left = `${avg}%`;
    }, 150);
    return () => clearTimeout(timer);
  }, [pct, avg]);

  const positiveFactors = result.factors.filter((f) =>  f.positive);
  const negativeFactors = result.factors.filter((f) => !f.positive);

  /* Point 4 helper — each section gets a staggered reveal class */
  const r = (delay: string) => `reveal ${delay}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

      {/* HEADLINE — tier name leads, percentage supports */}
      <div className={r("reveal-d1")} style={{ background: bg, border: `1px solid ${color}22`, borderRadius: 16, padding: "1.5rem", textAlign: "center" }}>
        {/* Tier badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: color + "18", border: `1px solid ${color}33`, borderRadius: 20, padding: "5px 14px", marginBottom: 14 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0 }} />
          <span style={{ fontSize: 11, color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {result.riskLevel} risk
          </span>
        </div>

        {/* Tier name — the identity anchor */}
        <p style={{ fontSize: 28, fontWeight: 800, color, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 6 }}>
          {tier.name}
        </p>

        {/* Tier description */}
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.65, marginBottom: 14, maxWidth: 420, margin: "0 auto 14px" }}>
          {tier.description}
        </p>

        {/* Divider */}
        <div style={{ height: 1, background: color + "20", margin: "14px 0" }} />

        {/* Headline from AI */}
        <p style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a", lineHeight: 1.55, marginBottom: 8, letterSpacing: "-0.01em" }}>
          {result.headline}
        </p>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.75, margin: 0 }}>
          {result.summary}
        </p>
      </div>

      {/* GAUGE */}
      <div className={r("reveal-d2")} style={{ background: "#fafaf8", borderRadius: 16, padding: "1.25rem 1.5rem", border: "1px solid #efefed" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 4 }}>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: 56, fontWeight: 800, color, lineHeight: 1, letterSpacing: "-0.03em" }}>{pct}%</span>
            <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>estimated risk</div>
          </div>
          <div style={{ width: 1, height: 48, background: "#e8e8e5" }} />
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 16, fontWeight: 800, color, letterSpacing: "-0.02em", lineHeight: 1.2 }}>{tier.name}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: vsAvg > 0 ? "#d85a30" : "#1d9e75", marginTop: 4 }}>
              {vsAvg > 0 ? `+${vsAvg}%` : `${vsAvg}%`} vs national avg ({avg}%)
            </div>
          </div>
        </div>
        <div style={{ position: "relative", margin: "1.25rem 0 0.5rem" }}>
          <div style={{ height: 8, borderRadius: 4, background: "linear-gradient(to right, #9fe1cb, #fac775, #f09595, #e24b4a)" }} />
          <div ref={avgMarkerRef} style={{ position: "absolute", top: -3, left: `${avg}%`, width: 14, height: 14, borderRadius: "50%", background: "#888", border: "2px solid #fff", transform: "translateX(-50%)", transition: "left 1.2s ease" }} />
          <div ref={markerRef}    style={{ position: "absolute", top: -5, left: "0%",  width: 18, height: 18, borderRadius: "50%", background: color, border: "2.5px solid #fff", transform: "translateX(-50%)", transition: "left 1.2s ease", boxShadow: "0 1px 6px rgba(0,0,0,0.15)" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#ccc" }}>
          <span>Low risk</span><span>High risk</span>
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 12, fontSize: 12, color: "#888", justifyContent: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: color, display: "inline-block" }} /> Your score
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#888", display: "inline-block" }} /> National average
          </span>
        </div>
      </div>

      {/* PATTERN */}
      <div className={r("reveal-d3")} style={{ border: "1px solid #efefed", borderRadius: 16, padding: "1.25rem 1.5rem", background: "#fff" }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Your relationship pattern</p>
        <p style={{ fontSize: 16, fontWeight: 700, color: "#534ab7", marginBottom: 8, letterSpacing: "-0.01em" }}>{result.dynamicPattern}</p>
        <p style={{ fontSize: 14, color: "#555", lineHeight: 1.75 }}>{result.dynamicPatternDetail}</p>
      </div>

      {/* STRENGTH + RISK CARDS — Point 5: responsive grid */}
      <div className={r("reveal-d4")} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div style={{ background: "#e1f5ee", border: "1px solid #b5ddd0", borderRadius: 14, padding: "1rem" }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: "#0f6e56", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Biggest strength</p>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#085041", marginBottom: 6, letterSpacing: "-0.01em" }}>{result.biggestStrength}</p>
          <p style={{ fontSize: 12, color: "#0f6e56", lineHeight: 1.65 }}>{result.biggestStrengthDetail}</p>
        </div>
        <div style={{ background: "#fcebeb", border: "1px solid #f0c0c0", borderRadius: 14, padding: "1rem" }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: "#a32d2d", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Biggest risk</p>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#501313", marginBottom: 6, letterSpacing: "-0.01em" }}>{result.biggestRisk}</p>
          <p style={{ fontSize: 12, color: "#a32d2d", lineHeight: 1.65 }}>{result.biggestRiskDetail}</p>
        </div>
      </div>

      {/* PAYWALL GATE */}
      <div className={r("reveal-d5")}>
        {!isPaid ? (
          <PaywallGate onUnlock={onUnlock} riskLevel={result.riskLevel} color={color} />
        ) : (
          <>
            {/* FACTOR BREAKDOWN */}
            <div style={{ marginBottom: "1.25rem" }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Full breakdown</p>
              {negativeFactors.length > 0 && (
                <div style={{ marginBottom: 10 }}>
                  <p style={{ fontSize: 12, color: "#bbb", marginBottom: 6, fontWeight: 500 }}>Risk factors</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {negativeFactors.map((f, i) => <FactorRow key={i} factor={f} />)}
                  </div>
                </div>
              )}
              {positiveFactors.length > 0 && (
                <div>
                  <p style={{ fontSize: 12, color: "#bbb", marginBottom: 6, fontWeight: 500, marginTop: negativeFactors.length > 0 ? 14 : 0 }}>Protective factors</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {positiveFactors.map((f, i) => <FactorRow key={i} factor={f} />)}
                  </div>
                </div>
              )}
            </div>

            {/* RECOMMENDATIONS */}
            <div style={{ marginBottom: "1.25rem" }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>What to do next</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {result.recommendations.map((rec, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, padding: "13px 16px", background: "#fafaf8", borderRadius: 14, border: "1px solid #efefed", alignItems: "flex-start" }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#534ab7", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      {i + 1}
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", marginBottom: 4, letterSpacing: "-0.01em" }}>{rec.title}</p>
                      <p style={{ fontSize: 13, color: "#666", lineHeight: 1.65 }}>{rec.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* URGENCY */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: urgency.bg, borderRadius: 12, border: `1px solid ${urgency.color}30` }}>
              <span style={{ width: 30, height: 30, borderRadius: "50%", background: urgency.color, color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {urgency.icon}
              </span>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: urgency.color, textTransform: "capitalize", letterSpacing: "0.01em" }}>Overall: {result.urgency}</p>
                <p style={{ fontSize: 12, color: "#666", marginTop: 3, lineHeight: 1.55 }}>
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
      </div>

      <p className={r("reveal-d6")} style={{ fontSize: 12, color: "#ccc", textAlign: "center", lineHeight: 1.6 }}>{result.disclaimer}</p>

      <div className={r("reveal-d7")}>
        {isPaid
          ? <ShareButton result={result} pct={pct} color={color} bg={bg} full={true} />
          : <ShareButton result={result} pct={pct} color={color} bg={bg} full={false} />
        }
      </div>

      <button
        className={r("reveal-d8")}
        onClick={onRestart}
        style={{ background: "transparent", border: "1px solid #eee", borderRadius: 12, padding: "12px 20px", fontSize: 14, color: "#bbb", width: "100%", cursor: "pointer", fontWeight: 500, transition: "border-color 0.15s, color 0.15s" }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor="#ccc"; e.currentTarget.style.color="#888"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor="#eee"; e.currentTarget.style.color="#bbb"; }}
      >
        Start over
      </button>
    </div>
  );
}

/* ─── Paywall Gate ─────────────────────────────────────────────────── */

function PaywallGate({ onUnlock, riskLevel, color }: { onUnlock: () => void; riskLevel: string; color: string }) {
  const [loading, setLoading] = useState(false);
  const lockedItems = [
    "Full risk & protective factor breakdown",
    "3 personalised, named action steps",
    "Overall urgency verdict",
    "Shareable result card",
  ];
  return (
    <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid #efefed" }}>
      <div style={{ position: "relative" }}>
        <div style={{ filter: "blur(4px)", pointerEvents: "none", padding: "1.25rem 1.5rem", background: "#fafaf8", userSelect: "none" }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Full breakdown</p>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "11px 14px", background: "#fff", borderRadius: 12, border: "1px solid #efefed", marginBottom: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: i % 2 === 0 ? "#1d9e75" : "#e24b4a", marginTop: 5, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ height: 11, background: "#e8e8e5", borderRadius: 4, marginBottom: 7, width: "40%" }} />
                <div style={{ height: 9,  background: "#f0efed", borderRadius: 4, width: "80%" }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.88) 45%, rgba(255,255,255,0.99) 100%)" }} />
      </div>
      <div style={{ background: "#fff", padding: "1.5rem", borderTop: "1px solid #f5f5f3" }}>
        <p style={{ fontSize: 17, fontWeight: 700, color: "#1a1a1a", textAlign: "center", marginBottom: 6, letterSpacing: "-0.01em" }}>
          Unlock your full report
        </p>
        <p style={{ fontSize: 13, color: "#888", textAlign: "center", marginBottom: "1.25rem", lineHeight: 1.65 }}>
          Your {riskLevel.toLowerCase()} risk result comes with a detailed breakdown of every factor and a personalised action plan.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: "1.25rem" }}>
          {lockedItems.map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#444" }}>
              <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#e1f5ee", color: "#1d9e75", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>✓</span>
              {item}
            </div>
          ))}
        </div>
        <button
          onClick={() => { setLoading(true); onUnlock(); }}
          disabled={loading}
          style={{ width: "100%", background: loading ? "#afa9ec" : "#534ab7", color: "#fff", border: "none", borderRadius: 14, padding: "15px 20px", fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", transition: "background 0.15s, transform 0.1s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, letterSpacing: "0.01em" }}
          onMouseDown={(e) => { if (!loading) e.currentTarget.style.transform = "scale(0.98)"; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
        >
          {loading
            ? <><span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />Opening checkout…</>
            : "Unlock full report — $4.99"
          }
        </button>
        <p style={{ fontSize: 11, color: "#ccc", textAlign: "center", marginTop: 10 }}>One-time payment · Secure checkout via Stripe</p>
      </div>
    </div>
  );
}

/* ─── Factor Row ────────────────────────────────────────────────────── */

function FactorRow({ factor }: { factor: AnalysisResult["factors"][0] }) {
  const isPos = factor.positive;
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 14px", background: "#fff", borderRadius: 12, border: `1px solid ${isPos ? "#b5ddd0" : "#f0b8b8"}` }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: isPos ? "#1d9e75" : "#e24b4a", marginTop: 5, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a", letterSpacing: "-0.01em" }}>{factor.label}</span>
          {!isPos && factor.weight !== "moderate" && (
            <span style={{ fontSize: 10, fontWeight: 600, color: weightColor[factor.weight], background: `${weightColor[factor.weight]}18`, padding: "2px 8px", borderRadius: 20 }}>
              {weightLabel[factor.weight]}
            </span>
          )}
        </div>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.55 }}>{factor.detail}</p>
      </div>
    </div>
  );
}

/* ─── Share Button ──────────────────────────────────────────────────── */

function ShareButton({ result, pct, color, bg, full }: { result: AnalysisResult; pct: number; color: string; bg: string; full: boolean }) {
  const [status, setStatus] = useState<"idle"|"generating"|"copied"|"shared">("idle");

  function drawCard(): HTMLCanvasElement {
    const W = 1080, H = 1080;
    const canvas = document.createElement("canvas");
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#f0efed"; ctx.fillRect(0,0,W,H);
    const pad=72, cardX=pad, cardY=pad, cardW=W-pad*2, cardH=H-pad*2;
    roundRect(ctx,cardX,cardY,cardW,cardH,40); ctx.fillStyle="#fff"; ctx.fill();
    roundRect(ctx,cardX,cardY,cardW,220,40); ctx.fillStyle=bg; ctx.fill();
    ctx.fillRect(cardX,cardY+180,cardW,40);
    const pillW=220,pillY=cardY+36; roundRect(ctx,W/2-pillW/2,pillY,pillW,44,22); ctx.fillStyle=color+"22"; ctx.fill();
    ctx.fillStyle=color; ctx.font="600 22px -apple-system,sans-serif"; ctx.textAlign="center";
    ctx.fillText(`${result.riskLevel.toUpperCase()} RISK`,W/2,pillY+30);
    ctx.fillStyle=color; ctx.font="700 180px -apple-system,sans-serif"; ctx.fillText(`${pct}%`,W/2,cardY+360);
    ctx.fillStyle="#888"; ctx.font="400 36px -apple-system,sans-serif"; ctx.fillText("estimated divorce risk",W/2,cardY+420);
    ctx.strokeStyle="#e8e8e5"; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(cardX+60,cardY+460); ctx.lineTo(cardX+cardW-60,cardY+460); ctx.stroke();
    if (full) {
      ctx.fillStyle="#1a1a1a"; ctx.font="500 44px -apple-system,sans-serif"; wrapText(ctx,result.headline,W/2,cardY+540,cardW-160,58);
      ctx.fillStyle="#534ab7"; ctx.font="500 34px -apple-system,sans-serif"; ctx.fillText(result.dynamicPattern,W/2,cardY+700);
      const rowY=cardY+760, halfW=cardW/2-20;
      roundRect(ctx,cardX+20,rowY,halfW,140,16); ctx.fillStyle="#e1f5ee"; ctx.fill();
      ctx.fillStyle="#0f6e56"; ctx.font="600 22px -apple-system,sans-serif"; ctx.textAlign="left"; ctx.fillText("STRENGTH",cardX+44,rowY+38);
      ctx.fillStyle="#085041"; ctx.font="500 28px -apple-system,sans-serif"; wrapText(ctx,result.biggestStrength,cardX+44,rowY+76,halfW-48,36,2);
      const rBoxX=cardX+halfW+40; roundRect(ctx,rBoxX,rowY,halfW,140,16); ctx.fillStyle="#fcebeb"; ctx.fill();
      ctx.fillStyle="#a32d2d"; ctx.font="600 22px -apple-system,sans-serif"; ctx.fillText("RISK",rBoxX+24,rowY+38);
      ctx.fillStyle="#501313"; ctx.font="500 28px -apple-system,sans-serif"; wrapText(ctx,result.biggestRisk,rBoxX+24,rowY+76,halfW-48,36,2);
    } else {
      ctx.fillStyle="#1a1a1a"; ctx.font="500 40px -apple-system,sans-serif"; ctx.textAlign="center"; ctx.fillText("See the full breakdown at",W/2,cardY+560);
      ctx.fillStyle="#534ab7"; ctx.font="600 44px -apple-system,sans-serif"; ctx.fillText("splitornot.com",W/2,cardY+620);
      [700,760,820].forEach(y=>{ roundRect(ctx,cardX+60,cardY+y,cardW-120,44,10); ctx.fillStyle="#f0efed"; ctx.fill(); ctx.fillStyle="#ccc"; ctx.font="400 24px -apple-system,sans-serif"; ctx.fillText("🔒 unlock for full analysis",W/2,cardY+y+30); });
    }
    ctx.fillStyle="#bbb"; ctx.font="400 28px -apple-system,sans-serif"; ctx.textAlign="center";
    ctx.fillText("splitornot.com · relationship health analyzer",W/2,cardY+cardH-40);
    return canvas;
  }

  async function handleShare() {
    setStatus("generating");
    await new Promise(r=>setTimeout(r,50));
    const canvas = drawCard();
    const blob = await new Promise<Blob>(resolve=>canvas.toBlob(b=>resolve(b!),"image/png"));
    const file = new File([blob],"my-relationship-result.png",{type:"image/png"});
    if (navigator.canShare?.({files:[file]})) {
      try {
        await navigator.share({ files:[file], title:"My relationship health result", text: full ? `I got ${pct}% divorce risk on splitornot.com. ${result.headline}` : `I got ${pct}% divorce risk on splitornot.com — see if your relationship is at risk.` });
        setStatus("shared"); setTimeout(()=>setStatus("idle"),2500); return;
      } catch {}
    }
    const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download="my-relationship-result.png"; a.click(); URL.revokeObjectURL(url);
    try { await navigator.clipboard.writeText(window.location.href); setStatus("copied"); } catch { setStatus("idle"); }
    setTimeout(()=>setStatus("idle"),2500);
  }

  const label = status==="generating"?"Generating card…":status==="copied"?"Image saved · Link copied!":status==="shared"?"Shared!":full?"Share my result":"Share my score";
  const btnBg = status==="idle"?"#534ab7":status==="generating"?"#afa9ec":"#1d9e75";

  return (
    <button onClick={handleShare} disabled={status==="generating"}
      style={{ width:"100%", background:btnBg, color:"#fff", border:"none", borderRadius:14, padding:"14px 20px", fontSize:15, fontWeight:700, cursor:status==="generating"?"not-allowed":"pointer", transition:"background 0.2s, transform 0.1s", display:"flex", alignItems:"center", justifyContent:"center", gap:8, letterSpacing:"0.01em" }}
      onMouseDown={(e)=>{ if(status==="idle") e.currentTarget.style.transform="scale(0.98)"; }}
      onMouseUp={(e)=>{ e.currentTarget.style.transform="scale(1)"; }}
    >
      {status==="generating"
        ? <><span style={{width:16,height:16,border:"2px solid rgba(255,255,255,0.4)",borderTopColor:"#fff",borderRadius:"50%",display:"inline-block",animation:"spin 0.7s linear infinite"}}/>{label}</>
        : status==="idle"
        ? <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>{label}</>
        : label
      }
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </button>
  );
}

/* ─── Canvas helpers ────────────────────────────────────────────────── */

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath(); ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r);
  ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h); ctx.lineTo(x+r,y+h);
  ctx.quadraticCurveTo(x,y+h,x,y+h-r); ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y); ctx.closePath();
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number, maxLines=3) {
  const words=text.split(" "); let line="",lineCount=0;
  for (let i=0;i<words.length;i++) {
    const testLine=line+words[i]+" ";
    if (ctx.measureText(testLine).width>maxWidth&&i>0) { ctx.fillText(line.trim(),x,y+lineCount*lineHeight); line=words[i]+" "; lineCount++; if(lineCount>=maxLines){ctx.fillText(line.trim()+"…",x,y+lineCount*lineHeight);return;} }
    else { line=testLine; }
  }
  ctx.fillText(line.trim(),x,y+lineCount*lineHeight);
}
