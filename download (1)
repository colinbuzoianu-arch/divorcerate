"use client";

import { useEffect, useState } from "react";

const messages = [
  "Analyzing your communication patterns...",
  "Weighing risk and protective factors...",
  "Applying relationship science models...",
  "Generating personalized insights...",
];

export default function LoadingScreen() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % messages.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        padding: "3rem 0",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          border: "3px solid #eeedfe",
          borderTopColor: "#534ab7",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p style={{ fontSize: 14, color: "#777", textAlign: "center" }}>{messages[msgIndex]}</p>
    </div>
  );
}
