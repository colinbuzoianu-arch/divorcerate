import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import BrandMark from "@/components/layout/BrandMark";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Relationship Insights | CoupleIQ Blog",
  description:
    "Evidence-based articles on relationships, the Gottman Method, attachment theory, conflict patterns, and more.",
  alternates: {
    canonical: "https://splitornot.com/blog",
    languages: { en: "https://splitornot.com/blog", de: "https://splitornot.com/de/blog", "x-default": "https://splitornot.com/blog" },
  },
  openGraph: {
    title: "Relationship Insights | CoupleIQ Blog",
    description: "Evidence-based articles to help you understand your relationship.",
    url: "https://splitornot.com/blog",
    siteName: "CoupleIQ",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", padding: "2rem 1rem", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "var(--sans)", color: "var(--text)" }}>
      <div style={{ width: "100%", maxWidth: 680 }}>

        {/* Nav */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem" }}>
          <Link href="/" style={{ textDecoration: "none" }}><BrandMark /></Link>
          <Link href="/relationship-test" style={{ fontSize: 13, color: "var(--text-2)", textDecoration: "none" }}>Take the test →</Link>
        </div>

        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 48, color: "var(--text)", marginBottom: "0.5rem", letterSpacing: "-0.02em", lineHeight: 1 }}>
            From the journal
          </h1>
          <p style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.6 }}>
            Evidence-based articles to help you understand your relationship.
          </p>
        </div>

        {/* Post list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
              <div style={{ background: "#fff", borderRadius: 24, border: "1px solid var(--line-light)", padding: "1.75rem", cursor: "pointer", transition: "border-color 0.15s" }}>
                <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: "0.6rem" }}>
                  {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                </p>
                <h2 style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 28, color: "var(--text)", marginBottom: "0.5rem", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
                  {post.title}
                </h2>
                <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.65 }}>{post.description}</p>
                <p style={{ fontSize: 13, color: "var(--violet-deep)", marginTop: "0.75rem", fontWeight: 600 }}>Read article →</p>
              </div>
            </Link>
          ))}
        </div>

        <p style={{ marginTop: "2.5rem", fontSize: 12, color: "var(--text-2)", textAlign: "center" }}>
          CoupleIQ · splitornot.com
        </p>
      </div>
    </main>
  );
}
