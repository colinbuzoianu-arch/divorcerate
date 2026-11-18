import type { ResultDimension } from "@/lib/types";

/**
 * Eight-axis radar (octagon) of the relationship dimensions, drawn from the
 * computed scores. Decorative visualisation with an accessible text label;
 * matches the brand radar in the landing design (violet "you" polygon).
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

const SIZE = 320;
const C = SIZE / 2;
const R = 108;

function point(i: number, n: number, radiusFrac: number): [number, number] {
  const angle = (-90 + (360 / n) * i) * (Math.PI / 180);
  const r = R * radiusFrac;
  return [C + r * Math.cos(angle), C + r * Math.sin(angle)];
}

function polygon(values: number[]): string {
  return values.map((v, i) => point(i, values.length, Math.min(1, Math.max(0, v / 100))).join(",")).join(" ");
}

export default function RadarChart({ dimensions }: { dimensions: ResultDimension[] }) {
  const n = dimensions.length;
  const scores = dimensions.map((d) => d.score);
  const label = "Relationship dimensions: " + dimensions.map((d) => `${d.label} ${d.score}`).join(", ") + ".";

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={label} style={{ width: "100%", maxWidth: 360, height: "auto", display: "block", margin: "0 auto", overflow: "visible" }}>
      {/* rings */}
      {[0.25, 0.5, 0.75, 1].map((frac) => (
        <polygon key={frac} points={Array.from({ length: n }, (_, i) => point(i, n, frac).join(",")).join(" ")} fill="none" stroke="rgba(26,22,34,0.08)" strokeWidth={1} />
      ))}
      {/* axes */}
      {Array.from({ length: n }, (_, i) => {
        const [x, y] = point(i, n, 1);
        return <line key={i} x1={C} y1={C} x2={x} y2={y} stroke="rgba(26,22,34,0.08)" strokeWidth={1} />;
      })}
      {/* data polygon */}
      <polygon points={polygon(scores)} fill="rgba(139,124,255,0.2)" stroke="var(--violet-deep)" strokeWidth={2} strokeLinejoin="round" />
      {/* vertices */}
      {scores.map((v, i) => {
        const [x, y] = point(i, n, Math.min(1, Math.max(0, v / 100)));
        return <circle key={i} cx={x} cy={y} r={3} fill="var(--violet-deep)" />;
      })}
      {/* labels */}
      {dimensions.map((d, i) => {
        const [x, y] = point(i, n, 1.18);
        const anchor = Math.abs(x - C) < 6 ? "middle" : x > C ? "start" : "end";
        return (
          <text key={d.key} x={x} y={y + 3} textAnchor={anchor} style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.04em", fill: "#8a8594", textTransform: "uppercase" }}>
            {SHORT[d.key] ?? d.label}
          </text>
        );
      })}
    </svg>
  );
}
