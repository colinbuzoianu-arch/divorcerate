/**
 * Safety block (Phase 1.4). Rendered for free, never blurred, above the rest of
 * the result whenever the safety layer triggers. It must never be paywalled and
 * must never be contradicted by "keep working on it" messaging.
 */
export default function SafetyBlock() {
  return (
    <div
      role="note"
      aria-label="Your safety comes first"
      style={{
        background: "#fff6f2",
        border: "1px solid #f0c9b8",
        borderRadius: 16,
        padding: "1.25rem 1.5rem",
      }}
    >
      <p style={{ fontSize: 15, fontWeight: 800, color: "#8a2b12", letterSpacing: "-0.01em", marginBottom: 8 }}>
        Your safety comes first
      </p>
      <p style={{ fontSize: 13, color: "#6b4433", lineHeight: 1.7, marginBottom: 12 }}>
        Some of your answers suggest you may not feel safe or respected right now. If you ever feel
        afraid of your partner, controlled, or unsafe at home, a quiz is not what you need — talking
        to someone trained to help is. Support is free and confidential.
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "grid", gap: 8 }}>
        <li style={{ fontSize: 13, color: "#6b4433", lineHeight: 1.6 }}>
          <strong style={{ color: "#8a2b12" }}>Find a helpline in your country:</strong>{" "}
          <a href="https://findahelpline.com" target="_blank" rel="noopener noreferrer" style={{ color: "#B4461C", fontWeight: 600, textUnderlineOffset: 3 }}>
            findahelpline.com
          </a>
        </li>
        <li style={{ fontSize: 13, color: "#6b4433", lineHeight: 1.6 }}>
          <strong style={{ color: "#8a2b12" }}>US:</strong> Domestic Violence Hotline 1-800-799-7233
          (or text START to 88788) · Call or text <strong>988</strong> for crisis support.
        </li>
        <li style={{ fontSize: 13, color: "#6b4433", lineHeight: 1.6 }}>
          <strong style={{ color: "#8a2b12" }}>UK:</strong> Refuge 0808 2000 247 ·{" "}
          <strong style={{ color: "#8a2b12" }}>EU:</strong> call 112 in an emergency.
        </li>
      </ul>
      <p style={{ fontSize: 13, margin: 0 }}>
        <a href="/support-resources" style={{ color: "#B4461C", fontWeight: 700, textUnderlineOffset: 3 }}>
          See more support resources →
        </a>
      </p>
      <p style={{ fontSize: 12, color: "#9a7a6b", lineHeight: 1.6, marginTop: 10 }}>
        If you are in immediate danger, contact your local emergency number now.
      </p>
    </div>
  );
}
