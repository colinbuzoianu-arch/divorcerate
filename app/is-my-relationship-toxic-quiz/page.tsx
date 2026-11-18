import type { Metadata } from "next";
import MiniQuizLanding from "@/components/MiniQuizLanding";
import { isMyRelationshipToxicQuiz } from "@/lib/quizzes/is-my-relationship-toxic";

export const metadata: Metadata = {
  title: "Is My Relationship Toxic? A Free Quiz | CoupleIQ",
  description:
    "A free, private 'is my relationship toxic?' quiz. Eight honest questions on the real warning signs — contempt, control, blame, feeling drained — plus where to get help.",
  alternates: { canonical: "https://splitornot.com/is-my-relationship-toxic-quiz" },
};

export default function IsMyRelationshipToxicQuizPage() {
  return (
    <MiniQuizLanding
      config={isMyRelationshipToxicQuiz}
      safetyNote
      eyebrow="Free · Private · 2 minutes"
      title="Is my relationship toxic?"
      lede="'Toxic' gets used for everything from a bad week to genuine abuse. This free, private quiz helps you tell the difference — honestly, and with a clear note about where the line into safety lies."
      sections={[
        {
          heading: "What people mean by a 'toxic' relationship",
          body: [
            "Most people reach for the word 'toxic' to describe a relationship that consistently leaves them feeling worse — smaller, anxious, criticised, or walking on eggshells — rather than supported and more themselves. It's not about the occasional bad argument; every relationship has those. It's about a pattern: a steady drip of contempt, blame, control or disrespect that wears down your sense of self over time.",
            "It's worth being precise, because the word covers a wide range. Some 'toxic' dynamics are two people stuck in a corrosive pattern they could change with effort or help. Others cross into emotional abuse, control or fear — and those are not relationship problems to 'work on,' but reasons to get support.",
          ],
        },
        {
          heading: "The real warning signs",
          body: [
            "The signals worth paying attention to include: feeling drained or on edge after time together; frequent criticism, mockery or contempt; walking on eggshells to avoid a reaction; always being the one to blame; losing confidence and your sense of self; and a partner who adds stress rather than easing it.",
            "One sign carries special weight: fear. If you have ever felt genuinely afraid of your partner — their temper, their threats, what they might do — that moves beyond 'toxic' into your safety, and it deserves a different response than any quiz can give.",
          ],
        },
        {
          heading: "A toxic pattern isn't always the end",
          body: [
            "Where there's no fear or control, some corrosive patterns can genuinely turn around — especially if both people recognise them and are willing to change, often with a couples therapist. The deciding factor is usually whether respect and goodwill still exist underneath, and whether both people want to do the work.",
            "But you don't have to earn the right to feel safe and respected by proving a relationship is 'bad enough.' If it's costing you your wellbeing, that's reason enough to take it seriously.",
          ],
        },
      ]}
      faqs={[
        { q: "What's the difference between toxic and abusive?", a: "A useful line is fear and control. A toxic dynamic leaves you feeling worse but you still feel safe; abuse involves fear, control, intimidation or violence. If any of those are present, please treat it as a safety issue, not a couples-therapy one — see the resources below." },
        { q: "Can a toxic relationship be fixed?", a: "Sometimes — where there's no abuse, both people recognise the pattern, and both want to change, often with professional help. Where there's fear or control, the priority is safety and support, not fixing the relationship." },
        { q: "Is this quiz a diagnosis?", a: "No. It reflects your perspective on one day and is a prompt for honest reflection, not a diagnosis. If your answers worry you, talking to a professional — or, if safety is involved, a helpline — is the real next step." },
      ]}
    />
  );
}
