import type { CSSProperties } from "react";

/** Stagger helper for [data-reveal] elements. `style={d(120)}` */
export const d = (ms: number): CSSProperties =>
  ({ "--d": `${ms}ms` }) as CSSProperties;

export const cx = (...parts: (string | false | null | undefined)[]) =>
  parts.filter(Boolean).join(" ");
