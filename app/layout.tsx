import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Relationship Health Analyzer | Split or Not",
  description:
    "Should you break up or stay? Answer 15 honest questions and get an AI-powered relationship risk assessment based on the Gottman Method and attachment theory.",
  keywords: ["relationship test", "should I break up", "relationship health check", "gottman method quiz", "split or not"],
  metadataBase: new URL("https://splitornot.com"),
  openGraph: {
    title: "Relationship Health Analyzer | Split or Not",
    description: "Get an honest, science-based assessment of your relationship in 5 minutes.",
    url: "https://splitornot.com",
    siteName: "Split or Not",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Relationship Health Analyzer",
    description: "Should you split or not? Find out in 5 minutes.",
  },
  alternates: {
    canonical: "https://splitornot.com",
  },
};

const GA_MEASUREMENT_ID = "G-K9FVMX9M15";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
