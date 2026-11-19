import { NextRequest, NextResponse } from "next/server";
import { LOCALE_COOKIE } from "@/lib/i18n/config";

/**
 * Locale auto-detection (Phase 7). German-preferring visitors with no explicit
 * choice are redirected from an English URL to its /de counterpart. The manual
 * switcher sets the NEXT_LOCALE cookie, which then always wins — so we never
 * redirect against an explicit choice.
 *
 * We only redirect paths that actually have a German version (see
 * TRANSLATED_PREFIXES), so a redirect never lands on a 404. As more sections
 * are translated, their prefixes are added here.
 */

// English paths (prefixes) that ALREADY have a /de equivalent. "/" is handled
// exactly. Add a prefix here only once its German page exists, so an
// auto-redirect never lands on a 404. (Remaining sections are added as the
// German edition is built out — see docs/GERMAN_EDITION_PLAN.md.)
const TRANSLATED_PREFIXES = [
  "/relationship-test",
  "/patterns",
  "/methodology",
  "/should-i-break-up-quiz",
  "/four-horsemen-quiz",
  "/attachment-style-quiz",
  "/is-my-relationship-toxic-quiz",
  "/relationship-compatibility-test",
];

function hasGermanVersion(pathname: string): boolean {
  if (pathname === "/") return true;
  return TRANSLATED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

function prefersGerman(req: NextRequest): boolean {
  const al = req.headers.get("accept-language");
  if (!al) return false;
  // First language tag wins; e.g. "de-DE,de;q=0.9,en;q=0.8" -> "de-de".
  const first = al.split(",")[0]?.trim().toLowerCase() ?? "";
  return first.startsWith("de");
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Already on a German URL — nothing to do.
  if (pathname === "/de" || pathname.startsWith("/de/")) return NextResponse.next();

  // Respect an explicit choice: if the visitor chose English (cookie=en) or any
  // cookie is set, don't auto-redirect.
  const cookieLocale = req.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale) return NextResponse.next();

  // No explicit choice: redirect German-preferring visitors to the /de version,
  // but only when that version exists.
  if (prefersGerman(req) && hasGermanVersion(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = pathname === "/" ? "/de" : `/de${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Run on content routes only — never on API, Next internals, or static assets.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|opengraph-image.png|apple-icon.png|.*\\..*).*)"],
};
