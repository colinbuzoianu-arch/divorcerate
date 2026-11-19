import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Locale } from "@/lib/i18n/config";

const baseDir = path.join(process.cwd(), "content/posts");

/** Posts live in content/posts (en) and content/posts/de (de). */
function dirFor(locale: Locale): string {
  return locale === "de" ? path.join(baseDir, "de") : baseDir;
}

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category?: string;
};

export type Post = PostMeta & {
  content: string;
};

export function getAllPosts(locale: Locale = "en"): PostMeta[] {
  const dir = dirFor(locale);
  if (!fs.existsSync(dir)) return [];
  const fileNames = fs.readdirSync(dir);

  const posts = fileNames
    .filter((f) => f.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fileContents = fs.readFileSync(path.join(dir, fileName), "utf8");
      const { data } = matter(fileContents);
      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        category: data.category ?? undefined,
      };
    });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Related posts: prefer the same category, then fill with the most recent. */
export function getRelatedPosts(slug: string, limit = 3, locale: Locale = "en"): PostMeta[] {
  const all = getAllPosts(locale).filter((p) => p.slug !== slug);
  const self = getAllPosts(locale).find((p) => p.slug === slug);
  const sameCat = self?.category ? all.filter((p) => p.category === self.category) : [];
  const rest = all.filter((p) => !sameCat.includes(p));
  return [...sameCat, ...rest].slice(0, limit);
}

export function getPostBySlug(slug: string, locale: Locale = "en"): Post {
  const fullPath = path.join(dirFor(locale), `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    category: data.category ?? undefined,
    content,
  };
}
