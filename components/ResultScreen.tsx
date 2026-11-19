"use client";

import { useEffect, useRef, useState } from "react";
import type { StoredResult, FreeResult } from "@/lib/types";
import { track } from "@/lib/analytics";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import { getApp, type AppDict } from "@/lib/i18n/app";
import { bandLabel, bandBlurb, patternLabel, dimensionLabel } from "@/lib/i18n/scoring";
import type { Band, Pattern, DimensionKey } from "@/lib/scoring";
import SafetyBlock from "@/components/SafetyBlock";
import RadarChart from "@/components/RadarChart";
import EmailCapture from "@/components/EmailCapture";
import FeedbackPrompt from "@/components/FeedbackPrompt";
import CompareStart from "@/components/compare/CompareStart";

const BAND_COLORS: Record<string, string> = {
  "Critical Point": "#C23A54",
  "Fault Line": "#C85A2A",
  "Amber Zone": "#B98900",
  "Stable Foundation": "#2E8B63",
  "Solid Ground": "#1E7A58",
};

interface Props {
  result: StoredResult | FreeResult;
  isPaid: boolean;
  generating?: boolean;
  resultId?: string;
  locale?: Locale;
  onUnlock: () => void;
  onRestart: () => void;
}

export default function ResultScreen({ result, isPaid, generating = false, resultId, locale = "en", onUnlock, onRestart }: Props) {
  const full = result as StoredResult;
  const color = BAND_COLORS[result.band] ?? "#4B3FB0";
  const narrative = isPaid ? full.narrative : undefined;
  const t = getApp(locale).result;
  const dl = dimensionLabel[locale];
  const bandText = bandLabel[locale][result.band as Band] ?? result.band;
  const patternText = patternLabel[locale][result.pattern as Pattern] ?? result.pattern;
  const riskText = dl[result.risk.key as DimensionKey] ?? result.risk.label;
  const strengthText = dl[result.strength.key as DimensionKey] ?? result.strength.label;
  const dimLabel = (key: string, fallback: string) => dl[key as DimensionKey] ?? fallback;
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 120);
    return () => clearTimeout(t);
  }, []);

  const noteFor = (key: string) => narrative?.dimensionNotes?.find((d) => d.key === key)?.note;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

      {/* SAFETY — free, never blurred, always first */}
      {result.safetyFlag && <SafetyBlock locale={locale} />}

      {/* HEADLINE CARD — band leads, score supports */}
      <div className="reveal reveal-d1" style={{ background: "#fafaf8", border: `1px solid ${color}33`, borderRadius: 20, padding: "1.75rem 1.5rem", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: color + "18", border: `1px solid ${color}33`, borderRadius: 999, padding: "5px 14px", marginBottom: 14 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
          <span style={{ fontFamily: "var(--mono)", fontSize: 11, color, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em" }}>{t.healthEyebrow}</span>
        </div>
        <p style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 44, color, lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 6 }}>
          {bandText}
        </p>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, maxWidth: 420, margin: "0 auto 16px" }}>
          {bandBlurb[locale][result.band as Band]}
        </p>
        <div style={{ display: "inline-flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontFamily: "var(--serif)", fontSize: 64, lineHeight: 0.9, color: "#1a1a1a", letterSpacing: "-0.03em" }}>{result.healthScore}</span>
          <span style={{ fontSize: 13, color: "#999" }}>{t.outOf}</span>
        </div>
        <div style={{ height: 1, background: color + "20", margin: "16px 0" }} />
        <p style={{ fontSize: 15, fontWeight: 500, color: "#1a1a1a", lineHeight: 1.55 }}>{result.headline}</p>
      </div>

      {/* DIMENSION RADAR + BARS */}
      <div className="reveal reveal-d2" style={{ background: "#fff", border: "1px solid #efefed", borderRadius: 20, padding: "1.5rem" }}>
        <p style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>{t.eightDimensions}</p>
        {isPaid && (
          <div style={{ margin: "0 0 20px" }}>
            <RadarChart dimensions={result.dimensions.map((d) => ({ ...d, label: dimLabel(d.key, d.label) }))} />
          </div>
        )}
        <div style={{ display: "grid", gap: 12 }}>
          {result.dimensions.map((d) => (
            <div key={d.key} style={{ display: "grid", gridTemplateColumns: "130px 1fr 32px", gap: 12, alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "#555" }}>{dimLabel(d.key, d.label)}</span>
              <span style={{ height: 6, borderRadius: 6, background: "#f0eff3", overflow: "hidden" }}>
                <span style={{ display: "block", height: "100%", borderRadius: 6, width: animated ? `${d.score}%` : "0%", background: "linear-gradient(90deg, var(--violet), var(--ember))", transition: "width 1s ease" }} />
              </span>
              <b style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#1a1a1a", textAlign: "right", fontWeight: 500 }}>{d.score}</b>
            </div>
          ))}
        </div>
      </div>

      {/* PATTERN */}
      <div className="reveal reveal-d3" style={{ border: "1px solid #efefed", borderRadius: 20, padding: "1.5rem", background: "#fff" }}>
        <p style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>{t.yourPattern}</p>
        <p style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 30, color: "var(--violet-deep)", lineHeight: 1.05, marginBottom: 10 }}>{patternText}</p>
        <a href={`${localizeHref(`/patterns/${result.patternSlug}`, locale)}${resultId ? `?from=${resultId}` : ""}`} style={{ fontSize: 14, fontWeight: 600, color: "var(--violet-deep)", textDecoration: "none" }}>{t.readMore}</a>
      </div>

      {/* STRENGTH + RISK */}
      <div className="reveal reveal-d4" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div style={{ background: "#e8f3ee", border: "1px solid #c3e0d3", borderRadius: 16, padding: "1rem" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: 10, fontWeight: 500, color: "#0f6e56", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{t.biggestStrength}</p>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#085041" }}>{strengthText}</p>
        </div>
        <div style={{ background: "#fcecec", border: "1px solid #f0c9c9", borderRadius: 16, padding: "1rem" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: 10, fontWeight: 500, color: "#a32d2d", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{t.focusArea}</p>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#501313" }}>{riskText}</p>
        </div>
      </div>

      {/* PAID NARRATIVE or PAYWALL */}
      <div className="reveal reveal-d5">
        {isPaid && narrative ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {narrative.summary && (
              <div style={{ background: "#fff", border: "1px solid #efefed", borderRadius: 20, padding: "1.5rem" }}>
                <p style={{ fontSize: 15, color: "#333", lineHeight: 1.7 }}>{narrative.summary}</p>
              </div>
            )}
            <div style={{ background: "#fff", border: "1px solid #efefed", borderRadius: 20, padding: "1.5rem" }}>
              <p style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>{t.dimensionsExplained}</p>
              <div style={{ display: "grid", gap: 14 }}>
                {result.dimensions.map((d) => {
                  const note = noteFor(d.key);
                  if (!note) return null;
                  return (
                    <div key={d.key}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", marginBottom: 3 }}>{dimLabel(d.key, d.label)} · {d.score}</p>
                      <p style={{ fontSize: 13, color: "#666", lineHeight: 1.65 }}>{note}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            {narrative.riskDetail && (
              <div style={{ background: "#fcecec", border: "1px solid #f0c9c9", borderRadius: 20, padding: "1.5rem" }}>
                <p style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#a32d2d", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>{t.whyFocus.replace("{risk}", riskText)}</p>
                <p style={{ fontSize: 14, color: "#501313", lineHeight: 1.7 }}>{narrative.riskDetail}</p>
              </div>
            )}
            {narrative.recommendations.length > 0 && (
              <div style={{ background: "#fff", border: "1px solid #efefed", borderRadius: 20, padding: "1.5rem" }}>
                <p style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>{t.whatToDoNext}</p>
                <div style={{ display: "grid", gap: 12 }}>
                  {narrative.recommendations.map((rec, i) => (
                    <div key={i} style={{ display: "flex", gap: 14, padding: "13px 16px", background: "#fafaf8", borderRadius: 14, border: "1px solid #efefed", alignItems: "flex-start" }}>
                      <span style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--violet-deep)", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", marginBottom: 4 }}>{rec.title}</p>
                        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.65 }}>{rec.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : isPaid ? (
          <div style={{ background: "#fff", border: "1px solid #efefed", borderRadius: 20, padding: "2rem 1.5rem", textAlign: "center" }}>
            {generating ? (
              <>
                <div style={{ width: 36, height: 36, border: "3px solid #ece9fb", borderTopColor: "var(--violet-deep)", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 14px" }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a", marginBottom: 4 }}>{t.preparingTitle}</p>
                <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>{t.preparingBody}</p>
              </>
            ) : (
              <>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a", marginBottom: 4 }}>{t.almostTitle}</p>
                <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6, marginBottom: 14 }}>{t.almostBody}</p>
                <button onClick={() => location.reload()} style={{ background: "var(--violet-deep)", color: "#fff", border: "none", borderRadius: 999, padding: "11px 22px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>{t.refresh}</button>
              </>
            )}
          </div>
        ) : (
          <PaywallGate onUnlock={onUnlock} color={color} riskLabel={riskText} t={t} />
        )}
      </div>

      {/* DOWNLOAD PDF (paid) — Phase 6.3 */}
      {isPaid && resultId && (
        <a
          href={`/api/result/${resultId}/pdf`}
          className="reveal reveal-d6"
          style={{ display: "block", textAlign: "center", background: "#fff", border: "1px solid #e5e5e5", borderRadius: 999, padding: "13px 20px", fontSize: 14, fontWeight: 600, color: "#1a1a1a", textDecoration: "none" }}
        >
          {t.pdf}
        </a>
      )}

      {/* BOOKMARK NOTICE */}
      <div className="reveal reveal-d6" style={{ display: "flex", alignItems: "flex-start", gap: 10, background: "#fafaf8", border: "1px solid #efefed", borderRadius: 12, padding: "12px 14px" }}>
        <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>🔖</span>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#444", marginBottom: 3 }}>{t.bookmarkTitle}</p>
          <p style={{ fontSize: 12, color: "#888", lineHeight: 1.6, margin: 0 }}>
            {t.bookmarkBody}
          </p>
        </div>
      </div>

      {/* RETENTION — email the result + invite your partner (Phase 5.1, 5.2) */}
      <div className="reveal reveal-d6">
        <EmailCapture result={result} locale={locale} />
      </div>
      <div className="reveal reveal-d7">
        <CompareStart resultId={resultId} locale={locale} />
      </div>

      <div className="reveal reveal-d7">
        <ShareButton band={bandText} score={result.healthScore} pattern={patternText} color={color} full={isPaid} t={t} locale={locale} />
      </div>

      {/* FEEDBACK (Phase 5.4) */}
      <div className="reveal reveal-d8">
        <FeedbackPrompt resultId={resultId} locale={locale} />
      </div>

      <button
        className="reveal reveal-d8"
        onClick={onRestart}
        style={{ background: "transparent", border: "1px solid #eee", borderRadius: 999, padding: "12px 20px", fontSize: 14, color: "#bbb", width: "100%", cursor: "pointer", fontWeight: 500 }}
      >
        {t.takeAgain}
      </button>
    </div>
  );
}

/* ─── Paywall ─────────────────────────────────────────────────────────── */

function PaywallGate({ onUnlock, color, riskLabel, t }: { onUnlock: () => void; color: string; riskLabel: string; t: AppDict["result"] }) {
  const [loading, setLoading] = useState(false);
  const locked = t.paywallItems.map((item) => item.replace("{risk}", riskLabel));
  return (
    <div style={{ border: `1px solid ${color}33`, borderRadius: 20, overflow: "hidden" }}>
      <div style={{ position: "relative", padding: "1.5rem", background: "#fafaf8" }}>
        <div style={{ filter: "blur(5px)", userSelect: "none", pointerEvents: "none" }}>
          <p style={{ fontSize: 13, color: "#777", lineHeight: 1.7 }}>
            {t.paywallBlurb.replace("{risk}", riskLabel)}
          </p>
        </div>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 500, color, background: "#fff", padding: "5px 14px", borderRadius: 999, border: `1px solid ${color}33`, textTransform: "uppercase", letterSpacing: "0.08em" }}>{t.paywallBadge}</span>
        </div>
      </div>
      <div style={{ padding: "1.5rem", borderTop: "1px solid #efefed" }}>
        <div style={{ display: "grid", gap: 10, marginBottom: 18 }}>
          {locked.map((item) => (
            <div key={item} style={{ display: "flex", gap: 10, fontSize: 13, color: "#444", alignItems: "flex-start" }}>
              <span style={{ color: "var(--violet-deep)", fontWeight: 700 }}>✓</span> {item}
            </div>
          ))}
        </div>
        <button
          onClick={() => { setLoading(true); onUnlock(); }}
          disabled={loading}
          style={{ width: "100%", background: "var(--violet-deep)", color: "#fff", border: "none", borderRadius: 999, padding: "15px 20px", fontSize: 15, fontWeight: 600, cursor: "pointer" }}
        >
          {loading ? t.checkoutOpening : t.paywallButton}
        </button>
      </div>
    </div>
  );
}

/* ─── Share ───────────────────────────────────────────────────────────── */

function ShareButton({ band, score, pattern, color, full, t, locale }: { band: string; score: number; pattern: string; color: string; full: boolean; t: AppDict["result"]; locale: Locale }) {
  const [status, setStatus] = useState<"idle" | "generating" | "copied" | "shared">("idle");

  function drawCard(): HTMLCanvasElement {
    const W = 1080, H = 1080;
    const canvas = document.createElement("canvas");
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#0C0A14"; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.arc(W - 220, 200, 240, 0, Math.PI * 2); ctx.globalAlpha = 0.25; ctx.fill(); ctx.globalAlpha = 1;
    ctx.textAlign = "center";
    ctx.fillStyle = "#A8A2B3"; ctx.font = "500 30px sans-serif"; ctx.fillText(t.shareCardLabel, W / 2, 300);
    ctx.fillStyle = "#F3EEE6"; ctx.font = "400 120px Georgia, serif"; ctx.fillText(band, W / 2, 440);
    ctx.fillStyle = color; ctx.font = "700 180px Georgia, serif"; ctx.fillText(String(score), W / 2, 640);
    ctx.fillStyle = "#A8A2B3"; ctx.font = "400 34px sans-serif"; ctx.fillText(t.shareCardScore, W / 2, 700);
    ctx.fillStyle = "#F3EEE6"; ctx.font = "italic 400 44px Georgia, serif"; ctx.fillText(pattern, W / 2, 800);
    ctx.fillStyle = "#8B7CFF"; ctx.font = "500 32px sans-serif"; ctx.fillText("CoupleIQ · splitornot.com", W / 2, H - 80);
    return canvas;
  }

  async function handleShare() {
    track("share_click", { surface: full ? "full_report" : "free_result" });
    setStatus("generating");
    await new Promise((r) => setTimeout(r, 50));
    const canvas = drawCard();
    const blob = await new Promise<Blob>((resolve) => canvas.toBlob((b) => resolve(b!), "image/png"));
    const file = new File([blob], "my-coupleiq-result.png", { type: "image/png" });
    // Share a link to the quiz (with UTM), not the private result page — the
    // point is to get other people to take it (Phase 5.3).
    const origin = typeof window !== "undefined" ? window.location.origin : "https://splitornot.com";
    const shareUrl = `${origin}${localizeHref("/relationship-test", locale)}?utm_source=share&utm_medium=result_card&utm_campaign=coupleiq`;
    const text = t.shareText.replace("{band}", band);
    if (navigator.canShare?.({ files: [file] })) {
      try { await navigator.share({ files: [file], title: "CoupleIQ", text, url: shareUrl }); setStatus("shared"); setTimeout(() => setStatus("idle"), 2500); return; } catch { /* fall through */ }
    }
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "my-coupleiq-result.png"; a.click(); URL.revokeObjectURL(url);
    try { await navigator.clipboard.writeText(shareUrl); setStatus("copied"); } catch { setStatus("idle"); }
    setTimeout(() => setStatus("idle"), 2500);
  }

  const label = status === "generating" ? t.shareGenerating : status === "copied" ? t.shareCopied : status === "shared" ? t.shareShared : t.shareIdle;
  return (
    <button onClick={handleShare} disabled={status === "generating"} style={{ width: "100%", background: "#fff", border: "1px solid #e5e5e5", borderRadius: 999, padding: "14px 20px", fontSize: 14, fontWeight: 600, color: "#1a1a1a", cursor: "pointer" }}>
      {label}
    </button>
  );
}
