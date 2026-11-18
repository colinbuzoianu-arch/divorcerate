import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

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

export function getAllPosts(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .filter((f) => f.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
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
export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const all = getAllPosts().filter((p) => p.slug !== slug);
  const self = all.length ? getAllPosts().find((p) => p.slug === slug) : undefined;
  const sameCat = self?.category ? all.filter((p) => p.category === self.category) : [];
  const rest = all.filter((p) => !sameCat.includes(p));
  return [...sameCat, ...rest].slice(0, limit);
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
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
