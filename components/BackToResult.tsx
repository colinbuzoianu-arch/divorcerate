"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

/**
 * A "← Back to your result" link, shown only when the visitor arrived from
 * their own result (e.g. "Read more about your pattern" carries ?from=<id>).
 * Rendered client-side so the host page stays statically generated — the
 * result link is private and never needs to be in the indexable HTML.
 */
function Inner() {
  const params = useSearchParams();
  const from = params.get("from");
  if (!from || !/^[0-9a-fA-F-]{10,64}$/.test(from)) return null;

  return (
    <Link
      href={`/r/${from}`}
      style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--violet-deep)", textDecoration: "none", marginBottom: "2rem" }}
    >
      ← Back to your result
    </Link>
  );
}

export default function BackToResult() {
  return (
    <Suspense fallback={null}>
      <Inner />
    </Suspense>
  );
}
