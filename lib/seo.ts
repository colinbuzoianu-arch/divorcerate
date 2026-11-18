import { SITE_URL } from "@/lib/pages";

/**
 * JSON-LD structured data helpers (Phase 2.3). We use the Organization as the
 * author/publisher — the site is organisation-authored and we won't invent a
 * person byline (honesty rule 1); real author pages come in Phase 4.5.
 */

const ORG = {
  "@type": "Organization",
  name: "CoupleIQ",
  url: SITE_URL,
  legalName: "Verumsell SRL",
  logo: `${SITE_URL}/logo.png`,
};

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    ...ORG,
    email: "contact@verumsell.com",
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CoupleIQ",
    url: SITE_URL,
  };
}

export function blogPostingLd(opts: {
  title: string;
  description: string;
  slug: string;
  date: string;
  image?: string;
}) {
  const url = `${SITE_URL}/blog/${opts.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    datePublished: opts.date,
    dateModified: opts.date,
    author: { "@type": "Organization", name: "CoupleIQ" },
    publisher: {
      "@type": "Organization",
      name: "CoupleIQ",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    image: opts.image ?? `${url}/opengraph-image`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path === "/" ? "" : it.path}`,
    })),
  };
}

export function faqPageLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
