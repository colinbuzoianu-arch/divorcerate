import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { STATIC_PAGES, SITE_URL } from "@/lib/pages";
import { PATTERNS } from "@/lib/patterns";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_PAGES.map((p) => ({
    url: `${SITE_URL}${p.path === "/" ? "" : p.path}`,
    lastModified: new Date(p.lastModified),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const patternPages = PATTERNS.map((p) => ({
    url: `${SITE_URL}/patterns/${p.slug}`,
    lastModified: new Date("2026-11-18"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPosts = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...patternPages, ...blogPosts];
}
