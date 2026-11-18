/**
 * Inline brand mark (two overlapping dots + serif wordmark) for inner pages,
 * which don't load the .cq landing CSS. `onDark` picks the wordmark colour.
 */
export default function BrandMark({ onDark = false }: { onDark?: boolean }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span aria-hidden="true" style={{ position: "relative", width: 30, height: 22, flex: "none" }}>
        <span style={{ position: "absolute", top: 0, left: 0, width: 22, height: 22, borderRadius: "50%", background: "var(--violet)", mixBlendMode: "screen" }} />
        <span style={{ position: "absolute", top: 0, right: 0, width: 22, height: 22, borderRadius: "50%", background: "var(--ember)", mixBlendMode: "screen" }} />
      </span>
      <span style={{ fontFamily: "var(--serif)", fontSize: 24, letterSpacing: "-0.01em", color: onDark ? "var(--on-dark)" : "var(--text)" }}>CoupleIQ</span>
    </span>
  );
}
