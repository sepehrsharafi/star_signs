"use client";

import { useId, useState } from "react";
import { StarMark } from "./star-mark";

/**
 * The deliverable badge on a process step.
 *
 * It looked like a button and did nothing, which is the worst of both. Now it
 * is one: pressing it discloses what the artifact actually is. The panel is
 * animated with a 0fr → 1fr grid row so it measures its own content rather
 * than guessing a height, the same mechanism the FAQ rows use.
 */
export function Deliverable({ label, note }: { label: string; note: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="mt-7">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="deliverable group relative inline-flex max-w-full items-center gap-3 overflow-hidden bg-yellow px-4 py-3 text-left text-ink shadow-[4px_4px_0_var(--blue)]"
      >
        {/* the face darkens from the left as it opens, so the open state reads
            without relying on the marker alone */}
        <span
          aria-hidden
          className={`absolute inset-0 origin-left bg-ink transition-transform duration-[560ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "scale-x-100" : "scale-x-0"
          }`}
        />
        <StarMark
          className={`relative z-10 h-2.5 w-2.5 shrink-0 transition-colors duration-300 ${
            open ? "text-yellow" : "text-blue"
          }`}
        />
        <span
          className={`label relative z-10 leading-none transition-colors duration-300 ${
            open ? "text-paper" : "text-ink"
          }`}
        >
          {label}
        </span>
        {/* plus that collapses to a minus, centred with inset+auto margins so
            the transform stays free for the rotation */}
        <span
          aria-hidden
          className={`relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ring-1 transition-colors duration-300 ${
            open ? "ring-paper/40" : "ring-ink/25"
          }`}
        >
          <span
            className={`absolute inset-0 m-auto h-[1.5px] w-2.5 transition-colors duration-300 ${
              open ? "bg-paper" : "bg-ink"
            }`}
          />
          <span
            className={`absolute inset-0 m-auto h-2.5 w-[1.5px] transition-[transform,background-color] duration-[460ms] ease-[cubic-bezier(0.34,1.4,0.5,1)] ${
              open ? "rotate-90 scale-y-0 bg-paper" : "bg-ink"
            }`}
          />
        </span>
      </button>

      <div
        id={id}
        role="region"
        className={`grid transition-[grid-template-rows] duration-[560ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p
            className={`measure-wide border-l-2 border-yellow pl-4 pt-5 text-[0.95rem] leading-[1.6] text-fg-muted transition-opacity duration-500 ${
              open ? "opacity-100" : "opacity-0"
            }`}
          >
            {note}
          </p>
        </div>
      </div>
    </div>
  );
}
