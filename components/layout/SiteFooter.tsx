import Link from "next/link";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import { getUI } from "@/lib/i18n/ui";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

/**
 * Shared site footer in the CoupleIQ style (Phase 2, localized in Phase 7).
 * Links are locale-aware; the default locale (en) is unprefixed.
 */
export default function SiteFooter({ locale = "en" }: { locale?: Locale }) {
  const t = getUI(locale).footer;
  const href = (p: string) => localizeHref(p, locale);
  const year = new Date().getFullYear();
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link className="brand" href={href("/")}>
              <span className="mark" aria-hidden="true"><span></span><span></span></span>
              <span className="word">Couple<b>IQ</b></span>
            </Link>
            <p style={{ marginTop: 16, maxWidth: 300 }}>{t.tagline}</p>
            <div style={{ marginTop: 20 }}><LanguageSwitcher locale={locale} tone="dark" /></div>
          </div>
          <div>
            <h4>{t.testsHeading}</h4>
            <ul>
              <li><Link href={href("/relationship-test")}>{t.links.relationshipTest}</Link></li>
              <li><Link href={href("/should-i-break-up-quiz")}>{t.links.shouldIBreakUp}</Link></li>
              <li><Link href={href("/four-horsemen-quiz")}>{t.links.fourHorsemen}</Link></li>
              <li><Link href={href("/attachment-style-quiz")}>{t.links.attachmentStyle}</Link></li>
              <li><Link href={href("/is-my-relationship-toxic-quiz")}>{t.links.toxic}</Link></li>
              <li><Link href={href("/relationship-compatibility-test")}>{t.links.compatibility}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t.learnHeading}</h4>
            <ul>
              <li><Link href={href("/patterns/pursuer-withdrawer")}>{t.links.patterns}</Link></li>
              <li><Link href={href("/methodology")}>{t.links.methodology}</Link></li>
              <li><Link href={href("/blog")}>{t.links.journal}</Link></li>
              <li><Link href={href("/support-resources")}>{t.links.support}</Link></li>
            </ul>
          </div>
          <div>
            <h4>{t.companyHeading}</h4>
            <ul>
              <li><Link href={href("/legal")}>{t.links.privacy}</Link></li>
              <li><a href="mailto:support.coupleiq@gmail.com">{t.links.contact}</a></li>
            </ul>
          </div>
        </div>
        <div className="big" aria-hidden="true">Couple<span className="it">IQ</span></div>
        <div className="foot-base">
          <span>{t.rights.replace("{year}", String(year))}</span>
          <span>{t.disclaimer}</span>
        </div>
      </div>
    </footer>
  );
}
