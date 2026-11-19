interface RadarDimension {
  key: string;
  label: string;
  score: number;
}

/**
 * Eight-axis radar (octagon) drawn in the landing-page style: an ink panel with
 * faint rings/axes, a violet "you" polygon, and — for a couple comparison — an
 * ember dashed second polygon overlaid on the same octagon (Phase 3.3 / 6.2).
 */

const SHORT: Record<string, string> = {
  communication: "Comm.",
  conflictRepair: "Repair",
  contempt: "Contempt",
  friendship: "Friendship",
  respect: "Respect",
  trust: "Trust",
  support: "Support",
  vision: "Vision",
};

const SIZE = 340;
const C = SIZE / 2;
const R = 112;
const VIOLET = "#8B7CFF";
const EMBER = "#FF9466";

function point(i: number, n: number, radiusFrac: number): [number, number] {
  const angle = (-90 + (360 / n) * i) * (Math.PI / 180);
  const r = R * radiusFrac;
  return [C + r * Math.cos(angle), C + r * Math.sin(angle)];
}

function polygon(values: number[]): string {
  return values.map((v, i) => point(i, values.length, Math.min(1, Math.max(0, v / 100))).join(",")).join(" ");
}

export default function RadarChart({
  dimensions,
  compare,
  legend,
}: {
  dimensions: RadarDimension[];
  compare?: number[];
  legend?: { a: string; b?: string };
}) {
  const n = dimensions.length;
  const scoresA = dimensions.map((d) => d.score);
  const label =
    "Relationship dimensions: " +
    dimensions.map((d, i) => `${d.label} ${d.score}${compare ? ` vs ${compare[i]}` : ""}`).join(", ") +
    ".";

  return (
    <div style={{ background: "radial-gradient(90% 90% at 50% 40%, #1F1830 0%, #14101E 72%)", border: "1px solid rgba(243,238,230,0.12)", borderRadius: 24, padding: "1.5rem 1rem 1.25rem" }}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={label} style={{ width: "100%", maxWidth: 380, height: "auto", display: "block", margin: "0 auto", overflow: "visible" }}>
        {/* rings */}
        {[0.25, 0.5, 0.75, 1].map((frac) => (
          <polygon key={frac} points={Array.from({ length: n }, (_, i) => point(i, n, frac).join(",")).join(" ")} fill="none" stroke="rgba(243,238,230,0.10)" strokeWidth={1} />
        ))}
        {/* axes */}
        {Array.from({ length: n }, (_, i) => {
          const [x, y] = point(i, n, 1);
          return <line key={i} x1={C} y1={C} x2={x} y2={y} stroke="rgba(243,238,230,0.10)" strokeWidth={1} />;
        })}
        {/* compare (partner) polygon — ember, dashed, drawn first so "you" sits on top */}
        {compare && (
          <polygon points={polygon(compare)} fill="rgba(255,148,102,0.12)" stroke={EMBER} strokeWidth={1.5} strokeDasharray="5 6" strokeLinejoin="round" />
        )}
        {/* primary (you) polygon — violet */}
        <polygon points={polygon(scoresA)} fill="rgba(139,124,255,0.22)" stroke={VIOLET} strokeWidth={2} strokeLinejoin="round" />
        {/* vertices for "you" */}
        {scoresA.map((v, i) => {
          const [x, y] = point(i, n, Math.min(1, Math.max(0, v / 100)));
          return <circle key={i} cx={x} cy={y} r={3} fill={VIOLET} />;
        })}
        {/* labels */}
        {dimensions.map((d, i) => {
          const [x, y] = point(i, n, 1.2);
          const anchor = Math.abs(x - C) < 6 ? "middle" : x > C ? "start" : "end";
          return (
            <text key={d.key} x={x} y={y + 3} textAnchor={anchor} style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.08em", fill: "#A8A2B3", textTransform: "uppercase" }}>
              {SHORT[d.key] ?? d.label}
            </text>
          );
        })}
      </svg>

      {legend && (
        <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 10, fontSize: 12, color: "#A8A2B3" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 20, height: 0, borderTop: `2px solid ${VIOLET}`, display: "inline-block" }} />
            {legend.a}
          </span>
          {legend.b && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 20, height: 0, borderTop: `2px dashed ${EMBER}`, display: "inline-block" }} />
              {legend.b}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
