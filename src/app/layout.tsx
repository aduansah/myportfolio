import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BackgroundDecor } from "@/components/portfolio/BackgroundDecor";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { SITE } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${SITE.name} | ${SITE.title}`,
  description: SITE.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=general-sans@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} bg-black text-white antialiased`}>
        <SmoothScroll>
          <BackgroundDecor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
