import Link from "next/link";
import type { ReactNode } from "react";
import { StarMark } from "./star-mark";
import { cx, d } from "@/lib/util";

/* ------------------------------------------------------------------ */
/* Kicker — the shop-drawing section marker                            */
/* ------------------------------------------------------------------ */

export function Kicker({
  index,
  children,
  className = "",
}: {
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("flex items-center gap-3", className)}>
      <StarMark className="h-2.5 w-2.5 shrink-0 text-accent" />
      {index && <span className="label text-fg-faint tnum">{index}</span>}
      <span className="label text-fg-muted">{children}</span>
      <span
        data-reveal="draw"
        className="h-px flex-1 bg-line"
        aria-hidden="true"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section heading with the masked rise                                */
/* ------------------------------------------------------------------ */

export function SectionHead({
  children,
  size = "d2",
  className = "",
  delay = 0,
  as: Tag = "h2",
}: {
  children: ReactNode;
  size?: "d1" | "d2" | "d3";
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3";
}) {
  const sizes = { d1: "text-d1", d2: "text-d2", d3: "text-d3" };
  return (
    <Tag className={cx("display", sizes[size], className)}>
      <span data-reveal="rise" style={d(delay)} className="block">
        <span>{children}</span>
      </span>
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Action button — light fills the shape, nothing floats               */
/* ------------------------------------------------------------------ */

type ActionProps = {
  href: string;
  children: ReactNode;
  tone?: "solid" | "yellow" | "ghost";
  size?: "md" | "lg";
  className?: string;
};

export function Action({
  href,
  children,
  tone = "solid",
  size = "md",
  className = "",
}: ActionProps) {
  /* Each tone sets its own fill, the colour the label turns once the fill
     arrives, and how strong the specular sweep needs to be to read on that
     face — white glints on ink, harder white on yellow, a faint ink sheen on
     the transparent one. */
  const skins = {
    solid:
      "bg-ink text-paper ring-0 [--fill:var(--yellow)] [--fill-fg:var(--ink)] [--signal-sheen:var(--sheen-light)]",
    yellow:
      "bg-yellow text-ink ring-0 [--fill:var(--ink)] [--fill-fg:var(--paper)] [--signal-sheen:var(--sheen-bright)]",
    ghost:
      "bg-transparent text-fg ring-1 ring-line [--fill:var(--blue-deep)] [--fill-fg:var(--paper)] [--signal-sheen:var(--sheen-ink)]",
  };
  const pad = size === "lg" ? "py-4 pl-7 pr-5 text-sm" : "py-3 pl-5 pr-3.5";

  return (
    <Link
      href={href}
      data-magnetic
      className={cx(
        "signal-button group relative inline-flex shrink-0 items-center gap-3 overflow-hidden rounded-full ring-inset",
        skins[tone],
        pad,
        className,
      )}
    >
      {/* the fill floods in on a tilt — see .signal-fill */}
      <span aria-hidden="true" className="signal-fill" />
      <span className="relative z-10 h-[1.1rem] overflow-hidden transition-colors duration-300 group-hover:text-[var(--fill-fg)]">
        <span className="signal-label-track flex flex-col">
          <span className="label flex h-[1.1rem] items-center">{children}</span>
          <span className="label flex h-[1.1rem] items-center">{children}</span>
        </span>
      </span>
      <ConveyorArrow />
    </Link>
  );
}

/** Two arrows on a belt: one leaves, one arrives. No fade, no bounce. */
export function ConveyorArrow({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        "relative z-10 flex h-5 w-5 items-center justify-center overflow-hidden rounded-full",
        className,
      )}
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        className="h-3.5 w-3.5 transition-transform duration-[460ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-5"
      >
        <path
          d="M1 8h13M9.5 3.5 14 8l-4.5 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
      <svg
        viewBox="0 0 16 16"
        fill="none"
        className="absolute h-3.5 w-3.5 -translate-x-5 transition-transform duration-[460ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
      >
        <path
          d="M1 8h13M9.5 3.5 14 8l-4.5 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Inline text link — hairline wipes out and back in from the left     */
/* ------------------------------------------------------------------ */

export function TextLink({
  href,
  children,
  className = "",
  external = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-100 bg-current transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-0"
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-accent transition-transform delay-[180ms] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
      />
    </>
  );

  const cls = cx("group relative inline-block", className);

  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Spec table — the drawing-sheet schedule                             */
/* ------------------------------------------------------------------ */

export function SpecTable({
  rows,
  className = "",
}: {
  rows: readonly { k: string; v: string }[];
  className?: string;
}) {
  return (
    <dl className={cx("rule-t", className)}>
      {rows.map((r, i) => (
        <div
          key={r.k}
          data-reveal="fade"
          style={d(i * 55)}
          className="rule-b grid grid-cols-[minmax(7rem,9rem)_1fr] gap-4 py-3"
        >
          <dt className="label pt-0.5 text-fg-faint">{r.k}</dt>
          <dd className="spec text-fg">{r.v}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------------ */
/* Page header shared by every inner route                             */
/* ------------------------------------------------------------------ */

export function PageHeader({
  title,
  lede,
  meta,
}: {
  title: ReactNode;
  lede?: ReactNode;
  meta?: { k: string; v: string }[];
}) {
  return (
    <header className="shell pb-14 pt-32 sm:pt-40 lg:pb-20 lg:pt-44">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        {/* sized so a 12-character line still clears the column */}
        <h1 className="display-wide text-[clamp(2rem,5.2vw,4.25rem)] lg:col-span-8">
          <span data-reveal="rise" className="block">
            <span>{title}</span>
          </span>
        </h1>
        <div className="lg:col-span-4 lg:col-start-9 lg:pt-3">
          {lede && (
            <p
              data-reveal="fade"
              style={d(180)}
              className="measure-wide text-[1.05rem] leading-[1.55] text-fg-muted"
            >
              {lede}
            </p>
          )}
          {meta && (
            <dl
              data-reveal="fade"
              style={d(300)}
              className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4"
            >
              {meta.map((m) => (
                <div key={m.k} className="rule-t pt-2.5">
                  <dt className="label text-fg-faint">{m.k}</dt>
                  <dd className="spec mt-1.5 text-fg">{m.v}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </header>
  );
}
