"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import type { Testimonial } from "@/lib/content";

/**
 * A snap rail rather than a carousel with dots. It scrolls natively — trackpad,
 * touch, keyboard — and the arrows nudge it by one card. The progress bar is
 * driven by real scroll position, so it never lies about where you are.
 */
export function TestimonialRail({ items }: { items: Testimonial[] }) {
  const rail = useRef<HTMLUListElement>(null);
  const [p, setP] = useState(0);

  const onScroll = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setP(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  const nudge = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 20 : 400;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <ul
        ref={rail}
        onScroll={onScroll}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
      >
        {items.map((t, i) => (
          <li
            key={t.name}
            className="w-[min(30rem,84vw)] shrink-0 snap-start"
          >
            <figure data-pointer className="testimonial-card mechanism-grid group relative flex h-full flex-col overflow-hidden rounded-2xl bg-paper p-7 text-ink sm:p-9">
              <div className="flex items-center justify-between">
                <span className="flex items-end gap-1" aria-hidden>
                  <span className="testimonial-wave h-2 w-1 bg-blue" />
                  <span className="testimonial-wave h-4 w-1 bg-blue" />
                  <span className="testimonial-wave h-3 w-1 bg-blue" />
                  <span className="testimonial-wave h-5 w-1 bg-blue" />
                  <span className="testimonial-wave h-2 w-1 bg-blue" />
                </span>
                <span className="label text-ink/35 tnum">
                  {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
              </div>

              <blockquote className="testimonial-copy relative z-10 mt-7 flex-1">
                <p className="headline text-[clamp(1.05rem,1.55vw,1.3rem)] leading-[1.35]">
                  “{t.quote}”
                </p>
              </blockquote>

              <figcaption className="mt-8 flex items-center gap-3 rule-t border-ink/15 pt-5">
                <span className="testimonial-avatar flex h-10 w-10 shrink-0 items-center justify-center bg-blue-deep text-paper">
                  <span className="label text-[0.6rem]">{t.initials}</span>
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[0.95rem] font-medium">
                    {t.name}
                  </span>
                  <span className="label mt-1 block truncate text-ink/50">
                    {t.role}, {t.company}
                  </span>
                </span>
                {t.projectSlug && (
                  <Link
                    href={`/work/${t.projectSlug}`}
                    className="signal-button label ml-auto shrink-0 overflow-hidden px-3 py-2 ring-1 ring-ink/20 [--signal-sheen:var(--sheen-ink)] transition-colors duration-300 hover:bg-ink hover:text-paper"
                  >
                    Project
                  </Link>
                )}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center gap-5">
        <div className="h-px flex-1 bg-paper/20">
          <div
            className="h-px bg-yellow transition-[width] duration-200 ease-linear"
            style={{ width: `${Math.max(8, p * 100)}%` }}
          />
        </div>
        <div className="flex gap-2">
          <RailButton dir={-1} onClick={() => nudge(-1)} />
          <RailButton dir={1} onClick={() => nudge(1)} />
        </div>
      </div>
    </div>
  );
}

function RailButton({
  dir,
  onClick,
}: {
  dir: 1 | -1;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === 1 ? "Next testimonial" : "Previous testimonial"}
      className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full ring-1 ring-inset ring-paper/25 transition-colors duration-300 hover:ring-yellow"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-bottom scale-y-0 bg-yellow transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
      />
      <svg
        viewBox="0 0 16 16"
        fill="none"
        className="relative h-4 w-4 text-paper transition-colors duration-300 group-hover:text-ink"
        style={{ rotate: dir === 1 ? "0deg" : "180deg" }}
      >
        <path
          d="M1 8h13M9.5 3.5 14 8l-4.5 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </button>
  );
}
