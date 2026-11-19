import type { Metadata } from "next";
import MiniQuizLanding from "@/components/MiniQuizLanding";
import { relationshipCompatibilityQuiz } from "@/lib/quizzes/relationship-compatibility";

export const metadata: Metadata = {
  title: "Relationship Compatibility Test (Free) | CoupleIQ",
  description:
    "A free relationship compatibility test for newer couples. Eight questions on values, lifestyle, conflict and the future — see where you align and where to talk.",
  alternates: {
    canonical: "https://splitornot.com/relationship-compatibility-test",
    languages: { en: "https://splitornot.com/relationship-compatibility-test", de: "https://splitornot.com/de/relationship-compatibility-test", "x-default": "https://splitornot.com/relationship-compatibility-test" },
  },
};

export default function RelationshipCompatibilityTestPage() {
  return (
    <MiniQuizLanding
      config={relationshipCompatibilityQuiz}
      eyebrow="Free · Private · 2 minutes"
      title="How compatible are you?"
      lede="Compatibility isn't about matching on everything — it's about where you align on the things that matter, and whether you can talk about the things you don't. This free test gives newer couples an honest read."
      sections={[
        {
          heading: "What compatibility actually means",
          body: [
            "It's tempting to think of compatibility as a checklist — same hobbies, same taste, same everything. But research on lasting couples points somewhere else. The strongest predictor isn't how similar two people are; it's how well they handle the ways they differ. Plenty of very different people build wonderful relationships, and plenty of near-identical ones don't last.",
            "That said, a few areas of alignment do a lot of heavy lifting early on: shared core values, a similar vision for the future, and compatible day-to-day lifestyles. Big gaps there are worth noticing and talking about sooner rather than later.",
          ],
        },
        {
          heading: "The things worth getting clear on early",
          body: [
            "Values: honesty, family, how you treat people and money. Direction: whether you want similar things from the future — kids, marriage, where to live. Lifestyle: social energy, routines, spending habits. Connection: whether you actually enjoy each other and can repair after a disagreement.",
            "You don't need a perfect score on any of these. What you need is the ability to name a mismatch and talk about it without it turning into a fight. That skill — not sameness — is what this test is really pointing at.",
          ],
        },
        {
          heading: "A snapshot, not a verdict",
          body: [
            "Early compatibility can only tell you so much, because a lot of what makes a relationship work shows up over time — under stress, after the honeymoon phase, when life gets complicated. A low score isn't a reason to walk away, and a high one isn't a guarantee. Both are invitations to keep talking.",
            "When you're ready to look at how you actually function together — not just how well you match — the full relationship test goes deeper across eight dimensions and names your pattern.",
          ],
        },
      ]}
      faqs={[
        { q: "Is compatibility or effort more important?", a: "Effort and how you handle differences tend to matter more than raw similarity. Couples who can talk through a mismatch calmly usually do better than 'perfectly matched' couples who can't." },
        { q: "We scored low — should we break up?", a: "Not necessarily. A low score flags real differences worth discussing, not a verdict. Many strong couples started with meaningful gaps and built something good by talking openly about them early." },
        { q: "Is this good for long-term couples too?", a: "It's designed with newer couples in mind. If you've been together a while, the full relationship test will give you a much richer picture of how you function together." },
      ]}
    />
  );
}
