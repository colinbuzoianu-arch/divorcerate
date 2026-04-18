"use client";

import { useState } from "react";
import { AnalysisResult } from "@/lib/types";

interface Props {
  result: AnalysisResult;
}

export default function EmailCapture({ result }: Props) {
  const [email, setEmail]       = useState("");
  const [status, setStatus]     = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) { setErrorMsg("Please enter a valid email."); return; }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res  = await fetch("/api/email-capture", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, result }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error ?? "Failed to send.");
      setStatus("success");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div style={{ background: "#e1f5ee", border: "1px solid #b5ddd0", borderRadius: 16, padding: "1.5rem", textAlign: "center" }}>
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#1d9e75", color: "#fff", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
          ✓
        </div>
        <p style={{ fontSize: 15, fontWeight: 700, color: "#085041", marginBottom: 6 }}>Report sent!</p>
        <p style={{ fontSize: 13, color: "#0f6e56", lineHeight: 1.6 }}>
          Check your inbox for your full relationship health report. It includes your complete factor breakdown, recommendations, and urgency verdict.
        </p>
      </div>
    );
  }

  return (
    <div style={{ border: "1px solid #efefed", borderRadius: 16, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #534ab7 0%, #3c3489 100%)", padding: "1.5rem", textAlign: "center" }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>📬</div>
        <p style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6, letterSpacing: "-0.01em" }}>
          Get the full report in your inbox
        </p>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, margin: 0 }}>
          We'll email you your complete analysis — factor breakdown, action plan, and urgency verdict — for free.
        </p>
      </div>

      {/* What's inside */}
      <div style={{ background: "#fafaf8", padding: "1.25rem 1.5rem", borderBottom: "1px solid #efefed" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
          Your report includes
        </p>
        {[
          "Complete risk & protective factor breakdown",
          "Severity weighting for each factor",
          "3 personalised action steps",
          "Urgency verdict with next steps",
          "Retake reminder so you can track progress",
        ].map((item) => (
          <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, fontSize: 13, color: "#444" }}>
            <span style={{ width: 18, height: 18, borderRadius: "50%", background: "#eeedfe", color: "#534ab7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>✓</span>
            {item}
          </div>
        ))}
      </div>

      {/* Form */}
      <div style={{ background: "#fff", padding: "1.25rem 1.5rem" }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              border: "1px solid #e8e8e5",
              borderRadius: 12,
              padding: "13px 16px",
              fontSize: 15,
              color: "#1a1a1a",
              background: "#fafaf8",
              outline: "none",
              fontFamily: "inherit",
              transition: "border-color 0.15s",
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#534ab7")}
            onBlur={(e)  => (e.currentTarget.style.borderColor = "#e8e8e5")}
          />

          {errorMsg && (
            <p style={{ fontSize: 13, color: "#a32d2d", margin: 0 }}>{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              width: "100%",
              background: status === "loading" ? "#afa9ec" : "#534ab7",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "14px 20px",
              fontSize: 15,
              fontWeight: 700,
              cursor: status === "loading" ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              letterSpacing: "0.01em",
              transition: "background 0.15s, transform 0.1s",
            }}
            onMouseDown={(e) => { if (status !== "loading") e.currentTarget.style.transform = "scale(0.98)"; }}
            onMouseUp={(e)   => (e.currentTarget.style.transform = "scale(1)")}
          >
            {status === "loading" ? (
              <>
                <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                Sending report…
              </>
            ) : (
              "Email me the full report — free"
            )}
          </button>

          <p style={{ fontSize: 11, color: "#ccc", textAlign: "center", margin: 0 }}>
            No spam. One email with your report. Unsubscribe anytime.
          </p>
        </form>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
