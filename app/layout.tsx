import type { Metadata } from "next";
import "./globals.css";
import ConsentBanner from "@/components/ConsentBanner";

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
    <html lang="en">
      <head>
        {/* Point 1: Plus Jakarta Sans — premium feel, clean & modern */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
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
        {children}
        <ConsentBanner gaId={GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
