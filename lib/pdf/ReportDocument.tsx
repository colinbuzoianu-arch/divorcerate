import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { StoredResult } from "@/lib/types";
import type { Locale } from "@/lib/i18n/config";
import { bandLabel, patternLabel, dimensionLabel } from "@/lib/i18n/scoring";
import type { Band, Pattern, DimensionKey } from "@/lib/scoring";

const PDF_STRINGS = {
  en: { subtitle: "Your relationship report · splitornot.com", health: "Relationship health", outOf: "/ 100 health score", pattern: "Your relationship pattern", strength: "Biggest strength", focus: "Focus area", dimensions: "Eight dimensions", yourResult: "Your result", dimsExplained: "Your dimensions, explained", whyFocus: (r: string) => `Why ${r} is your focus area`, next: "What to do next", footer: "CoupleIQ · splitornot.com — For self-reflection only. Not a diagnosis or a substitute for professional help." },
  de: { subtitle: "Dein Beziehungsbericht · splitornot.com", health: "Beziehungsgesundheit", outOf: "/ 100 Beziehungs-Score", pattern: "Dein Beziehungsmuster", strength: "Größte Stärke", focus: "Fokusbereich", dimensions: "Acht Dimensionen", yourResult: "Dein Ergebnis", dimsExplained: "Deine Dimensionen, erklärt", whyFocus: (r: string) => `Warum ${r} dein Fokusbereich ist`, next: "Was als Nächstes zu tun ist", footer: "CoupleIQ · splitornot.com — Nur zur Selbstreflexion. Keine Diagnose und kein Ersatz für professionelle Hilfe." },
};

/**
 * Server-rendered PDF of the paid full report (Phase 6.3). Built with
 * @react-pdf/renderer (no browser). Uses the built-in Helvetica font.
 */

const INK = "#14101E";
const VIOLET = "#4B3FB0";
const EMBER = "#B4461C";
const MUTED = "#5A5463";
const LINE = "#E3DED5";

const s = StyleSheet.create({
  page: { paddingVertical: 48, paddingHorizontal: 48, fontFamily: "Helvetica", color: "#1A1622", fontSize: 11, lineHeight: 1.5 },
  brand: { fontSize: 13, fontFamily: "Helvetica-Bold", color: INK, marginBottom: 2 },
  brandSub: { fontSize: 9, color: MUTED, marginBottom: 20 },
  bandRow: { borderWidth: 1, borderColor: LINE, borderRadius: 8, padding: 16, marginBottom: 18 },
  eyebrow: { fontSize: 8, color: VIOLET, letterSpacing: 1, marginBottom: 6, textTransform: "uppercase" },
  band: { fontSize: 24, fontFamily: "Helvetica-Bold", color: INK },
  score: { fontSize: 13, color: MUTED, marginTop: 4 },
  headline: { fontSize: 12, color: "#1A1622", marginTop: 10 },
  h2: { fontSize: 12, fontFamily: "Helvetica-Bold", color: INK, marginTop: 18, marginBottom: 8 },
  dimRow: { flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: LINE, paddingVertical: 4 },
  dimLabel: { color: MUTED },
  dimScore: { fontFamily: "Helvetica-Bold", color: INK },
  body: { color: "#2A2633", marginBottom: 8 },
  recTitle: { fontFamily: "Helvetica-Bold", color: INK, marginBottom: 2 },
  rec: { marginBottom: 10 },
  twoCol: { flexDirection: "row", gap: 12, marginTop: 10 },
  colBox: { flex: 1, borderWidth: 1, borderColor: LINE, borderRadius: 8, padding: 12 },
  colLabel: { fontSize: 8, letterSpacing: 1, marginBottom: 4, textTransform: "uppercase" },
  footer: { position: "absolute", bottom: 28, left: 48, right: 48, fontSize: 8, color: MUTED, borderTopWidth: 1, borderTopColor: LINE, paddingTop: 8 },
});

export function ReportDocument({ result, locale = "en" }: { result: StoredResult; locale?: Locale }) {
  const n = result.narrative;
  const noteFor = (key: string) => n?.dimensionNotes?.find((d) => d.key === key)?.note;
  const str = PDF_STRINGS[locale];
  const dl = dimensionLabel[locale];
  const dimLabel = (key: string, fallback: string) => dl[key as DimensionKey] ?? fallback;
  const bandText = bandLabel[locale][result.band as Band] ?? result.band;
  const patternText = patternLabel[locale][result.pattern as Pattern] ?? result.pattern;
  const strengthText = dimLabel(result.strength.key, result.strength.label);
  const riskText = dimLabel(result.risk.key, result.risk.label);

  return (
    <Document title="CoupleIQ" author="CoupleIQ">
      <Page size="A4" style={s.page}>
        <Text style={s.brand}>CoupleIQ</Text>
        <Text style={s.brandSub}>{str.subtitle}</Text>

        <View style={s.bandRow}>
          <Text style={s.eyebrow}>{str.health}</Text>
          <Text style={s.band}>{bandText}</Text>
          <Text style={s.score}>{result.healthScore} {str.outOf}</Text>
          <Text style={s.headline}>{result.headline}</Text>
        </View>

        <Text style={s.h2}>{str.pattern}</Text>
        <Text style={s.body}>{patternText}</Text>

        <View style={s.twoCol}>
          <View style={s.colBox}>
            <Text style={{ ...s.colLabel, color: "#0F6E56" }}>{str.strength}</Text>
            <Text style={{ fontFamily: "Helvetica-Bold" }}>{strengthText}</Text>
          </View>
          <View style={s.colBox}>
            <Text style={{ ...s.colLabel, color: EMBER }}>{str.focus}</Text>
            <Text style={{ fontFamily: "Helvetica-Bold" }}>{riskText}</Text>
          </View>
        </View>

        <Text style={s.h2}>{str.dimensions}</Text>
        {result.dimensions.map((d) => (
          <View key={d.key} style={s.dimRow}>
            <Text style={s.dimLabel}>{dimLabel(d.key, d.label)}</Text>
            <Text style={s.dimScore}>{d.score}</Text>
          </View>
        ))}

        {n?.summary ? (
          <>
            <Text style={s.h2}>{str.yourResult}</Text>
            <Text style={s.body}>{n.summary}</Text>
          </>
        ) : null}

        {n?.dimensionNotes?.length ? (
          <>
            <Text style={s.h2}>{str.dimsExplained}</Text>
            {result.dimensions.map((d) => {
              const note = noteFor(d.key);
              if (!note) return null;
              return (
                <View key={d.key} style={{ marginBottom: 6 }}>
                  <Text style={{ fontFamily: "Helvetica-Bold" }}>{dimLabel(d.key, d.label)} · {d.score}</Text>
                  <Text style={s.body}>{note}</Text>
                </View>
              );
            })}
          </>
        ) : null}

        {n?.riskDetail ? (
          <>
            <Text style={s.h2}>{str.whyFocus(riskText)}</Text>
            <Text style={s.body}>{n.riskDetail}</Text>
          </>
        ) : null}

        {n?.recommendations?.length ? (
          <>
            <Text style={s.h2}>{str.next}</Text>
            {n.recommendations.map((r, i) => (
              <View key={i} style={s.rec}>
                <Text style={s.recTitle}>{i + 1}. {r.title}</Text>
                <Text style={s.body}>{r.detail}</Text>
              </View>
            ))}
          </>
        ) : null}

        <Text style={s.footer} fixed>
          {str.footer}
        </Text>
      </Page>
    </Document>
  );
}
