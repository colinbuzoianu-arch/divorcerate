import type { Metadata } from "next";
import MiniQuizLanding from "@/components/MiniQuizLanding";
import { MINI_QUIZZES_DE } from "@/lib/quizzes/de";

export const metadata: Metadata = {
  title: "Bindungstyp-Test: Sicher, ängstlich, vermeidend oder ängstlich-vermeidend | CoupleIQ",
  description:
    "Ein kostenloser Bindungstyp-Test. Sieben Fragen, um herauszufinden, ob du in Beziehungen eher sicher, ängstlich, vermeidend oder ängstlich-vermeidend bist – und was das bedeutet.",
  alternates: {
    canonical: "https://splitornot.com/de/attachment-style-quiz",
    languages: { en: "https://splitornot.com/attachment-style-quiz", de: "https://splitornot.com/de/attachment-style-quiz", "x-default": "https://splitornot.com/attachment-style-quiz" },
  },
};

export default function AttachmentStyleQuizPageDe() {
  return (
    <MiniQuizLanding
      locale="de"
      config={MINI_QUIZZES_DE["attachment-style"]}
      eyebrow="Kostenlos · Privat · 2 Minuten"
      title="Was ist dein Bindungstyp?"
      lede="Die Bindungstheorie beschreibt, wie wir gelernt haben, Nähe zu leben – und das prägt leise, wie wir als Erwachsene lieben. Dieser kostenlose Test zeigt, ob du eher sicher, ängstlich, vermeidend oder ängstlich-vermeidend bist und was das für deine Beziehungen bedeutet."
      sections={[
        {
          heading: "Was ist ein Bindungstyp?",
          body: [
            "Die Bindungstheorie begann mit der Bindung zwischen Säuglingen und Bezugspersonen, und Forschende fanden später heraus, dass ähnliche Muster in erwachsenen Liebesbeziehungen auftauchen. Dein Bindungstyp ist im Grunde deine Vorlage für Nähe: wie sicher es sich anfühlt, sich auf jemanden zu verlassen, wie du reagierst, wenn du Distanz spürst, und was du von den Menschen erwartest, die du liebst.",
            "Es gibt vier grobe Typen: sicher, ängstlich (verstrickt), vermeidend (abweisend) und ängstlich-vermeidend (desorganisiert). Die meisten neigen zu einem, auch wenn er sich mit verschiedenen Partner:innen und über die Zeit verschieben kann.",
          ],
        },
        {
          heading: "Die vier Typen in Kürze",
          body: [
            "Sicher: wohl mit Nähe und Unabhängigkeit; kann Bedürfnisse äußern und sich nach Konflikt versöhnen. Ängstlich: sehnt sich nach Nähe, sehr feinfühlig für Distanz, neigt bei Trennung zu Rückversicherungssuche. Vermeidend: schätzt Unabhängigkeit und Eigenständigkeit; Nähe oder Druck können zu viel sein. Ängstlich-vermeidend: will Nähe und fürchtet sie zugleich, was ein verwirrendes Hin und Her erzeugt.",
            "Keiner davon ist „gut\" oder „schlecht\". Es sind Strategien, die einmal Sinn ergaben, meist früh gelernt. Und wichtig: Bindung ist kein Lebensurteil – Menschen bewegen sich ständig auf Sicherheit zu, durch sichere Beziehungen und gute Therapie.",
          ],
        },
        {
          heading: "Warum es für deine Beziehung zählt",
          body: [
            "Bindungstypen wirken zusammen. Der klassische Zusammenstoß ist ein:e ängstliche:r und ein:e vermeidende:r Partner:in: Je mehr die ängstliche Person Nähe sucht, desto mehr Raum braucht die vermeidende, und jede Reaktion verstärkt die andere. Deinen Typ – und den deiner:deines Partner:in – zu verstehen, verwandelt diese schmerzhafte Schleife von „mit uns stimmt etwas nicht\" in „hier ist das Muster, und so unterbrechen wir es\".",
            "Dein Typ ist eine Brille. Der vollständige Beziehungstest betrachtet Vertrauen, Freundschaft, Versöhnung, Respekt und mehr und benennt das gesamte Muster, in das ihr fallt.",
          ],
        },
      ]}
      faqs={[
        { q: "Kann sich dein Bindungstyp ändern?", a: "Ja. Bindung ist ein Muster, keine feste Eigenschaft. Eine verlässliche, ansprechbare Beziehung und gute Therapie können jemanden mit der Zeit auf Sicherheit zubewegen – eine der hoffnungsvolleren Erkenntnisse des Feldes." },
        { q: "Ist ein Bindungstyp der beste?", a: "Sichere Bindung macht Beziehungen tendenziell leichter, aber viele Menschen mit ängstlichem, vermeidendem oder ängstlich-vermeidendem Typ haben starke, glückliche Beziehungen – besonders, wenn sie ihr Muster verstehen und mit einer:einem Partner:in darüber reden können." },
        { q: "Was, wenn mein:e Partner:in und ich gegensätzliche Typen haben?", a: "Sehr häufig – besonders ängstlich mit vermeidend. Der Zusammenstoß ist kein Zeichen, dass ihr unvereinbar seid; er ist eine Schleife. Sie gemeinsam zu benennen und die Signale des anderen zu lernen, verschiebt sie meist. Eine Fachperson kann helfen, wenn es festgefahren wirkt." },
      ]}
    />
  );
}
