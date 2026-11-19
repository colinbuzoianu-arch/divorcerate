/**
 * Content for the seven relationship patterns (Phase 4.3). These are our unique
 * asset — every result links to its pattern page. Content is educational and
 * honest: research-grounded themes, no invented statistics, no diagnosis, and a
 * clear "when to get help" section. The pattern slugs match lib/scoring.ts.
 */

export interface PatternContent {
  slug: string;
  name: string;
  eyebrow: string; // short mono label
  lede: string; // 1–2 sentence summary
  whatItIs: string[];
  howItFeels: string[];
  whyItHappens: string[];
  whatHelps: { title: string; detail: string }[];
  whenToGetHelp: string[];
  related: string[]; // slugs
}

export const PATTERNS: PatternContent[] = [
  {
    slug: "validated-couple",
    name: "The Validated Couple",
    eyebrow: "Pattern 01",
    lede: "Calm disagreement, genuine respect and a strong friendship underneath. The steadiest of the patterns — but it still takes tending.",
    whatItIs: [
      "A Validated Couple handles disagreement by hearing each other out before trying to win. You can argue about something real and still walk away feeling like teammates rather than opponents. Underneath the specific topics is a strong friendship: you broadly like each other, you know each other's inner world, and you assume good intent even when you're annoyed.",
      "This is one of the three styles that relationship researchers (notably John Gottman) have found can be genuinely stable and happy. It isn't about never fighting — it's about how you fight, and what you return to afterwards.",
    ],
    howItFeels: [
      "From the inside, this pattern feels safe. You can raise a hard topic without bracing for a blow-up, and a rough week doesn't feel like evidence that the whole relationship is in trouble. Repair is quick: someone softens, someone reaches out, and you're back.",
      "The risk is quiet complacency. Because things work, it's easy to stop investing — to let date nights, curiosity and small gestures of affection fade while you coast on goodwill.",
    ],
    whyItHappens: [
      "Validated couples usually share a few habits: they turn toward each other's small bids for attention, they keep criticism and contempt low, and they repair quickly after friction. Some of this comes from temperament or a secure history; a lot of it is learned and can be strengthened.",
    ],
    whatHelps: [
      { title: "Keep investing in friendship", detail: "The strongest protective factor is the everyday friendship. Keep asking questions, keep learning the small stuff, keep turning toward each other's bids for connection." },
      { title: "Don't let repair get lazy", detail: "Your fast repair is an asset. Name it out loud occasionally — 'we're good at finding our way back' — so it stays a shared value, not an accident." },
      { title: "Schedule the big conversations", detail: "Because conflict is low, it's easy to avoid the genuinely big questions (money, family, the future). Put them on the calendar on purpose." },
    ],
    whenToGetHelp: [
      "Even steady couples hit seasons — a loss, an illness, a new baby, a career crisis — where the usual repair stops working. If you notice the friendship thinning or the same argument looping without resolution, a few sessions with a couples therapist is maintenance, not failure.",
    ],
    related: ["volatile-couple", "conflict-avoiders", "drifting-couple"],
  },
  {
    slug: "volatile-couple",
    name: "The Volatile Couple",
    eyebrow: "Pattern 02",
    lede: "High heat, high passion, and fast, intense repair. Volatile couples can be very happy — as long as the warmth outweighs the sparks.",
    whatItIs: [
      "Volatile couples are emotionally expressive. You debate, you interrupt, you feel things loudly — and you also make up loudly, with as much passion as the argument. This is another of the research-recognised stable styles: the fighting isn't the problem, because it sits on top of a lot of affection and engagement.",
      "What keeps a volatile relationship healthy is the ratio: far more positive moments — humour, affection, interest — than negative ones, even during conflict.",
    ],
    howItFeels: [
      "It can feel alive and intensely connected — and occasionally exhausting. A good argument clears the air; a bad week can feel like a storm. When it's working, you never doubt that the other person cares, because they show up fully for everything.",
      "The danger is when heat tips into criticism or contempt. Passionate disagreement is fine; personal attacks, mockery and score-keeping are corrosive, and they erode the goodwill the whole pattern depends on.",
    ],
    whyItHappens: [
      "Often two expressive people who'd both rather engage than withdraw. The intensity isn't a flaw in itself — problems come when stress, resentment or old wounds turn the heat personal, or when one partner starts to feel flooded and shuts down.",
    ],
    whatHelps: [
      { title: "Protect the ratio", detail: "Keep the affection, humour and interest high, especially during conflict. The heat is survivable when it's heavily outweighed by warmth." },
      { title: "Fight about the issue, not the person", detail: "Criticism ('you always…') and contempt (sarcasm, mockery) are the real risks here. Keep complaints specific and about behaviour, not character." },
      { title: "Learn to spot flooding", detail: "When either of you is too physiologically overwhelmed to think straight, take a real 20-minute break and come back. Nothing useful happens while flooded." },
    ],
    whenToGetHelp: [
      "If arguments increasingly include contempt, if either of you feels frightened rather than just frustrated, or if the make-ups stop outweighing the fights, that's worth taking seriously with a professional. Intensity should never tip into feeling unsafe — if it does, see our support resources.",
    ],
    related: ["validated-couple", "hostile-detached", "pursuer-withdrawer"],
  },
  {
    slug: "conflict-avoiders",
    name: "Conflict Avoiders",
    eyebrow: "Pattern 03",
    lede: "Peaceful on the surface, while problems go quietly underground. Avoidance can be stable for years — until the unspoken builds up.",
    whatItIs: [
      "Conflict-avoiding couples minimise disagreement. You emphasise what you have in common, sidestep the topics that might cause friction, and often agree to disagree rather than hash things out. This is the third research-recognised stable style: for many couples it works, because they genuinely don't need to resolve much.",
      "The line between healthy avoidance and quiet drift is whether the important things still get said. Choosing your battles is wise; never having the hard conversation is not.",
    ],
    howItFeels: [
      "Calm, low-drama, comfortable. You rarely shout. But sometimes it can feel a little lonely or unspoken — like there are rooms in the relationship you both keep locked.",
      "The risk is that resentment and distance accumulate silently. Because nothing is addressed, small hurts don't get repaired; they just quietly stack up until one day they feel insurmountable.",
    ],
    whyItHappens: [
      "Often one or both partners grew up where conflict felt dangerous or pointless, so keeping the peace became the safest strategy. It can also be a reasonable adaptation to a genuinely low-conflict match — the trouble is when it's used to avoid things that actually need airing.",
    ],
    whatHelps: [
      { title: "Make it safe to raise things", detail: "Agree on a low-stakes way to say 'this is bothering me' — a phrase, a weekly check-in — so hard topics have a door that isn't a fight." },
      { title: "Name the elephant, gently", detail: "Pick one avoided topic and open it with curiosity, not accusation. You don't have to solve it; you just have to stop pretending it isn't there." },
      { title: "Separate 'peaceful' from 'connected'", detail: "Low conflict isn't the same as closeness. Invest in friendship and shared experiences, not just in keeping things smooth." },
    ],
    whenToGetHelp: [
      "If you realise there are major issues you've never actually discussed — money, sex, children, a betrayal — or if the calm has started to feel like distance, a therapist can make it safe to say the unsaid before it hardens into drift.",
    ],
    related: ["drifting-couple", "validated-couple", "pursuer-withdrawer"],
  },
  {
    slug: "pursuer-withdrawer",
    name: "The Pursuer–Withdrawer",
    eyebrow: "Pattern 04",
    lede: "One partner reaches for connection; the other pulls back to cope. The most common distress pattern — and one of the most changeable.",
    whatItIs: [
      "In the pursuer–withdrawer pattern (sometimes called demand–withdraw), one person responds to tension by moving toward it — pushing to talk, to resolve, to reconnect — while the other responds by moving away — going quiet, needing space, shutting down. Each reaction makes the other worse: the more one pursues, the more the other withdraws, and the more one withdraws, the harder the other pursues.",
      "This is one of the most studied patterns in couples work, central to Emotionally Focused Therapy. It isn't a sign that you're incompatible; it's a loop, and loops can be interrupted.",
    ],
    howItFeels: [
      "The pursuer usually feels anxious and alone — like they're the only one fighting for the relationship. The withdrawer usually feels criticised and overwhelmed — like they can never get it right, so retreating is the only way to stop the flood.",
      "Both people are actually protesting the same thing: a loss of connection. They're just doing it in opposite directions, and from the outside it looks like one person cares too much and the other doesn't care at all. Neither is true.",
    ],
    whyItHappens: [
      "Attachment history plays a big role: pursuers often have a more anxious style (closeness feels safe, distance feels alarming), withdrawers a more avoidant one (space feels safe, pressure feels engulfing). Under stress, each defaults to their strategy, and the strategies collide.",
    ],
    whatHelps: [
      { title: "Name the loop, not the person", detail: "Talk about 'the cycle we get into' as a shared enemy. 'When I push and you pull, we both end up alone.' That reframes it from blame to teamwork." },
      { title: "Withdrawer: signal, don't vanish", detail: "A silent exit reads as abandonment. 'I need 20 minutes, and I will come back' changes everything for an anxious partner." },
      { title: "Pursuer: ask softly for the need", detail: "Under the pushing is usually a tender need ('I need to know I matter to you'). Leading with the need, not the criticism, makes it far easier for a withdrawer to move toward you." },
    ],
    whenToGetHelp: [
      "This pattern responds unusually well to couples therapy, especially Emotionally Focused Therapy, which is built specifically to interrupt it. If you keep landing in the same loop no matter how hard you both try, that's exactly the kind of thing a trained therapist can shift faster than you can alone.",
    ],
    related: ["conflict-avoiders", "volatile-couple", "drifting-couple"],
  },
  {
    slug: "drifting-couple",
    name: "The Drifting Couple",
    eyebrow: "Pattern 05",
    lede: "Once close, now mostly coexisting. The friendship fades without a single big fight — which is exactly what makes it easy to miss.",
    whatItIs: [
      "Drifting couples aren't at war. They're parallel. Life — work, kids, screens, logistics — has slowly crowded out the friendship, and the relationship has quietly become a well-run household rather than a close bond. There's rarely a dramatic rupture; just a gradual accumulation of missed bids for connection.",
      "Because nothing is obviously wrong, drift is easy to normalise ('this is just what long relationships are like'). It isn't — but reversing it takes intention, because the current runs toward further apart.",
    ],
    howItFeels: [
      "Comfortable and a little lonely at once. You're fond of each other, you function well as a team, but the spark, curiosity and sense of being truly known have dimmed. You might feel more like roommates or co-parents than partners.",
      "The quiet danger is that drift makes a relationship vulnerable: when connection is low, an outside spark, a crisis, or simply a better offer of closeness can feel disproportionately powerful.",
    ],
    whyItHappens: [
      "Usually nothing dramatic — just years of small turnings-away. A bid for attention ignored here, a date night skipped there, stress and exhaustion everywhere. Each one is tiny; the accumulation is not.",
    ],
    whatHelps: [
      { title: "Rebuild the friendship deliberately", detail: "Curiosity is the antidote. Ask questions you'd ask someone you were getting to know. Assume you've both changed and need re-learning." },
      { title: "Turn toward small bids", detail: "Connection is built in tiny moments — noticing, responding, sharing. Catch and answer the small bids you've been missing on autopilot." },
      { title: "Protect time together", detail: "Drift thrives on 'we'll get to it.' Put recurring, phone-free time together on the calendar and defend it like any other commitment." },
    ],
    whenToGetHelp: [
      "If one or both of you has started to wonder whether there's anything left, or if attempts to reconnect keep stalling, a couples therapist can help you rebuild the friendship on purpose — often before either of you realised how much you both still wanted it.",
    ],
    related: ["conflict-avoiders", "validated-couple", "crisis-bonded"],
  },
  {
    slug: "crisis-bonded",
    name: "The Crisis-Bonded Couple",
    eyebrow: "Pattern 06",
    lede: "Held together more by shared pressure than by shared closeness. Powerful in a storm — but it needs real connection to outlast it.",
    whatItIs: [
      "Crisis-bonded couples pull together under external stress — illness, money trouble, a hard season with kids, a shared enemy. Facing something together can create an intense sense of 'us against the world,' and that bond is real. The question is what's underneath it when the crisis lifts.",
      "If there's a genuine friendship and trust beneath the shared struggle, the crisis simply reveals your strength. If the struggle is the main thing holding you together, the relationship can feel strangely empty in calmer times — and couples sometimes lurch from one crisis to the next to keep the bond alive.",
    ],
    howItFeels: [
      "In the thick of it: loyal, purposeful, deeply connected. You're a team with a mission. In the quiet afterwards: sometimes oddly flat or distant, as if you're not sure who you are together without a problem to solve.",
      "Some couples unconsciously keep drama alive because it's the thing they know how to do together. That's worth noticing gently.",
    ],
    whyItHappens: [
      "Shared adversity is a genuine bonding force — it's how many strong relationships are forged. The risk is only when the adversity is doing all the work, and the ordinary building blocks of closeness (friendship, fun, curiosity, affection) never got built.",
    ],
    whatHelps: [
      { title: "Build connection outside the crisis", detail: "Invest in friendship, play and affection that have nothing to do with the problem you're fighting. Find out who you are together on an ordinary Tuesday." },
      { title: "Notice crisis-seeking", detail: "If calm feels uncomfortable and you find yourselves manufacturing drama, name it. You can learn to feel close without a fire to put out." },
      { title: "Share the load more sustainably", detail: "Chronic stress is corrosive even for strong couples. Protect rest, support and the stress buffer so the pressure doesn't become the relationship." },
    ],
    whenToGetHelp: [
      "If the external stress is overwhelming (illness, trauma, financial crisis), support for the stress itself helps the relationship. And if you suspect there isn't much holding you together once the crisis is removed, a therapist can help you find out — and, often, build what's missing.",
    ],
    related: ["drifting-couple", "validated-couple", "hostile-detached"],
  },
  {
    slug: "hostile-detached",
    name: "The Hostile–Detached Couple",
    eyebrow: "Pattern 07",
    lede: "Contempt is present and the distance is growing. This is the pattern to take most seriously — and the one where help matters most.",
    whatItIs: [
      "In the hostile–detached pattern, conflict has turned personal — criticism, contempt, defensiveness — and the emotional connection has worn thin. You might still fight, but increasingly you've stopped bothering: the hostility sits alongside a growing detachment, as if you're both quietly checking out.",
      "Relationship research treats contempt — sarcasm, mockery, eye-rolling, treating a partner with disdain — as the single most corrosive thing a couple can do, because it attacks the sense of being valued at all. When it combines with detachment, the relationship is genuinely at risk. That doesn't mean it's over — but it does mean this is not the pattern to wait out.",
    ],
    howItFeels: [
      "Lonely, defended, and tired. You may feel unseen, disrespected or resentful; small interactions carry an edge. Many people in this pattern describe feeling more alone inside the relationship than they would be out of it.",
      "It often doesn't feel like a crisis because the heat has cooled into distance. That cooling can be mistaken for peace, when it's closer to giving up.",
    ],
    whyItHappens: [
      "Usually a long accumulation: unrepaired hurts, a pursuer–withdrawer loop that calcified, resentment that curdled into contempt. Rarely does one person 'cause' it — it's a cycle that built over time, and both people are usually exhausted by it.",
    ],
    whatHelps: [
      { title: "Replace contempt with respect — deliberately", detail: "This is the non-negotiable. Even one partner choosing to stop the sarcasm and name specific complaints respectfully can start to shift the climate." },
      { title: "Look for what's left, honestly", detail: "Is there still fondness and admiration underneath, even buried? Research suggests that's the best predictor of whether a struggling couple can rebuild. It's worth finding out — ideally with help." },
      { title: "Don't try to do this alone", detail: "This pattern rarely turns around without outside support. A skilled couples therapist can interrupt the cycle and help you decide, honestly, whether and how to rebuild." },
    ],
    whenToGetHelp: [
      "Now is the right time to get help — this is the pattern where professional support makes the biggest difference. And an important distinction: contempt and distance are relationship problems a therapist can work with, but if you ever feel afraid of your partner, controlled, or unsafe, that is not a couples-therapy situation. Please see our support resources — your safety comes first.",
    ],
    related: ["pursuer-withdrawer", "volatile-couple", "crisis-bonded"],
  },
];

export function getPattern(slug: string): PatternContent | undefined {
  return PATTERNS.find((p) => p.slug === slug);
}

// Locale-aware access (Phase 7). English stays the canonical source for the
// homepage and sitemap; German content lives in patterns.de.ts.
import { PATTERNS_DE } from "@/lib/patterns.de";
import type { Locale } from "@/lib/i18n/config";

export function getPatterns(locale: Locale): PatternContent[] {
  return locale === "de" ? PATTERNS_DE : PATTERNS;
}

export function getPatternLocalized(slug: string, locale: Locale): PatternContent | undefined {
  return getPatterns(locale).find((p) => p.slug === slug);
}
