import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { StarMark } from "./star-mark";
import { ConveyorArrow } from "./ui";
import type { Photo } from "@/lib/photos";
import { d } from "@/lib/util";

/**
 * The inner-page hero, built from the landing page's own parts: the blue block
 * with its drafting grid, a headline whose second line sits on a tilted sign
 * face, and a photograph in a welded frame with its yellow offset.
 *
 * Every inner route uses this, so a change to the composition lands everywhere
 * at once. The two headline lines are separate props because the second one is
 * the sign face and must stay on one line.
 */
export function PageHero({
  chip,
  meta,
  titleTop,
  titleSign,
  lede,
  action,
  photo,
  photoPosition = "object-center",
  caption,
  metrics,
}: {
  chip: string;
  meta: ReactNode;
  titleTop: string;
  titleSign: string;
  lede: ReactNode;
  action: { href: string; label: string; labelAlt: string };
  photo: Photo;
  /** Tailwind object-position class, for photographs with an off-centre subject. */
  photoPosition?: string;
  caption: string;
  metrics: { v: ReactNode; k: string }[];
}) {
  return (
    <section className="group/hero relative isolate overflow-hidden border-b border-line bg-paper pt-24 sm:pt-28">
      <div aria-hidden className="absolute bottom-24 right-0 top-32 hidden w-[41%] bg-blue lg:block">
        <span className="hero-grid absolute inset-0 opacity-35" />
        <span className="absolute inset-y-0 left-0 w-2 bg-yellow" />
      </div>

      <div className="shell relative grid gap-x-8 gap-y-12 pb-8 lg:grid-cols-12 lg:pb-5">
        <div className="relative z-20 self-center pt-9 lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:py-14">
          <div data-reveal="fade" className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="label bg-blue px-3 py-2 text-paper">{chip}</span>
            <span className="h-px w-7 bg-blue" />
            <span className="label text-fg-muted">{meta}</span>
          </div>

          <h1 className="display-wide mt-9 text-[clamp(2.9rem,6.2vw,5.6rem)] leading-[0.88] tracking-[-0.05em]">
            <span data-reveal="rise" className="block"><span>{titleTop}</span></span>
            <span
              data-reveal="rise"
              style={d(90)}
              className="hero-sign-face relative z-20 mt-2 block w-fit rotate-[-1deg] bg-blue px-[0.17em] pb-[0.1em] pt-[0.02em] text-paper shadow-[0.11em_0.11em_0_var(--yellow)]"
            >
              <span className="whitespace-nowrap">{titleSign}</span>
            </span>
          </h1>

          <div className="mt-12 grid max-w-[42rem] gap-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end lg:mt-14">
            <p data-reveal="fade" style={d(220)} className="max-w-[31rem] border-l-2 border-blue pl-4 text-[clamp(1rem,1.4vw,1.15rem)] leading-[1.6] text-fg-muted">
              {lede}
            </p>
            <Link
              href={action.href}
              data-reveal="fade"
              data-magnetic
              style={d(320)}
              className="signal-button group relative inline-flex w-fit items-center gap-4 overflow-hidden bg-yellow px-5 py-3.5 text-ink shadow-[5px_5px_0_var(--blue)] [--signal-sheen:var(--sheen-bright)]"
            >
              <span className="h-[1.1rem] overflow-hidden">
                <span className="signal-label-track flex flex-col">
                  <span className="label h-[1.1rem]">{action.label}</span>
                  <span className="label h-[1.1rem]">{action.labelAlt}</span>
                </span>
              </span>
              <ConveyorArrow />
            </Link>
          </div>
        </div>

        <figure data-pointer data-scroll-shift className="mechanism-grid relative z-10 min-h-[26rem] bg-blue p-3 pb-10 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:my-3 lg:h-[min(52vh,32rem)] lg:min-h-0 lg:self-center lg:p-4 lg:pb-4">
          <span aria-hidden className="absolute -bottom-3 -left-3 h-full w-full bg-yellow lg:-bottom-4 lg:-left-4" />
          <div className="relative h-full min-h-[23rem] overflow-hidden [clip-path:polygon(0_0,100%_0,100%_91%,91%_100%,0_100%)]">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={`motion-image object-cover saturate-[0.92] contrast-[1.03] ${photoPosition}`}
            />
            <span aria-hidden className="absolute inset-0 bg-blue-deep/10 mix-blend-multiply" />
            <span aria-hidden className="pointer-crosshair" />
          </div>
          <figcaption className="absolute bottom-2 left-6 z-10 flex items-center gap-3 bg-paper px-4 py-3 text-ink shadow-[4px_4px_0_var(--blue)] lg:-bottom-4 lg:left-auto lg:right-8">
            <StarMark className="h-3 w-3 text-blue" />
            <span className="label">{caption}</span>
          </figcaption>
          <span aria-hidden className="absolute -right-1 top-10 z-20 h-px w-10 bg-yellow lg:-right-5" />
          <span aria-hidden className="absolute -right-1 top-[2.3rem] z-20 h-2 w-px bg-yellow lg:-right-5" />
        </figure>

        <dl data-reveal="fade" style={d(420)} className="relative z-20 grid grid-cols-2 border-t-4 border-blue bg-paper lg:col-span-12 lg:row-start-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <div
              key={metric.k}
              className={`metric-cell ${index % 2 === 1 ? "border-l border-line pl-4" : "pr-4"} ${index >= 2 ? "border-t border-line" : ""} py-4 sm:py-5 lg:border-t-0 lg:pr-4 lg:pl-6 lg:first:pl-0 ${index > 0 ? "lg:border-l" : "lg:border-l-0"}`}
            >
              <dt className="display-wide text-[clamp(1.7rem,2.8vw,2.45rem)] leading-none text-blue tnum">
                {metric.v}
              </dt>
              <dd className="label mt-2 text-fg-muted">{metric.k}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
