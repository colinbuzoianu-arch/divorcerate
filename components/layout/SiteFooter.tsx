import Link from "next/link";

/**
 * Shared site footer in the CoupleIQ style (Phase 2). Only live routes are
 * linked — pattern pages, methodology, about and the mini-quizzes are omitted
 * until they exist (no dead links, SEO rule 4 / plan 2.2).
 */
export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link className="brand" href="/">
              <span className="mark" aria-hidden="true"><span></span><span></span></span>
              <span className="word">Couple<b>IQ</b></span>
            </Link>
            <p style={{ marginTop: 16, maxWidth: 300 }}>An honest, private look at your relationship, at splitornot.com.</p>
          </div>
          <div>
            <h4>Tests</h4>
            <ul>
              <li><Link href="/relationship-test">Relationship test</Link></li>
              <li><Link href="/should-i-break-up-quiz">Should I break up?</Link></li>
              <li><Link href="/four-horsemen-quiz">Four Horsemen quiz</Link></li>
              <li><Link href="/attachment-style-quiz">Attachment style quiz</Link></li>
              <li><Link href="/is-my-relationship-toxic-quiz">Is my relationship toxic?</Link></li>
              <li><Link href="/relationship-compatibility-test">Compatibility test</Link></li>
            </ul>
          </div>
          <div>
            <h4>Learn</h4>
            <ul>
              <li><Link href="/patterns/pursuer-withdrawer">Relationship patterns</Link></li>
              <li><Link href="/methodology">Methodology</Link></li>
              <li><Link href="/blog">Journal</Link></li>
              <li><Link href="/support-resources">Support resources</Link></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link href="/legal">Privacy &amp; terms</Link></li>
              <li><a href="mailto:support.coupleiq@gmail.com">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="big" aria-hidden="true">Couple<span className="it">IQ</span></div>
        <div className="foot-base">
          <span>© {year} CoupleIQ · splitornot.com · Operated by Verumsell SRL</span>
          <span>For self-reflection only. Not a substitute for professional help.</span>
        </div>
      </div>
    </footer>
  );
}
