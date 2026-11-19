"use client";

import { useState } from "react";
import Link from "next/link";
import { track } from "@/lib/analytics";

/** Share-the-invite actions for the "waiting for partner" state (Phase 6.2). */
export function CompareInvite({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? `${window.location.origin}/compare/${id}` : "";

  async function copy() {
    track("share_click", { surface: "comparison_invite" });
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch { /* no-op */ }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>Share this link with your partner</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <input readOnly value={url} style={{ flex: "1 1 220px", border: "1px solid var(--line-light)", borderRadius: 999, padding: "11px 18px", fontSize: 13, color: "var(--text-2)", background: "#fff", minWidth: 0 }} />
          <button onClick={copy} style={{ background: "var(--violet-deep)", color: "#fff", border: "none", borderRadius: 999, padding: "11px 22px", fontSize: 14, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
            {copied ? "Copied!" : "Copy link"}
          </button>
        </div>
      </div>
      <div style={{ borderTop: "1px solid var(--line-light)", paddingTop: 14 }}>
        <p style={{ fontSize: 13, color: "var(--text-2)", marginBottom: 10, lineHeight: 1.6 }}>
          Here because your partner invited you? Take the test — only your eight dimension scores are shared, never your answers.
        </p>
        <Link href={`/relationship-test?compare=${id}`} style={{ background: "#fff", color: "var(--ink)", border: "1px solid var(--line-light)", borderRadius: 999, padding: "12px 24px", fontSize: 14, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
          Take the test →
        </Link>
      </div>
    </div>
  );
}

/** Unlock (pay) action for a comparison where both partners have taken the test. */
export function CompareUnlock({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function unlock() {
    setLoading(true); setMsg("");
    track("checkout_start", {});
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "comparison", compId: id }),
      });
      const data = await res.json();
      if (res.ok && data.url) { window.location.href = data.url; return; }
      if (data.comingSoon) setMsg("Couple comparison is launching soon — check back shortly.");
      else setMsg(data.error || "Could not start checkout. Please try again.");
    } catch {
      setMsg("Could not start checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button onClick={unlock} disabled={loading} style={{ background: "var(--violet-deep)", color: "#fff", border: "none", borderRadius: 999, padding: "14px 28px", fontSize: 15, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}>
        {loading ? "Opening checkout…" : "Unlock your comparison"}
      </button>
      {msg && <p style={{ fontSize: 13, color: "var(--text-2)", marginTop: 12 }}>{msg}</p>}
    </div>
  );
}
