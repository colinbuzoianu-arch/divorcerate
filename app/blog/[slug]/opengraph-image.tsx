import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";

// Per-article OG image (Phase 2.4). Needs Node runtime because it reads posts
// from the filesystem.
export const runtime = "nodejs";
export const alt = "CoupleIQ article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  let title = "CoupleIQ";
  try {
    title = getPostBySlug(params.slug).title;
  } catch {
    /* fall back to brand */
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0C0A14",
          padding: "72px",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: -120, right: -80, width: 420, height: 420, borderRadius: 420, background: "radial-gradient(circle, rgba(139,124,255,0.55), transparent 70%)" }} />
        <div style={{ position: "absolute", top: -40, right: 120, width: 360, height: 360, borderRadius: 360, background: "radial-gradient(circle, rgba(255,148,102,0.45), transparent 70%)" }} />

        <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#F3EEE6", fontSize: 30, fontWeight: 600 }}>
          <div style={{ display: "flex" }}>
            <div style={{ width: 26, height: 26, borderRadius: 26, background: "#8B7CFF" }} />
            <div style={{ width: 26, height: 26, borderRadius: 26, background: "#FF9466", marginLeft: -8 }} />
          </div>
          <span>CoupleIQ</span>
        </div>

        <div style={{ display: "flex", color: "#F3EEE6", fontSize: 64, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: 1000 }}>
          {title}
        </div>

        <div style={{ display: "flex", color: "#A8A2B3", fontSize: 26 }}>
          A free, private relationship health check · splitornot.com
        </div>
      </div>
    ),
    { ...size }
  );
}
