"use client";

interface Props {
  onStart: () => void;
}

export default function StartScreen({ onStart }: Props) {
  return (
    <div style={{ textAlign: "center", padding: "1rem 0" }}>
      <div style={{ fontSize: 48, marginBottom: "1rem" }}>💑</div>
      <h2 style={{ fontSize: 22, fontWeight: 500, marginBottom: "0.75rem" }}>
        Understand your relationship
      </h2>
      <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7, marginBottom: "1.5rem" }}>
        Answer 15 honest questions about your relationship. Our AI uses decades of relationship
        science to estimate risk factors and offer personalized, actionable insights.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: "1.5rem" }}>
        {["Gottman method", "Attachment theory", "Communication patterns", "Conflict resolution", "~5 minutes"].map(
          (tag) => (
            <span
              key={tag}
              style={{
                fontSize: 12,
                padding: "4px 12px",
                borderRadius: 20,
                background: "#eeedfe",
                color: "#3c3489",
                border: "0.5px solid #afa9ec",
              }}
            >
              {tag}
            </span>
          )
        )}
      </div>

      <button
        onClick={onStart}
        style={{
          width: "100%",
          background: "#534ab7",
          color: "#fff",
          border: "none",
          borderRadius: 10,
          padding: "13px 20px",
          fontSize: 15,
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        Begin assessment
      </button>
      <p style={{ marginTop: "1rem", fontSize: 12, color: "#999" }}>
        Your answers are private and never stored.
      </p>
    </div>
  );
}
