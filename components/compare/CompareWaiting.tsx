"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CompareInvite } from "@/components/compare/CompareActions";

/**
 * The "waiting for the partner" screen (Phase 6.2). Both people land on the
 * same URL, but it means different things to each:
 *   - the CREATOR (who started the comparison) needs the share link;
 *   - the INVITEE (who followed the link, hasn't taken the test yet) needs a
 *     "your partner invited you — take the test" prompt.
 * There's no account/cookie to tell them apart server-side, so we mark the
 * creator in their own browser when they start the comparison (CompareStart)
 * and read that flag here.
 */

const eyebrow = { fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 12 } as const;
const h1 = { fontFamily: "var(--serif)", fontWeight: 400, fontSize: 40, color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "0.75rem" } as const;
const body = { fontSize: 16, color: "var(--text-2)", lineHeight: 1.7, marginBottom: "1.5rem" } as const;
const card = { background: "#fff", border: "1px solid var(--line-light)", borderRadius: 24, padding: "1.75rem" } as const;

export default function CompareWaiting({ id }: { id: string }) {
  // null = not yet determined (first client paint); avoids showing the wrong
  // screen before we can read localStorage.
  const [isCreator, setIsCreator] = useState<boolean | null>(null);

  useEffect(() => {
    let creator = false;
    try { creator = localStorage.getItem(`cq_compare_creator_${id}`) === "1"; } catch { /* no-op */ }
    setIsCreator(creator);
  }, [id]);

  if (isCreator === null) {
    // Brief placeholder to prevent a flash of the wrong message.
    return (
      <>
        <p style={eyebrow}>Couple comparison</p>
        <div style={{ ...card, color: "var(--text-2)" }}>Loading…</div>
      </>
    );
  }

  if (isCreator) {
    return (
      <>
        <p style={eyebrow}>Couple comparison</p>
        <h1 style={h1}>Waiting for your partner</h1>
        <p style={body}>
          You&apos;ve taken the test. Send your partner the link below — they take it on their own, and once you both have, we&apos;ll show you where you see things the same way and where you differ, using only your eight dimension scores, never your answers.
        </p>
        <div style={card}><CompareInvite id={id} /></div>
      </>
    );
  }

  // Invitee: followed the link, hasn't taken the test yet.
  return (
    <>
      <p style={eyebrow}>Couple comparison</p>
      <h1 style={h1}>Your partner invited you</h1>
      <p style={body}>
        Your partner took our relationship test and wants to compare privately with you. Take it yourself — it&apos;s the same 15 questions. Only your eight dimension scores are shared, never your answers, and the comparison only appears once you both take part.
      </p>
      <div style={card}>
        <Link href={`/relationship-test?compare=${id}`} style={{ background: "var(--violet-deep)", color: "#fff", border: "none", borderRadius: 999, padding: "14px 28px", fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
          Take the test →
        </Link>
      </div>
    </>
  );
}
