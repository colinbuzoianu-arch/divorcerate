import Link from "next/link";

/**
 * Shared site header in the CoupleIQ style (Phase 2). Uses the .cq landing
 * classes, so it must render inside a .cq wrapper. Links are root-relative so
 * the section anchors work from any page. Only live routes are linked.
 */
export default function SiteHeader() {
  return (
    <header className="nav">
      <Link className="brand" href="/" aria-label="CoupleIQ home">
        <span className="mark" aria-hidden="true"><span></span><span></span></span>
        <span className="word">Couple<b>IQ</b></span>
      </Link>
      <nav className="nav-links" aria-label="Main">
        <a href="/#how">How it works</a>
        <a href="/#patterns">Patterns</a>
        <a href="/#method">Method</a>
        <Link href="/blog">Journal</Link>
      </nav>
      <Link className="btn btn-light btn-sm" href="/relationship-test">Take the test</Link>
    </header>
  );
}
