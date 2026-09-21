import { StarMark } from "./star-mark";

/**
 * Seamless marquee. The track holds the run twice and translates -50%, so the
 * loop has no seam and needs no JS.
 */
export function Marquee({
  children,
  speed = 42,
  reverse = false,
  className = "",
  pauseOnHover = true,
}: {
  children: React.ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
  pauseOnHover?: boolean;
}) {
  return (
    <div
      className={`group relative flex overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className={`marquee-track ${
          pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
        }`}
        style={{
          ["--speed" as string]: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0">{children}</div>
      </div>
    </div>
  );
}

type Tone = "yellow" | "blue" | "ink" | "paper";

const TONES: Record<Tone, string> = {
  yellow: "bg-yellow text-ink",
  blue: "bg-blue-deep text-paper",
  ink: "bg-ink text-paper",
  paper: "bg-paper text-ink",
};

/** The banner band: capability list running edge to edge, star-separated. */
export function TickerBand({
  items,
  speed = 46,
  tone = "yellow",
  reverse = false,
  size = "md",
}: {
  items: readonly string[];
  speed?: number;
  tone?: Tone;
  reverse?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const pad = size === "lg" ? "py-5" : size === "sm" ? "py-2" : "py-3.5";
  const type =
    size === "lg"
      ? "text-[clamp(1rem,2.2vw,1.6rem)] tracking-[-0.02em] display-wide"
      : "label text-[0.75rem] tracking-[0.2em]";

  return (
    <div className={`relative isolate overflow-hidden ${TONES[tone]} ${pad}`}>
      <Marquee speed={speed} reverse={reverse} pauseOnHover={false}>
        {items.map((t, i) => (
          <span key={i} className="flex items-center">
            <span className={`whitespace-nowrap px-5 ${type}`}>{t}</span>
            <StarMark className="h-2.5 w-2.5 shrink-0 opacity-80" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
