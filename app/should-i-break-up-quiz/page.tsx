import type { Metadata } from "next";
import Link from "next/link";
import BrandMark from "@/components/layout/BrandMark";
import MiniQuiz from "@/components/MiniQuiz";
import JsonLd from "@/components/JsonLd";
import { faqPageLd } from "@/lib/seo";
import { shouldIBreakUpQuiz } from "@/lib/quizzes/should-i-break-up";

export const metadata: Metadata = {
  title: "Should I Break Up? A Free Quiz to Help You Decide | CoupleIQ",
  description:
    "A free, private 'should I break up?' quiz. Eight honest questions to help you tell a rough patch from the end of the road — plus what the signs really mean.",
  alternates: { canonical: "https://splitornot.com/should-i-break-up-quiz" },
};

const faqs = [
  { q: "Can a quiz really tell me whether to break up?", a: "No — and you should be wary of any that claims to. No quiz can decide this for you. What a good one can do is help you organise what you already feel, notice patterns you've been avoiding, and get clearer before a conversation or a decision. The verdict is always yours." },
  { q: "Is this quiz private?", a: "Yes. This quick quiz is scored entirely in your browser — your answers are never sent anywhere or stored. The longer relationship test is also private and needs no account." },
  { q: "What's the difference between this and the full test?", a: "This is an eight-question gut-check. The full relationship test scores eight dimensions of your relationship, names your pattern, and gives you specific next steps — a much fuller picture when you're ready for it." },
  { q: "What if I'm scared of my partner?", a: "Then a quiz isn't what you need right now. Fear, control and feeling unsafe are not relationship problems to 'work on' — they're reasons to reach out for confidential help. See our support resources." },
];

const h2 = { fontFamily: "var(--serif)", fontWeight: 400, fontSize: 30, color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 0.9rem" } as const;
const para = { fontSize: 15.5, color: "var(--text-2)", lineHeight: 1.8, margin: "0 0 1rem" } as const;
const li = { fontSize: 15, color: "var(--text-2)", lineHeight: 1.7, marginBottom: 8 } as const;

export default function ShouldIBreakUpQuizPage() {
  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", padding: "2rem 1rem 4rem", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "var(--sans)", color: "var(--text)" }}>
      <JsonLd data={faqPageLd(faqs)} />
      <div style={{ width: "100%", maxWidth: 720 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem" }}>
          <Link href="/" style={{ textDecoration: "none" }}><BrandMark /></Link>
          <Link href="/relationship-test" style={{ fontSize: 13, color: "var(--text-2)", textDecoration: "none" }}>Full test →</Link>
        </div>

        <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 12 }}>Free · Private · 2 minutes</p>
        <h1 style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 48, color: "var(--text)", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: "1rem" }}>
          Should I break up?
        </h1>
        <p style={{ fontSize: 18, color: "var(--text-2)", lineHeight: 1.7, marginBottom: "2rem" }}>
          If you&apos;re asking the question, you already know something feels off. This short, private quiz
          won&apos;t decide for you — but it will help you think more clearly about whether what you&apos;re in
          is a rough patch or something more.
        </p>

        <div style={{ marginBottom: "2.5rem" }}>
          <MiniQuiz config={shouldIBreakUpQuiz} />
        </div>

        <article style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <section>
            <h2 style={h2}>Why &quot;should I break up?&quot; is so hard to answer</h2>
            <p style={para}>
              Almost nobody ends a relationship because of one clear, dramatic reason. Far more often it&apos;s a
              slow accumulation of smaller things — a fading friendship, a trust that never quite rebuilt, a
              sense of walking on eggshells, a future you can no longer picture. Because none of those is a
              single, nameable event, they&apos;re easy to doubt. You tell yourself every couple goes through
              this. Sometimes that&apos;s true. Sometimes it&apos;s how people stay somewhere that stopped being
              good for them years ago.
            </p>
            <p style={para}>
              The question is genuinely hard because two things can be true at once: you can love someone and
              still be in a relationship that isn&apos;t working. Ambivalence isn&apos;t a sign you&apos;re being
              dramatic — it&apos;s the normal emotional texture of a hard decision. The goal isn&apos;t to make the
              doubt disappear. It&apos;s to understand it well enough to act on it, in whichever direction is
              right for you.
            </p>
          </section>

          <section>
            <h2 style={h2}>Signs it might be a rough patch</h2>
            <p style={para}>Hard seasons are normal, and they&apos;re often survivable. It may be more of a rough patch if:</p>
            <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li style={li}>You still fundamentally respect and like each other, even when you&apos;re frustrated.</li>
              <li style={li}>The strain tracks to something specific and external — a new baby, a job loss, grief, illness.</li>
              <li style={li}>You both still want it to work and are willing to do something about it.</li>
              <li style={li}>You can still repair after a fight — someone softens, and you find your way back.</li>
              <li style={li}>When you imagine the future, you still want them in it.</li>
            </ul>
          </section>

          <section>
            <h2 style={h2}>Signs worth taking more seriously</h2>
            <p style={para}>Some patterns tend to compound rather than pass. It&apos;s worth paying closer attention if:</p>
            <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li style={li}>There&apos;s contempt — sarcasm, mockery, eye-rolling, a sense of being looked down on. Research treats this as the most corrosive dynamic a couple can have.</li>
              <li style={li}>You consistently feel disrespected, unseen, or lonelier inside the relationship than you would be outside it.</li>
              <li style={li}>Trust has been broken and never genuinely rebuilt.</li>
              <li style={li}>You&apos;re the only one trying, and have been for a long time.</li>
              <li style={li}>You don&apos;t like who you&apos;ve become in the relationship.</li>
              <li style={li}>The main things keeping you together are logistics and fear, not connection.</li>
            </ul>
            <p style={{ ...para, marginTop: "1rem" }}>
              None of these is an automatic verdict. But several of them together is the kind of thing a quick
              quiz can help you see more honestly — and a fuller assessment can map in detail.
            </p>
          </section>

          <section>
            <h2 style={h2}>What this quiz can — and can&apos;t — tell you</h2>
            <p style={para}>
              This is a tool for reflection, not a diagnosis or a prediction. It reflects your perspective on a
              single day, and your partner might answer very differently. It can&apos;t tell you what to do, and
              it can&apos;t account for everything that makes your relationship yours. What it can do is give the
              swirl in your head a bit of shape, and point you toward the conversations — or the support — that
              might actually move things.
            </p>
            <p style={para}>
              If you want to go deeper, the{" "}
              <Link href="/relationship-test" style={{ color: "var(--violet-deep)", fontWeight: 600 }}>full relationship test</Link>{" "}
              scores eight dimensions — communication, conflict and repair, contempt, friendship, respect,
              trust, support and shared vision — names your{" "}
              <Link href="/patterns/pursuer-withdrawer" style={{ color: "var(--violet-deep)", fontWeight: 600 }}>relationship pattern</Link>, and shows you where to focus. You can also read our longer piece on{" "}
              <Link href="/blog/should-i-break-up" style={{ color: "var(--violet-deep)", fontWeight: 600 }}>the signs a relationship may be over</Link>.
            </p>
          </section>

          <section style={{ background: "var(--paper-2)", borderRadius: 24, padding: "1.75rem" }}>
            <h2 style={{ ...h2, fontSize: 24 }}>If you don&apos;t feel safe</h2>
            <p style={{ ...para, margin: 0 }}>
              If you feel afraid of your partner, controlled, or unsafe at home, this is not a question for a
              quiz. Those aren&apos;t problems to &quot;work on&quot; — they&apos;re reasons to reach out for confidential
              help. Please see our{" "}
              <Link href="/support-resources" style={{ color: "var(--violet-deep)", fontWeight: 600 }}>support resources</Link>. Your safety comes first.
            </p>
          </section>

          <section>
            <h2 style={h2}>Questions, answered</h2>
            <div>
              {faqs.map((f) => (
                <details key={f.q} style={{ borderBottom: "1px solid var(--line-light)", padding: "14px 0" }}>
                  <summary style={{ fontSize: 16, fontWeight: 600, color: "var(--text)", cursor: "pointer" }}>{f.q}</summary>
                  <p style={{ ...para, margin: "10px 0 0", fontSize: 14.5 }}>{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </article>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <Link href="/relationship-test" style={{ background: "var(--violet-deep)", color: "#fff", borderRadius: 999, padding: "14px 30px", fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
            Take the full relationship test →
          </Link>
        </div>
      </div>
    </main>
  );
}
