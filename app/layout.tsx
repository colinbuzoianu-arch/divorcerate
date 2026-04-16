import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Relationship Health Analyzer",
  description:
    "Evidence-based relationship risk assessment using the Gottman Method, attachment theory, and AI analysis.",
  openGraph: {
    title: "Relationship Health Analyzer",
    description: "Understand your relationship risk factors in 5 minutes.",
    type: "website",
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
