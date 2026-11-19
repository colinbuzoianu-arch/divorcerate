"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getSteps } from "@/lib/questions";
import { Answers } from "@/lib/types";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import { getApp } from "@/lib/i18n/app";
import StartScreen from "@/components/StartScreen";
import QuizStep from "@/components/QuizStep";
import LoadingScreen from "@/components/LoadingScreen";
import { track, MAIN_QUIZ } from "@/lib/analytics";

type Screen = "start" | "quiz" | "loading" | "error";

const PROGRESS_KEY = "cq_quiz_progress";

/**
 * The relationship-test client island (Phase 2.1). Runs the quiz, then hands
 * off to the server-rendered result at /r/[id]. Progress is saved in
 * sessionStorage so a mid-quiz refresh doesn't lose answers.
 */
export default function Analyzer({ locale = "en" }: { locale?: Locale }) {
  const router = useRouter();
  const steps = getSteps(locale);
  const [screen, setScreen] = useState<Screen>("start");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [errorMsg, setErrorMsg] = useState("");
  const [hp, setHp] = useState(""); // honeypot
  const quizStartedRef = useRef<number | null>(null);
  const restored = useRef(false);

  // Restore any in-progress quiz (sessionStorage).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(PROGRESS_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { answers?: Answers; stepIndex?: number; startedAt?: number };
        if (saved.answers && Object.keys(saved.answers).length > 0) {
          setAnswers(saved.answers);
          setStepIndex(Math.min(saved.stepIndex ?? 0, steps.length - 1));
          quizStartedRef.current = saved.startedAt ?? Date.now();
          setScreen("quiz");
        }
      }
    } catch {
      /* ignore */
    }
    restored.current = true;
  }, []);

  // Persist progress whenever answers / step change during the quiz.
  useEffect(() => {
    if (!restored.current || screen !== "quiz") return;
    try {
      sessionStorage.setItem(PROGRESS_KEY, JSON.stringify({ answers, stepIndex, startedAt: quizStartedRef.current }));
    } catch {
      /* ignore */
    }
  }, [answers, stepIndex, screen]);

  function clearProgress() {
    try { sessionStorage.removeItem(PROGRESS_KEY); } catch { /* ignore */ }
  }

  const beginQuiz = () => {
    quizStartedRef.current = Date.now();
    track("quiz_start", { quiz: MAIN_QUIZ });
    setScreen("quiz");
  };

  const handleChange = (id: string, value: string | number) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const handleNext = async () => {
    track("quiz_step_complete", { step_index: stepIndex, step_id: steps[stepIndex]?.title, quiz: MAIN_QUIZ });
    if (stepIndex < steps.length - 1) {
      setStepIndex((i) => i + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      track("quiz_complete", { quiz: MAIN_QUIZ });
      await runAnalysis();
    }
  };

  const handleBack = () => { if (stepIndex > 0) setStepIndex((i) => i - 1); };

  const handleNavigate = (index: number) => {
    setStepIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const runAnalysis = async () => {
    setScreen("loading");
    try {
      const elapsedMs = quizStartedRef.current ? Date.now() - quizStartedRef.current : undefined;
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, hp, elapsedMs, locale }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Unknown error");
      clearProgress();

      // Couple comparison (Phase 6.2): if we arrived from an invite, link this
      // result to the comparison (that's this partner's consent) and go there.
      const compareId = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("compare") : null;
      if (compareId && /^[0-9a-fA-F-]{10,64}$/.test(compareId)) {
        try {
          await fetch(`/api/compare/${compareId}/join`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resultId: data.resultId }),
          });
        } catch { /* fall through to the normal result page */ }
        router.push(localizeHref(`/compare/${compareId}`, locale));
        return;
      }

      router.push(localizeHref(`/r/${data.resultId}`, locale));
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Analysis failed. Please try again.");
      setScreen("error");
    }
  };

  const retry = () => { setErrorMsg(""); setScreen("quiz"); };

  return (
    <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #efefed", padding: "1.75rem", width: "100%", maxWidth: 620, margin: "0 auto", boxShadow: "0 2px 24px rgba(0,0,0,0.05)" }}>
      {/* Honeypot — hidden from humans; bots that fill it are rejected server-side */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      {screen === "start" && <StartScreen onStart={beginQuiz} locale={locale} />}
      {screen === "quiz" && (
        <QuizStep step={steps[stepIndex]} stepIndex={stepIndex} totalSteps={steps.length} answers={answers} onChange={handleChange} onNext={handleNext} onBack={handleBack} onNavigate={handleNavigate} locale={locale} />
      )}
      {screen === "loading" && <LoadingScreen locale={locale} />}
      {screen === "error" && (
        <div style={{ textAlign: "center" }}>
          <div style={{ background: "#fcebeb", border: "1px solid #f7c1c1", borderRadius: 12, padding: "1rem", fontSize: 14, color: "#a32d2d", marginBottom: "1rem" }}>{errorMsg}</div>
          <button onClick={retry} style={{ background: "transparent", border: "1px solid #eee", borderRadius: 12, padding: "12px 20px", fontSize: 14, color: "#aaa", width: "100%", cursor: "pointer" }}>{getApp(locale).errorRetry}</button>
        </div>
      )}
    </div>
  );
}
