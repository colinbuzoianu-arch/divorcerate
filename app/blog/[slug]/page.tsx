import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { remark } from "remark";
import html from "remark-html";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = getPostBySlug(params.slug);
    return {
      title: `${post.title} | Split or Not`,
      description: post.description,
      alternates: {
        canonical: `https://splitornot.com/blog/${params.slug}`,
      },
      openGraph: {
        title: post.title,
        description: post.description,
        url: `https://splitornot.com/blog/${params.slug}`,
        type: "article",
      },
    };
  } catch {
    return {};
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  const processedContent = await remark().use(html).process(post.content);
  const contentHtml = processedContent.toString();

  return (
    <main
      style={{
        background: "#f0efed",
        minHeight: "100vh",
        padding: "2rem 1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 680 }}>
        {/* Back link */}
        <div style={{ marginBottom: "1.5rem" }}>
          <Link
            href="/blog"
            style={{ fontSize: 13, color: "#999", textDecoration: "none" }}
          >
            ← All articles
          </Link>
        </div>

        {/* Article */}
        <article
          style={{
            background: "#fff",
            borderRadius: 16,
            border: "0.5px solid #e5e5e5",
            padding: "2.5rem 2rem",
          }}
        >
          <p style={{ fontSize: 12, color: "#aaa", marginBottom: "0.75rem" }}>
            {new Date(post.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <h1
            style={{
              fontSize: 26,
              fontWeight: 600,
              color: "#1a1a1a",
              lineHeight: 1.35,
              marginBottom: "0.75rem",
            }}
          >
            {post.title}
          </h1>
          <p
            style={{
              fontSize: 15,
              color: "#666",
              lineHeight: 1.6,
              marginBottom: "2rem",
              borderBottom: "0.5px solid #eee",
              paddingBottom: "1.5rem",
            }}
          >
            {post.description}
          </p>

          {/* Rendered markdown */}
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>

        {/* CTA */}
        <div
          style={{
            background: "#534ab7",
            borderRadius: 14,
            padding: "1.75rem",
            marginTop: "1.5rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: 500,
              marginBottom: "0.5rem",
            }}
          >
            Wondering about your own relationship?
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: 14,
              marginBottom: "1.25rem",
            }}
          >
            Take our 5-minute evidence-based assessment.
          </p>
          <Link
            href="/"
            style={{
              background: "#fff",
              color: "#534ab7",
              borderRadius: 10,
              padding: "11px 24px",
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Take the Relationship Health Analyzer →
          </Link>
        </div>

        <p
          style={{
            marginTop: "1.5rem",
            fontSize: 12,
            color: "#bbb",
            textAlign: "center",
          }}
        >
          Built with Next.js · Powered by Claude AI · No data stored
        </p>
      </div>
    </main>
  );
}
