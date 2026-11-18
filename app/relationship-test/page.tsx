import type { Metadata } from "next";
import Link from "next/link";
import Analyzer from "@/components/analyzer/Analyzer";

export const metadata: Metadata = {
  title: "Relationship Test: Free, Private Relationship Health Check | CoupleIQ",
  description:
    "Take the free, private 5-minute relationship test. Answer 15 questions about how you communicate, handle conflict, repair and trust, and see where your relationship stands.",
  alternates: { canonical: "https://splitornot.com/relationship-test" },
};

export default function RelationshipTestPage() {
  return (
    <main style={{ background: "#f0efed", minHeight: "100vh", padding: "1.5rem 1rem 3rem", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ maxWidth: 620, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <img src="/logo.png" alt="CoupleIQ" style={{ width: 28, height: 28, borderRadius: 6, objectFit: "cover" }} />
            <span style={{ fontSize: 15, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.02em" }}>
              Couple<span style={{ color: "#534ab7" }}>IQ</span>
            </span>
          </Link>
          <Link href="/" style={{ fontSize: 13, color: "#999", textDecoration: "none" }}>← Home</Link>
        </div>

        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.02em", marginBottom: 6 }}>
            The relationship test
          </h1>
          <p style={{ fontSize: 14, color: "#777", lineHeight: 1.6, maxWidth: 460, margin: "0 auto" }}>
            Fifteen questions about how you talk, fight, repair and trust. Private, no account, about
            5 minutes. Answer honestly — the more candid you are, the more useful your result.
          </p>
        </div>

        <Analyzer />

        <p style={{ marginTop: "1.5rem", fontSize: 12, color: "#bbb", textAlign: "center", lineHeight: 1.6 }}>
          For self-reflection only — not a diagnosis or a substitute for professional help. If you
          feel unsafe, see{" "}
          <Link href="/support-resources" style={{ color: "#999", textDecoration: "underline" }}>support resources</Link>.
        </p>
      </div>
    </main>
  );
}
