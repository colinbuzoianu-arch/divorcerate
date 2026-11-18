import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import "./styles/landing.css";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import HeroThreads from "@/components/landing/HeroThreads";
import NotifyForm from "@/components/landing/NotifyForm";
import JsonLd from "@/components/JsonLd";
import { faqPageLd } from "@/lib/seo";
import { getAllPosts } from "@/lib/posts";

/**
 * Copy that promises the Phase 3 deterministic 0–100 Health Score / bands /
 * "same answers, same score" must not ship before Phase 3. Flip to true when
 * Phase 3 (scoring engine + /methodology) lands. See design/README.md.
 */
const SHOW_PHASE3_COPY = false;

export const metadata: Metadata = {
  title: "Relationship Test: Free, Private Relationship Health Check | CoupleIQ",
  description:
    "A free, private 5-minute relationship test. See where your relationship stands across eight dimensions, discover your relationship pattern, and get clear next steps.",
  alternates: { canonical: "https://splitornot.com" },
};

const ARROW = (
  <svg className="arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4"></path></svg>
);
const CHECK = (
  <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M3 9.5l4 4 8-9"></path></svg>
);

const patterns = [
  { n: "01", cls: "p1", art: <><span className="o v"></span><span className="o e"></span></>, title: "Validated Couple", desc: "Calm disagreement, real respect and a strong friendship underneath." },
  { n: "02", cls: "p2", art: <><span className="o v"></span><span className="o e"></span></>, title: "Volatile Couple", desc: "High heat, high passion, and fast, intense repair." },
  { n: "03", cls: "p3", art: <><span className="o v"></span><span className="divider"></span><span className="o e"></span></>, title: "Conflict Avoiders", desc: "Peaceful on the surface, while problems go quietly underground." },
  { n: "04", cls: "p4", art: <><span className="o e"></span><span className="o v"></span></>, title: "Pursuer–Withdrawer", desc: "One reaches for connection; the other pulls back to cope." },
  { n: "05", cls: "p5", art: <><span className="o v"></span><span className="o e"></span></>, title: "Drifting Couple", desc: "Once close, now coexisting. The friendship fades without a fight." },
  { n: "06", cls: "p6", art: <><span className="ring"></span><span className="o v"></span><span className="o e"></span></>, title: "Crisis-Bonded", desc: "Held together by shared pressure more than shared closeness." },
  { n: "07", cls: "p7", art: <><span className="o v"></span><span className="gap"></span><span className="o e"></span></>, title: "Hostile–Detached", desc: "Contempt present, distance growing. The pattern to take seriously." },
];

const dims = [
  ["01", "Communication", "How you talk when it actually matters."],
  ["02", "Conflict & repair", "Not whether you fight, but how you find your way back."],
  ["03", "Contempt", "Eye-rolls, sarcasm, dismissal. The quiet corrosive."],
  ["04", "Friendship & intimacy", "Feeling truly known, not just coexisting."],
  ["05", "Respect", "Respected, not merely tolerated."],
  ["06", "Trust", "Reliability, honesty and emotional safety."],
  ["07", "Support & stress", "Whether pressure pushes you together or apart."],
  ["08", "Shared vision", "Whether you're building toward the same future."],
];

const marqueeItems = ["Communication", "Conflict & repair", "Contempt", "Friendship", "Respect", "Trust", "Support", "Shared vision"];

const faqs = [
  { q: "Is this scientifically validated?", a: "No, and we won't pretend otherwise. The questions draw on well-established research themes, and it is a tool for reflection, not a validated clinical instrument." },
  { q: "What happens to my answers?", a: "They're used only to create your result and are not stored. Your result is kept at a private link for 30 days, then deleted. You don't need an account. Our privacy policy lists exactly what is stored and which providers process it." },
  { q: "Can we take it together?", a: "Yes. Take it separately and compare your results. Side-by-side couple comparison is coming soon, and the differences are often more revealing than the scores." },
  { q: "Is it a replacement for couples therapy?", a: "No. Many people use their result to decide whether to seek a therapist, or to start that first session with something concrete." },
  { q: "Why is the full report paid?", a: "The free result gives you the headline. The full report explains every dimension and gives you specific next steps. That's the part that costs us to produce, and the part that helps you act." },
];

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="cq">
      <JsonLd data={faqPageLd(faqs)} />
      <svg className="grain" aria-hidden="true"><filter id="cqn"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={3} stitchTiles="stitch"></feTurbulence></filter><rect width="100%" height="100%" filter="url(#cqn)"></rect></svg>

      <SiteHeader />

      {/* HERO */}
      <section className="hero" id="top">
        <div className="aurora" aria-hidden="true"><i></i><i></i><i></i></div>
        <HeroThreads />
        <div className="hero-vignette" aria-hidden="true"></div>
        <div className="wrap">
          <p className="eyebrow mono">Stay or split · A free relationship test</p>
          <h1>Two people.<span className="l2">One <span className="it grad">honest</span> picture.</span></h1>
          <div className="hero-row">
            <div className="hero-copy">
              <p>Fifteen questions about how you talk, fight, repair and trust, turned into <strong>a clear picture of where your relationship stands</strong> and what to do next.</p>
              <div className="ctas">
                <Link className="btn btn-light" href="/relationship-test">Take the free test {ARROW}</Link>
                <a className="btn btn-ghost" href="#how">See how it works</a>
              </div>
              <div className="meta mono"><span>15 questions</span><span>About 5 minutes</span><span>No account</span></div>
            </div>

            <aside className="preview" aria-label="Example result">
              <div className="preview-top"><span className="mono">Your result</span><span className="pill">Example</span></div>
              {SHOW_PHASE3_COPY ? (
                <>
                  <div className="score"><span className="n">58</span><span className="of">/ 100 health score</span></div>
                  <p className="band">Amber Zone</p>
                  <div className="bars">
                    <div className="bar"><span>Repair</span><span className="t"><i style={{ width: "48%" }}></i></span><b>48</b></div>
                    <div className="bar"><span>Friendship</span><span className="t"><i style={{ width: "66%" }}></i></span><b>66</b></div>
                    <div className="bar"><span>Trust</span><span className="t"><i style={{ width: "71%" }}></i></span><b>71</b></div>
                    <div className="bar"><span>Contempt</span><span className="t"><i style={{ width: "82%" }}></i></span><b>82</b></div>
                  </div>
                </>
              ) : (
                <>
                  <p className="band" style={{ color: "var(--on-dark)", marginTop: 18 }}>Pursuer–Withdrawer</p>
                  <p style={{ color: "var(--on-dark-2)", fontSize: 15, marginTop: 10, lineHeight: 1.6 }}>
                    One reaches for connection; the other pulls back to cope. Your result names the dynamic you&apos;re in and your biggest strength and risk.
                  </p>
                </>
              )}
              <div className="preview-foot"><span>Free to start</span><strong>About 5 minutes</strong></div>
            </aside>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((dup) =>
            marqueeItems.map((m, i) => (
              <Fragment key={`${dup}-${i}`}>
                <span>{m}</span>
                <span className="dot"></span>
              </Fragment>
            ))
          )}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="paper sec" id="how">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2 className="h2">The hard part isn&apos;t the answer. It&apos;s <span className="it">asking the question.</span></h2>
            <p className="lede">CoupleIQ gives you a private, structured way to look at your relationship without a therapist&apos;s office, an account or an argument.</p>
          </div>
          <div className="steps">
            <svg className="thread" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
              <path className="a" d="M0 60 C 200 0, 300 120, 420 60 S 700 0, 820 60 S 1060 120, 1200 50"></path>
              <path className="b" d="M0 70 C 180 120, 320 10, 430 70 S 680 120, 810 60 S 1080 0, 1200 70"></path>
            </svg>
            <article className="step reveal">
              <span className="num">01</span>
              <h3>Answer honestly</h3>
              <p>Fifteen questions on communication, conflict, emotional connection, stress and trust. Think of your last real disagreement, not your best day.</p>
            </article>
            <article className="step reveal">
              <span className="num">02</span>
              <h3>See your pattern</h3>
              <p>Your answers are scored across eight dimensions and matched to one of seven relationship patterns.{SHOW_PHASE3_COPY ? " Same answers, same score, every time." : ""}</p>
            </article>
            <article className="step reveal">
              <span className="num">03</span>
              <h3>Know what&apos;s next</h3>
              <p>A plain-language read of your strengths and your biggest risk, with concrete next steps. The full report goes deeper.</p>
            </article>
          </div>
        </div>
      </section>

      {/* WHAT WE MEASURE */}
      <section className="ink sec" id="method">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2 className="h2">Eight things that <span className="it grad">quietly decide</span> how a relationship goes.</h2>
            <p className="lede">Built on well-known themes from relationship research: the Four Horsemen, repair attempts, emotional friendship and attachment.</p>
          </div>
          <div className="measure">
            <div className="radar-wrap reveal">
              <svg className="radar" viewBox="0 0 440 440" role="img" aria-label="Example radar chart comparing two partners across eight dimensions">
                <polygon className="ring" points="220.0,177.5 250.1,189.9 262.5,220.0 250.1,250.1 220.0,262.5 189.9,250.1 177.5,220.0 189.9,189.9"></polygon>
                <polygon className="ring" points="220.0,135.0 280.1,159.9 305.0,220.0 280.1,280.1 220.0,305.0 159.9,280.1 135.0,220.0 159.9,159.9"></polygon>
                <polygon className="ring" points="220.0,92.5 310.2,129.8 347.5,220.0 310.2,310.2 220.0,347.5 129.8,310.2 92.5,220.0 129.8,129.8"></polygon>
                <polygon className="ring" points="220.0,50.0 340.2,99.8 390.0,220.0 340.2,340.2 220.0,390.0 99.8,340.2 50.0,220.0 99.8,99.8"></polygon>
                <line className="axis" x1="220" y1="220" x2="220" y2="50"></line>
                <line className="axis" x1="220" y1="220" x2="340.2" y2="99.8"></line>
                <line className="axis" x1="220" y1="220" x2="390" y2="220"></line>
                <line className="axis" x1="220" y1="220" x2="340.2" y2="340.2"></line>
                <line className="axis" x1="220" y1="220" x2="220" y2="390"></line>
                <line className="axis" x1="220" y1="220" x2="99.8" y2="340.2"></line>
                <line className="axis" x1="220" y1="220" x2="50" y2="220"></line>
                <line className="axis" x1="220" y1="220" x2="99.8" y2="99.8"></line>
                <polygon className="them" points="220.0,114.6 280.1,159.9 350.9,220.0 292.1,292.1 220.0,342.4 143.1,296.9 148.6,220.0 128.6,128.6"></polygon>
                <polygon className="you" points="220.0,94.2 289.7,150.3 359.4,220.0 277.7,277.7 220.0,332.2 134.7,305.3 126.5,220.0 144.3,144.3"></polygon>
                <text className="lbl mid" x="220" y="30">COMMUNICATION</text>
                <text className="lbl" x="352" y="86">REPAIR</text>
                <text className="lbl" x="400" y="224">CONTEMPT</text>
                <text className="lbl" x="352" y="364">FRIENDSHIP</text>
                <text className="lbl mid" x="220" y="414">RESPECT</text>
                <text className="lbl end" x="90" y="364">TRUST</text>
                <text className="lbl end" x="40" y="224">SUPPORT</text>
                <text className="lbl end" x="90" y="86">VISION</text>
              </svg>
              <div className="legend"><span>You</span><span>Your partner (coming soon)</span></div>
            </div>
            <ol className="dims">
              {dims.map(([k, h, p]) => (
                <li key={k}><span className="k">{k}</span><div><h3>{h}</h3><p>{p}</p></div></li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* PATTERNS — pattern pages don't exist yet, so these are non-link articles */}
      <section className="ink sec" id="patterns" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2 className="h2">Seven patterns. <span className="it">Which one are you?</span></h2>
            <p className="lede">Every result names the dynamic you&apos;re in, because a pattern you can name is a pattern you can change.</p>
          </div>
        </div>
        <div className="rail">
          {patterns.map((p) => (
            <article className="pcard" key={p.n}>
              <div className={`art ${p.cls}`} aria-hidden="true">{p.art}</div>
              <div className="pbody">
                <span className="mono">Pattern {p.n}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SPECTRUM — Phase 3 (0–100 score + bands). Hidden until then. */}
      {SHOW_PHASE3_COPY && (
        <section className="paper sec">
          <div className="wrap">
            <div className="sec-head reveal">
              <h2 className="h2">Where do you <span className="it">land?</span></h2>
              <p className="lede">Your Relationship Health Score runs from 0 to 100 and places you in one of five bands, each with its own meaning and next steps.</p>
            </div>
            <div className="spectrum reveal">
              <div className="spec-bar" aria-hidden="true"><span className="spec-marker" data-label="Example: 58"></span></div>
              <div className="spec-labels">
                <div><span className="mono">0–29</span><h3>Critical Point</h3><p>Serious strain. Patterns that compound, and where support helps most.</p></div>
                <div><span className="mono">30–49</span><h3>Fault Line</h3><p>Several significant patterns worth addressing soon.</p></div>
                <div><span className="mono">50–64</span><h3>Amber Zone</h3><p>Real strengths, real risks. Small changes matter most here.</p></div>
                <div><span className="mono">65–79</span><h3>Stable Foundation</h3><p>Fundamentally sound, with a few things to watch.</p></div>
                <div><span className="mono">80–100</span><h3>Solid Ground</h3><p>Strong protective factors. Keep doing what works.</p></div>
              </div>
            </div>
            <div className="note"><span><strong>No guesswork.</strong> Your score is computed from your answers by a fixed, published method, not invented by AI.</span><span><strong>One perspective.</strong> It reflects how you see things. Your partner may see it differently.</span></div>
          </div>
        </section>
      )}

      {/* OFFER */}
      <section className="paper sec" style={{ paddingTop: SHOW_PHASE3_COPY ? 0 : 140 }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <h2 className="h2">Start free. <span className="it">Go deeper</span> if you want to.</h2>
          </div>
          <div className="offer">
            <div className="tier reveal">
              <span className="mono">Free result</span>
              <p className="price">$0</p>
              <ul>
                <li>{CHECK}<span>Where your relationship stands</span></li>
                <li>{CHECK}<span>Your relationship pattern</span></li>
                <li>{CHECK}<span>Your biggest strength</span></li>
                <li>{CHECK}<span>Your biggest risk</span></li>
              </ul>
              <Link className="btn btn-dark" href="/relationship-test">Take the free test</Link>
            </div>
            <div className="tier full reveal">
              <span className="mono">Full report</span>
              <p className="price">$4.99<small>one-time</small></p>
              <ul>
                <li>{CHECK}<span>Everything in the free result</span></li>
                <li>{CHECK}<span>All eight dimensions, explained for you</span></li>
                <li>{CHECK}<span>Why your biggest risk is happening</span></li>
                <li>{CHECK}<span>Three specific next steps for your pattern</span></li>
                <li>{CHECK}<span>A private link to your full report</span></li>
              </ul>
              <Link className="btn btn-light" href="/relationship-test">Start with the free test</Link>
            </div>
          </div>
        </div>
      </section>

      {/* TOGETHER — coming soon */}
      <section className="ink sec">
        <div className="wrap together">
          <div className="venn reveal" aria-hidden="true">
            <span className="c c1"></span><span className="c c2"></span>
            <span className="tag t1">You</span><span className="tag t2">Them</span><span className="tag t3">us</span>
          </div>
          <div className="reveal">
            <span className="soon mono">Coming soon</span>
            <h2 className="h2" style={{ marginTop: 24 }}>Take it separately. <span className="it grad">Compare</span> privately.</h2>
            <p className="lede" style={{ marginTop: 24, maxWidth: 460 }}>You and your partner answer on your own. CoupleIQ shows where you see things the same way and where you don&apos;t. Nothing is shared unless both of you say yes.</p>
            <NotifyForm />
          </div>
        </div>
      </section>

      {/* HONEST + SAFETY */}
      <section className="paper sec">
        <div className="wrap">
          <div className="sec-head reveal">
            <h2 className="h2">What this is, and <span className="it">what it isn&apos;t.</span></h2>
          </div>
          <div className="honest">
            <div className="col reveal">
              <h3>It is</h3>
              <ul>
                <li><strong>A structured self-reflection</strong> that helps you see patterns you may already feel.</li>
                <li><strong>Grounded in research themes</strong> such as the Four Horsemen, repair attempts and attachment.</li>
                <li><strong>A starting point</strong> for a conversation with your partner or a professional.</li>
              </ul>
            </div>
            <div className="col isnt reveal">
              <h3>It isn&apos;t</h3>
              <ul>
                <li><strong>A diagnosis or a prediction.</strong> No quiz can tell you whether you will break up.</li>
                <li><strong>Therapy.</strong> It doesn&apos;t replace a qualified couples therapist.</li>
                <li><strong>A verdict on your partner.</strong> It is one perspective: yours.</li>
              </ul>
            </div>
          </div>
          <div className="safety reveal">
            <p>If you feel afraid of your partner or unsafe at home, a quiz is not what you need right now. Confidential help is available.</p>
            <Link href="/support-resources">Find support near you →</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="paper sec" style={{ paddingTop: 0 }}>
        <div className="wrap faq">
          <div className="reveal"><h2 className="h2">Questions, <span className="it">answered.</span></h2></div>
          <div>
            {faqs.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNAL */}
      {posts.length > 0 && (
        <section className="paper sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="sec-head reveal">
              <h2 className="h2">From the <span className="it">journal.</span></h2>
              <Link className="btn btn-dark btn-sm" href="/blog">All articles</Link>
            </div>
            <div className="posts">
              {posts.map((post, i) => (
                <Link className="post reveal" href={`/blog/${post.slug}`} key={post.slug}>
                  <div className={`cover c${i + 1}`} aria-hidden="true"><i></i><i></i></div>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="final">
        <svg viewBox="0 0 1440 420" preserveAspectRatio="none" aria-hidden="true">
          <path className="fa" d="M-20 60 C 300 60, 480 200, 720 210"></path>
          <path className="fb" d="M-20 360 C 300 360, 480 220, 720 210"></path>
          <path className="fc" d="M720 210 C 960 200, 1180 210, 1460 210"></path>
        </svg>
        <div className="wrap">
          <p className="mono" style={{ color: "var(--on-dark-2)", position: "relative" }}>Five minutes · Free · Private</p>
          <h2 style={{ marginTop: 24 }}>The question has been<br />waiting. <span className="it grad">Ask it.</span></h2>
          <div className="ctas" style={{ marginTop: 44 }}><Link className="btn btn-light" href="/relationship-test">Take the free relationship test {ARROW}</Link></div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
