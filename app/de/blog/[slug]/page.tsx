import { getPostBySlug, getAllPosts, getRelatedPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import ArticleCtaLink from "@/components/ArticleCtaLink";
import BrandMark from "@/components/layout/BrandMark";
import SetHtmlLang from "@/components/SetHtmlLang";
import JsonLd from "@/components/JsonLd";
import { blogPostingLd, breadcrumbLd } from "@/lib/seo";
import type { Metadata } from "next";
import { remark } from "remark";
import html from "remark-html";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = getPostBySlug(params.slug, "de");
    return {
      title: `${post.title} | CoupleIQ`,
      description: post.description,
      alternates: {
        canonical: `https://splitornot.com/de/blog/${params.slug}`,
        languages: {
          en: `https://splitornot.com/blog/${params.slug}`,
          de: `https://splitornot.com/de/blog/${params.slug}`,
          "x-default": `https://splitornot.com/blog/${params.slug}`,
        },
      },
      openGraph: {
        title: post.title,
        description: post.description,
        url: `https://splitornot.com/de/blog/${params.slug}`,
        siteName: "CoupleIQ",
        type: "article",
        locale: "de_DE",
        images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
      },
    };
  } catch {
    return {};
  }
}

export async function generateStaticParams() {
  return getAllPosts("de").map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPageDe({ params }: Props) {
  let post;
  try {
    post = getPostBySlug(params.slug, "de");
  } catch {
    notFound();
  }

  const processedContent = await remark().use(html).process(post.content);
  const contentHtml = processedContent.toString();
  const related = getRelatedPosts(params.slug, 3, "de");

  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh", padding: "2rem 1rem", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "var(--sans)", color: "var(--text)" }}>
      <SetHtmlLang lang="de" />
      <JsonLd data={blogPostingLd({ title: post.title, description: post.description, slug: params.slug, date: post.date, basePath: "/de/blog" })} />
      <JsonLd data={breadcrumbLd([{ name: "Start", path: "/de" }, { name: "Journal", path: "/de/blog" }, { name: post.title, path: `/de/blog/${params.slug}` }])} />
      <div style={{ width: "100%", maxWidth: 680 }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <Link href="/de" style={{ textDecoration: "none" }}><BrandMark /></Link>
          <Link href="/de/blog" style={{ fontSize: 13, color: "var(--text-2)", textDecoration: "none" }}>← Alle Artikel</Link>
        </div>

        <nav aria-label="Breadcrumb" style={{ fontSize: 12, color: "var(--text-2)", marginBottom: "1.75rem" }}>
          <Link href="/de" style={{ color: "var(--text-2)" }}>Start</Link> · <Link href="/de/blog" style={{ color: "var(--text-2)" }}>Journal</Link>{post.category ? <> · {post.category}</> : null}
        </nav>

        <article style={{ background: "#fff", borderRadius: 32, border: "1px solid var(--line-light)", padding: "2.75rem 2.25rem" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: "0.9rem" }}>
            {post.category ? <>{post.category} · </> : null}{new Date(post.date).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" })}
          </p>
          <h1 style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 42, color: "var(--text)", lineHeight: 1.05, marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            {post.title}
          </h1>
          <p style={{ fontSize: 16, color: "var(--text-2)", lineHeight: 1.7, marginBottom: "2rem", borderBottom: "1px solid var(--line-light)", paddingBottom: "1.5rem" }}>
            {post.description}
          </p>
          <div className="prose" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </article>

        <div style={{ background: "var(--ink)", color: "var(--on-dark)", borderRadius: 32, padding: "2.5rem 2rem", marginTop: "1.5rem", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 30, marginBottom: "0.5rem", lineHeight: 1.1 }}>
            Fragst du dich, wie es um deine Beziehung steht?
          </p>
          <p style={{ color: "var(--on-dark-2)", fontSize: 14, marginBottom: "1.5rem", lineHeight: 1.6 }}>
            Mach CoupleIQs kostenlosen, privaten 5-Minuten-Beziehungstest.
          </p>
          <ArticleCtaLink
            href="/de/relationship-test"
            slug={params.slug}
            style={{ background: "var(--on-dark)", color: "var(--ink)", borderRadius: 999, padding: "14px 30px", fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}
          >
            Kostenlosen Test starten →
          </ArticleCtaLink>
        </div>

        {related.length > 0 && (
          <div style={{ marginTop: "2.5rem" }}>
            <p style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-2)", marginBottom: 16 }}>Weiterlesen</p>
            <div style={{ display: "grid", gap: 10 }}>
              {related.map((r) => (
                <Link key={r.slug} href={`/de/blog/${r.slug}`} style={{ textDecoration: "none", background: "#fff", border: "1px solid var(--line-light)", borderRadius: 16, padding: "1rem 1.25rem", display: "block" }}>
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
