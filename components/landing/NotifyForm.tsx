"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

/**
 * "Coming soon" waitlist form for couple comparison (Phase 2.2 / groundwork for
 * Phases 5–6). Posts to /api/email-capture in notify mode with an explicit
 * consent checkbox. Styled with the landing .form classes.
 */
export default function NotifyForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) { setMsg("Please enter a valid email."); setStatus("error"); return; }
    if (!consent) { setMsg("Please tick the box to opt in."); setStatus("error"); return; }
    setStatus("loading"); setMsg("");
    try {
      const res = await fetch("/api/email-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, mode: "notify", consent, source: "couple-comparison-waitlist" }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Something went wrong.");
      track("email_submit", { source: "couple-comparison-waitlist" });
      setStatus("done");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="mono" style={{ marginTop: 32, color: "var(--on-dark-2)" }}>
        Thanks — we&apos;ll email you when couple comparison is ready.
      </p>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <label htmlFor="cq-email">Email address</label>
      <input
        id="cq-email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn btn-light" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "…" : "Notify me"}
      </button>
      <label htmlFor="cq-consent" style={{ position: "static", width: "auto", height: "auto", clip: "auto", display: "flex", alignItems: "flex-start", gap: 8, flex: "1 1 100%", marginTop: 4, fontSize: 13, color: "var(--on-dark-2)", cursor: "pointer" }}>
        <input id="cq-consent" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} style={{ marginTop: 3 }} />
        <span>Email me once about couple comparison. No spam; unsubscribe anytime.</span>
      </label>
      {status === "error" && <p style={{ flex: "1 1 100%", margin: 0, fontSize: 13, color: "var(--ember)" }}>{msg}</p>}
    </form>
  );
}
