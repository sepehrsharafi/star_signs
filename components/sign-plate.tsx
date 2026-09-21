import type { CSSProperties, ReactNode } from "react";
import type { Accent, SignForm } from "@/lib/content";
import { cx } from "@/lib/util";

/**
 * SignPlate — a shop drawing that gets built.
 *
 * At rest it is an elevation: drafting grid, extension lines, dimensions and
 * leader notes, letterforms in outline. On hover the finished sign wipes
 * across it in solid brand colour. Drawn, then built.
 *
 * Pure CSS — no imagery — so it stays sharp at any size and every project gets
 * artwork that belongs to this studio rather than a stock library.
 */

type Props = {
  wordmark: string;
  form?: SignForm;
  accent?: Accent;
  ratio?: string;
  width?: string;
  height?: string;
  note?: string;
  sheet?: string;
  className?: string;
  /** `auto` wipes on hover; the others pin a single state. */
  state?: "auto" | "drawing" | "built";
};

export function SignPlate({
  wordmark,
  form = "channel",
  accent = "blue",
  ratio = "4/3",
  width,
  height,
  note,
  sheet,
  className = "",
  state = "auto",
}: Props) {
  // Two flat, high-contrast pairings. No gradients, no glow.
  const vars =
    accent === "yellow"
      ? { "--fb": "var(--yellow)", "--ff": "var(--ink)" }
      : { "--fb": "var(--blue-deep)", "--ff": "var(--yellow)" };

  const wipe =
    state === "built"
      ? "[clip-path:inset(0_0_0_0)]"
      : state === "drawing"
        ? "[clip-path:inset(0_100%_0_0)]"
        : "[clip-path:inset(0_100%_0_0)] group-hover/plate:[clip-path:inset(0_0_0_0)]";

  return (
    <figure
      className={cx(
        "group/plate relative isolate overflow-hidden bg-paper-2",
        className,
      )}
      style={
        {
          aspectRatio: ratio,
          containerType: "inline-size",
          ...vars,
        } as CSSProperties
      }
    >
      {/* ---------- the drawing ---------- */}
      <Sheet
        wordmark={wordmark}
        form={form}
        width={width}
        height={height}
        note={note}
        sheet={sheet}
        built={false}
      />

      {/* ---------- the built sign, wiping across ---------- */}
      <div
        aria-hidden="true"
        className={cx(
          "absolute inset-0 z-20 transition-[clip-path] duration-[820ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          wipe,
        )}
        style={{ backgroundColor: "var(--fb)" }}
      >
        <Sheet
          wordmark={wordmark}
          form={form}
          width={width}
          height={height}
          note={note}
          sheet={sheet}
          built
        />
      </div>

      {/* the wipe's leading edge */}
      <span
        aria-hidden="true"
        className={cx(
          "absolute inset-y-0 z-30 w-[2px] bg-ink/25 transition-[left] duration-[820ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
          state === "built"
            ? "left-full"
            : state === "drawing"
              ? "left-0"
              : "left-0 group-hover/plate:left-full",
        )}
      />

      {/* corner ticks sit above both states */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 z-40 h-3.5 w-3.5 border-l border-t border-ink/25 mix-blend-difference"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-0 right-0 z-40 h-3.5 w-3.5 border-b border-r border-ink/25 mix-blend-difference"
      />
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* One rendering of the sheet, in either drawing or built colours       */
/* ------------------------------------------------------------------ */

function Sheet({
  wordmark,
  form,
  width,
  height,
  note,
  sheet,
  built,
}: {
  wordmark: string;
  form: SignForm;
  width?: string;
  height?: string;
  note?: string;
  sheet?: string;
  built: boolean;
}) {
  // One variable drives every line, tick and character on the sheet.
  const ink = built ? "var(--ff)" : "var(--ink)";

  return (
    <div
      className="absolute inset-0"
      style={{ "--pfg": ink } as CSSProperties}
    >
      {/* drafting grid, only on the drawing */}
      {!built && (
        <span
          aria-hidden="true"
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, color-mix(in oklab, var(--pfg) 7%, transparent) 0 1px, transparent 1px 24px),
              repeating-linear-gradient(90deg, color-mix(in oklab, var(--pfg) 7%, transparent) 0 1px, transparent 1px 24px)`,
          }}
        />
      )}

      <div className="absolute inset-0 z-10 flex flex-col px-[9%] pb-[7%] pt-[9%] text-[var(--pfg)]">
        <div className="relative flex flex-1 items-center justify-center">
          <Geometry form={form} wordmark={wordmark} built={built} />
        </div>
        {width && <Dimension label={width} built={built} className="mt-[5%] shrink-0" />}
      </div>

      {height && <VerticalDimension label={height} built={built} />}

      {note && (
        <div
          className={cx(
            "absolute right-[5%] top-[4.5%] z-20 flex max-w-[52%] items-start gap-1.5 text-[var(--pfg)]",
            built ? "opacity-60" : "opacity-55",
          )}
        >
          <svg viewBox="0 0 12 12" className="mt-[3px] h-2 w-2 shrink-0" aria-hidden>
            <circle cx="6" cy="6" r="2.2" fill="currentColor" />
            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
          <span className="label text-right text-[0.5rem] leading-[1.5] tracking-[0.1em]">
            {note}
          </span>
        </div>
      )}

      {sheet && (
        <span className="label absolute left-[6%] top-[5%] z-20 text-[0.5rem] text-[var(--pfg)] opacity-55">
          {built ? "BUILT" : sheet}
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Per-form geometry                                                   */
/* ------------------------------------------------------------------ */

function Geometry({
  form,
  wordmark,
  built,
}: {
  form: SignForm;
  wordmark: string;
  built: boolean;
}) {
  // Cabinets read as outline on the drawing and as solid mass once built.
  const cabinet = built
    ? "border border-[var(--pfg)]/70 bg-[var(--pfg)]/15"
    : "border border-[var(--pfg)]/35 bg-[var(--pfg)]/[0.05]";

  if (form === "monument") {
    return (
      <div className="flex h-full w-full flex-col justify-end">
        <Extents built={built}>
          <div className={cx("relative w-full rounded-[2px] px-[5%] py-[7%]", cabinet)}>
            <Word text={wordmark} scale={0.66} built={built} />
          </div>
        </Extents>
        <div className={cx("mx-[-4%] h-[8cqw] max-h-10 rounded-b-[2px]", cabinet)} />
        <GroundLine built={built} />
      </div>
    );
  }

  if (form === "pylon") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-end">
        <div className="flex w-[54%] flex-1 flex-col items-stretch">
          <Extents built={built}>
            <div className={cx("rounded-[2px] px-[6%] py-[9%]", cabinet)}>
              <Word text={wordmark} scale={0.3} built={built} />
            </div>
          </Extents>
          <div className="mt-[4%] flex flex-1 flex-col gap-[4px] border border-[var(--pfg)]/25 p-[4px]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={cx(
                  "flex-1 border",
                  built
                    ? "border-[var(--pfg)]/50 bg-[var(--pfg)]/12"
                    : "border-dashed border-[var(--pfg)]/25 bg-[var(--pfg)]/[0.03]",
                )}
              />
            ))}
          </div>
        </div>
        <span className={cx("h-[7cqw] max-h-9 w-[9%]", cabinet)} />
        <GroundLine built={built} />
      </div>
    );
  }

  if (form === "blade") {
    return (
      <div className="flex h-full w-full items-start">
        <span
          className="h-full w-[7%] shrink-0 border-r border-[var(--pfg)]/45"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, color-mix(in oklab, var(--pfg) 26%, transparent) 0 1px, transparent 1px 7px)`,
          }}
        />
        <div className="flex flex-1 flex-col pt-[8%]">
          <div className="flex h-[10%] items-start">
            <span className="h-px w-[16%] bg-[var(--pfg)]/55" />
          </div>
          <Extents built={built}>
            <div className={cx("rounded-[2px] px-[5%] py-[8%]", cabinet)}>
              <Word text={wordmark} scale={0.46} built={built} />
            </div>
          </Extents>
        </div>
      </div>
    );
  }

  /* wall-mounted letterforms: channel / halo / neon */
  return (
    <div className="w-full">
      <Extents built={built}>
        <Word text={wordmark} scale={1} built={built} form={form} />
      </Extents>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

function Extents({ children, built }: { children: ReactNode; built: boolean }) {
  return (
    <div className="relative">
      {!built && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[5%] border border-dashed border-[var(--pfg)]/30"
        />
      )}
      {children}
    </div>
  );
}

function GroundLine({ built }: { built: boolean }) {
  return (
    <div className="relative">
      <span className="block h-px w-[125%] -translate-x-[10%] bg-[var(--pfg)]/55" />
      <span
        aria-hidden="true"
        className={cx(
          "block h-[7px] w-[125%] -translate-x-[10%]",
          built ? "opacity-45" : "opacity-70",
        )}
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, color-mix(in oklab, var(--pfg) 40%, transparent) 0 1px, transparent 1px 6px)`,
        }}
      />
    </div>
  );
}

/**
 * The wordmark. Outlined on the drawing, solid once built — for the glass-tube
 * typology it stays outlined, because that is what a neon tube actually is.
 */
function Word({
  text,
  scale = 1,
  built,
  form = "channel",
}: {
  text: string;
  scale?: number;
  built: boolean;
  form?: SignForm;
}) {
  const size = {
    fontSize: `clamp(0.65rem, ${13 * scale}cqw, ${7 * scale}rem)`,
  } as CSSProperties;

  const tube = form === "neon";

  if (!built || tube) {
    return (
      <span
        className="display-wide block text-center leading-none"
        style={{
          ...size,
          color: tube && built ? "color-mix(in oklab, var(--pfg) 22%, transparent)" : "transparent",
          WebkitTextStroke: `${tube ? "0.035em" : "0.022em"} color-mix(in oklab, var(--pfg) ${built ? 90 : 62}%, transparent)`,
        }}
      >
        {text}
      </span>
    );
  }

  return (
    <span
      className="display-wide block text-center leading-none"
      style={{ ...size, color: "var(--pfg)" }}
    >
      {text}
    </span>
  );
}

function Dimension({
  label,
  built,
  className = "",
}: {
  label: string;
  built: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cx(
        "flex items-center gap-2",
        built ? "opacity-45" : "opacity-70",
        className,
      )}
    >
      <Tick />
      <DimArrow />
      <span className="h-px flex-1 bg-[var(--pfg)]/55" />
      <span className="label whitespace-nowrap text-[0.5rem] tracking-[0.12em] text-[var(--pfg)]">
        {label}
      </span>
      <span className="h-px flex-1 bg-[var(--pfg)]/55" />
      <DimArrow flip />
      <Tick />
    </div>
  );
}

function VerticalDimension({ label, built }: { label: string; built: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cx(
        "absolute bottom-[26%] left-[3%] top-[16%] z-20 flex w-4 flex-col items-center gap-1.5",
        built ? "opacity-45" : "opacity-70",
      )}
    >
      <DimArrow vertical />
      <span className="w-px flex-1 bg-[var(--pfg)]/55" />
      <span
        className="label whitespace-nowrap text-[0.5rem] tracking-[0.12em] text-[var(--pfg)]"
        style={{ writingMode: "vertical-rl", rotate: "180deg" }}
      >
        {label}
      </span>
      <span className="w-px flex-1 bg-[var(--pfg)]/55" />
      <DimArrow vertical flip />
    </div>
  );
}

function Tick() {
  return <span className="h-2.5 w-px shrink-0 bg-[var(--pfg)]/55" />;
}

function DimArrow({
  flip = false,
  vertical = false,
}: {
  flip?: boolean;
  vertical?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 8 8"
      className="h-[7px] w-[7px] shrink-0 text-[var(--pfg)]"
      style={{
        rotate: vertical ? (flip ? "90deg" : "270deg") : flip ? "180deg" : "0deg",
      }}
      aria-hidden
    >
      <path d="M7 4 1 1.2v5.6z" fill="currentColor" />
    </svg>
  );
}
