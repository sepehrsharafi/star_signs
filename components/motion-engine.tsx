"use client";

import { useEffect } from "react";

/**
 * Pointer and scroll values for the page mechanisms. The component
 * never owns layout or render state: it writes CSS custom properties directly
 * to the few surfaces that opt in, keeping pointer motion off React's render
 * path and making the effects cheap to disable for reduced motion.
 */
export function MotionEngine() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce) return;

    const disposers: Array<() => void> = [];

    if (fine) {
      document.querySelectorAll<HTMLElement>("[data-pointer]").forEach((surface) => {
        let frame = 0;
        const move = (event: PointerEvent) => {
          if (frame) cancelAnimationFrame(frame);
          frame = requestAnimationFrame(() => {
            const rect = surface.getBoundingClientRect();
            const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
            const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
            surface.style.setProperty("--pointer-x", `${x * 100}%`);
            surface.style.setProperty("--pointer-y", `${y * 100}%`);
            surface.style.setProperty("--pointer-dx", (x - 0.5).toFixed(3));
            surface.style.setProperty("--pointer-dy", (y - 0.5).toFixed(3));
          });
        };
        const enter = () => surface.setAttribute("data-pointing", "");
        const leave = () => {
          surface.removeAttribute("data-pointing");
          surface.style.setProperty("--pointer-dx", "0");
          surface.style.setProperty("--pointer-dy", "0");
        };

        surface.addEventListener("pointermove", move);
        surface.addEventListener("pointerenter", enter);
        surface.addEventListener("pointerleave", leave);
        disposers.push(() => {
          if (frame) cancelAnimationFrame(frame);
          surface.removeEventListener("pointermove", move);
          surface.removeEventListener("pointerenter", enter);
          surface.removeEventListener("pointerleave", leave);
        });
      });

      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((target) => {
        const move = (event: PointerEvent) => {
          const rect = target.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          target.style.setProperty("--magnet-x", `${x * 10}px`);
          target.style.setProperty("--magnet-y", `${y * 8}px`);
        };
        const leave = () => {
          target.style.setProperty("--magnet-x", "0px");
          target.style.setProperty("--magnet-y", "0px");
        };
        target.addEventListener("pointermove", move);
        target.addEventListener("pointerleave", leave);
        disposers.push(() => {
          target.removeEventListener("pointermove", move);
          target.removeEventListener("pointerleave", leave);
        });
      });
    }

    const shifted = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-shift]"));
    let scrollFrame = 0;
    const updateScroll = () => {
      scrollFrame = 0;
      const height = window.innerHeight;
      shifted.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const progress = Math.min(1, Math.max(-1, (rect.top + rect.height / 2 - height / 2) / height));
        element.style.setProperty("--scroll-shift", progress.toFixed(3));
      });
    };
    const onScroll = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
    };
    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      disposers.forEach((dispose) => dispose());
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
