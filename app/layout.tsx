import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#071B4D",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://shikshaelite.com"
  ),
  title: {
    default: "ShikshaElite | Complete Educational Solutions",
    template: "%s | ShikshaElite",
  },
  description:
    "ShikshaElite provides end-to-end educational solutions, executive leadership hiring, teacher recruitment, school setup & affiliation, and digital transformation for institutions and educators across India and globally.",
  keywords: [
    "ShikshaElite",
    "Education Consulting",
    "Teacher Recruitment",
    "Principal Hiring",
    "School Affiliation",
    "CBSE ICSE Affiliation",
    "Educational Solutions",
    "Teaching Jobs India",
  ],
  authors: [{ name: "ShikshaElite" }],
  creator: "ShikshaElite",
  publisher: "ShikshaElite",
  icons: {
    icon: "/logo1.png",
    apple: "/logo1.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "ShikshaElite",
    title: "ShikshaElite | Complete Educational Solutions",
    description:
      "Empowering Education. Elevating Futures. Complete solutions for institutions and educators worldwide.",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "ShikshaElite Educational Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ShikshaElite | Complete Educational Solutions",
    description:
      "Empowering Education. Elevating Futures. Complete solutions for institutions and educators worldwide.",
    images: ["/banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
