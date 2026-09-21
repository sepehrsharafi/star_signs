import Link from "next/link";
import { StarMark } from "./star-mark";
import { ConveyorArrow } from "./ui";
import { company } from "@/lib/content";
import { d } from "@/lib/util";

/**
 * The closing block. Oversized type clipped by the edge of the page, the way
 * a sign is cropped by the building it hangs on.
 */
export function CtaBand({
  kicker = "Next step",
  title = "Let's get you seen.",
  lede = "Send us the address and a photograph of the building. We will tell you what the ordinance allows, what it will cost and how long it takes — before you have committed to anything.",
}: {
  kicker?: string;
  title?: string;
  lede?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <span className="grain-layer z-20" aria-hidden="true" />

      <div className="shell relative z-10 pb-8 pt-16 sm:pt-20">
        <div className="flex items-center gap-3">
          <StarMark className="h-2.5 w-2.5 shrink-0 text-yellow" />
          <span className="label text-paper/55">{kicker}</span>
          <span
            data-reveal="draw"
            className="h-px flex-1 bg-paper/20"
            aria-hidden="true"
          />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="display-wide text-d1">
              <span data-reveal="rise" className="block">
                <span>{title}</span>
              </span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-4">
            <p
              data-reveal="fade"
              style={d(160)}
              className="measure-wide text-[1.05rem] leading-[1.55] text-paper/65"
            >
              {lede}
            </p>
            <div
              data-reveal="fade"
              style={d(280)}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                href="/contact"
                data-magnetic
                className="signal-button group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-yellow py-4 pl-6 pr-4 text-ink [--signal-sheen:var(--sheen-bright)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-bottom scale-y-0 bg-paper transition-transform duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                />
                <span className="relative z-10 h-[1.1rem] overflow-hidden">
                  <span className="signal-label-track flex flex-col">
                    <span className="label flex h-[1.1rem] items-center">Start a project</span>
                    <span className="label flex h-[1.1rem] items-center">Send the address</span>
                  </span>
                </span>
                <ConveyorArrow />
              </Link>
              <a
                href={company.phoneHref}
                data-magnetic
                className="signal-button group relative inline-flex items-center gap-3 overflow-hidden rounded-full py-4 pl-6 pr-4 text-paper ring-1 ring-inset ring-paper/25 [--signal-sheen:var(--sheen-light)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-bottom scale-y-0 bg-paper transition-transform duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                />
                <span className="label relative z-10 transition-colors duration-300 group-hover:text-ink">
                  {company.phone}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* wordmark cropped by the sheet edge */}
      <div
        aria-hidden="true"
        className="relative z-10 select-none overflow-hidden px-[var(--gutter)]"
      >
        <div data-reveal="wipe">
          <span className="display-wide block translate-y-[0.14em] whitespace-nowrap text-[clamp(2.5rem,9vw,7.5rem)] leading-[0.78] text-paper/[0.13]">
            BUILT TO BE SEEN
          </span>
        </div>
      </div>
    </section>
  );
}
