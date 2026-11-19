"use client";

import { useEffect, useRef } from "react";
import { Step, Question } from "@/lib/questions";
import { Answers } from "@/lib/types";
import type { Locale } from "@/lib/i18n/config";
import { getApp, type AppDict } from "@/lib/i18n/app";

interface Props {
  step: Step;
  stepIndex: number;
  totalSteps: number;
  answers: Answers;
  onChange: (id: string, value: string | number) => void;
  onNext: () => void;
  onBack: () => void;
  onNavigate: (index: number) => void;
  locale?: Locale;
}

export default function QuizStep({
  step,
  stepIndex,
  totalSteps,
  answers,
  onChange,
  onNext,
  onBack,
  onNavigate,
  locale = "en",
}: Props) {
  const t = getApp(locale).step;
  const isLast = stepIndex === totalSteps - 1;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [stepIndex]);

  const allAnswered = step.questions.every((q) => {
    if (q.type === "textarea") return true;
    return answers[q.id] !== undefined;
  });

  return (
    <div ref={containerRef}>

      {/* Step label */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span style={{ fontSize: 13, color: "#999", letterSpacing: "0.02em" }}>
          {t.stepOf.replace("{i}", String(stepIndex + 1)).replace("{n}", String(totalSteps))}
        </span>
        <span style={{ fontSize: 13, color: "#4B3FB0", fontWeight: 600 }}>{step.title}</span>
      </div>

      {/* Point 3: Interactive dot step indicator */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: "1.75rem" }}>
        {Array.from({ length: totalSteps }).map((_, i) => {
          const done   = i < stepIndex;
          const active = i === stepIndex;
          const clickable = i < stepIndex; // only completed steps are navigable back
          return (
            <div
              key={i}
              onClick={() => { if (clickable) onNavigate(i); }}
              title={clickable ? t.goBackTo.replace("{i}", String(i + 1)) : undefined}
              style={{
                flex: active ? "0 0 28px" : "0 0 8px",
                height: 8,
                borderRadius: 4,
                background: done ? "#4B3FB0" : active ? "#4B3FB0" : "#e5e5e5",
                opacity: done ? 0.45 : 1,
                transition: "flex 0.35s cubic-bezier(0.34,1.56,0.64,1), background 0.25s ease, opacity 0.25s ease",
                cursor: clickable ? "pointer" : "default",
              }}
            />
          );
        })}
      </div>

      {/* Questions */}
      {step.questions.map((q) => (
        <QuestionBlock key={q.id} question={q} value={answers[q.id]} onChange={onChange} t={t} />
      ))}

      {/* Nav buttons */}
      <div style={{ display: "flex", gap: 12, marginTop: "1.75rem" }}>
        {stepIndex > 0 && (
          <button
            className="nav-btn"
            onClick={onBack}
            style={{
              background: "transparent",
              border: "1px solid #ddd",
              borderRadius: 999,
              padding: "13px 24px",
              fontSize: 14,
              color: "#777",
              fontWeight: 500,
              transition: "border-color 0.15s, color 0.15s",
            }}
          >
            {t.back}
          </button>
        )}
        <button
          className="nav-btn"
          onClick={onNext}
          disabled={!allAnswered}
          style={{
            flex: 1,
            background: allAnswered ? "#4B3FB0" : "#d4d2ee",
            color: "#fff",
            border: "none",
            borderRadius: 999,
            padding: "14px 20px",
            fontSize: 15,
            fontWeight: 600,
            cursor: allAnswered ? "pointer" : "not-allowed",
            transition: "background 0.2s ease, transform 0.1s ease",
            letterSpacing: "0.01em",
          }}
          onMouseDown={(e) => { if (allAnswered) (e.currentTarget.style.transform = "scale(0.98)"); }}
          onMouseUp={(e) => { (e.currentTarget.style.transform = "scale(1)"); }}
        >
          {isLast ? t.getResults : t.continue}
        </button>
      </div>
    </div>
  );
}

function QuestionBlock({
  question: q,
  value,
  onChange,
  t,
}: {
  question: Question;
  value: string | number | undefined;
  onChange: (id: string, val: string | number) => void;
  t: AppDict["step"];
}) {
  return (
    <div style={{ marginBottom: "1.75rem" }}>
      <label
        style={{
          display: "block",
          fontSize: 15,
          fontWeight: 600,
          color: "#1a1a1a",
          marginBottom: "0.5rem",
          lineHeight: 1.55,
          letterSpacing: "-0.01em",
        }}
      >
        {q.label}
      </label>
      {q.sub && (
        <span style={{ display: "block", fontSize: 13, color: "#888", marginBottom: "0.75rem", fontStyle: "italic" }}>
          {q.sub}
        </span>
      )}

      {/* Point 2: Option buttons with micro-animation via className */}
      {q.type === "options" && (
        <div className="option-btn-wrap" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {q.options!.map((opt) => {
            const selected = value === opt.value;
            return (
              <button
                key={opt.value}
                className={`option-btn${selected ? " selected" : ""}`}
                onClick={() => onChange(q.id, opt.value)}
                style={{
                  background: selected ? "#ece9fb" : "#fafaf8",
                  border: selected ? "1.5px solid #4B3FB0" : "1px solid #e8e8e5",
                  borderRadius: 12,
                  padding: "12px 16px",
                  textAlign: "left",
                  fontSize: 14,
                  color: selected ? "#3c3489" : "#2a2a2a",
                  fontWeight: selected ? 600 : 400,
                  lineHeight: 1.45,
                  cursor: "pointer",
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}

      {q.type === "range" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{
            textAlign: "center",
            fontSize: 28,
            fontWeight: 700,
            color: "#4B3FB0",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}>
            {(value as number) ?? q.default}
            <span style={{ fontSize: 16, fontWeight: 400, color: "#aaa", marginLeft: 4 }}>{t.of10}</span>
          </div>
          <input
            type="range"
            min={q.min}
            max={q.max}
            step={1}
            value={(value as number) ?? q.default}
            onChange={(e) => onChange(q.id, parseInt(e.target.value))}
            style={{ margin: "4px 0" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#aaa" }}>
            <span>{q.minLabel}</span>
            <span>{q.maxLabel}</span>
          </div>
        </div>
      )}

      {q.type === "textarea" && (
        <textarea
          placeholder={t.textareaPlaceholder}
          value={(value as string) || ""}
          onChange={(e) => onChange(q.id, e.target.value)}
          style={{
            width: "100%",
            border: "1px solid #e8e8e5",
            borderRadius: 12,
            padding: "12px 14px",
            fontSize: 14,
            color: "#1a1a1a",
            background: "#fafaf8",
            resize: "vertical",
            minHeight: 84,
            lineHeight: 1.6,
            outline: "none",
            fontFamily: "inherit",
            transition: "border-color 0.15s",
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "#4B3FB0"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "#e8e8e5"; }}
        />
      )}
    </div>
  );
}
