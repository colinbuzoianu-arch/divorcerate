import type { Metadata } from "next";
import Link from "next/link";
import Analyzer from "@/components/analyzer/Analyzer";

export const metadata: Metadata = {
  title: "Relationship Test: Free, Private Relationship Health Check | CoupleIQ",
  description:
    "Take the free, private 5-minute relationship test. Answer 15 questions about how you communicate, handle conflict, repair and trust, and see where your relationship stands.",
  alternates: { canonical: "https://splitornot.com/relationship-test" },
};

export default function RelationshipTestPage({ searchParams }: { searchParams: { compare?: string } }) {
  const comparing = Boolean(searchParams?.compare);
  return (
    <main style={{ background: "var(--ink)", minHeight: "100vh", padding: "1.5rem 1rem 3rem", fontFamily: "var(--sans)", color: "var(--on-dark)" }}>
      <div style={{ maxWidth: 620, margin: "0 auto" }}>
        {comparing && (
          <div style={{ maxWidth: 620, margin: "0 auto 1.25rem", background: "rgba(139,124,255,0.12)", border: "1px solid var(--line-dark)", borderRadius: 16, padding: "12px 16px", fontSize: 13, color: "var(--on-dark-2)", lineHeight: 1.6 }}>
            Your partner invited you to compare. Taking this shares only your eight dimension <strong style={{ color: "var(--on-dark)" }}>scores</strong> with them — never your answers or anything you type.
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <span aria-hidden="true" style={{ position: "relative", width: 30, height: 22, flex: "none" }}>
              <span style={{ position: "absolute", top: 0, left: 0, width: 22, height: 22, borderRadius: "50%", background: "var(--violet)", mixBlendMode: "screen" }} />
              <span style={{ position: "absolute", top: 0, right: 0, width: 22, height: 22, borderRadius: "50%", background: "var(--ember)", mixBlendMode: "screen" }} />
            </span>
            <span style={{ fontFamily: "var(--serif)", fontSize: 24, color: "var(--on-dark)", letterSpacing: "-0.01em" }}>CoupleIQ</span>
          </Link>
          <Link href="/" style={{ fontSize: 13, color: "var(--on-dark-2)", textDecoration: "none" }}>← Home</Link>
        </div>

        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <h1 style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 40, color: "var(--on-dark)", letterSpacing: "-0.02em", marginBottom: 10, lineHeight: 1 }}>
            The relationship test
          </h1>
          <p style={{ fontSize: 15, color: "var(--on-dark-2)", lineHeight: 1.6, maxWidth: 460, margin: "0 auto" }}>
            Fifteen questions about how you talk, fight, repair and trust. Private, no account, about
            5 minutes. Answer honestly — the more candid you are, the more useful your result.
          </p>
        </div>

        <Analyzer />

        <p style={{ marginTop: "1.5rem", fontSize: 12, color: "var(--on-dark-2)", textAlign: "center", lineHeight: 1.6 }}>
          For self-reflection only — not a diagnosis or a substitute for professional help. If you
          feel unsafe, see{" "}
          <Link href="/support-resources" style={{ color: "var(--on-dark)", textDecoration: "underline" }}>support resources</Link>.
        </p>
      </div>
    </main>
  );
}
