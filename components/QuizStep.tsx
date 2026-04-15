"use client";

import { useEffect } from "react";
import { Step, Question } from "@/lib/questions";
import { Answers } from "@/lib/types";

interface Props {
  step: Step;
  stepIndex: number;
  totalSteps: number;
  answers: Answers;
  onChange: (id: string, value: string | number) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function QuizStep({
  step,
  stepIndex,
  totalSteps,
  answers,
  onChange,
  onNext,
  onBack,
}: Props) {
  const isLast = stepIndex === totalSteps - 1;
  const progress = ((stepIndex + 1) / totalSteps) * 100;

  // Scroll to top of page on every step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [stepIndex]);

  const allAnswered = step.questions.every((q) => {
    if (q.type === "textarea") return true;
    return answers[q.id] !== undefined;
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 13, color: "#777" }}>
          Step {stepIndex + 1} of {totalSteps}
        </span>
        <span style={{ fontSize: 13, color: "#534ab7", fontWeight: 500 }}>{step.title}</span>
      </div>

      <div
        style={{
          height: 4,
          background: "#e5e5e5",
          borderRadius: 2,
          marginBottom: "1.75rem",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "#534ab7",
            borderRadius: 2,
            transition: "width 0.4s ease",
          }}
        />
      </div>

      {step.questions.map((q) => (
        <QuestionBlock key={q.id} question={q} value={answers[q.id]} onChange={onChange} />
      ))}

      <div style={{ display: "flex", gap: 12, marginTop: "1.5rem" }}>
        {stepIndex > 0 && (
          <button
            onClick={onBack}
            style={{
              background: "transparent",
              border: "0.5px solid #ccc",
              borderRadius: 10,
              padding: "12px 20px",
              fontSize: 14,
              color: "#777",
            }}
          >
            Back
          </button>
        )}
        <button
          onClick={onNext}
          disabled={!allAnswered}
          style={{
            flex: 1,
            background: allAnswered ? "#534ab7" : "#afa9ec",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "12px 20px",
            fontSize: 15,
            fontWeight: 500,
            cursor: allAnswered ? "pointer" : "not-allowed",
            transition: "background 0.15s",
          }}
        >
          {isLast ? "Get my results" : "Continue"}
        </button>
      </div>
    </div>
  );
}

function QuestionBlock({
  question: q,
  value,
  onChange,
}: {
  question: Question;
  value: string | number | undefined;
  onChange: (id: string, val: string | number) => void;
}) {
  return (
    <div style={{ marginBottom: "1.75rem" }}>
      <label
        style={{
          display: "block",
          fontSize: 15,
          fontWeight: 500,
          color: "#1a1a1a",
          marginBottom: "0.5rem",
          lineHeight: 1.5,
        }}
      >
        {q.label}
      </label>
      {q.sub && (
        <span style={{ display: "block", fontSize: 13, color: "#777", marginBottom: "0.75rem" }}>
          {q.sub}
        </span>
      )}

      {q.type === "options" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {q.options!.map((opt) => (
            <button
              key={opt}
              onClick={() => onChange(q.id, opt)}
              style={{
                background: value === opt ? "#eeedfe" : "#f5f5f3",
                border: value === opt ? "1.5px solid #534ab7" : "0.5px solid #ddd",
                borderRadius: 10,
                padding: "11px 16px",
                textAlign: "left",
                fontSize: 14,
                color: value === opt ? "#3c3489" : "#1a1a1a",
                fontWeight: value === opt ? 500 : 400,
                transition: "all 0.12s ease",
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {q.type === "range" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ textAlign: "center", fontSize: 22, fontWeight: 500, color: "#534ab7" }}>
            {(value as number) ?? q.default} / 10
          </div>
          <input
            type="range"
            min={q.min}
            max={q.max}
            step={1}
            value={(value as number) ?? q.default}
            onChange={(e) => onChange(q.id, parseInt(e.target.value))}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#999" }}>
            <span>{q.minLabel}</span>
            <span>{q.maxLabel}</span>
          </div>
        </div>
      )}

      {q.type === "textarea" && (
        <textarea
          placeholder="Optional — leave blank if nothing specific"
          value={(value as string) || ""}
          onChange={(e) => onChange(q.id, e.target.value)}
          style={{
            width: "100%",
            border: "0.5px solid #ccc",
            borderRadius: 10,
            padding: "11px 14px",
            fontSize: 14,
            color: "#1a1a1a",
            background: "#fff",
            resize: "vertical",
            minHeight: 80,
            lineHeight: 1.5,
            outline: "none",
          }}
        />
      )}
    </div>
  );
}
