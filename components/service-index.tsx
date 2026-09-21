"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { SignPlate } from "./sign-plate";
import { StarMark } from "./star-mark";
import type { Service } from "@/lib/content";

/**
 * The services list as a Swiss index rather than a grid of cards.
 *
 * Hovering a row does not lift it — deep blue floods the row from the left,
 * the type inverts to yellow, and the elevation for that service tracks your
 * cursor. Keyboard focus drives exactly the same state.
 */
export function ServiceIndex({ services }: { services: Service[] }) {
  const [active, setActive] = useState<number | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const plate = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const track = useCallback((e: React.PointerEvent) => {
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const box = wrap.current;
      const el = plate.current;
      if (!box || !el) return;
      const r = box.getBoundingClientRect();
      el.style.transform = `translate3d(${e.clientX - r.left - 150}px, ${
        e.clientY - r.top - 112
      }px, 0)`;
    });
  }, []);

  return (
    <div ref={wrap} className="relative" onPointerMove={track}>
      {/* cursor-tracked elevation, desktop only */}
      <div
        ref={plate}
        aria-hidden="true"
        className={`pointer-events-none absolute left-0 top-0 z-30 hidden w-[300px] transition-opacity duration-400 lg:block ${
          active === null ? "opacity-0" : "opacity-100"
        }`}
      >
        {services.map((s, i) => (
          <div
            key={s.slug}
            className={`absolute inset-x-0 top-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              active === i
                ? "scale-100 opacity-100"
                : "pointer-events-none scale-95 opacity-0"
            }`}
          >
            <SignPlate
              wordmark={s.short.split(" ")[0].toUpperCase()}
              form={s.form}
              accent={s.accent}
              state="built"
              ratio="4/3"
              sheet={`SH. ${s.index}`}
            />
          </div>
        ))}
      </div>

      <ul className="rule-t">
        {services.map((s, i) => (
          <li key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              onPointerEnter={() => setActive(i)}
              onPointerLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className="group relative block overflow-hidden rule-b"
            >
              {/* the flood */}
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-left scale-x-0 bg-blue-deep transition-transform duration-[620ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />

              <span className="relative flex items-center gap-x-5 px-1 py-6 transition-colors duration-500 group-hover:text-paper group-focus-visible:text-paper sm:py-8 lg:py-9">
                <span className="label w-7 shrink-0 self-start pt-2 text-fg-faint transition-colors duration-500 group-hover:text-yellow group-focus-visible:text-yellow">
                  {s.index}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="display block text-[clamp(1.35rem,3.2vw,2.6rem)] leading-[1.02] transition-transform duration-[620ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-focus-visible:translate-x-2">
                    {s.title}
                  </span>
                  <span className="label mt-2.5 block text-fg-faint transition-colors duration-500 group-hover:text-paper/60 lg:hidden">
                    From {s.from}
                  </span>
                </span>

                <span className="label hidden shrink-0 text-right text-fg-faint transition-colors duration-500 group-hover:text-paper/60 xl:block">
                  {s.kicker}
                </span>

                <span className="label hidden w-28 shrink-0 whitespace-nowrap text-right tnum text-fg-faint transition-colors duration-500 group-hover:text-yellow lg:block">
                  From {s.from}
                </span>

                <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-1 ring-line transition-colors duration-500 group-hover:bg-yellow group-hover:ring-yellow">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="h-3.5 w-3.5 transition-[transform,color] duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-45 group-hover:text-ink"
                  >
                    <path
                      d="M1 8h13M9.5 3.5 14 8l-4.5 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </span>
              </span>

              {/* summary drops in under the title on hover */}
              <span
                aria-hidden="true"
                className="relative block max-h-0 overflow-hidden px-1 transition-[max-height] duration-[620ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:max-h-24 group-focus-visible:max-h-24"
              >
                <span className="flex items-start gap-3 pb-7 pl-[3.25rem] pr-4">
                  <StarMark className="mt-1 h-2.5 w-2.5 shrink-0 text-yellow" />
                  <span className="measure-wide text-[0.95rem] leading-[1.5] text-paper/70">
                    {s.summary}
                  </span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
