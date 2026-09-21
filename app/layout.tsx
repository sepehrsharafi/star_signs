import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans } from "next/font/google";
import "./globals.css";

import { IslandNav } from "@/components/island-nav";
import { SiteFooter } from "@/components/site-footer";
import { RevealEngine } from "@/components/reveal-engine";
import { company } from "@/lib/content";

/* Archivo carries a width axis, which is what makes the Swiss display
   sizes possible without a second family. */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://starsigns.example"),
  title: {
    default: `${company.name} — Commercial Signage, ${company.city} ${company.stateShort}`,
    template: `%s — ${company.name}`,
  },
  description:
    "Star Signs fabricates illuminated channel letters, monument and pylon signs, hand-bent neon, wayfinding systems and vehicle graphics in Richmond, Virginia. Surveyed, drawn, permitted, built and installed in-house since 1998.",
  keywords: [
    "commercial signs Richmond VA",
    "channel letters Virginia",
    "monument signs",
    "neon sign fabrication",
    "ADA signage",
    "sign permitting Richmond",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: company.name,
    title: `${company.name} — Built to be seen`,
    description:
      "Illuminated signage fabricated, permitted and installed in-house. Richmond, Virginia, since 1998.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg text-fg">
        {/* A reveal's resting state hides its element, so without the engine
            the page would be blank rather than merely unanimated. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}[data-reveal="rise"]>*{transform:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper label"
        >
          Skip to content
        </a>
        <RevealEngine />
        <IslandNav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
