import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Relationship Advice & Insights | Split or Not Blog",
  description:
    "Evidence-based articles on relationships, breakups, the Gottman Method, attachment theory, and more.",
  alternates: {
    canonical: "https://splitornot.com/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

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
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <Link
            href="/"
            style={{ fontSize: 13, color: "#999", textDecoration: "none" }}
          >
            ← Back to analyzer
          </Link>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "#1a1a1a",
              marginTop: "1rem",
              marginBottom: "0.5rem",
            }}
          >
            Relationship Insights
          </h1>
          <p style={{ fontSize: 15, color: "#666" }}>
            Evidence-based articles to help you understand your relationship.
          </p>
        </div>

        {/* Post list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  border: "0.5px solid #e5e5e5",
                  padding: "1.5rem",
                  cursor: "pointer",
                  transition: "border-color 0.15s",
                }}
              >
                <p
                  style={{
                    fontSize: 12,
                    color: "#aaa",
                    marginBottom: "0.4rem",
                  }}
                >
                  {new Date(post.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h2
                  style={{
                    fontSize: 18,
                    fontWeight: 500,
                    color: "#1a1a1a",
                    marginBottom: "0.5rem",
                    lineHeight: 1.4,
                  }}
                >
                  {post.title}
                </h2>
                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6 }}>
                  {post.description}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "#534ab7",
                    marginTop: "0.75rem",
                  }}
                >
                  Read article →
                </p>
              </div>
            </Link>
          ))}
        </div>

        <p
          style={{
            marginTop: "2rem",
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
