import type { Metadata } from "next";
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
