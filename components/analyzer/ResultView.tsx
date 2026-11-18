"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ResultScreen from "@/components/ResultScreen";
import type { StoredResult, FreeResult, Narrative } from "@/lib/types";
import { track } from "@/lib/analytics";

/**
 * Client wrapper for a stored result (Phase 2.1 / 3.2). Provides the Stripe
 * unlock + restart actions, and — when paid but the narrative isn't cached yet
 * — generates it via /api/result/[id]/narrative while showing a "preparing
 * your report" state, instead of blocking the server render.
 */
export default function ResultView({
  result,
  isPaid,
  resultId,
}: {
  result: StoredResult | FreeResult;
  isPaid: boolean;
  resultId: string;
}) {
  const router = useRouter();
  const [narrative, setNarrative] = useState<Narrative | undefined>((result as StoredResult).narrative);
  const [generating, setGenerating] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (!isPaid || narrative || started.current) return;
    started.current = true;
    setGenerating(true);
    (async () => {
      try {
        const res = await fetch(`/api/result/${resultId}/narrative`, { method: "POST" });
        const data = await res.json();
        if (res.ok && data.narrative) setNarrative(data.narrative as Narrative);
      } catch {
        /* leave narrative undefined — ResultScreen shows a retry hint */
      } finally {
        setGenerating(false);
      }
    })();
  }, [isPaid, narrative, resultId]);

  const handleUnlock = async () => {
    track("checkout_start", { value: 4.99, currency: "USD" });
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resultId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("Could not start checkout. Please try again.");
    } catch {
      alert("Could not start checkout. Please try again.");
    }
  };

  const handleRestart = () => router.push("/relationship-test");

  const merged: StoredResult | FreeResult = narrative ? { ...(result as StoredResult), narrative } : result;

  return (
    <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #efefed", padding: "1.75rem", width: "100%", maxWidth: 620, margin: "0 auto", boxShadow: "0 2px 24px rgba(0,0,0,0.05)" }}>
      <ResultScreen result={merged} isPaid={isPaid} generating={generating} resultId={resultId} onUnlock={handleUnlock} onRestart={handleRestart} />
    </div>
  );
}
