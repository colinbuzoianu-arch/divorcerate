"use client";

import { useState } from "react";
import Link from "next/link";
import { MiniQuiz as MiniQuizConfig, scoreMiniQuiz } from "@/lib/quizzes/types";
import { track } from "@/lib/analytics";
import { localizeHref, type Locale } from "@/lib/i18n/config";

const UI = {
  en: { reflection: "Your reflection", questionOf: "Question {i} of {n}", back: "← Back", startOver: "Start over", fullTest: "Take the full relationship test →", safetyPre: "If you ever feel afraid of your partner or unsafe, a quiz isn't what you need — see ", safetyLink: "support resources" },
  de: { reflection: "Deine Reflexion", questionOf: "Frage {i} von {n}", back: "← Zurück", startOver: "Von vorn beginnen", fullTest: "Zum vollständigen Beziehungstest →", safetyPre: "Wenn du jemals Angst vor deinem:r Partner:in hast oder dich nicht sicher fühlst, ist ein Quiz nicht das, was du brauchst – siehe ", safetyLink: "Hilfsangebote" },
};

/**
 * Renders a config-driven mini-quiz (Phase 4.1, localized Phase 7). Scored
 * entirely in the browser — no AI, no server, no storage. Always ends with a
 * CTA to the full test.
 */
export default function MiniQuiz({ config, locale = "en" }: { config: MiniQuizConfig; locale?: Locale }) {
  const t = UI[locale];
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);

  const q = config.questions[index];
  const total = config.questions.length;

  function choose(value: number | string) {
    if (!started) { setStarted(true); track("quiz_start", { quiz: config.slug }); }
    const next = { ...answers, [q.id]: value };
    setAnswers(next);
    track("quiz_step_complete", { step_index: index, quiz: config.slug });
    if (index < total - 1) {
      setIndex(index + 1);
    } else {
      setDone(true);
      track("quiz_complete", { quiz: config.slug });
    }
  }

  function restart() { setIndex(0); setAnswers({}); setDone(false); }

  const card = { background: "#fff", border: "1px solid var(--line-light)", borderRadius: 24, padding: "1.75rem" } as const;

  if (done) {
    const result = scoreMiniQuiz(config, answers);
    const title = result.mode === "scale" ? result.band.title : result.category.title;
    const blurb = result.mode === "scale" ? result.band.blurb : result.category.blurb;
    return (
      <div style={card}>
        <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 10 }}>{t.reflection}</p>
        <p style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 32, color: "var(--text)", lineHeight: 1.1, marginBottom: 12 }}>{title}</p>
        <p style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.75, marginBottom: 16 }}>{blurb}</p>

        {config.safety && (
          <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.6, background: "var(--paper-2)", borderRadius: 14, padding: "12px 14px", marginBottom: 16 }}>
            {t.safetyPre}
            <Link href={localizeHref("/support-resources", locale)} style={{ color: "var(--violet-deep)", fontWeight: 600 }}>{t.safetyLink}</Link>.
          </p>
        )}

        <div style={{ background: "var(--ink)", color: "var(--on-dark)", borderRadius: 20, padding: "1.5rem", textAlign: "center" }}>
          <p style={{ fontSize: 14, color: "var(--on-dark-2)", lineHeight: 1.6, marginBottom: 16 }}>{config.ctaLede}</p>
          <Link href={localizeHref("/relationship-test", locale)} style={{ background: "var(--on-dark)", color: "var(--ink)", borderRadius: 999, padding: "13px 26px", fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>{t.fullTest}</Link>
        </div>

        <button onClick={restart} style={{ marginTop: 14, background: "transparent", border: "1px solid var(--line-light)", borderRadius: 999, padding: "10px 18px", fontSize: 13, color: "var(--text-2)", cursor: "pointer", width: "100%" }}>{t.startOver}</button>
      </div>
    );
  }

  return (
    <div style={card}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-2)" }}>{t.questionOf.replace("{i}", String(index + 1)).replace("{n}", String(total))}</span>
        <span style={{ height: 6, flex: 1, marginLeft: 16, borderRadius: 6, background: "var(--paper-2)", overflow: "hidden" }}>
          <span style={{ display: "block", height: "100%", width: `${((index) / total) * 100}%`, background: "var(--violet-deep)", borderRadius: 6, transition: "width 0.3s ease" }} />
        </span>
      </div>

      <p style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 24, color: "var(--text)", lineHeight: 1.2, marginBottom: 18 }}>{q.question}</p>

      <div style={{ display: "grid", gap: 10 }}>
        {q.options.map((o) => (
          <button
            key={o.label}
            onClick={() => choose(config.mode === "category" ? (o.category ?? "") : (o.points ?? 0))}
            style={{ textAlign: "left", background: "#fff", border: "1px solid var(--line-light)", borderRadius: 14, padding: "13px 16px", fontSize: 14, color: "var(--text)", lineHeight: 1.45, cursor: "pointer", transition: "border-color 0.15s, background 0.15s" }}
          >
            {o.label}
          </button>
        ))}
      </div>

      {index > 0 && (
        <button onClick={() => setIndex(index - 1)} style={{ marginTop: 14, background: "transparent", border: "none", fontSize: 13, color: "var(--text-2)", cursor: "pointer", textDecoration: "underline" }}>{t.back}</button>
      )}
    </div>
  );
}
