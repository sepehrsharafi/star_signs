"use client";

import { useId, useRef, useState } from "react";
import type { FaqGroup } from "@/lib/content";

/**
 * FAQ rows. The marker is a plus that rotates into a minus, the row floods
 * yellow from the left while open, and the panel height is measured rather
 * than guessed so the easing is honest.
 */
function Row({
  q,
  a,
  index,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  index: string;
  open: boolean;
  onToggle: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const id = useId();

  return (
    <div className="rule-b">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={id}
          className="group relative flex w-full items-center gap-4 overflow-hidden px-5 py-5 text-left sm:gap-6 sm:px-7 sm:py-6"
        >
          <span
            aria-hidden="true"
            className={`absolute inset-0 origin-left bg-yellow transition-transform duration-[560ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              open ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`}
          />
          <span className="label relative w-7 shrink-0 text-fg-faint transition-colors duration-300 group-hover:text-ink">
            {index}
          </span>
          <span className="relative flex-1 headline text-[clamp(1.05rem,2.1vw,1.45rem)] pr-2">
            {q}
          </span>
          {/* The marker: `inset-0 m-auto` centres each bar in the ring without
              touching `transform`, which the vertical bar needs for the
              plus-to-minus collapse. */}
          <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-1 ring-line transition-colors duration-300 group-hover:ring-ink">
            <span aria-hidden className="absolute inset-0 m-auto h-[1.5px] w-3 bg-current" />
            <span
              aria-hidden
              className={`absolute inset-0 m-auto h-3 w-[1.5px] bg-current transition-transform duration-[460ms] ease-[cubic-bezier(0.34,1.4,0.5,1)] ${
                open ? "rotate-90 scale-y-0" : ""
              }`}
            />
          </span>
        </button>
      </h3>

      {/* 0fr → 1fr animates to the content's real height and survives reflow */}
      <div
        id={id}
        ref={panel}
        role="region"
        className={`grid transition-[grid-template-rows] duration-[560ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          {/* Left inset matches the button's padding plus the index column and
              its gap (20+28+16 / 28+28+24), so the answer starts under the
              question rather than under the number. */}
          <p
            className={`measure-wide pb-7 pl-16 pr-5 text-[0.98rem] leading-[1.6] text-fg-muted transition-opacity duration-500 sm:pl-20 sm:pr-7 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FaqAccordion({ group }: { group: FaqGroup }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="rule-t">
      {group.items.map((item, i) => (
        <Row
          key={item.q}
          q={item.q}
          a={item.a}
          index={String(i + 1).padStart(2, "0")}
          open={open === i}
          onToggle={() => setOpen(open === i ? null : i)}
        />
      ))}
    </div>
  );
}
