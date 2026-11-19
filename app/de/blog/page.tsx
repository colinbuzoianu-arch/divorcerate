import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import BrandMark from "@/components/layout/BrandMark";
import SetHtmlLang from "@/components/SetHtmlLang";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beziehungswissen | CoupleIQ Journal",
  description:
    "Fundierte Artikel über Beziehungen, die Gottman-Methode, Bindungstheorie, Konfliktmuster und mehr.",
  alternates: {
    canonical: "https://splitornot.com/de/blog",
    languages: { en: "https://splitornot.com/blog", de: "https://splitornot.com/de/blog", "x-default": "https://splitornot.com/blog" },
  },
  openGraph: {
    title: "Beziehungswissen | CoupleIQ Journal",
    description: "Fundierte Artikel, die dir helfen, deine Beziehung zu verstehen.",
    url: "https://splitornot.com/de/blog",
    siteName: "CoupleIQ",
    type: "website",
    locale: "de_DE",
  },
};

export default function BlogPageDe() {
  const posts = getAllPosts("de");

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", padding: "2rem 1rem", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "var(--sans)", color: "var(--text)" }}>
      <SetHtmlLang lang="de" />
      <div style={{ width: "100%", maxWidth: 680 }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem" }}>
          <Link href="/de" style={{ textDecoration: "none" }}><BrandMark /></Link>
          <Link href="/de/relationship-test" style={{ fontSize: 13, color: "var(--text-2)", textDecoration: "none" }}>Zum Test →</Link>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 48, color: "var(--text)", marginBottom: "0.5rem", letterSpacing: "-0.02em", lineHeight: 1 }}>
            Aus dem Journal
          </h1>
          <p style={{ fontSize: 15, color: "var(--text-2)", lineHeight: 1.6 }}>
            Fundierte Artikel, die dir helfen, deine Beziehung zu verstehen.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/de/blog/${post.slug}`} style={{ textDecoration: "none" }}>
              <div style={{ background: "#fff", borderRadius: 24, border: "1px solid var(--line-light)", padding: "1.75rem", cursor: "pointer", transition: "border-color 0.15s" }}>
                <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: "0.6rem" }}>
                  {new Date(post.date).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" })}
                </p>
                <h2 style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 28, color: "var(--text)", marginBottom: "0.5rem", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
                  {post.title}
                </h2>
                <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.65 }}>{post.description}</p>
                <p style={{ fontSize: 13, color: "var(--violet-deep)", marginTop: "0.75rem", fontWeight: 600 }}>Artikel lesen →</p>
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
