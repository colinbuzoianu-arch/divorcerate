"use client";

import { useEffect, useState } from "react";

const messages = [
  "Analyzing your communication patterns…",
  "Weighing risk and protective factors…",
  "Applying relationship science models…",
  "Generating your personalized insights…",
];

export default function LoadingScreen() {
  const [msgIndex, setMsgIndex]   = useState(0);
  const [seconds, setSeconds]     = useState(0);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % messages.length);
    }, 1800);
    const secInterval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => {
      clearInterval(msgInterval);
      clearInterval(secInterval);
    };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem", padding: "3rem 1rem", textAlign: "center" }}>

      {/* Spinner */}
      <div style={{ position: "relative", width: 56, height: 56 }}>
        <div style={{ width: 56, height: 56, border: "3px solid #eeedfe", borderTopColor: "#534ab7", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>

      {/* Rotating message */}
      <p style={{ fontSize: 15, color: "#444", fontWeight: 500, lineHeight: 1.5, maxWidth: 280 }}>
        {messages[msgIndex]}
      </p>

      {/* Time estimate */}
      <div style={{ background: "#f5f5f3", borderRadius: 10, padding: "8px 16px", display: "inline-flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#534ab7", animation: "pulse 1.5s ease-in-out infinite" }} />
        <style>{`@keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.3} }`}</style>
        <p style={{ fontSize: 13, color: "#888", margin: 0 }}>
          {seconds < 10
            ? "Usually takes 15–20 seconds…"
            : seconds < 20
            ? "Almost there…"
            : "Taking a little longer than usual, hang tight…"}
        </p>
      </div>

      {/* Reassurance */}
      <p style={{ fontSize: 12, color: "#bbb", margin: 0, maxWidth: 260, lineHeight: 1.6 }}>
        We're applying 40 years of relationship research to your specific answers.
      </p>
    </div>
  );
}
