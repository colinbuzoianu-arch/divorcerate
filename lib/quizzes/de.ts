import type { MiniQuiz } from "@/lib/quizzes/types";

/**
 * German (informal "du") versions of the five mini-quizzes (Phase 7). Points
 * and category keys are identical to the English configs, so browser scoring is
 * unchanged — only the displayed text is translated.
 */

const shouldIBreakUpQuizDe: MiniQuiz = {
  slug: "should-i-break-up",
  title: "Soll ich mich trennen? Ein kurzer Bauchgefühl-Check",
  intro: "Acht ehrliche Fragen. Das ist eine Reflexion, kein Urteil – es gibt keine richtigen Antworten.",
  mode: "scale",
  questions: [
    { id: "future", question: "Wenn du dir dein Leben in fünf Jahren vorstellst – ist dein:e Partner:in darin?", options: [
      { label: "Klar ja – ich will eine gemeinsame Zukunft aufbauen", points: 0 },
      { label: "Ich denke schon, aber ich bin mir unsicherer als früher", points: 1 },
      { label: "Ich weiß es ehrlich nicht mehr", points: 2 },
      { label: "Wenn ich ehrlich bin, stelle ich es mir ohne sie:ihn vor", points: 3 },
    ] },
    { id: "respect", question: "Fühlst du dich im Alltag von deinem:r Partner:in respektiert?", options: [
      { label: "Ja – ich fühle mich wertgeschätzt und ernst genommen", points: 0 },
      { label: "Meistens, mit einigen Reibungen", points: 1 },
      { label: "Oft nicht – ich fühle mich abgetan oder kleingemacht", points: 2 },
      { label: "Selten oder nie", points: 3 },
    ] },
    { id: "contempt", question: "Wie fühlen sich eure Streits meistens an?", options: [
      { label: "Wir sind uneinig, bleiben respektvoll und versöhnen uns schnell", points: 0 },
      { label: "Hitzig, aber wir vertragen uns wieder", points: 1 },
      { label: "Viel Sarkasmus, Schuldzuweisung oder Dichtmachen", points: 2 },
      { label: "Es ist Verachtung da – Augenrollen, Spott, Geringschätzung", points: 3 },
    ] },
    { id: "effort", question: "Fühlt es sich an, als würdet ihr beide es noch versuchen?", options: [
      { label: "Ja, wir strengen uns beide an", points: 0 },
      { label: "Meist ich, aber sie:er reagiert", points: 1 },
      { label: "Ich habe das Gefühl, nur ich versuche es", points: 2 },
      { label: "Keine:r von uns versucht es wirklich noch", points: 3 },
    ] },
    { id: "self", question: "Magst du, wer du in dieser Beziehung bist?", options: [
      { label: "Ja – mit ihr:ihm bin ich mehr ich selbst", points: 0 },
      { label: "Größtenteils", points: 1 },
      { label: "Eher nicht – ich habe mich klein gemacht oder so verändert, wie ich es nicht mag", points: 2 },
      { label: "Nein – ich erkenne mich kaum wieder", points: 3 },
    ] },
    { id: "trust", question: "Vertraust du deinem:r Partner:in?", options: [
      { label: "Vollkommen", points: 0 },
      { label: "Größtenteils, mit einigen Zweifeln", points: 1 },
      { label: "Das Vertrauen wurde beschädigt und nicht ganz wiederhergestellt", points: 2 },
      { label: "Nein – ich kann ihr:ihm nicht vertrauen", points: 3 },
    ] },
    { id: "staying", question: "Was hält dich gerade in der Beziehung?", options: [
      { label: "Liebe, Verbindung und eine gemeinsame Zukunft", points: 0 },
      { label: "Eine Mischung aus Liebe und Gewohnheit", points: 1 },
      { label: "Vor allem Praktisches – Geld, Kinder, Angst vorm Alleinsein", points: 2 },
      { label: "Ich bin nicht sicher, dass etwas es tut, außer dass Gehen schwer ist", points: 3 },
    ] },
    { id: "advice", question: "Wenn ein:e enge:r Freund:in dir diese Beziehung beschreiben würde – was würdest du sagen?", options: [
      { label: "Dass sie gesund klingt und es wert ist", points: 0 },
      { label: "Dass jede Beziehung harte Phasen hat", points: 1 },
      { label: "Dass sie etwas Besseres verdient haben", points: 2 },
      { label: "Dass ich mir Sorgen um sie machen würde", points: 3 },
    ] },
  ],
  bands: [
    { min: 0, title: "Eher eine harte Phase", blurb: "Deine Antworten deuten auf echte Stärken hin. Die Belastung, die du spürst, wirkt mehr wie eine schwere Phase als ein grundlegender Bruch – die Art, durch die Paare sich oft ohne professionelle Hilfe arbeiten. Wert, sich darum zu kümmern, kein Grund zur Panik." },
    { min: 34, title: "Ein ernstes Gespräch wert", blurb: "Hier gibt es echte Stärken und echte Sorgen. Das ist der Bereich, in dem kleine Veränderungen – und ehrliche Gespräche, die du vielleicht gemieden hast – am meisten zählen. Ein guter Moment, erst klar zu werden, was wirklich schiefläuft, bevor du etwas entscheidest." },
    { min: 67, title: "Signale, die man ernst nehmen sollte", blurb: "Deine Antworten deuten auf Muster, die sich mit der Zeit aufschaukeln – wenig Respekt, bröckelndes Vertrauen oder das Gefühl, allein zu kämpfen. Das heißt nicht, dass es vorbei ist, aber es verdient ehrliche Aufmerksamkeit und wahrscheinlich mehr Unterstützung, als ein Quiz geben kann." },
  ],
  ctaLede: "Ein Bauchgefühl-Check kann nur so viel sagen. Der vollständige Beziehungstest bewertet acht Dimensionen, benennt dein Muster und zeigt dir genau, worauf du dich konzentrieren solltest.",
  safety: true,
};

const fourHorsemenQuizDe: MiniQuiz = {
  slug: "four-horsemen",
  title: "Der Test zu den vier Reitern",
  intro: "Sechs Situationen. Wähle die Reaktion, die dir am ähnlichsten ist. Wir zeigen dir, welcher von Gottmans vier Reitern bei dir am ehesten auftaucht – und das Gegenmittel.",
  mode: "category",
  questions: [
    { id: "complaint", question: "Wenn dich etwas stört, das dein:e Partner:in tut, neigst du dazu …", options: [
      { label: "Zu sagen, was du zur konkreten Sache brauchst („Ich war verletzt, als …\")", category: "secure" },
      { label: "Es daran festzumachen, wer sie:er ist („du immer …\", „du nie …\")", category: "criticism" },
      { label: "Einen Seitenhieb, ein Augenrollen oder eine sarkastische Spitze hinzuzufügen", category: "contempt" },
      { label: "Zu erklären, warum es eigentlich nicht deine Schuld ist", category: "defensiveness" },
      { label: "Still zu werden und nichts zu sagen", category: "stonewalling" },
    ] },
    { id: "heated", question: "In der Hitze eines Streits tust du am ehesten …", options: [
      { label: "Durchatmen und versuchen, beim Thema zu bleiben", category: "secure" },
      { label: "Alles aufzählen, was sie:er sonst noch falsch gemacht hat", category: "criticism" },
      { label: "Spotten oder von oben herab reden", category: "contempt" },
      { label: "Gegenangriff fahren oder Ausreden suchen", category: "defensiveness" },
      { label: "Dichtmachen und nicht mehr reagieren", category: "stonewalling" },
    ] },
    { id: "feedback", question: "Wenn dein:e Partner:in sich über dich beschwert, tust du meist …", options: [
      { label: "Versuchen, den wahren Kern darin zu hören", category: "secure" },
      { label: "Im Gegenzug ihre:seine Fehler aufzeigen", category: "criticism" },
      { label: "Es mit Sarkasmus oder einem Schnauben abtun", category: "contempt" },
      { label: "Dich verteidigen und erklären, warum sie:er falschliegt", category: "defensiveness" },
      { label: "Dich zurückziehen und dich verweigern", category: "stonewalling" },
    ] },
    { id: "respect", question: "Wenn du frustriert von deinem:r Partner:in bist, wie siehst du sie:ihn dann?", options: [
      { label: "Im Grunde immer noch auf meiner Seite", category: "secure" },
      { label: "Als jemanden, der es ständig falsch macht", category: "criticism" },
      { label: "Als unter mir oder in dem Moment meinen Respekt nicht wert", category: "contempt" },
      { label: "Als jemanden, der mich unfair angreift", category: "defensiveness" },
      { label: "Als jemanden, von dem ich weg muss", category: "stonewalling" },
    ] },
    { id: "overwhelm", question: "Wenn ein Gespräch zu intensiv wird, tust du …", options: [
      { label: "Um eine kurze Pause bitten und darauf zurückkommen", category: "secure" },
      { label: "Weiter auf jede Beschwerde drücken", category: "criticism" },
      { label: "Schneidend oder verächtlich werden", category: "contempt" },
      { label: "Weiter meine Position verteidigen", category: "defensiveness" },
      { label: "Erstarren, leer werden oder körperlich gehen", category: "stonewalling" },
    ] },
    { id: "repair", question: "Danach tust du am häufigsten …", options: [
      { label: "Auf sie:ihn zugehen, weicher werden und versöhnen", category: "secure" },
      { label: "Eine innere Liste ihrer:seiner Fehler führen", category: "criticism" },
      { label: "Mich in meiner Geringschätzung bestätigt fühlen", category: "contempt" },
      { label: "Weiter fühlen, dass es vor allem ihre:seine Schuld war", category: "defensiveness" },
      { label: "Lange dichtgemacht bleiben", category: "stonewalling" },
    ] },
  ],
  categories: [
    { key: "secure", title: "Du stützt dich auf die Gegenmittel", blurb: "Deine häufigste Reaktion ist die gesunde – ein sanfter Einstieg, Verantwortung übernehmen, dich selbst beruhigen und versöhnen. Genau das schützt Beziehungen über die Zeit. Mach weiter so und achte auf die Reiter, die sich unter Stress trotzdem einschleichen." },
    { key: "criticism", title: "Kritik taucht am meisten auf", blurb: "Kritik macht aus einer Beschwerde einen Charakterfehler der:des Partner:in („du immer\", „du nie\"). Das Gegenmittel ist ein sanfter Einstieg: Benenne das konkrete Verhalten und was du brauchst, ohne den Rundumschlag. Kleine Wortänderungen machen hier einen großen Unterschied." },
    { key: "contempt", title: "Verachtung ist der Reiter, auf den du achten solltest", blurb: "Verachtung – Sarkasmus, Spott, Augenrollen, Herabsetzung – ist der zersetzendste der vier und in der Forschung der stärkste Hinweis auf ein Scheitern der Beziehung. Das Gegenmittel ist, Zuneigung und Respekt bewusst wiederaufzubauen und die eigenen Gefühle zu beschreiben, statt die der:des anderen anzugreifen. Diesen Reiter solltest du ernst nehmen." },
    { key: "defensiveness", title: "Abwehr ist dein Muster", blurb: "Abwehr – Gegenangriff oder erklären, warum es nicht deine Schuld ist – liest sich für eine:n Partner:in meist als „Ich übernehme keine Verantwortung\". Das Gegenmittel ist, auch nur einen kleinen Teil der Beschwerde anzunehmen. „Du hast recht, das habe ich getan\" entschärft weit mehr als eine perfekte Verteidigung." },
    { key: "stonewalling", title: "Mauern ist dein Muster", blurb: "Mauern – dichtmachen, verstummen, aussteigen – ist oft ein Zeichen von Überflutung, nicht von Gleichgültigkeit. Das Gegenmittel ist zu sagen „Ich bin überfordert, ich brauche 20 Minuten\", dich wirklich zu beruhigen und dann zurückzukommen. Verschwinden liest sich als Verlassenwerden; signalisieren verändert alles." },
  ],
  ctaLede: "Die vier Reiter sind eine Brille. Der vollständige Beziehungstest bewertet acht Dimensionen – darunter Verachtung und Versöhnung – und benennt dein gesamtes Muster.",
};

const attachmentStyleQuizDe: MiniQuiz = {
  slug: "attachment-style",
  title: "Was ist dein Bindungstyp?",
  intro: "Sieben Fragen dazu, wie du Nähe erlebst. Wähle, was meistens am ehesten auf dich zutrifft.",
  mode: "category",
  questions: [
    { id: "closeness", question: "Wie fühlst du dich mit emotionaler Nähe?", options: [
      { label: "Wohl – ich kann nah sein und zugleich eigenständig", category: "secure" },
      { label: "Ich sehne mich danach und fürchte, ich will sie mehr als mein:e Partner:in", category: "anxious" },
      { label: "Ich schätze meine Unabhängigkeit, und Nähe kann viel sein", category: "avoidant" },
      { label: "Ich will sie sehr, aber sie macht mir auch Angst", category: "fearful" },
    ] },
    { id: "partner_distance", question: "Wenn dein:e Partner:in etwas distanziert wirkt, tust du …", options: [
      { label: "Annehmen, dass sie:er beschäftigt ist, und später nachfragen", category: "secure" },
      { label: "Ängstlich werden und schnell Rückversicherung brauchen", category: "anxious" },
      { label: "Erleichtert sein, etwas Raum zu haben", category: "avoidant" },
      { label: "In Panik geraten und mich zugleich zurückziehen wollen", category: "fearful" },
    ] },
    { id: "needs", question: "Um das zu bitten, was du in einer Beziehung brauchst, fühlt sich an …", options: [
      { label: "Natürlich – ich kann es meist direkt sagen", category: "secure" },
      { label: "Riskant – ich fürchte, zu viel zu sein oder abgelehnt zu werden", category: "anxious" },
      { label: "Unnötig – ich regle Dinge lieber selbst", category: "avoidant" },
      { label: "Verwirrend – ich brauche Dinge, kann der Reaktion aber schwer trauen", category: "fearful" },
    ] },
    { id: "conflict", question: "Im Konflikt ist dein Instinkt …", options: [
      { label: "Zugewandt bleiben und auf Versöhnung hinarbeiten", category: "secure" },
      { label: "Nachsetzen, protestieren und dringend Wiederverbindung suchen", category: "anxious" },
      { label: "Mich zurückziehen, kühl werden oder allein sein müssen", category: "avoidant" },
      { label: "Zwischen Zugehen und Dichtmachen hin- und herpendeln", category: "fearful" },
    ] },
    { id: "trust", question: "Einem:einer Partner:in zu vertrauen fällt dir …", options: [
      { label: "Ziemlich leicht, solange es keinen echten Grund dagegen gibt", category: "secure" },
      { label: "Mit Mühe – ich suche oft nach Zeichen, dass etwas nicht stimmt", category: "anxious" },
      { label: "Langsam – ich halte einen Teil von mir zurück", category: "avoidant" },
      { label: "Schwer – ich erwarte Enttäuschung, selbst wenn es gut läuft", category: "fearful" },
    ] },
    { id: "past", question: "Wenn du auf frühere Beziehungen zurückblickst, erkennst du dich am ehesten in …", options: [
      { label: "Meist stabil, mit normalem Auf und Ab", category: "secure" },
      { label: "Oft das Gefühl, mehr zu lieben oder verlassen zu werden", category: "anxious" },
      { label: "Oft das Gefühl, bedrängt zu sein, oder Menschen auf Distanz halten", category: "avoidant" },
      { label: "Intensive Höhen und Tiefen, Nähe wollen und fürchten", category: "fearful" },
    ] },
    { id: "selfview", question: "Was fühlt sich am wahrsten an?", options: [
      { label: "Ich bin liebenswert und andere sind meist vertrauenswürdig", category: "secure" },
      { label: "Ich bin okay, aber ich bin nicht immer sicher, dass andere bleiben", category: "anxious" },
      { label: "Allein bin ich gut; sich auf andere zu verlassen ist riskant", category: "avoidant" },
      { label: "Ich bin nicht sicher, ob ich liebenswert bin, und andere fühlen sich unsicher an", category: "fearful" },
    ] },
  ],
  categories: [
    { key: "secure", title: "Überwiegend sichere Bindung", blurb: "Du fühlst dich mit Nähe und Unabhängigkeit grundsätzlich wohl, kannst um das bitten, was du brauchst, und unterstellst eher gute Absichten. Sichere Bindung heißt nicht, nie ängstlich zu sein oder Raum zu wollen – sondern verbunden bleiben und versöhnen zu können. Es ist auch etwas, worauf die anderen Typen zuwachsen können, oft durch eine sichere Beziehung oder gute Therapie." },
    { key: "anxious", title: "Eher ängstlich (verstrickt)", blurb: "Du schätzt Nähe zutiefst und spürst Distanz schnell, was manchmal in Rückversicherungssuche oder Protest kippt, wenn du dich getrennt fühlst. Darunter liegt ein echtes, legitimes Bedürfnis, zu wissen, dass du zählst. Dieses Bedürfnis direkt zu benennen – statt übers Nachsetzen – hilft meist, und ein:e verlässliche:r Partner:in kann dein System mit der Zeit beruhigen." },
    { key: "avoidant", title: "Eher vermeidend (abweisend)", blurb: "Du schätzt Unabhängigkeit und Eigenständigkeit, und Nähe oder Druck können viel sein. Das ist eine Schutzstrategie, meist früh gelernt, kein Mangel an Zuneigung. Wachstum sieht hier oft so aus, eine:n Partner:in etwas mehr hereinzulassen, als sich natürlich anfühlt, und zu signalisieren („Ich brauche etwas Raum und komme zurück\") statt dich einfach zurückzuziehen." },
    { key: "fearful", title: "Eher ängstlich-vermeidend (desorganisiert)", blurb: "Du willst Nähe und fürchtest sie zugleich, was ein Hin und Her erzeugen kann, das für dich und eine:n Partner:in verwirrend ist. Dieser Typ geht oft auf Erfahrungen zurück, in denen die Menschen, die sicher sein sollten, auch eine Quelle von Verletzung waren. Er ist sehr veränderbar – hier kann eine gute Fachperson viel helfen – und eine sichere, verlässliche Beziehung kann wirklich heilsam sein." },
  ],
  ctaLede: "Bindung ist ein Teil des Bildes. Der vollständige Beziehungstest betrachtet Vertrauen, Freundschaft, Versöhnung und fünf weitere Dimensionen und benennt dein gesamtes Muster.",
};

const isMyRelationshipToxicQuizDe: MiniQuiz = {
  slug: "is-my-relationship-toxic",
  title: "Ist meine Beziehung toxisch?",
  intro: "Acht ehrliche Fragen. Das ist eine Reflexion, keine Diagnose – und wenn dir hier etwas nahegeht, lies bitte den Sicherheitshinweis am Ende.",
  mode: "scale",
  safety: true,
  questions: [
    { id: "aftermath", question: "Wie fühlst du dich meist, nachdem du Zeit mit deinem:r Partner:in verbracht hast?", options: [
      { label: "Überwiegend gut – verbunden und ich selbst", points: 0 },
      { label: "Gemischt", points: 1 },
      { label: "Oft ausgelaugt oder angespannt", points: 2 },
      { label: "Ängstlich, klein oder erleichtert, wenn es vorbei ist", points: 3 },
    ] },
    { id: "criticism", question: "Wie oft fühlst du dich kritisiert, verspottet oder herabgesetzt?", options: [
      { label: "Selten oder nie", points: 0 },
      { label: "Gelegentlich", points: 1 },
      { label: "Regelmäßig", points: 2 },
      { label: "Ständig – es ist ein Dauerthema", points: 3 },
    ] },
    { id: "walking", question: "Ertappst du dich dabei, wie auf Eierschalen zu gehen, um eine Reaktion zu vermeiden?", options: [
      { label: "Nein", points: 0 },
      { label: "Manchmal", points: 1 },
      { label: "Oft", points: 2 },
      { label: "Die meiste Zeit", points: 3 },
    ] },
    { id: "control", question: "Versucht dein:e Partner:in zu kontrollieren, wohin du gehst, wen du siehst oder was du ausgibst?", options: [
      { label: "Nein – ich habe meine Freiheit", points: 0 },
      { label: "Ein wenig, und wir können darüber reden", points: 1 },
      { label: "Ja, und es führt zu Konflikten", points: 2 },
      { label: "Ja – ich fühle mich überwacht oder eingeschränkt", points: 3 },
    ] },
    { id: "blame", question: "Wenn etwas zwischen euch schiefgeht, wer trägt am Ende die Schuld?", options: [
      { label: "Wir stehen beide zu unserem Anteil", points: 0 },
      { label: "Meist fair aufgeteilt", points: 1 },
      { label: "Vor allem ich, auch wenn es nicht so ist", points: 2 },
      { label: "Immer ich – nichts ist je ihre:seine Schuld", points: 3 },
    ] },
    { id: "support", question: "Wenn es dir schwerfällt, ist dein:e Partner:in …", options: [
      { label: "In meiner Ecke", points: 0 },
      { label: "Manchmal unterstützend", points: 1 },
      { label: "Oft abweisend", points: 2 },
      { label: "Eine Quelle von mehr Stress, nicht weniger", points: 3 },
    ] },
    { id: "selfworth", question: "Seit du in dieser Beziehung bist, haben dein Selbstvertrauen und dein Selbstgefühl …", options: [
      { label: "Zugenommen", points: 0 },
      { label: "Sich kaum verändert", points: 1 },
      { label: "Etwas abgenommen", points: 2 },
      { label: "Einen echten Dämpfer bekommen", points: 3 },
    ] },
    { id: "fear", question: "Hast du jemals Angst vor deinem:r Partner:in gehabt – vor dem Temperament, Drohungen oder was sie:er tun könnte?", options: [
      { label: "Nie", points: 0 },
      { label: "Ein-, zweimal, leicht", points: 1 },
      { label: "Mehr als einmal", points: 2 },
      { label: "Ja – ich hatte echte Angst", points: 3 },
    ] },
  ],
  bands: [
    { min: 0, title: "Wenige toxische Signale", blurb: "Deine Antworten deuten nicht auf eine toxische Dynamik hin. Wie jede Beziehung hat sie vielleicht raue Stellen, um die man sich kümmern sollte, aber die zersetzenden Zeichen – Verachtung, Kontrolle, Angst, ständige Schuldzuweisung – beherrschen das Bild nicht, das du beschrieben hast." },
    { min: 34, title: "Einige echte Warnzeichen", blurb: "Mehrere deiner Antworten deuten auf Muster, die man ernst nehmen sollte – sich ausgelaugt, kritisiert oder mehr als fair beschuldigt fühlen. Das heißt nicht automatisch „toxisch\", aber es heißt, dass dich hier etwas etwas kostet, und es lohnt sich, das klar zu verstehen und anzugehen." },
    { min: 67, title: "Starke Signale, bei denen man handeln sollte", blurb: "Deine Antworten beschreiben mehrere der Dynamiken, die Menschen mit einer toxischen Beziehung meinen – und wenn Angst oder Kontrolle dazugehören, geht das über „toxisch\" hinaus und betrifft deine Sicherheit. Bitte lies den Hinweis unten. Du verdienst es, dich sicher und respektiert zu fühlen, und Unterstützung ist verfügbar." },
  ],
  ctaLede: "Ein Quiz kann nur deine Sicht an einem Tag spiegeln. Der vollständige Beziehungstest kartiert acht Dimensionen im Detail und benennt dein Muster – aber wenn es um Sicherheit geht, zählen die Angebote unten mehr.",
};

const relationshipCompatibilityQuizDe: MiniQuiz = {
  slug: "relationship-compatibility",
  title: "Wie gut passt ihr zusammen?",
  intro: "Acht Fragen dazu, wo ihr übereinstimmt und wo nicht. Am besten für neuere Paare, die die großen Themen kennenlernen.",
  mode: "scale",
  questions: [
    { id: "values", question: "Wie sehr stimmen eure Grundwerte überein (Ehrlichkeit, Familie, Umgang mit Menschen)?", options: [
      { label: "Sehr unterschiedlich", points: 0 },
      { label: "Einige echte Lücken", points: 1 },
      { label: "Größtenteils einig", points: 2 },
      { label: "Stark einig", points: 3 },
    ] },
    { id: "future", question: "Wollt ihr Ähnliches von der Zukunft (Kinder, Heirat, Wohnort)?", options: [
      { label: "Wir wollen recht Unterschiedliches", points: 0 },
      { label: "Wir haben noch nicht wirklich darüber geredet", points: 1 },
      { label: "Grob ähnlich", points: 2 },
      { label: "Klar auf einer Linie", points: 3 },
    ] },
    { id: "communication", question: "Wie gut kommuniziert ihr, wenn etwas nicht stimmt?", options: [
      { label: "Wir meiden es, oder es eskaliert", points: 0 },
      { label: "Mal so, mal so", points: 1 },
      { label: "Meist okay", points: 2 },
      { label: "Wir reden offen und versöhnen uns gut", points: 3 },
    ] },
    { id: "lifestyle", question: "Wie gut passen eure Alltage zusammen (soziale Energie, Routinen, Umgang mit Geld)?", options: [
      { label: "Wir prallen oft aufeinander", points: 0 },
      { label: "Wir passen uns an", points: 1 },
      { label: "Größtenteils kompatibel", points: 2 },
      { label: "Wir passen mühelos", points: 3 },
    ] },
    { id: "fun", question: "Genießt ihr wirklich die Gesellschaft des anderen und lacht zusammen?", options: [
      { label: "In letzter Zeit wenig", points: 0 },
      { label: "Manchmal", points: 1 },
      { label: "Oft", points: 2 },
      { label: "Ständig – sie:er ist mein liebster Mensch", points: 3 },
    ] },
    { id: "conflict", question: "Wenn ihr uneinig seid, wie läuft das meist ab?", options: [
      { label: "Schlecht – es bleibt hängen", points: 0 },
      { label: "Angespannt, aber wir kommen weiter", points: 1 },
      { label: "Wir lösen es", points: 2 },
      { label: "Wir gehen es ruhig an und kommen näher zusammen zurück", points: 3 },
    ] },
    { id: "intimacy", question: "Wie einig seid ihr bei Zärtlichkeit und Intimität?", options: [
      { label: "Ziemlich unterschiedlich", points: 0 },
      { label: "Etwas unterschiedlich", points: 1 },
      { label: "Größtenteils im Einklang", points: 2 },
      { label: "Sehr im Einklang", points: 3 },
    ] },
    { id: "respect", question: "Respektiert ihr die Unabhängigkeit und Freund:innen des anderen?", options: [
      { label: "Eher nicht", points: 0 },
      { label: "Manchmal ein Streitpunkt", points: 1 },
      { label: "Größtenteils ja", points: 2 },
      { label: "Vollkommen", points: 3 },
    ] },
  ],
  bands: [
    { min: 0, title: "Echte Unterschiede zum Besprechen", blurb: "Deine Antworten deuten auf einige bedeutende Lücken – bei Werten, Richtung oder im Umgang mit Konflikt. Unterschiede sind keine Dealbreaker, besonders früh, aber genau solche Dinge bespricht man am besten offen und lieber früher als später, bevor Annahmen sich verhärten." },
    { min: 41, title: "Vielversprechend, mit Lücken zum Erkunden", blurb: "Es spricht viel für euch, daneben ein paar Bereiche zum Erkunden – oft die Zukunftsfragen oder der Umgang mit Konflikt. Frühe Kompatibilität ist weniger perfektes Passen als die Fähigkeit, über die Unterschiede zu reden. Diese Fähigkeit zählt mehr als die Lücken selbst." },
    { min: 71, title: "Stark kompatibel", blurb: "Du hast starke Übereinstimmung bei Werten, Lebensstil und Verbindung beschrieben, dazu die Fähigkeit, gut mit Meinungsverschiedenheiten umzugehen – das ist der eigentliche Hinweis, mehr als Ähnlichkeit. Investiert weiter in die Freundschaft und sprecht weiter über die großen Fragen, wenn sie kommen." },
  ],
  ctaLede: "Kompatibilität ist eine Momentaufnahme. Der vollständige Beziehungstest geht tiefer, wie ihr tatsächlich zusammen funktioniert – Kommunikation, Versöhnung, Vertrauen und mehr – und benennt euer Muster.",
};

export const MINI_QUIZZES_DE: Record<string, MiniQuiz> = {
  "should-i-break-up": shouldIBreakUpQuizDe,
  "four-horsemen": fourHorsemenQuizDe,
  "attachment-style": attachmentStyleQuizDe,
  "is-my-relationship-toxic": isMyRelationshipToxicQuizDe,
  "relationship-compatibility": relationshipCompatibilityQuizDe,
};
