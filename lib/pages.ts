/**
 * Single registry of indexable, static pages (Phase 2.4). The sitemap is built
 * from this plus the blog posts. `lastModified` is a real, hand-maintained date
 * per page — not `new Date()` on every build, which would churn the sitemap.
 *
 * Result pages (/r/*), /success and /api/* are intentionally absent: they are
 * noindex and must not appear in the sitemap (SEO rule 4).
 */

export const SITE_URL = "https://splitornot.com";

export interface SitePage {
  path: string;
  lastModified: string; // ISO date
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
}

export const STATIC_PAGES: SitePage[] = [
  { path: "/", lastModified: "2026-11-18", changeFrequency: "monthly", priority: 1 },
  { path: "/relationship-test", lastModified: "2026-11-18", changeFrequency: "monthly", priority: 0.9 },
  { path: "/methodology", lastModified: "2026-11-18", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog", lastModified: "2026-11-18", changeFrequency: "weekly", priority: 0.8 },
  { path: "/support-resources", lastModified: "2026-11-18", changeFrequency: "yearly", priority: 0.5 },
  { path: "/legal", lastModified: "2026-11-18", changeFrequency: "yearly", priority: 0.3 },
];
