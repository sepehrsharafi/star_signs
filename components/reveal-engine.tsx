"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One reveal engine for the whole site.
 *
 * Pages stay server components and simply declare
 * `data-reveal="wipe|rise|fade|draw|block"` (optionally with `style={d(120)}`
 * to stagger). This engine flips `data-shown` when the element reaches the
 * viewport; all the motion lives in CSS, so it runs on the compositor and
 * there is no per-element React state.
 *
 * It measures rectangles on scroll rather than using IntersectionObserver, and
 * that is deliberate. The resting state of a reveal hides its element —
 * `fade` sets `opacity: 0`, `wipe` clips it away entirely — so if the trigger
 * never fires, the content is not merely un-animated, it is invisible. An
 * IntersectionObserver does not fire at all while the document is hidden
 * (a background tab, a throttled renderer), and an element clipped to zero
 * area can fail to register as intersecting, which is a deadlock: it is hidden
 * because it has not been revealed, and it is not revealed because being
 * hidden gives it no area to intersect with. Whole sections disappeared that
 * way. Rect maths has no such failure mode: geometry is available whether or
 * not the page is being painted, and it does not depend on the element's own
 * visibility.
 */
export function RevealEngine() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const showAll = () => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])")
        .forEach((el) => el.setAttribute("data-shown", ""));
    };

    if (reduce) {
      showAll();
      return;
    }

    /* Fire a little before the element is fully on screen, so the motion
       resolves as the reader arrives rather than after. */
    const MARGIN = 0.12;

    const sweep = () => {
      const limit = window.innerHeight * (1 - MARGIN);
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])")
        .forEach((el) => {
          const r = el.getBoundingClientRect();
          /* Anything whose top edge has come above the trigger line, and that
             has not already gone past above it, is in. A zero-height box
             still qualifies — it has a position even with nothing to show. */
          if (r.top < limit && r.bottom > -1) el.setAttribute("data-shown", "");
        });
    };

    /* Coalesced with a timer rather than requestAnimationFrame: rAF is paused
       entirely while the document is hidden, which would leave the sweep — and
       therefore the content — waiting on a frame that never comes. 80ms of lag
       is invisible against a reveal that runs for about a second. */
    let pending = 0;
    const schedule = () => {
      if (pending) return;
      pending = window.setTimeout(() => {
        pending = 0;
        sweep();
      }, 80);
    };

    sweep();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    /* Streamed and client-navigated content arrives after mount. */
    const mo = new MutationObserver(schedule);
    mo.observe(document.body, { childList: true, subtree: true });

    /* Late web fonts and images move things after the first pass, so sweep
       again a few times early on. This deliberately does not reveal everything
       wholesale — content below the fold should still arrive on scroll. */
    const settle = [200, 800, 2000].map((ms) => window.setTimeout(sweep, ms));

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mo.disconnect();
      settle.forEach(window.clearTimeout);
      if (pending) window.clearTimeout(pending);
    };
  }, [pathname]);

  return null;
}
