"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    const token = searchParams.get("token");

    if (!sessionId) {
      setStatus("error");
      return;
    }

    async function verify() {
      try {
        const res = await fetch(`/api/verify-payment?session_id=${sessionId}`);
        const data = await res.json();

        if (data.paid) {
          // Store unlock in localStorage so result page can read it
          localStorage.setItem(`paid_${token}`, "true");
          setStatus("success");
          // Redirect back to home with the token so the result re-renders
          setTimeout(() => {
            router.push(`/?unlocked=${token}`);
          }, 1500);
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    }

    verify();
  }, [searchParams, router]);

  return (
    <main
      style={{
        background: "#f0efed",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
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
            <div style={{ width: 40, height: 40, border: "3px solid #eeedfe", borderTopColor: "#534ab7", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 1rem" }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ fontSize: 16, fontWeight: 500, color: "#1a1a1a", marginBottom: 8 }}>Verifying your payment…</p>
            <p style={{ fontSize: 14, color: "#777" }}>Just a moment</p>
          </>
        )}

        {status === "success" && (
          <>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#e1f5ee", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", fontSize: 24 }}>
              ✓
            </div>
            <p style={{ fontSize: 18, fontWeight: 500, color: "#1a1a1a", marginBottom: 8 }}>Payment confirmed!</p>
            <p style={{ fontSize: 14, color: "#777" }}>Taking you back to your full report…</p>
          </>
        )}

        {status === "error" && (
          <>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#fcebeb", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", fontSize: 24 }}>
              !
            </div>
            <p style={{ fontSize: 18, fontWeight: 500, color: "#1a1a1a", marginBottom: 8 }}>Something went wrong</p>
            <p style={{ fontSize: 14, color: "#777", marginBottom: "1.5rem" }}>We couldn't verify your payment. If you were charged, please contact support.</p>
            <button
              onClick={() => router.push("/")}
              style={{ background: "#534ab7", color: "#fff", border: "none", borderRadius: 10, padding: "12px 24px", fontSize: 14, fontWeight: 500, cursor: "pointer" }}
            >
              Back to home
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
