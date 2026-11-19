"use client";

import { usePathname } from "next/navigation";
import { locales, localeLabel, localeName, localizeHref, LOCALE_COOKIE, type Locale } from "@/lib/i18n/config";

/**
 * EN / DE language switch (Phase 7). Flips between the current page and its
 * counterpart in the other locale, and records the choice in a cookie so the
 * middleware stops auto-redirecting against an explicit preference. Uses a full
 * navigation so the server re-renders with the right <html lang> and content.
 */
export default function LanguageSwitcher({ locale, tone = "light" }: { locale: Locale; tone?: "light" | "dark" }) {
  const pathname = usePathname() || "/";

  // Strip any existing locale prefix to get the locale-agnostic path.
  let bare = pathname;
  for (const l of locales) {
    if (l === "en") continue;
    if (bare === `/${l}`) { bare = "/"; break; }
    if (bare.startsWith(`/${l}/`)) { bare = bare.slice(l.length + 1); break; }
  }

  function go(target: Locale) {
    if (target === locale) return;
    try { document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=31536000; samesite=lax`; } catch { /* no-op */ }
    window.location.href = localizeHref(bare, target);
  }

  const dim = tone === "dark" ? "rgba(243,238,230,0.5)" : "var(--text-2, #777)";
  const on = tone === "dark" ? "var(--on-dark, #f3eee6)" : "var(--text, #1a1a1a)";

  return (
    <div role="group" aria-label={locale === "de" ? "Sprache wechseln" : "Change language"} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--mono, monospace)", fontSize: 12 }}>
      {locales.map((l, i) => (
        <span key={l} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          {i > 0 && <span aria-hidden="true" style={{ color: dim }}>·</span>}
          <button
            type="button"
            onClick={() => go(l)}
            aria-current={l === locale ? "true" : undefined}
            title={localeName[l]}
            style={{
              background: "none", border: "none", padding: 0, cursor: l === locale ? "default" : "pointer",
              font: "inherit", letterSpacing: "0.08em", fontWeight: l === locale ? 700 : 500,
              color: l === locale ? on : dim,
            }}
          >
            {localeLabel[l]}
          </button>
        </span>
      ))}
    </div>
  );
}
