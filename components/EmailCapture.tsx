"use client";

import { useState } from "react";
import type { StoredResult, FreeResult } from "@/lib/types";
import { track } from "@/lib/analytics";

/**
 * "Email me my results" (Phase 5.1). Sends the result by email, and — only with
 * an explicit, unchecked-by-default opt-in — adds the address to the Resend
 * audience for an optional 4-week re-check reminder. Unsubscribe is handled by
 * Resend.
 */
export default function EmailCapture({ result }: { result: StoredResult | FreeResult }) {
  const [email, setEmail] = useState("");
  const [reminder, setReminder] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) { setErrorMsg("Please enter a valid email."); return; }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/email-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, result, reminderConsent: reminder }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error ?? "Failed to send.");
      track("email_submit", { source: "result_email" });
      setStatus("success");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div style={{ background: "#e8f3ee", border: "1px solid #c3e0d3", borderRadius: 16, padding: "1.5rem", textAlign: "center" }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: "#085041", marginBottom: 6 }}>Sent — check your inbox</p>
        <p style={{ fontSize: 13, color: "#0f6e56", lineHeight: 1.6, margin: 0 }}>
          Your result is on its way.{reminder ? " We'll also nudge you to re-check in about four weeks — unsubscribe anytime." : ""}
        </p>
      </div>
    );
  }

  return (
    <div style={{ border: "1px solid #efefed", borderRadius: 16, padding: "1.5rem", background: "#fafaf8" }}>
      <p style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Keep your result</p>
      <p style={{ fontSize: 16, fontWeight: 600, color: "#1a1a1a", marginBottom: 4 }}>Email me my results</p>
      <p style={{ fontSize: 13, color: "#777", lineHeight: 1.6, marginBottom: 14 }}>
        Get a copy of your result in your inbox so you can come back to it.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", border: "1px solid #e8e8e5", borderRadius: 12, padding: "13px 16px", fontSize: 15, color: "#1a1a1a", background: "#fff", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
        />

        <label style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 13, color: "#555", lineHeight: 1.5, cursor: "pointer" }}>
          <input type="checkbox" checked={reminder} onChange={(e) => setReminder(e.target.checked)} style={{ marginTop: 2 }} />
          <span>Also remind me to re-check my relationship in 4 weeks (optional — unsubscribe anytime).</span>
        </label>

        {errorMsg && <p style={{ fontSize: 13, color: "#a32d2d", margin: 0 }}>{errorMsg}</p>}

        <button
          type="submit"
          disabled={status === "loading"}
          style={{ width: "100%", background: status === "loading" ? "#afa9ec" : "var(--violet-deep)", color: "#fff", border: "none", borderRadius: 999, padding: "13px 20px", fontSize: 15, fontWeight: 600, cursor: status === "loading" ? "not-allowed" : "pointer" }}
        >
          {status === "loading" ? "Sending…" : "Email me my results"}
        </button>

        <p style={{ fontSize: 11, color: "#bbb", textAlign: "center", margin: 0 }}>
          We store only your email and your choice. No spam.
        </p>
      </form>
    </div>
  );
}
