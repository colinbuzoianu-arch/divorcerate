import { localizeHref, type Locale } from "@/lib/i18n/config";
import { getApp } from "@/lib/i18n/app";

/**
 * Safety block (Phase 1.4). Rendered for free, never blurred, above the rest of
 * the result whenever the safety layer triggers. It must never be paywalled and
 * must never be contradicted by "keep working on it" messaging. German uses
 * German/EU helplines.
 */
export default function SafetyBlock({ locale = "en" }: { locale?: Locale }) {
  const t = getApp(locale).safety;
  return (
    <div
      role="note"
      aria-label="Your safety comes first"
      style={{
        background: "#fff6f2",
        border: "1px solid #f0c9b8",
        borderRadius: 16,
        padding: "1.25rem 1.5rem",
      }}
    >
      <p style={{ fontSize: 15, fontWeight: 800, color: "#8a2b12", letterSpacing: "-0.01em", marginBottom: 8 }}>
        {t.title}
      </p>
      <p style={{ fontSize: 13, color: "#6b4433", lineHeight: 1.7, marginBottom: 12 }}>
        {t.body}
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "grid", gap: 8 }}>
        <li style={{ fontSize: 13, color: "#6b4433", lineHeight: 1.6 }}>
          <strong style={{ color: "#8a2b12" }}>{t.findHelpline}</strong>{" "}
          <a href="https://findahelpline.com" target="_blank" rel="noopener noreferrer" style={{ color: "#B4461C", fontWeight: 600, textUnderlineOffset: 3 }}>
            {t.findHelplineLink}
          </a>
        </li>
        <li style={{ fontSize: 13, color: "#6b4433", lineHeight: 1.6 }}>
          {t.region}
        </li>
      </ul>
      <p style={{ fontSize: 13, margin: 0 }}>
        <a href={localizeHref("/support-resources", locale)} style={{ color: "#B4461C", fontWeight: 700, textUnderlineOffset: 3 }}>
          {t.more}
        </a>
      </p>
      <p style={{ fontSize: 12, color: "#9a7a6b", lineHeight: 1.6, marginTop: 10 }}>
        {t.immediate}
      </p>
    </div>
  );
}
