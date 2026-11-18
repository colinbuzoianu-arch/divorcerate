"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { track } from "@/lib/analytics";

const POLL_INTERVAL_MS = 1500;
const MAX_ATTEMPTS = 20; // ~30s

function SuccessInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const firedPurchase = useRef(false);

  const resultId = searchParams.get("result");

  useEffect(() => {
    if (!resultId) {
      setStatus("error");
      return;
    }

    let attempts = 0;
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    async function poll() {
      attempts += 1;
      try {
        const res = await fetch(`/api/result/${resultId}`, { cache: "no-store" });
        const data = await res.json();
        if (cancelled) return;

        if (res.ok && data.paid) {
          if (!firedPurchase.current) {
            firedPurchase.current = true;
            track("purchase", {
              transaction_id: searchParams.get("session_id") ?? undefined,
              value: 4.99,
              currency: "USD",
            });
          }
          setStatus("success");
          setTimeout(() => router.push(`/r/${resultId}`), 1200);
          return;
        }
      } catch {
        /* keep polling */
      }

      if (cancelled) return;
      if (attempts >= MAX_ATTEMPTS) {
        setStatus("error");
        return;
      }
      timer = setTimeout(poll, POLL_INTERVAL_MS);
    }

    poll();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [resultId, router, searchParams]);

  return (
    <main
      style={{
        background: "var(--ink)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "var(--sans)",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          border: "0.5px solid #e5e5e5",
          padding: "2.5rem 2rem",
          maxWidth: 440,
          width: "100%",
          textAlign: "center",
        }}
      >
        {status === "verifying" && (
          <>
            <div style={{ width: 40, height: 40, border: "3px solid #ece9fb", borderTopColor: "#4B3FB0", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 1rem" }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ fontSize: 16, fontWeight: 500, color: "#1a1a1a", marginBottom: 8 }}>Confirming your payment…</p>
            <p style={{ fontSize: 14, color: "#777" }}>This usually takes a few seconds.</p>
          </>
        )}

        {status === "success" && (
          <>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#e1f5ee", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", fontSize: 24 }}>
              ✓
            </div>
            <p style={{ fontSize: 18, fontWeight: 500, color: "#1a1a1a", marginBottom: 8 }}>Payment confirmed!</p>
            <p style={{ fontSize: 14, color: "#777", marginBottom: 8 }}>Taking you to your full report…</p>
            <p style={{ fontSize: 12, color: "#ccc" }}>
              Questions?{" "}
              <a href="mailto:support.coupleiq@gmail.com" style={{ color: "#aaa", textDecoration: "underline" }}>
                support.coupleiq@gmail.com
              </a>
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#fcebeb", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", fontSize: 24 }}>
              !
            </div>
            <p style={{ fontSize: 18, fontWeight: 500, color: "#1a1a1a", marginBottom: 8 }}>Still processing</p>
            <p style={{ fontSize: 14, color: "#777", marginBottom: "1.5rem" }}>
              {resultId
                ? "Your payment may still be confirming. Open your report below — if it's still locked, give it a minute and refresh."
                : "We couldn't find your result reference. If you were charged, email us at "}
              {!resultId && (
                <a href="mailto:support.coupleiq@gmail.com" style={{ color: "#4B3FB0", textDecoration: "underline" }}>
                  support.coupleiq@gmail.com
                </a>
              )}
            </p>
            <button
              onClick={() => router.push(resultId ? `/r/${resultId}` : "/")}
              style={{ background: "#4B3FB0", color: "#fff", border: "none", borderRadius: 10, padding: "12px 24px", fontSize: 14, fontWeight: 500, cursor: "pointer" }}
            >
              {resultId ? "Open my report" : "Back to home"}
            </button>
          </>
        )}
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessInner />
    </Suspense>
  );
}
