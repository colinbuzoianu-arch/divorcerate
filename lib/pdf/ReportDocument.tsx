import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { StoredResult } from "@/lib/types";

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

export function ReportDocument({ result }: { result: StoredResult }) {
  const n = result.narrative;
  const noteFor = (key: string) => n?.dimensionNotes?.find((d) => d.key === key)?.note;

  return (
    <Document title="Your CoupleIQ relationship report" author="CoupleIQ">
      <Page size="A4" style={s.page}>
        <Text style={s.brand}>CoupleIQ</Text>
        <Text style={s.brandSub}>Your relationship report · splitornot.com</Text>

        <View style={s.bandRow}>
          <Text style={s.eyebrow}>Relationship health</Text>
          <Text style={s.band}>{result.band}</Text>
          <Text style={s.score}>{result.healthScore} / 100 health score</Text>
          <Text style={s.headline}>{result.headline}</Text>
        </View>

        <Text style={s.h2}>Your relationship pattern</Text>
        <Text style={s.body}>{result.pattern}</Text>

        <View style={s.twoCol}>
          <View style={s.colBox}>
            <Text style={{ ...s.colLabel, color: "#0F6E56" }}>Biggest strength</Text>
            <Text style={{ fontFamily: "Helvetica-Bold" }}>{result.strength.label}</Text>
          </View>
          <View style={s.colBox}>
            <Text style={{ ...s.colLabel, color: EMBER }}>Focus area</Text>
            <Text style={{ fontFamily: "Helvetica-Bold" }}>{result.risk.label}</Text>
          </View>
        </View>

        <Text style={s.h2}>Eight dimensions</Text>
        {result.dimensions.map((d) => (
          <View key={d.key} style={s.dimRow}>
            <Text style={s.dimLabel}>{d.label}</Text>
            <Text style={s.dimScore}>{d.score}</Text>
          </View>
        ))}

        {n?.summary ? (
          <>
            <Text style={s.h2}>Your result</Text>
            <Text style={s.body}>{n.summary}</Text>
          </>
        ) : null}

        {n?.dimensionNotes?.length ? (
          <>
            <Text style={s.h2}>Your dimensions, explained</Text>
            {result.dimensions.map((d) => {
              const note = noteFor(d.key);
              if (!note) return null;
              return (
                <View key={d.key} style={{ marginBottom: 6 }}>
                  <Text style={{ fontFamily: "Helvetica-Bold" }}>{d.label} · {d.score}</Text>
                  <Text style={s.body}>{note}</Text>
                </View>
              );
            })}
          </>
        ) : null}

        {n?.riskDetail ? (
          <>
            <Text style={s.h2}>Why {result.risk.label} is your focus area</Text>
            <Text style={s.body}>{n.riskDetail}</Text>
          </>
        ) : null}

        {n?.recommendations?.length ? (
          <>
            <Text style={s.h2}>What to do next</Text>
            {n.recommendations.map((r, i) => (
              <View key={i} style={s.rec}>
                <Text style={s.recTitle}>{i + 1}. {r.title}</Text>
                <Text style={s.body}>{r.detail}</Text>
              </View>
            ))}
          </>
        ) : null}

        <Text style={s.footer} fixed>
          CoupleIQ · splitornot.com — For self-reflection only. Not a diagnosis or a substitute for professional help.
        </Text>
      </Page>
    </Document>
  );
}
