"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import { getApp } from "@/lib/i18n/app";

/**
 * Post-result feedback (Phase 5.4): "Was this useful?" with an optional comment
 * and an explicit consent-to-quote checkbox. Stored via /api/feedback — the
 * source of future real testimonials.
 */
export default function FeedbackPrompt({ resultId, locale = "en" }: { resultId?: string; locale?: Locale }) {
  const t = getApp(locale).feedback;
  const [useful, setUseful] = useState<boolean | null>(null);
  const [comment, setComment] = useState("");
  const [consent, setConsent] = useState(false);
  const [done, setDone] = useState(false);

  async function send(u: boolean, withComment: boolean) {
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ useful: u, comment: withComment ? comment : "", consentToQuote: withComment ? consent : false, resultId }),
      });
    } catch {
      /* non-critical */
    }
  }

  if (done) {
    return (
      <div style={{ border: "1px solid #efefed", borderRadius: 16, padding: "1.25rem 1.5rem", textAlign: "center", background: "#fafaf8" }}>
        <p style={{ fontSize: 14, color: "#777", margin: 0 }}>{t.done}</p>
      </div>
    );
  }

  return (
    <div style={{ border: "1px solid #efefed", borderRadius: 16, padding: "1.25rem 1.5rem", background: "#fafaf8" }}>
      {useful === null ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#444", margin: 0 }}>{t.question}</p>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => { setUseful(true); send(true, false); }} style={btn}>{t.yes}</button>
            <button onClick={() => { setUseful(false); send(false, false); }} style={btn}>{t.no}</button>
          </div>
        </div>
      ) : (
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#444", marginBottom: 10 }}>
            {t.thanks} <span style={{ fontWeight: 400, color: "#999" }}>{t.optional}</span>
          </p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t.commentPlaceholder}
            rows={3}
            style={{ width: "100%", border: "1px solid #e8e8e5", borderRadius: 12, padding: "10px 12px", fontSize: 14, color: "#1a1a1a", background: "#fff", outline: "none", fontFamily: "inherit", boxSizing: "border-box", resize: "vertical" }}
          />
          <label style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 12.5, color: "#666", lineHeight: 1.5, cursor: "pointer", margin: "10px 0" }}>
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} style={{ marginTop: 2 }} />
            <span>{t.consent}</span>
          </label>
          <button
            onClick={() => { send(useful, true); setDone(true); }}
            style={{ background: "var(--violet-deep)", color: "#fff", border: "none", borderRadius: 999, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
          >
            {t.send}
          </button>
        </div>
      )}
    </div>
  );
}

const btn: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e5e5e5",
  borderRadius: 999,
  padding: "8px 16px",
  fontSize: 14,
  color: "#1a1a1a",
  cursor: "pointer",
};
