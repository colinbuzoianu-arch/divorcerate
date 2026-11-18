"use client";

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { track } from "@/lib/analytics";

interface Props {
  href: string;
  /** Article slug, reported as the event `source`. */
  slug: string;
  children: ReactNode;
  style?: CSSProperties;
}

/**
 * CTA link used inside server-rendered articles. It fires the
 * `article_cta_click` funnel event (with the article slug as `source`)
 * before navigating. Kept as a tiny client island so the article page
 * itself stays a server component.
 */
export default function ArticleCtaLink({ href, slug, children, style }: Props) {
  return (
    <Link
      href={href}
      style={style}
      onClick={() => track("article_cta_click", { source: slug })}
    >
      {children}
    </Link>
  );
}
