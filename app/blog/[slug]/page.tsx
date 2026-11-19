import { getPostBySlug, getAllPosts, getRelatedPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import ArticleCtaLink from "@/components/ArticleCtaLink";
import BrandMark from "@/components/layout/BrandMark";
import JsonLd from "@/components/JsonLd";
import { blogPostingLd, breadcrumbLd } from "@/lib/seo";
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
      title: `${post.title} | CoupleIQ`,
      description: post.description,
      alternates: {
        canonical: `https://splitornot.com/blog/${params.slug}`,
        languages: {
          en: `https://splitornot.com/blog/${params.slug}`,
          de: `https://splitornot.com/de/blog/${params.slug}`,
          "x-default": `https://splitornot.com/blog/${params.slug}`,
        },
      },
      openGraph: {
        title: post.title,
        description: post.description,
        url: `https://splitornot.com/blog/${params.slug}`,
        siteName: "CoupleIQ",
        type: "article",
        images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
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
  const related = getRelatedPosts(params.slug, 3);

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", padding: "2rem 1rem", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "var(--sans)", color: "var(--text)" }}>
      <JsonLd data={blogPostingLd({ title: post.title, description: post.description, slug: params.slug, date: post.date })} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Journal", path: "/blog" }, { name: post.title, path: `/blog/${params.slug}` }])} />
      <div style={{ width: "100%", maxWidth: 680 }}>

        {/* Nav */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <Link href="/" style={{ textDecoration: "none" }}><BrandMark /></Link>
          <Link href="/blog" style={{ fontSize: 13, color: "var(--text-2)", textDecoration: "none" }}>← All articles</Link>
        </div>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ fontSize: 12, color: "var(--text-2)", marginBottom: "1.75rem" }}>
          <Link href="/" style={{ color: "var(--text-2)" }}>Home</Link> · <Link href="/blog" style={{ color: "var(--text-2)" }}>Journal</Link>{post.category ? <> · {post.category}</> : null}
        </nav>

        {/* Article */}
        <article style={{ background: "#fff", borderRadius: 32, border: "1px solid var(--line-light)", padding: "2.75rem 2.25rem" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: "0.9rem" }}>
            {post.category ? <>{post.category} · </> : null}{new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>
          <h1 style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 42, color: "var(--text)", lineHeight: 1.05, marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            {post.title}
          </h1>
          <p style={{ fontSize: 16, color: "var(--text-2)", lineHeight: 1.7, marginBottom: "2rem", borderBottom: "1px solid var(--line-light)", paddingBottom: "1.5rem" }}>
            {post.description}
          </p>
          <div className="prose" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </article>

        {/* CTA */}
        <div style={{ background: "var(--ink)", color: "var(--on-dark)", borderRadius: 32, padding: "2.5rem 2rem", marginTop: "1.5rem", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 30, marginBottom: "0.5rem", lineHeight: 1.1 }}>
            Wondering about your own relationship?
          </p>
          <p style={{ color: "var(--on-dark-2)", fontSize: 14, marginBottom: "1.5rem", lineHeight: 1.6 }}>
            Take CoupleIQ&apos;s free, private 5-minute relationship test.
          </p>
          <ArticleCtaLink
            href="/relationship-test"
            slug={params.slug}
            style={{ background: "var(--on-dark)", color: "var(--ink)", borderRadius: 999, padding: "14px 30px", fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}
          >
            Take the free test →
          </ArticleCtaLink>
        </div>

        {related.length > 0 && (
          <div style={{ marginTop: "2.5rem" }}>
            <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 16 }}>Related reading</p>
            <div style={{ display: "grid", gap: 10 }}>
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} style={{ textDecoration: "none", background: "#fff", border: "1px solid var(--line-light)", borderRadius: 16, padding: "1rem 1.25rem", display: "block" }}>
                  <p style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--text)", marginBottom: 2, lineHeight: 1.15 }}>{r.title}</p>
                  <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.5 }}>{r.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <p style={{ marginTop: "1.5rem", fontSize: 12, color: "var(--text-2)", textAlign: "center" }}>
          CoupleIQ · splitornot.com
        </p>
      </div>
    </main>
  );
}
