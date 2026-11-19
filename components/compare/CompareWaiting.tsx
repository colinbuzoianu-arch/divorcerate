"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CompareInvite } from "@/components/compare/CompareActions";
import { localizeHref, type Locale } from "@/lib/i18n/config";

const COPY = {
  en: {
    eyebrow: "Couple comparison",
    loading: "Loading…",
    creatorTitle: "Waiting for your partner",
    creatorBody: "You've taken the test. Send your partner the link below — they take it on their own, and once you both have, we'll show you where you see things the same way and where you differ, using only your eight dimension scores, never your answers.",
    inviteeTitle: "Your partner invited you",
    inviteeBody: "Your partner took our relationship test and wants to compare privately with you. Take it yourself — it's the same 15 questions. Only your eight dimension scores are shared, never your answers, and the comparison only appears once you both take part.",
    takeTest: "Take the test →",
  },
  de: {
    eyebrow: "Paar-Vergleich",
    loading: "Wird geladen…",
    creatorTitle: "Warten auf deine:n Partner:in",
    creatorBody: "Du hast den Test gemacht. Schick deiner:deinem Partner:in den Link unten – sie:er macht ihn für sich, und sobald ihr beide fertig seid, zeigen wir euch, wo ihr die Dinge gleich seht und wo ihr euch unterscheidet, nur anhand eurer acht Dimensions-Scores, nie eurer Antworten.",
    inviteeTitle: "Dein:e Partner:in hat dich eingeladen",
    inviteeBody: "Dein:e Partner:in hat unseren Beziehungstest gemacht und möchte sich privat mit dir vergleichen. Mach ihn selbst – es sind dieselben 15 Fragen. Nur deine acht Dimensions-Scores werden geteilt, nie deine Antworten, und der Vergleich erscheint erst, wenn ihr beide teilnehmt.",
    takeTest: "Test machen →",
  },
};

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

export default function CompareWaiting({ id, locale = "en" }: { id: string; locale?: Locale }) {
  const t = COPY[locale];
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
        <p style={eyebrow}>{t.eyebrow}</p>
        <div style={{ ...card, color: "var(--text-2)" }}>{t.loading}</div>
      </>
    );
  }

  if (isCreator) {
    return (
      <>
        <p style={eyebrow}>{t.eyebrow}</p>
        <h1 style={h1}>{t.creatorTitle}</h1>
        <p style={body}>{t.creatorBody}</p>
        <div style={card}><CompareInvite id={id} locale={locale} /></div>
      </>
    );
  }

  // Invitee: followed the link, hasn't taken the test yet.
  return (
    <>
      <p style={eyebrow}>{t.eyebrow}</p>
      <h1 style={h1}>{t.inviteeTitle}</h1>
      <p style={body}>{t.inviteeBody}</p>
      <div style={card}>
        <Link href={`${localizeHref("/relationship-test", locale)}?compare=${id}`} style={{ background: "var(--violet-deep)", color: "#fff", border: "none", borderRadius: 999, padding: "14px 28px", fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
          {t.takeTest}
        </Link>
      </div>
    </>
  );
}
