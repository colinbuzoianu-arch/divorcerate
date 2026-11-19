"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

/**
 * Starts a couple comparison from a result (Phase 6.2). Creating it is this
 * partner's consent to share their dimension scores (never their answers).
 */
export default function CompareStart({ resultId }: { resultId?: string }) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

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
      if (res.ok && data.id) { window.location.href = `/compare/${data.id}`; return; }
      setMsg(data.error || "Could not start a comparison. Please try again.");
    } catch {
      setMsg("Could not start a comparison. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ border: "1px solid #efefed", borderRadius: 16, padding: "1.25rem 1.5rem", background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
      <div>
        <p style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a", marginBottom: 2 }}>Compare privately with your partner</p>
        <p style={{ fontSize: 13, color: "#777", lineHeight: 1.5, margin: 0 }}>They take the test too; you see where you align and differ. Only scores are shared, never answers.</p>
      </div>
      <button onClick={start} disabled={loading} style={{ background: "var(--violet-deep)", color: "#fff", border: "none", borderRadius: 999, padding: "11px 20px", fontSize: 14, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", whiteSpace: "nowrap" }}>
        {loading ? "Starting…" : "Start a comparison"}
      </button>
      {msg && <p style={{ flex: "1 1 100%", fontSize: 13, color: "#a32d2d", margin: 0 }}>{msg}</p>}
    </div>
  );
}
