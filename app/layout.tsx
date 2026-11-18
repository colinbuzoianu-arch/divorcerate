import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./styles/tokens.css";
import "./globals.css";
import ConsentBanner from "@/components/ConsentBanner";
import JsonLd from "@/components/JsonLd";
import { organizationLd, websiteLd } from "@/lib/seo";

// Geist + Geist Mono are self-hosted via Vercel's `geist` package (next/font/local
// under the hood); Next 14's next/font/google doesn't know them. Instrument Serif
// comes from Google. All three are exposed as CSS variables for tokens.css.
const serif = Instrument_Serif({ weight: "400", style: ["normal", "italic"], subsets: ["latin"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  title: "CoupleIQ — Relationship Health Analyzer",
  description:
    "Answer 15 honest questions and get an AI-powered relationship risk assessment based on the Gottman Method and attachment theory. Find out where your relationship really stands.",
  keywords: ["relationship test", "should I break up", "relationship health check", "gottman method quiz", "coupleiq", "split or not"],
  metadataBase: new URL("https://splitornot.com"),
  openGraph: {
    title: "CoupleIQ — Relationship Health Analyzer",
    description: "Get an honest, science-based assessment of your relationship in 5 minutes.",
    url: "https://splitornot.com",
    siteName: "CoupleIQ",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "CoupleIQ — Relationship Health Analyzer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CoupleIQ — Relationship Health Analyzer",
    description: "Find out where your relationship really stands. Takes 5 minutes.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: "https://splitornot.com",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

const GA_MEASUREMENT_ID = "G-K9FVMX9M15";
const GOOGLE_ADS_ID     = "GT-5RFHKQ3W";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        {/* Google Consent Mode v2 — default DENIED. We set the gtag stub and
            consent defaults here, but do NOT load gtag.js. The external library
            (and therefore any GA/Ads request) is only loaded by ConsentBanner
            after the visitor accepts. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('consent', 'default', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'denied'
              });
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
              gtag('config', '${GOOGLE_ADS_ID}');
            `,
          }}
        />
      </head>
      <body>
        <JsonLd data={organizationLd()} />
        <JsonLd data={websiteLd()} />
        {children}
        <ConsentBanner gaId={GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
