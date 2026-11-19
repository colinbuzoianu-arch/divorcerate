"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import { localizeHref, type Locale } from "@/lib/i18n/config";

const COPY = {
  en: { title: "Compare privately with your partner", desc: "They take the test too; you see where you align and differ. Only scores are shared, never answers.", start: "Start a comparison", starting: "Starting…", error: "Could not start a comparison. Please try again." },
  de: { title: "Vergleicht euch privat mit deinem:r Partner:in", desc: "Sie machen den Test auch; du siehst, wo ihr übereinstimmt und wo nicht. Nur Scores werden geteilt, nie Antworten.", start: "Vergleich starten", starting: "Wird gestartet…", error: "Vergleich konnte nicht gestartet werden. Bitte versuch es erneut." },
};

/**
 * Starts a couple comparison from a result (Phase 6.2). Creating it is this
 * partner's consent to share their dimension scores (never their answers).
 */
export default function CompareStart({ resultId, locale = "en" }: { resultId?: string; locale?: Locale }) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const t = COPY[locale];

  if (!resultId) return null;

  async function start() {
    setLoading(true); setMsg("");
    track("share_click", { surface: "comparison_start" });
    try {
      const res = await fetch("/api/compare/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resultId }),
      });
      const data = await res.json();
      if (res.ok && data.id) {
        // Remember, in this browser, that WE started this comparison — so the
        // waiting screen shows us "share the link", not "you were invited".
        try { localStorage.setItem(`cq_compare_creator_${data.id}`, "1"); } catch { /* no-op */ }
        window.location.href = localizeHref(`/compare/${data.id}`, locale);
        return;
      }
      setMsg(data.error || t.error);
    } catch {
      setMsg(t.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ border: "1px solid #efefed", borderRadius: 16, padding: "1.25rem 1.5rem", background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
      <div>
        <p style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a", marginBottom: 2 }}>{t.title}</p>
        <p style={{ fontSize: 13, color: "#777", lineHeight: 1.5, margin: 0 }}>{t.desc}</p>
      </div>
      <button onClick={start} disabled={loading} style={{ background: "var(--violet-deep)", color: "#fff", border: "none", borderRadius: 999, padding: "11px 20px", fontSize: 14, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", whiteSpace: "nowrap" }}>
        {loading ? t.starting : t.start}
      </button>
      {msg && <p style={{ flex: "1 1 100%", fontSize: 13, color: "#a32d2d", margin: 0 }}>{msg}</p>}
    </div>
  );
}
