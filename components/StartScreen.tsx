"use client";

interface Props {
  onStart: () => void;
}

export default function StartScreen({ onStart }: Props) {
  return (
    <div style={{ textAlign: "center", padding: "1rem 0" }}>

      {/* Illustration */}
      <div style={{ margin: "0 auto 1.25rem", maxWidth: 320 }}>
        <svg width="100%" viewBox="0 0 680 220" role="img" xmlns="http://www.w3.org/2000/svg" aria-label="Two figures reaching toward each other with a heart between them, surrounded by analytical arcs">
          <style>{`
            .fig{fill:#534ab7}
            .fig-l{fill:#afa9ec}
            .hrt{fill:#d85a30}
            .arc-s{stroke:#534ab7;fill:none;stroke-width:2;stroke-linecap:round}
            .arc-m{stroke:#afa9ec;fill:none;stroke-width:1.5;stroke-linecap:round}
            .arc-l{stroke:#eeedfe;fill:none;stroke-width:1.5;stroke-linecap:round}
            .dot{fill:#534ab7}
            .dot-l{fill:#afa9ec}
            .base{stroke:#e5e5e5;stroke-width:1;fill:none}
            .dash{stroke:#afa9ec;fill:none;stroke-width:1.5;stroke-dasharray:3 3}
          `}</style>

          {/* Arcs left */}
          <path className="arc-l" d="M248 110 A100 100 0 0 1 290 30"/>
          <path className="arc-m" d="M240 110 A108 108 0 0 1 292 20"/>
          <path className="arc-s" d="M232 110 A116 116 0 0 1 294 10"/>

          {/* Arcs right */}
          <path className="arc-l" d="M432 110 A100 100 0 0 0 390 30"/>
          <path className="arc-m" d="M440 110 A108 108 0 0 0 388 20"/>
          <path className="arc-s" d="M448 110 A116 116 0 0 0 386 10"/>

          {/* Dots on arcs */}
          <circle className="dot"   cx="266" cy="48" r="4"/>
          <circle className="dot-l" cx="252" cy="65" r="3"/>
          <circle className="dot"   cx="414" cy="48" r="4"/>
          <circle className="dot-l" cx="428" cy="65" r="3"/>

          {/* Tick marks */}
          <line className="arc-s" x1="258" y1="36" x2="264" y2="42"/>
          <line className="arc-s" x1="422" y1="36" x2="416" y2="42"/>

          {/* Left figure */}
          <circle className="fig"   cx="289" cy="100" r="18"/>
          <circle className="fig-l" cx="284" cy="97"  r="5"/>
          <rect   className="fig"   x="272" y="112" width="34" height="52" rx="8"/>
          <path   className="fig"   d="M306 128 Q326 120 336 115" stroke="#534ab7" strokeWidth="10" fill="none" strokeLinecap="round"/>

          {/* Right figure */}
          <circle className="fig"   cx="391" cy="100" r="18"/>
          <circle className="fig-l" cx="386" cy="97"  r="5"/>
          <rect   className="fig"   x="374" y="112" width="34" height="52" rx="8"/>
          <path   className="fig"   d="M374 128 Q354 120 344 115" stroke="#534ab7" strokeWidth="10" fill="none" strokeLinecap="round"/>

          {/* Heart */}
          <path className="hrt" d="M340 122 C340 122 320 108 320 97 C320 89 327 83 334 85 C337 86 340 89 340 89 C340 89 343 86 346 85 C353 83 360 89 360 97 C360 108 340 122 340 122Z"/>

          {/* Data mini-charts */}
          <rect fill="none" stroke="#afa9ec" strokeWidth="1" x="300" y="42" width="36" height="14" rx="4"/>
          <rect fill="#534ab7" opacity="0.7" x="303" y="46" width="14" height="6" rx="2"/>
          <rect fill="#afa9ec" opacity="0.5" x="319" y="46" width="10" height="6" rx="2"/>

          <rect fill="none" stroke="#afa9ec" strokeWidth="1" x="344" y="34" width="36" height="14" rx="4"/>
          <rect fill="#534ab7" opacity="0.7" x="347" y="38" width="18" height="6" rx="2"/>
          <rect fill="#afa9ec" opacity="0.4" x="367" y="38" width="8"  height="6" rx="2"/>

          {/* Baseline */}
          <line className="base" x1="180" y1="174" x2="500" y2="174"/>
          <circle className="dot"   cx="289" cy="174" r="3"/>
          <circle className="dot"   cx="391" cy="174" r="3"/>
          <circle className="dot-l" cx="340" cy="174" r="3"/>
          <line className="dash" x1="289" y1="170" x2="289" y2="155"/>
          <line className="dash" x1="391" y1="170" x2="391" y2="155"/>
        </svg>
      </div>

      <h2 style={{ fontSize: 22, fontWeight: 500, marginBottom: "0.75rem" }}>
        Understand your relationship
      </h2>
      <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7, marginBottom: "1.5rem" }}>
        Answer 15 honest questions about your relationship. Our AI uses decades of relationship
        science to estimate risk factors and offer personalized, actionable insights.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: "1.5rem" }}>
        {["Gottman method", "Attachment theory", "Communication patterns", "Conflict resolution", "~5 minutes"].map((tag) => (
          <span
            key={tag}
            style={{ fontSize: 12, padding: "4px 12px", borderRadius: 20, background: "#eeedfe", color: "#3c3489", border: "0.5px solid #afa9ec" }}
          >
            {tag}
          </span>
        ))}
      </div>

      <button
        onClick={onStart}
        style={{ width: "100%", background: "#534ab7", color: "#fff", border: "none", borderRadius: 10, padding: "13px 20px", fontSize: 15, fontWeight: 500, cursor: "pointer" }}
      >
        Begin assessment
      </button>
      <p style={{ marginTop: "1rem", fontSize: 12, color: "#999" }}>
        Your answers are private and never stored.
      </p>
    </div>
  );
}
