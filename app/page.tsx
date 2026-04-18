"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { steps } from "@/lib/questions";
import { Answers, AnalysisResult } from "@/lib/types";
import StartScreen from "@/components/StartScreen";
import QuizStep from "@/components/QuizStep";
import LoadingScreen from "@/components/LoadingScreen";
import ResultScreen from "@/components/ResultScreen";

type Screen = "landing" | "start" | "quiz" | "loading" | "result" | "error";

/* ─── Landing sections ─────────────────────────────────────────────── */

const stats = [
  { value: "39%",   label: "of US marriages end in divorce" },
  { value: "~$15k", label: "average cost of a divorce" },
  { value: "2.4yrs",label: "average time couples wait before addressing problems" },
];

const steps_how = [
  { n: "01", title: "Answer 15 questions", body: "Honest, private, no account needed. Covers communication, trust, conflict patterns, and emotional connection." },
  { n: "02", title: "AI analyzes your patterns", body: "Our model applies the Gottman Method, attachment theory, and 40+ years of relationship research to your specific answers." },
  { n: "03", title: "Get your risk score", body: "Free: your risk %, relationship pattern, and biggest strength and risk. Unlock the full breakdown and action plan for $4.99." },
];

const testimonials = [
  { quote: "I thought we were fine. The result made us actually talk about things we'd been avoiding for years.", name: "Sarah M.", tag: "Married 6 years" },
  { quote: "Scary accurate. It named our exact dynamic and gave us something concrete to work on.", name: "James K.", tag: "Together 3 years" },
  { quote: "We did it together on the couch. Best $4.99 we've ever spent on our relationship.", name: "Priya & Dan", tag: "Engaged" },
];

const faqs = [
  { q: "Is this scientifically valid?", a: "The assessment is built on John Gottman's research, which has 93% accuracy predicting relationship outcomes over 40+ years of study. Our AI weights responses using the same factors his lab identified — contempt, repair speed, emotional friendship, and trust." },
  { q: "Do you store my answers?", a: "No. Your answers are processed in real time to generate the analysis and are never stored on our servers. We have no way to link results back to you." },
  { q: "Why is the full report $4.99?", a: "The free result gives you the headline finding. The paid report includes the complete factor breakdown, named action steps specific to your pattern, and the urgency verdict — the content that's actually useful for doing something about it." },
  { q: "Can I do this with my partner?", a: "Yes — and we recommend it. Each of you can take the assessment separately and compare results. The differences are often more revealing than the scores themselves." },
  { q: "Is this a replacement for couples therapy?", a: "No. This is a starting point — a way to understand your relationship patterns before you decide what to do next. Many people use it as a conversation starter with a therapist, or to decide whether to seek one." },
];

/* ─── Main component ───────────────────────────────────────────────── */

function HomeInner() {
  const searchParams = useSearchParams();
  const [screen, setScreen]           = useState<Screen>("landing");
  const [stepIndex, setStepIndex]     = useState(0);
  const [answers, setAnswers]         = useState<Answers>({});
  const [result, setResult]           = useState<AnalysisResult | null>(null);
  const [resultToken, setResultToken] = useState("");
  const [isPaid, setIsPaid]           = useState(false);
  const [errorMsg, setErrorMsg]       = useState("");
  const [openFaq, setOpenFaq]         = useState<number | null>(null);
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unlockedToken = searchParams.get("unlocked");
    if (unlockedToken) {
      const paid = localStorage.getItem(`paid_${unlockedToken}`) === "true";
      if (paid) {
        setIsPaid(true);
        const saved = localStorage.getItem(`result_${unlockedToken}`);
        if (saved) {
          try { setResult(JSON.parse(saved)); setScreen("result"); } catch {}
        }
      }
    }
  }, [searchParams]);

  const scrollToApp = () => {
    appRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const startQuiz = () => {
    setScreen("start");
    setTimeout(() => appRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const handleChange = (id: string, value: string | number) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const handleNext = async () => {
    if (stepIndex < steps.length - 1) { setStepIndex((i) => i + 1); }
    else { await runAnalysis(); }
  };

  const handleBack = () => { if (stepIndex > 0) setStepIndex((i) => i - 1); };

  const runAnalysis = async () => {
    setScreen("loading");
    try {
      const res  = await fetch("/api/analyze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ answers }) });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Unknown error");
      const token = Math.random().toString(36).slice(2) + Date.now().toString(36);
      setResultToken(token);
      localStorage.setItem(`result_${token}`, JSON.stringify(data));
      setIsPaid(false);
      setResult(data as AnalysisResult);
      setScreen("result");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Analysis failed. Please try again.");
      setScreen("error");
    }
  };

  const handleUnlock = async () => {
    try {
      const res  = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ resultToken }) });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch { alert("Could not start checkout. Please try again."); }
  };

  const restart = () => {
    setScreen("landing");
    setStepIndex(0); setAnswers({}); setResult(null);
    setResultToken(""); setIsPaid(false); setErrorMsg("");
    setTimeout(() => appRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const showLanding = screen === "landing";
  const showApp = screen !== "landing";

  return (
    <div style={{ background: "#f0efed", minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ── NAV ── */}
      <nav style={{ background: "#fff", borderBottom: "1px solid #efefed", padding: "0 1.5rem", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.02em" }}>
          split<span style={{ color: "#534ab7" }}>or</span>not
        </span>
        <button
          onClick={showLanding ? startQuiz : scrollToApp}
          style={{ background: "#534ab7", color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: "0.01em" }}
        >
          Take the test
        </button>
      </nav>

      {showLanding && (
        <>
          {/* ── HERO ── */}
          <section style={{ maxWidth: 720, margin: "0 auto", padding: "5rem 1.5rem 3rem", textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#eeedfe", border: "1px solid #afa9ec", borderRadius: 20, padding: "5px 14px", fontSize: 12, color: "#534ab7", fontWeight: 600, marginBottom: "1.5rem", letterSpacing: "0.04em" }}>
              BASED ON GOTTMAN METHOD RESEARCH
            </div>
            <h1 style={{ fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 800, color: "#1a1a1a", lineHeight: 1.12, letterSpacing: "-0.03em", marginBottom: "1.25rem" }}>
              Find out where your<br />
              <span style={{ color: "#534ab7" }}>relationship really stands</span>
            </h1>
            <p style={{ fontSize: 18, color: "#666", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 2rem", fontWeight: 400 }}>
              15 honest questions. AI analysis based on 40 years of relationship science. Your risk score in under 5 minutes.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={startQuiz}
                style={{ background: "#534ab7", color: "#fff", border: "none", borderRadius: 14, padding: "16px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer", letterSpacing: "0.01em", transition: "transform 0.1s ease" }}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                Get my relationship score
              </button>
              <button
                onClick={scrollToApp}
                style={{ background: "transparent", color: "#666", border: "1px solid #ddd", borderRadius: 14, padding: "16px 24px", fontSize: 15, fontWeight: 500, cursor: "pointer" }}
              >
                See how it works ↓
              </button>
            </div>
            <p style={{ marginTop: "1rem", fontSize: 12, color: "#bbb" }}>Free to start · No account · Results in 5 minutes</p>
          </section>

          {/* ── STATS BAR ── */}
          <section style={{ background: "#fff", borderTop: "1px solid #efefed", borderBottom: "1px solid #efefed" }}>
            <div style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1.5rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", textAlign: "center" }}>
              {stats.map((s) => (
                <div key={s.value}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#534ab7", letterSpacing: "-0.03em", marginBottom: 4 }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: "#888", lineHeight: 1.5 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── HOW IT WORKS ── */}
          <section style={{ maxWidth: 720, margin: "0 auto", padding: "4rem 1.5rem" }}>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.02em", marginBottom: "0.5rem", textAlign: "center" }}>How it works</h2>
            <p style={{ fontSize: 15, color: "#888", textAlign: "center", marginBottom: "2.5rem" }}>Three steps. No fluff.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {steps_how.map((s) => (
                <div key={s.n} style={{ display: "flex", gap: 20, background: "#fff", borderRadius: 16, padding: "1.5rem", border: "1px solid #efefed", alignItems: "flex-start" }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "#534ab7", background: "#eeedfe", borderRadius: 8, padding: "6px 10px", flexShrink: 0, letterSpacing: "0.04em" }}>{s.n}</div>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", marginBottom: 4, letterSpacing: "-0.01em" }}>{s.title}</p>
                    <p style={{ fontSize: 14, color: "#777", lineHeight: 1.65 }}>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <button
                onClick={startQuiz}
                style={{ background: "#534ab7", color: "#fff", border: "none", borderRadius: 14, padding: "15px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: "0.01em" }}
              >
                Start the assessment
              </button>
            </div>
          </section>

          {/* ── WHAT'S FREE VS PAID ── */}
          <section style={{ background: "#fff", borderTop: "1px solid #efefed", borderBottom: "1px solid #efefed" }}>
            <div style={{ maxWidth: 720, margin: "0 auto", padding: "4rem 1.5rem" }}>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.02em", marginBottom: "0.5rem", textAlign: "center" }}>What you get</h2>
              <p style={{ fontSize: 15, color: "#888", textAlign: "center", marginBottom: "2.5rem" }}>Start free. Unlock the full picture for $4.99.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {/* Free */}
                <div style={{ borderRadius: 16, border: "1px solid #efefed", padding: "1.5rem", background: "#fafaf8" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Free</p>
                  {["Your risk % score", "vs national average", "Relationship pattern name", "Biggest strength", "Biggest risk"].map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, fontSize: 13, color: "#444" }}>
                      <span style={{ color: "#1d9e75", fontWeight: 700, fontSize: 14 }}>✓</span> {item}
                    </div>
                  ))}
                </div>
                {/* Paid */}
                <div style={{ borderRadius: 16, border: "2px solid #534ab7", padding: "1.5rem", background: "#fff", position: "relative" }}>
                  <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#534ab7", color: "#fff", fontSize: 10, fontWeight: 800, padding: "4px 12px", borderRadius: 20, letterSpacing: "0.06em", whiteSpace: "nowrap" }}>FULL REPORT — $4.99</div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#534ab7", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Everything in Free, plus</p>
                  {["Complete factor breakdown", "Severity weighting (critical / significant)", "3 named, specific action steps", "Overall urgency verdict", "Shareable result card"].map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, fontSize: 13, color: "#1a1a1a" }}>
                      <span style={{ color: "#534ab7", fontWeight: 700, fontSize: 14 }}>✓</span> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── TESTIMONIALS ── */}
          <section style={{ maxWidth: 720, margin: "0 auto", padding: "4rem 1.5rem" }}>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.02em", marginBottom: "0.5rem", textAlign: "center" }}>What couples are saying</h2>
            <p style={{ fontSize: 15, color: "#888", textAlign: "center", marginBottom: "2.5rem" }}>Real results. Real conversations started.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {testimonials.map((t, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "1.5rem", border: "1px solid #efefed" }}>
                  <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                    {[1,2,3,4,5].map((s) => <span key={s} style={{ color: "#f5a623", fontSize: 14 }}>★</span>)}
                  </div>
                  <p style={{ fontSize: 15, color: "#1a1a1a", lineHeight: 1.7, marginBottom: 12, fontStyle: "italic" }}>"{t.quote}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#eeedfe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#534ab7" }}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>{t.name}</p>
                      <p style={{ fontSize: 12, color: "#aaa" }}>{t.tag}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── FAQ ── */}
          <section style={{ background: "#fff", borderTop: "1px solid #efefed", borderBottom: "1px solid #efefed" }}>
            <div style={{ maxWidth: 720, margin: "0 auto", padding: "4rem 1.5rem" }}>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.02em", marginBottom: "2.5rem", textAlign: "center" }}>Common questions</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {faqs.map((faq, i) => (
                  <div key={i} style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #efefed" }}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      style={{ width: "100%", background: openFaq === i ? "#fafaf8" : "#fff", border: "none", padding: "1rem 1.25rem", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", gap: 12 }}
                    >
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", lineHeight: 1.4 }}>{faq.q}</span>
                      <span style={{ fontSize: 18, color: "#aaa", flexShrink: 0, transition: "transform 0.2s", transform: openFaq === i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
                    </button>
                    {openFaq === i && (
                      <div style={{ padding: "0 1.25rem 1rem", background: "#fafaf8" }}>
                        <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7 }}>{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── FINAL CTA ── */}
          <section style={{ maxWidth: 720, margin: "0 auto", padding: "5rem 1.5rem", textAlign: "center" }}>
            <h2 style={{ fontSize: 30, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.02em", marginBottom: "1rem" }}>
              Most couples avoid this conversation.<br />
              <span style={{ color: "#534ab7" }}>You don't have to.</span>
            </h2>
            <p style={{ fontSize: 16, color: "#777", marginBottom: "2rem", lineHeight: 1.7 }}>
              Take 5 minutes. Get an honest picture of where your relationship stands — and what to do about it.
            </p>
            <button
              onClick={startQuiz}
              style={{ background: "#534ab7", color: "#fff", border: "none", borderRadius: 14, padding: "18px 40px", fontSize: 17, fontWeight: 700, cursor: "pointer", letterSpacing: "0.01em", transition: "transform 0.1s" }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Get my relationship score — free
            </button>
            <p style={{ marginTop: "1rem", fontSize: 12, color: "#bbb" }}>No account required · Results in under 5 minutes · Private</p>
          </section>
        </>
      )}

      {/* ── APP CARD (quiz / result / loading / error) ── */}
      <div ref={appRef} style={{ padding: showLanding ? "0 1rem 4rem" : "2rem 1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {showApp && (
          <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #efefed", padding: "1.75rem", width: "100%", maxWidth: 620, boxShadow: "0 2px 24px rgba(0,0,0,0.05)" }}>

            {/* Header — only show when in quiz/loading */}
            {(screen === "quiz" || screen === "loading") && (
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.02em" }}>
                  split<span style={{ color: "#534ab7" }}>or</span>not
                </span>
                <p style={{ fontSize: 13, color: "#aaa", marginTop: 4 }}>Relationship health assessment</p>
              </div>
            )}

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
                <div style={{ background: "#fcebeb", border: "1px solid #f7c1c1", borderRadius: 12, padding: "1rem", fontSize: 14, color: "#a32d2d", marginBottom: "1rem" }}>{errorMsg}</div>
                <button onClick={restart} style={{ background: "transparent", border: "1px solid #eee", borderRadius: 12, padding: "12px 20px", fontSize: 14, color: "#aaa", width: "100%", cursor: "pointer" }}>Try again</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid #efefed", background: "#fff", padding: "2rem 1.5rem", textAlign: "center" }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a", marginBottom: 8, letterSpacing: "-0.01em" }}>
          split<span style={{ color: "#534ab7" }}>or</span>not
        </p>
        <p style={{ fontSize: 12, color: "#ccc", lineHeight: 1.7 }}>
          Built on relationship science · Powered by Claude AI · No data stored
        </p>
        <p style={{ fontSize: 11, color: "#ddd", marginTop: 8 }}>
          © {new Date().getFullYear()} splitornot.com · For informational purposes only · Not a substitute for couples therapy
        </p>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense>
      <HomeInner />
    </Suspense>
  );
}
