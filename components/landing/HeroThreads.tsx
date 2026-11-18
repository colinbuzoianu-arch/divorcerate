"use client";

import { useEffect, useRef } from "react";

/**
 * Hero particle canvas (Phase 2.2). Ports cqThreads() from design/landing.html
 * into a client island. Respects prefers-reduced-motion (the ported routine
 * paints one static frame and stops its RAF), and cleans up on unmount.
 * It is purely decorative (aria-hidden) and sits behind the hero content.
 */
export default function HeroThreads() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv || !cv.getContext) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const host = cv.parentElement as HTMLElement;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, raf = 0, last = 0, mx = -9999, tmx = -9999;
    const strands = [
      { c: "139,124,255", ph: 0 },
      { c: "255,148,102", ph: Math.PI },
    ];
    function gauss() { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
    function size() {
      const r = cv!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      cv!.width = Math.round(W * dpr); cv!.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    size();
    const N = W < 700 ? 420 : 950;
    const parts = strands.map(() => {
      const a: { u: number; g: number; s: number; w: number; z: number }[] = [];
      for (let i = 0; i < N; i++) a.push({ u: Math.random(), g: gauss(), s: 0.01 + Math.random() * 0.028, w: Math.random() * 6.283, z: 0.5 + Math.random() * 1.5 });
      return a;
    });
    function env(u: number) { return 0.18 + 0.82 * Math.sin(Math.PI * Math.min(1, Math.max(0, u))); }
    function yAt(u: number, t: number, ph: number) {
      const x = u * W; let amp = H * 0.15 * env(u);
      if (mx > -1000) { const d = (x - mx) / 260; amp *= 1 - 0.88 * Math.exp(-d * d); }
      return H * 0.70 + amp * Math.sin(u * Math.PI * 2.3 + t * 0.32 + ph) + H * 0.025 * Math.sin(u * 5 + t * 0.21);
    }
    function draw(now: number) {
      const t = now / 1000; const dt = last ? Math.min(0.05, t - last) : 0.016; last = t;
      if (tmx < -1000) { mx = tmx; } else if (mx < -1000) { mx = tmx; } else { mx += (tmx - mx) * 0.06; }
      ctx!.globalCompositeOperation = "destination-out";
      ctx!.fillStyle = reduce ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.14)";
      ctx!.fillRect(0, 0, W, H);
      ctx!.globalCompositeOperation = "lighter";
      for (let s = 0; s < 2; s++) {
        const st = strands[s], P = parts[s];
        ctx!.beginPath();
        for (let k = 0; k <= 120; k++) { const u = k / 120, y = yAt(u, t, st.ph); if (k) ctx!.lineTo(u * W, y); else ctx!.moveTo(0, y); }
        ctx!.strokeStyle = "rgba(" + st.c + ",0.07)"; ctx!.lineWidth = 10; ctx!.stroke();
        ctx!.strokeStyle = "rgba(" + st.c + ",0.45)"; ctx!.lineWidth = 1.1; ctx!.stroke();
        ctx!.fillStyle = "rgba(" + st.c + ",0.55)";
        for (let i = 0; i < P.length; i++) {
          const p = P[i];
          if (!reduce) { p.u += p.s * dt; if (p.u > 1) p.u -= 1; }
          const spread = 6 + 30 * env(p.u);
          const y2 = yAt(p.u, t, st.ph) + p.g * spread * (0.65 + 0.35 * Math.sin(t * 0.9 + p.w));
          ctx!.fillRect(p.u * W, y2, p.z, p.z);
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    }
    function move(e: PointerEvent) { const r = cv!.getBoundingClientRect(); tmx = e.clientX - r.left; }
    function leave() { tmx = -9999; }
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(size) : null;
    if (ro) ro.observe(cv); else window.addEventListener("resize", size);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      if (ro) ro.disconnect(); else window.removeEventListener("resize", size);
    };
  }, []);

  return <canvas id="cq-threads" ref={ref} aria-hidden="true" />;
}
