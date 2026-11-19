import Link from "next/link";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import { getUI } from "@/lib/i18n/ui";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

/**
 * Shared site header in the CoupleIQ style (Phase 2, localized in Phase 7).
 * Uses the .cq landing classes, so it must render inside a .cq wrapper. Links
 * are locale-aware; the default locale (en) is unprefixed.
 */
export default function SiteHeader({ locale = "en" }: { locale?: Locale }) {
  const t = getUI(locale).nav;
  const href = (p: string) => localizeHref(p, locale);
  return (
    <header className="nav">
      <Link className="brand" href={href("/")} aria-label={t.brandAria}>
        <span className="mark" aria-hidden="true"><span></span><span></span></span>
        <span className="word">Couple<b>IQ</b></span>
      </Link>
      <nav className="nav-links" aria-label="Main">
        <a href={href("/#how")}>{t.howItWorks}</a>
        <a href={href("/#patterns")}>{t.patterns}</a>
        <a href={href("/#method")}>{t.method}</a>
        <Link href={href("/blog")}>{t.journal}</Link>
      </nav>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <LanguageSwitcher locale={locale} tone="dark" />
        <Link className="btn btn-light btn-sm" href={href("/relationship-test")}>{t.takeTest}</Link>
      </div>
    </header>
  );
}
