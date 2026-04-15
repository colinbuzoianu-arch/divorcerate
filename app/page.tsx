"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { steps } from "@/lib/questions";
import { Answers, AnalysisResult } from "@/lib/types";
import StartScreen from "@/components/StartScreen";
import QuizStep from "@/components/QuizStep";
import LoadingScreen from "@/components/LoadingScreen";
import ResultScreen from "@/components/ResultScreen";

type Screen = "start" | "quiz" | "loading" | "result" | "error";

function HomeInner() {
  const searchParams = useSearchParams();
  const [screen, setScreen] = useState<Screen>("start");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [resultToken, setResultToken] = useState<string>("");
  const [isPaid, setIsPaid] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const unlockedToken = searchParams.get("unlocked");
    if (unlockedToken) {
      const paid = localStorage.getItem(`paid_${unlockedToken}`) === "true";
      if (paid) {
        setIsPaid(true);
        const savedResult = localStorage.getItem(`result_${unlockedToken}`);
        if (savedResult) {
          try {
            setResult(JSON.parse(savedResult));
            setScreen("result");
          } catch {}
        }
      }
    }
  }, [searchParams]);

  const handleChange = (id: string, value: string | number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleNext = async () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex((i) => i + 1);
    } else {
      await runAnalysis();
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  };

  const runAnalysis = async () => {
    setScreen("loading");
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Unknown error");
      }
      const token = Math.random().toString(36).slice(2) + Date.now().toString(36);
      setResultToken(token);
      localStorage.setItem(`result_${token}`, JSON.stringify(data));
      setIsPaid(false);
      setResult(data as AnalysisResult);
      setScreen("result");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Analysis failed. Please try again.");
      setScreen("error");
    }
  };

  const handleUnlock = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resultToken }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      alert("Could not start checkout. Please try again.");
    }
  };

  const restart = () => {
    setScreen("start");
    setStepIndex(0);
    setAnswers({});
    setResult(null);
    setResultToken("");
    setIsPaid(false);
    setErrorMsg("");
  };

  return (
    <main style={{ background: "#f0efed", minHeight: "100vh", padding: "2rem 1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ background: "#fff", borderRadius: 16, border: "0.5px solid #e5e5e5", padding: "2rem", width: "100%", maxWidth: 640 }}>
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: 6 }}>Relationship health analyzer</h1>
          <p style={{ fontSize: 14, color: "#777" }}>Evidence-based insights from relationship science</p>
        </div>

        {screen === "start" && <StartScreen onStart={() => setScreen("quiz")} />}
        {screen === "quiz" && (
          <QuizStep step={steps[stepIndex]} stepIndex={stepIndex} totalSteps={steps.length} answers={answers} onChange={handleChange} onNext={handleNext} onBack={handleBack} />
        )}
        {screen === "loading" && <LoadingScreen />}
        {screen === "result" && result && (
          <ResultScreen result={result} isPaid={isPaid} onUnlock={handleUnlock} onRestart={restart} />
        )}
        {screen === "error" && (
          <div style={{ textAlign: "center" }}>
            <div style={{ background: "#fcebeb", border: "0.5px solid #f7c1c1", borderRadius: 10, padding: "1rem", fontSize: 14, color: "#a32d2d", marginBottom: "1rem" }}>
              {errorMsg}
            </div>
            <button onClick={restart} style={{ background: "transparent", border: "0.5px solid #ccc", borderRadius: 10, padding: "11px 20px", fontSize: 14, color: "#777", width: "100%", cursor: "pointer" }}>
              Try again
            </button>
          </div>
        )}
      </div>
      <p style={{ marginTop: "1.5rem", fontSize: 12, color: "#bbb" }}>Built with Next.js · Powered by Claude AI · No data stored</p>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense>
      <HomeInner />
    </Suspense>
  );
}
