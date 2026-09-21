import Image from "next/image";
import type { Photo } from "@/lib/photos";
import { cx } from "@/lib/util";

/**
 * Photography wrapper.
 *
 * Holds a fixed ratio, tints toward the brand navy so stock imagery reads as
 * one set rather than a scrapbook, and lifts the tint on hover. Captions are
 * mono to match the drawing language.
 */
export function Figure({
  photo,
  ratio = "4/3",
  caption,
  index,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  tint = "navy",
  rounded = true,
}: {
  photo: Photo;
  /** Pass "auto" to let a grid row drive the height instead of a ratio. */
  ratio?: string;
  caption?: string;
  index?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  tint?: "navy" | "none" | "deep";
  rounded?: boolean;
}) {
  return (
    <figure
      className={cx(
        "group relative isolate w-full overflow-hidden bg-paper-2",
        rounded && "rounded-2xl",
        className,
      )}
      // With both a ratio and a stretched height the width would be derived
      // from the height and overflow the column, so "auto" drops the ratio.
      style={ratio === "auto" ? undefined : { aspectRatio: ratio }}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
      />

      {tint !== "none" && (
        <span
          aria-hidden="true"
          className={cx(
            "absolute inset-0 transition-opacity duration-700 mix-blend-multiply",
            tint === "deep"
              ? "bg-blue-deep/55 group-hover:bg-blue-deep/30"
              : "bg-blue-deep/25 group-hover:bg-blue-deep/5",
          )}
        />
      )}

      {index && (
        <span className="label absolute left-4 top-4 z-10 rounded-full bg-paper px-2.5 py-1.5 text-ink">
          {index}
        </span>
      )}

      {caption && (
        <figcaption className="label absolute bottom-4 left-4 right-4 z-10 text-paper drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
