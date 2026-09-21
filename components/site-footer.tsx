"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { company, ticker } from "@/lib/content";
import { navItems } from "@/lib/nav";
import { ConveyorArrow } from "./ui";
import { TickerBand } from "./marquee";
import { StarMark } from "./star-mark";

/**
 * The footer is a sign-off, not a second homepage: one band of content and a
 * legal line. Its background is drawn in CSS — a drafting grid under a wash of
 * yellow and blue light, the way a lit sign washes the wall behind it — so
 * there is no photograph to download and nothing to go stale.
 */
export function SiteFooter() {
  const isHome = usePathname() === "/";

  return (
    <footer className="relative isolate mt-px overflow-hidden bg-blue-deep text-paper">
      <span aria-hidden className="hero-grid absolute inset-0 opacity-[0.17]" />
      <span aria-hidden className="footer-wash absolute inset-0" />
      <span aria-hidden className="grain-layer z-[1]" />

      <div className="relative z-10">
        {!isHome && <TickerBand items={ticker} tone="yellow" speed={52} size="sm" />}

        {/* Two columns from the small breakpoint up, so the index and the
            visit details sit side by side instead of stacking the footer to
            twice the height of the page's last section. */}
        <div className="shell grid gap-x-8 gap-y-9 py-10 sm:grid-cols-2 sm:py-14 lg:grid-cols-12">
          {/* sign-off + the one action that matters */}
          <div className="sm:col-span-2 lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden bg-yellow text-ink">
                <StarMark className="h-3.5 w-3.5" />
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-blue" />
              </span>
              <span className="label text-paper/45">{company.legal}</span>
            </div>

            <h2 className="display-wide mt-5 text-[clamp(1.7rem,3.2vw,2.9rem)] leading-[0.96]">
              Your building should <span className="text-yellow">work harder.</span>
            </h2>

            <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link
                href="/contact"
                data-magnetic
                className="signal-button group relative inline-flex items-center gap-4 overflow-hidden bg-yellow px-5 py-3.5 text-ink shadow-[5px_5px_0_var(--blue)] [--signal-sheen:var(--sheen-bright)]"
              >
                <span className="label relative z-10">Start with the address</span>
                <ConveyorArrow />
              </Link>
              <a
                href={company.phoneHref}
                className="display text-[1.35rem] transition-colors duration-300 hover:text-yellow"
              >
                {company.phone}
              </a>
            </div>
          </div>

          {/* the whole index, two columns so it stays short */}
          <nav className="lg:col-span-3 lg:col-start-7">
            <span className="label text-paper/35">Index</span>
            <ul className="mt-4 grid grid-cols-2 gap-x-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link text-[0.9rem] text-paper/70">
                    <span>{item.label}</span>
                    <span className="label text-paper/30">{item.index}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3 lg:col-start-10">
            <span className="label text-paper/35">Visit</span>
            <address className="spec mt-4 not-italic leading-relaxed text-paper/70">
              {company.address.line1}
              <br />
              {company.address.city}, {company.address.state} {company.address.zip}
            </address>
            <a
              href={`mailto:${company.email}`}
              className="spec mt-3 block text-paper/60 transition-colors duration-300 hover:text-yellow"
            >
              {company.email}
            </a>
            <dl className="mt-4 space-y-1.5 border-t border-paper/15 pt-3">
              {company.hours.map((hours) => (
                <div key={hours.days} className="spec flex justify-between gap-3">
                  <dt className="text-paper/45">{hours.days}</dt>
                  <dd className="text-paper/70 tnum">{hours.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="shell flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-paper/15 py-4">
          <p className="label text-paper/40">
            © {new Date().getFullYear()} {company.legal} — {company.licence}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/faq" className="label text-paper/40 transition-colors hover:text-yellow">
              Warranty &amp; terms
            </Link>
            <Link href="/contact" className="label text-paper/40 transition-colors hover:text-yellow">
              Service call
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
