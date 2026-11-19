"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import { localizeHref, type Locale } from "@/lib/i18n/config";

const UI = {
  en: { shareHeading: "Share this link with your partner", copy: "Copy link", copied: "Copied!", note: "When they open it, they'll take the test too. Only your eight dimension scores are shared, never your answers — and nothing is shown unless you both take part.", unlock: "Unlock your comparison", opening: "Opening checkout…", soon: "Couple comparison is launching soon — check back shortly.", error: "Could not start checkout. Please try again." },
  de: { shareHeading: "Teile diesen Link mit deinem:r Partner:in", copy: "Link kopieren", copied: "Kopiert!", note: "Wenn sie:er ihn öffnet, macht sie:er den Test ebenfalls. Nur deine acht Dimensions-Scores werden geteilt, nie deine Antworten – und es wird nichts gezeigt, solange ihr nicht beide teilnehmt.", unlock: "Vergleich freischalten", opening: "Kasse wird geöffnet…", soon: "Der Paar-Vergleich wird in Kürze verfügbar – schau bald wieder vorbei.", error: "Die Kasse konnte nicht gestartet werden. Bitte versuch es erneut." },
};

/** The creator's share-the-link block for the "waiting for partner" state. */
export function CompareInvite({ id, locale = "en" }: { id: string; locale?: Locale }) {
  const t = UI[locale];
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? `${window.location.origin}${localizeHref(`/compare/${id}`, locale)}` : "";

  async function copy() {
    track("share_click", { surface: "comparison_invite" });
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch { /* no-op */ }
  }

  return (
    <div>
      <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>{t.shareHeading}</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <input readOnly value={url} style={{ flex: "1 1 220px", border: "1px solid var(--line-light)", borderRadius: 999, padding: "11px 18px", fontSize: 13, color: "var(--text-2)", background: "#fff", minWidth: 0 }} />
        <button onClick={copy} style={{ background: "var(--violet-deep)", color: "#fff", border: "none", borderRadius: 999, padding: "11px 22px", fontSize: 14, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
          {copied ? t.copied : t.copy}
        </button>
      </div>
      <p style={{ fontSize: 12, color: "var(--text-2)", marginTop: 12, lineHeight: 1.6 }}>
        {t.note}
      </p>
    </div>
  );
}

/** Unlock (pay) action for a comparison where both partners have taken the test. */
export function CompareUnlock({ id, locale = "en" }: { id: string; locale?: Locale }) {
  const t = UI[locale];
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function unlock() {
    setLoading(true); setMsg("");
    track("checkout_start", {});
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "comparison", compId: id, locale }),
      });
      const data = await res.json();
      if (res.ok && data.url) { window.location.href = data.url; return; }
      if (data.comingSoon) setMsg(t.soon);
      else setMsg(data.error || t.error);
    } catch {
      setMsg(t.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button onClick={unlock} disabled={loading} style={{ background: "var(--violet-deep)", color: "#fff", border: "none", borderRadius: 999, padding: "14px 28px", fontSize: 15, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}>
        {loading ? t.opening : t.unlock}
      </button>
      {msg && <p style={{ fontSize: 13, color: "var(--text-2)", marginTop: 12 }}>{msg}</p>}
    </div>
  );
}
