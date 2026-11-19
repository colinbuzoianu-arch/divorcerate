"use client";

import { useEffect } from "react";

/**
 * Sets <html lang> for a locale subtree (Phase 7). Used on /de pages so the
 * document language reflects German for assistive tech, without making the
 * shared root layout dynamic. SEO relies primarily on hreflang + content.
 */
export default function SetHtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    try { document.documentElement.lang = lang; } catch { /* no-op */ }
    return () => { try { document.documentElement.lang = "en"; } catch { /* no-op */ } };
  }, [lang]);
  return null;
}
