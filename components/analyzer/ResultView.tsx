"use client";

import { useRouter } from "next/navigation";
import ResultScreen from "@/components/ResultScreen";
import type { AnalysisResult, FreeResult } from "@/lib/types";
import { track } from "@/lib/analytics";

/**
 * Client wrapper for a stored result (Phase 2.1). The /r/[id] server page reads
 * the result from KV and passes it here; this provides the unlock (Stripe) and
 * restart actions. The full report is only present when `isPaid` is true.
 */
export default function ResultView({
  result,
  isPaid,
  resultId,
}: {
  result: AnalysisResult | FreeResult;
  isPaid: boolean;
  resultId: string;
}) {
  const router = useRouter();

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

  return (
    <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #efefed", padding: "1.75rem", width: "100%", maxWidth: 620, margin: "0 auto", boxShadow: "0 2px 24px rgba(0,0,0,0.05)" }}>
      <ResultScreen result={result} isPaid={isPaid} onUnlock={handleUnlock} onRestart={handleRestart} />
    </div>
  );
}
