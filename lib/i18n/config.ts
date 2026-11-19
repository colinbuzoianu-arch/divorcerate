/**
 * i18n foundation (Phase 7). English is the default locale and is served at the
 * root with no prefix; German is served under /de. See docs/GERMAN_EDITION_PLAN.md.
 */

export const locales = ["en", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "de";
}

/** Narrow any string to a Locale, falling back to the default. */
export function toLocale(value: string | undefined | null): Locale {
  return isLocale(value) ? value : defaultLocale;
}

/**
 * Turn an app-relative href into its localized form. English (default) is
 * unprefixed; German gets a /de prefix. External links, mailto and bare hashes
 * pass through untouched.
 */
export function localizeHref(href: string, locale: Locale): string {
  if (locale === defaultLocale) return href;
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
  if (href === "/") return `/${locale}`;
  return `/${locale}${href}`;
}

/** The cookie the manual switcher sets so middleware stops auto-redirecting. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

/** Human label for the switcher. */
export const localeLabel: Record<Locale, string> = { en: "EN", de: "DE" };
export const localeName: Record<Locale, string> = { en: "English", de: "Deutsch" };
