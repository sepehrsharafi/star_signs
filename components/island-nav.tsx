"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { StarMark } from "./star-mark";
import { company } from "@/lib/content";
import { navItems } from "@/lib/nav";

const deskItems = navItems.slice(0, 6);

/**
 * Floating navigation bar.
 *
 * The bar holds one shape at every breakpoint and on every route — it never
 * resizes or re-flows as you move around. All the motion lives inside it: the
 * link pills fill, the arrow runs on a belt, and a read-progress hairline
 * tracks along the bottom edge. The mobile menu opens as its own panel beneath
 * the bar rather than growing out of it.
 */
export function IslandNav() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  /* read progress + a subtle depth change on scroll (no geometry change) */
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, y / max) : 0);
        setScrolled(y > 40);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* Close the menu after a navigation — including browser back/forward,
     which no click handler would catch. Deferred a frame so it is not a
     cascading render out of the effect body. */
  useEffect(() => {
    const id = requestAnimationFrame(() => setOpen(false));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  /* ---------------- the sliding island ----------------
     One floating pill shared by every desktop link. Instead of each link
     fading its own pill in and out (which stutters when the cursor crosses
     several links quickly), a single element tracks whichever link is
     hovered — or the active route, once the cursor leaves — and glides
     there. */
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false });

  const activeIndex = deskItems.findIndex((item) => isActive(item.href));
  const targetIndex = hoverIndex ?? (activeIndex >= 0 ? activeIndex : null);
  const targetIndexRef = useRef(targetIndex);

  const measure = useCallback((index: number | null) => {
    const el = index === null ? null : itemRefs.current[index];
    if (!el) {
      setPill((p) => ({ ...p, visible: false }));
      return;
    }
    setPill({ left: el.offsetLeft, width: el.offsetWidth, visible: true });
  }, []);

  useEffect(() => {
    targetIndexRef.current = targetIndex;
    measure(targetIndex);
  }, [targetIndex, measure]);

  /* The bar's own width animates on scroll (and can reflow on resize), which
     moves every link under it — watch the nav's box directly, frame by
     frame, rather than re-measuring once against what will be a stale
     layout the instant the width transition starts. */
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measure(targetIndexRef.current));
    ro.observe(nav);
    return () => ro.disconnect();
  }, [measure]);

  return (
    <>
      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-ink/50 backdrop-blur-[3px] transition-opacity duration-400 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:pt-4">
        <div
          className={`pointer-events-auto relative w-full transition-[max-width] duration-500 ${
            scrolled ? "max-w-[64rem]" : "max-w-[72rem]"
          }`}
        >
          {/* ---------------- the bar ---------------- */}
          <div
            className={`relative flex h-14 items-center gap-2 overflow-hidden rounded-[1.15rem] border border-white/70 bg-paper/88 py-2 pl-4 pr-2 text-ink ring-1 ring-ink/10 backdrop-blur-xl transition-[box-shadow,background-color] duration-500 ${
              scrolled
                ? "bg-paper/95 shadow-[0_18px_48px_-22px_rgba(7,53,143,0.28)]"
                : "shadow-[0_12px_36px_-24px_rgba(7,53,143,0.2)]"
            }`}
          >
            <Link href="/" onClick={() => setOpen(false)} className="group flex shrink-0 items-center gap-2.5">
              <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden bg-blue text-paper">
                <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-yellow transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                <StarMark className="relative h-3 w-3 transition-[color,transform] duration-[600ms] ease-[cubic-bezier(0.34,1.4,0.5,1)] group-hover:rotate-[105deg] group-hover:text-ink" />
              </span>
              <span className="label text-ink">Star Signs</span>
            </Link>

            {/* the nav items live in their own tinted section — hover/active
                motion is scoped to it, never the bar itself. Centered on the
                bar's own midpoint (not the flex space left over between the
                logo and the actions, which are different widths and would
                pull it visibly off-center) */}
            <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
              <nav
                ref={navRef}
                onMouseLeave={() => setHoverIndex(null)}
                className="relative flex items-center gap-0.5 rounded-xl border border-line-soft bg-paper-2/70 px-1"
              >
                {/* the island itself — one element, sliding under whatever is highlighted */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-1 left-0 z-0 rounded-[0.6rem] bg-blue shadow-[0_5px_14px_-7px_rgba(7,53,143,0.7)] transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    width: pill.width,
                    transform: `translateX(${pill.left}px)`,
                    opacity: pill.visible ? 1 : 0,
                  }}
                />
                {/* a small dot under whatever the island is sitting on */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 left-0 z-0 h-1 w-1 rounded-full bg-yellow transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: `translateX(${pill.left + pill.width / 2 - 2}px)`,
                    opacity: pill.visible ? 1 : 0,
                  }}
                />
                {deskItems.map((item, i) => (
                  <NavLink
                    key={item.href}
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    href={item.href}
                    active={isActive(item.href)}
                    highlighted={hoverIndex !== null ? hoverIndex === i : activeIndex === i}
                    onMouseEnter={() => setHoverIndex(i)}
                    onFocus={() => setHoverIndex(i)}
                    onBlur={() => setHoverIndex(null)}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="ml-auto flex shrink-0 items-center gap-2">
              <a
                href={company.phoneHref}
                className="label hidden text-fg-muted transition-colors duration-300 hover:text-blue xl:block"
              >
                {company.phone}
              </a>
              <QuoteButton onNavigate={() => setOpen(false)} />
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-label={open ? "Close menu" : "Open menu"}
                className="group flex h-9 w-9 items-center justify-center rounded-[0.65rem] bg-line-soft transition-colors duration-300 hover:bg-yellow lg:hidden"
              >
                <span className="relative flex h-3 w-4 flex-col justify-between">
                  <span
                    className={`h-px w-full bg-current transition-transform duration-[420ms] ease-[cubic-bezier(0.34,1.4,0.5,1)] ${
                      open ? "translate-y-[5.5px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`h-px w-full bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
                  />
                  <span
                    className={`h-px w-full bg-current transition-transform duration-[420ms] ease-[cubic-bezier(0.34,1.4,0.5,1)] ${
                      open ? "-translate-y-[5.5px] -rotate-45" : ""
                    }`}
                  />
                </span>
              </button>
            </div>

            {/* read progress on the bar's own edge */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-px origin-left bg-blue transition-transform duration-200 ease-linear"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>

          {/* ---------------- mobile panel ---------------- */}
          <div
            className={`absolute inset-x-0 top-[calc(100%+0.5rem)] origin-top overflow-hidden rounded-[1.25rem] bg-paper/95 p-2.5 text-ink shadow-[0_20px_50px_-24px_rgba(7,53,143,0.35)] ring-1 ring-line backdrop-blur-xl transition-[opacity,transform] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
              open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
            }`}
          >
            <nav className="max-h-[min(62vh,28rem)] overflow-y-auto no-scrollbar">
              {navItems.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  style={{ transitionDelay: open ? `${60 + i * 26}ms` : "0ms" }}
                  className={`group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                  }`}
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-left scale-x-0 rounded-xl bg-yellow transition-transform duration-[480ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  />
                  <span className="label relative w-6 shrink-0 text-fg-faint transition-colors duration-300 group-hover:text-ink/60">
                    {item.index}
                  </span>
                  <span className="display relative text-[1.35rem] leading-none transition-[transform,color] duration-[480ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-ink">
                    {item.label}
                  </span>
                  {isActive(item.href) && (
                    <StarMark className="relative ml-auto h-2.5 w-2.5 text-blue transition-colors group-hover:text-ink" />
                  )}
                </Link>
              ))}
            </nav>

            <a
              href={company.phoneHref}
              className="mt-2 flex items-center justify-between rounded-xl bg-paper-2 px-4 py-3.5"
            >
              <span className="label text-fg-muted">Call the shop</span>
              <span className="label text-blue">{company.phone}</span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

/* ------------------------------------------------------------------ */

const NavLink = forwardRef<
  HTMLAnchorElement,
  {
    href: string;
    active: boolean;
    highlighted: boolean;
    onMouseEnter: () => void;
    onFocus: () => void;
    onBlur: () => void;
    children: React.ReactNode;
  }
>(function NavLink({ href, active, highlighted, onMouseEnter, onFocus, onBlur, children }, ref) {
  return (
    <Link
      ref={ref}
      href={href}
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      onBlur={onBlur}
      className="relative z-10 flex items-center justify-center px-3 py-3"
      aria-current={active ? "page" : undefined}
    >
      <span
        className={`label relative block whitespace-nowrap transition-colors duration-300 ${
          highlighted ? "text-paper" : "text-fg-muted"
        }`}
      >
        {children}
      </span>
    </Link>
  );
});

function QuoteButton({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/contact"
      onClick={onNavigate}
      data-magnetic
      className="signal-button group relative flex h-9 items-center gap-2 overflow-hidden rounded-[0.65rem] bg-yellow pl-4 pr-3 text-ink [--signal-sheen:var(--sheen-bright)]"
    >
      <span
        aria-hidden
        className="absolute inset-0 origin-bottom scale-y-0 bg-paper transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
      />
      <span className="label relative z-10 whitespace-nowrap">
        <span className="hidden sm:inline">Get a quote</span>
        <span className="sm:hidden">Quote</span>
      </span>
      <span className="relative z-10 flex h-4 w-4 items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 16 16"
          fill="none"
          className="h-3.5 w-3.5 transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-5"
        >
          <path d="M1 8h13M9.5 3.5 14 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
        <svg
          viewBox="0 0 16 16"
          fill="none"
          className="absolute h-3.5 w-3.5 -translate-x-5 transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
        >
          <path d="M1 8h13M9.5 3.5 14 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </span>
    </Link>
  );
}
