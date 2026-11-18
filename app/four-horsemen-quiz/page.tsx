import type { Metadata } from "next";
import MiniQuizLanding from "@/components/MiniQuizLanding";
import { fourHorsemenQuiz } from "@/lib/quizzes/four-horsemen";

export const metadata: Metadata = {
  title: "Four Horsemen Quiz: Find Your Gottman Conflict Pattern | CoupleIQ",
  description:
    "A free quiz based on Gottman's Four Horsemen — criticism, contempt, defensiveness and stonewalling. Find out which shows up most in your conflicts, and the antidote.",
  alternates: { canonical: "https://splitornot.com/four-horsemen-quiz" },
};

export default function FourHorsemenQuizPage() {
  return (
    <MiniQuizLanding
      config={fourHorsemenQuiz}
      eyebrow="Free · Private · 2 minutes"
      title="The Four Horsemen quiz"
      lede="The relationship researcher John Gottman named four conflict habits so damaging he called them the Four Horsemen. This free quiz shows you which one tends to show up for you — and the antidote that counters it."
      sections={[
        {
          heading: "What are the Four Horsemen?",
          body: [
            "Over decades of watching couples argue in his lab, John Gottman found that it wasn't whether couples fought, or even how often, that predicted trouble — it was how they fought. Four specific habits came up again and again in relationships that struggled, and he named them the Four Horsemen of the Apocalypse: criticism, contempt, defensiveness and stonewalling.",
            "The good news is that each horseman has an 'antidote' — a specific, learnable alternative. Spotting which one you lean on is the first step to swapping it for something that actually works.",
          ],
        },
        {
          heading: "The four — and their antidotes",
          body: [
            "Criticism attacks your partner's character ('you always', 'you never') rather than naming a specific behaviour. The antidote is a gentle start-up: say what you feel and what you need about the specific thing.",
            "Contempt — sarcasm, mockery, eye-rolling, disdain — is the most corrosive of the four and the single strongest predictor of breakup in Gottman's research. The antidote is deliberately rebuilding fondness and respect, and describing your own feelings instead of attacking theirs.",
            "Defensiveness means warding off a complaint by counter-attacking or making excuses. The antidote is taking responsibility for even a small part of the problem. Stonewalling is shutting down and withdrawing, usually because you're flooded; the antidote is to say so and take a real break before returning.",
          ],
        },
        {
          heading: "Having a horseman doesn't mean you're doomed",
          body: [
            "Almost every couple shows a horseman now and then — especially under stress. What matters is the balance: whether warmth, repair and respect still far outweigh the corrosive moments, and whether you can catch and reverse the habit. Couples who repair well can carry the occasional horseman without much harm; couples where contempt becomes the weather are the ones in real danger.",
            "This quiz reflects your own tendencies on one day. The full relationship test looks at the whole picture — including contempt and repair as two of its eight dimensions — and names your overall pattern.",
          ],
        },
      ]}
      faqs={[
        { q: "Which horseman is the worst?", a: "Contempt. In Gottman's research it's the single strongest predictor of relationship breakdown, because it attacks a partner's sense of being valued at all. If contempt is your result, it's the one most worth taking seriously." },
        { q: "Is this the official Gottman quiz?", a: "No. This is an independent, educational quiz inspired by the Four Horsemen concept from Gottman's published work. It's a tool for reflection, not an official or clinical instrument." },
        { q: "Can you fix the Four Horsemen?", a: "Yes — each has a specific antidote, and many couples reduce them with practice or with a couples therapist. Contempt usually takes the most deliberate work, because it means rebuilding fondness and respect over time." },
      ]}
    />
  );
}
