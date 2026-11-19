"use client";

import { useEffect, useState } from "react";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import { getUI } from "@/lib/i18n/ui";

/**
 * Cookie consent banner with Google Consent Mode v2 (Phase 1.5, GDPR).
 *
 * Consent defaults to DENIED (set inline in app/layout.tsx). This banner:
 *  - loads gtag.js only AFTER the visitor accepts, so before consent there is
 *    no GA/Ads network request at all, and
 *  - calls gtag('consent','update', …) to grant/deny analytics + ads storage.
 * The choice is remembered in localStorage.
 */

const STORAGE_KEY = "cq_consent";

type Choice = "granted" | "denied";

export default function ConsentBanner({ gaId, locale = "en" }: { gaId: string; locale?: Locale }) {
  const [visible, setVisible] = useState(false);
  const t = getUI(locale).consent;
  const [before, after] = t.message.split("{privacy}");

  useEffect(() => {
    let choice: string | null = null;
    try {
      choice = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* private mode / blocked storage — show the banner */
    }
    if (choice === "granted") {
      applyConsent("granted");
    } else if (choice === "denied") {
      applyConsent("denied");
    } else {
      setVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function loadGtag() {
    if (document.getElementById("ga-lib")) return;
    const s = document.createElement("script");
    s.id = "ga-lib";
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(s);
  }

  function applyConsent(choice: Choice) {
    const value = choice === "granted" ? "granted" : "denied";
    try {
      window.gtag?.("consent", "update", {
        ad_storage: value,
        ad_user_data: value,
        ad_personalization: value,
        analytics_storage: value,
      });
    } catch {
      /* no-op */
    }
    if (choice === "granted") loadGtag();
  }

  function choose(choice: Choice) {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* no-op */
    }
    applyConsent(choice);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      style={{
        position: "fixed",
        left: 16,
        right: 16,
        bottom: 16,
        zIndex: 1000,
        maxWidth: 560,
        margin: "0 auto",
        background: "#fff",
        border: "1px solid #e5e5e5",
        borderRadius: 16,
        boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
        padding: "1.1rem 1.25rem",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <p style={{ fontSize: 13.5, color: "#444", lineHeight: 1.6, margin: "0 0 12px" }}>
        {before}
        <a href={localizeHref("/legal", locale)} style={{ color: "#4B3FB0", textDecoration: "underline", textUnderlineOffset: 2 }}>
          {t.privacyPolicy}
        </a>
        {after}
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          onClick={() => choose("granted")}
          style={{ background: "#4B3FB0", color: "#fff", border: "none", borderRadius: 10, padding: "10px 18px", fontSize: 14, fontWeight: 700, cursor: "pointer", minHeight: 44 }}
        >
          {t.accept}
        </button>
        <button
          onClick={() => choose("denied")}
          style={{ background: "transparent", color: "#555", border: "1px solid #ddd", borderRadius: 10, padding: "10px 18px", fontSize: 14, fontWeight: 600, cursor: "pointer", minHeight: 44 }}
        >
          {t.decline}
        </button>
      </div>
    </div>
  );
}
