import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Counter } from "@/components/counter";
import { CtaBand } from "@/components/cta-band";
import { TickerBand } from "@/components/marquee";
import { MotionEngine } from "@/components/motion-engine";
import { PageHero } from "@/components/page-hero";
import { SignPlate } from "@/components/sign-plate";
import { StarMark } from "@/components/star-mark";
import { TestimonialRail } from "@/components/testimonials";
import { Action, Kicker } from "@/components/ui";
import { VisualTestScroller } from "@/components/visual-test-scroller";
import { WorkGrid } from "@/components/work-grid";
import { projects, sectors, stats, testimonials, ticker } from "@/lib/content";
import { photos, sectorPhoto } from "@/lib/photos";
import { d } from "@/lib/util";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Signage projects across Virginia — channel letters, monuments, hand-bent neon, wayfinding systems and fleet graphics. Hospitality, healthcare, retail, civic and corporate.",
};

/* The page is a static index, so everything derived from the content file is
   computed once at module scope rather than per render. */
const lead = projects.find((project) => project.featured) ?? projects[0];
const years = projects.map((project) => project.year);
const oldest = Math.min(...years);
const newest = Math.max(...years);

/** The shop-wide total, kept in step with the figure on the numbers board. */
const shopTotal = stats.find((stat) => stat.label === "Signs fabricated");

/** Sectors biggest first, each carrying its most recent build. */
const sectorRows = sectors
  .filter((sector) => sector !== "All")
  .map((sector) => {
    const built = projects.filter((project) => project.sector === sector);
    return {
      sector,
      count: built.length,
      latest: built.reduce((a, b) => (b.year >= a.year ? b : a)),
    };
  })
  .sort((a, b) => b.count - a.count || a.sector.localeCompare(b.sector));

const quotes = testimonials.filter((t) => t.projectSlug);

export default function WorkPage() {
  return (
    <>
      <MotionEngine />
      <VisualTestScroller />
      <PageHero
        chip="Selected work"
        meta={`${projects.length} builds / ${oldest} – ${newest}`}
        titleTop="On buildings"
        titleSign="statewide."
        lede="A cross-section of what has gone up. Every one of these was surveyed, drawn, permitted, built and hung by us."
        action={{ href: "#index", label: "Jump to the index", labelAlt: `All ${projects.length} builds` }}
        photo={photos.cityBuilding}
        photoPosition="object-[58%_center]"
        caption="Still standing / every one"
        metrics={[
          { v: <Counter to={projects.length} />, k: "Projects shown" },
          {
            v: shopTotal ? <Counter to={shopTotal.value} suffix={shopTotal.suffix} /> : "3,100+",
            k: "Built since 1998",
          },
          { v: <Counter to={sectorRows.length} />, k: "Sectors covered" },
          { v: oldest.toString(), k: "Oldest on this page" },
        ]}
      />
      <TickerBand items={ticker} tone="yellow" speed={50} size="sm" />
      <LeadBuild />
      <Index />
      <SectorBoard />
      <Voices />
      <CtaBand
        kicker="Your building next"
        title="Send us a photo."
        lede="Most projects start with a phone photograph of a blank wall. That is genuinely enough for us to tell you what is possible and roughly what it costs."
      />
    </>
  );
}

function LeadBuild() {
  return (
    <section id="lead-build" className="shell py-20 sm:py-28 lg:py-32">
      <Kicker index="01">Lead build</Kicker>

      <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
        <h2 className="display-wide text-[clamp(2.3rem,4.6vw,4rem)] leading-[0.95] tracking-[-0.035em] lg:col-span-8">
          <span data-reveal="rise" className="block"><span>Start with</span></span>
          <span data-reveal="rise" style={d(100)} className="block text-blue"><span>{lead.client}.</span></span>
        </h2>
        <p className="max-w-sm text-[1rem] leading-[1.55] text-fg-muted lg:col-span-3 lg:col-start-10 lg:pb-2">
          {lead.location} — {lead.sector}, {lead.year}. The elevation below is
          the drawing the sign was built from.
        </p>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-12">
        <Link
          href={`/work/${lead.slug}`}
          data-reveal="fade"
          className="group relative block lg:col-span-8"
        >
          <SignPlate
            wordmark={lead.wordmark}
            form={lead.form}
            accent={lead.accent}
            ratio="16/11"
            className="transition-shadow duration-500 group-hover:shadow-[10px_10px_0_var(--blue)]"
            sheet="SH. 01 / ELEVATION"
            note={lead.scope[0]?.toUpperCase()}
            width={lead.location.toUpperCase()}
          />
          <span className="absolute bottom-5 right-5 z-30 flex h-12 w-12 items-center justify-center bg-yellow text-ink transition-transform duration-500 group-hover:rotate-45">
            <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden>
              <path d="M1 8h13M9.5 3.5 14 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </span>
        </Link>

        {/* The column stretches to the plate's height, then splits it in two. */}
        <div className="grid gap-5 lg:col-span-4 lg:grid-rows-2">
          <article
            data-reveal="fade"
            style={d(120)}
            className="group relative flex flex-col justify-between overflow-hidden bg-yellow p-7 text-ink"
          >
            <span aria-hidden className="display-wide absolute -bottom-12 -right-6 text-[8rem] leading-none text-blue/12 transition-transform duration-700 group-hover:-translate-x-3 group-hover:-translate-y-3 group-hover:rotate-[-8deg]">
              {lead.year}
            </span>
            <div className="flex items-center justify-between border-b border-ink/15 pb-4">
              <span className="label">Outcome</span>
              <StarMark className="h-4 w-4 text-blue" />
            </div>
            <p className="headline relative z-10 mt-8 text-[clamp(1.1rem,1.7vw,1.4rem)] leading-[1.25]">
              {lead.outcome}
            </p>
          </article>

          <div data-reveal="fade" style={d(200)} className="flex flex-col bg-paper-2 p-7">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <span className="label text-blue">Job facts</span>
              <span aria-hidden className="h-2 w-2 bg-blue" />
            </div>
            <dl className="mt-5">
              {lead.facts.slice(0, 4).map((fact) => (
                <div
                  key={fact.k}
                  className="group/row grid grid-cols-[minmax(6rem,8rem)_1fr] gap-4 overflow-hidden border-t border-line py-2.5 first:border-t-0"
                >
                  <dt className="label pt-0.5 text-fg-faint transition-transform duration-500 group-hover/row:translate-x-1">{fact.k}</dt>
                  <dd className="spec text-fg">{fact.v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-auto pt-7">
              <Action href={`/work/${lead.slug}`} tone="solid">
                Read the whole job
              </Action>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <section id="index" className="scroll-mt-24 border-y border-line bg-white py-20 sm:py-28">
      <div className="shell">
        <Kicker index="02">The index</Kicker>
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="display-wide text-[clamp(2.5rem,5.2vw,4.6rem)] leading-[0.95] tracking-[-0.035em] lg:col-span-8">
            <span data-reveal="rise" className="block"><span>Every build,</span></span>
            <span data-reveal="rise" style={d(100)} className="block text-blue"><span>filed by sector.</span></span>
          </h2>
          <p className="max-w-sm text-[1rem] leading-[1.55] text-fg-muted lg:col-span-3 lg:col-start-10 lg:pb-2">
            Filter the shelf below. Each card opens the full job — the brief, what
            we did about it and the numbers the sign was built to.
          </p>
        </div>

        <div className="mt-14">
          <WorkGrid projects={projects} sectors={sectors} />
        </div>
      </div>
    </section>
  );
}

function SectorBoard() {
  return (
    <section id="sectors" className="relative overflow-hidden bg-blue-deep py-20 text-paper sm:py-28">
      <div aria-hidden className="hero-grid absolute inset-0 opacity-[0.12]" />
      <div className="shell relative z-10">
        <div className="flex items-center gap-3">
          <StarMark className="h-2.5 w-2.5 text-yellow" />
          <span className="label text-paper/50">03 / Where they live</span>
          <span data-reveal="draw" className="h-px flex-1 bg-paper/20" />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="display-wide text-[clamp(2.6rem,5.5vw,4.8rem)] leading-[0.94] tracking-[-0.035em] lg:col-span-8">
            <span data-reveal="rise" className="block"><span>Six sectors,</span></span>
            <span data-reveal="rise" style={d(100)} className="block text-yellow"><span>one standard.</span></span>
          </h2>
          <p className="max-w-sm text-[1rem] leading-[1.55] text-paper/60 lg:col-span-3 lg:col-start-10 lg:pb-2">
            A hospital corridor and a surf shop window get the same survey, the
            same drawing set and the same welder.
          </p>
        </div>

        {/* No reveal: the board sits on a full-bleed navy band, so animating
            it in would leave that band on screen as an empty colour field. */}
        <div className="number-board mt-14 grid gap-px bg-ink sm:grid-cols-2 lg:grid-cols-3">
          {sectorRows.map((row, index) => (
            <article
              key={row.sector}
              data-pointer
              className="number-tile mechanism-grid group relative isolate flex min-h-[19rem] flex-col overflow-hidden bg-blue-mid p-6 text-paper sm:p-7"
            >
              <Image
                src={photos[sectorPhoto[row.sector] ?? "street"].src}
                alt=""
                fill
                sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover opacity-35 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
              />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-blue-deep/95 via-blue-deep/70 to-blue-deep/55" />
              <span aria-hidden className="focus-haze" />

              <div className="relative z-20 flex items-center justify-between border-b border-paper/20 pb-4">
                <span className="label">Sector / 0{index + 1}</span>
                <span aria-hidden className="h-2.5 w-2.5 bg-yellow" />
              </div>

              <p className="display-wide relative z-20 mt-auto text-[clamp(3rem,4.8vw,5rem)] leading-none text-yellow">
                <Counter to={row.count} />
              </p>

              <div className="relative z-20 mt-5 border-t border-paper/20 pt-4">
                <h3 className="display text-[1.35rem] leading-none">{row.sector}</h3>
                <p className="label mt-2.5 text-paper/55">
                  {row.count === 1 ? "1 build" : `${row.count} builds`} / latest {row.latest.client}, {row.latest.year}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Voices() {
  return (
    <section id="reviews" className="relative overflow-hidden bg-blue py-20 text-paper sm:py-28">
      <div aria-hidden className="hero-grid absolute inset-0 opacity-[0.14]" />
      <div className="shell relative z-10">
        <div className="flex items-center gap-3">
          <StarMark className="h-2.5 w-2.5 text-yellow" />
          <span className="label text-paper/55">04 / Field reports</span>
          <span data-reveal="draw" className="h-px flex-1 bg-paper/20" />
        </div>
        <div className="mb-12 mt-10 grid gap-7 lg:grid-cols-12 lg:items-end">
          <h2 className="display-wide text-[clamp(2.5rem,5.2vw,4.6rem)] leading-[0.95] tracking-[-0.035em] lg:col-span-8">
            <span data-reveal="rise" className="block"><span>The same jobs,</span></span>
            <span data-reveal="rise" style={d(100)} className="block text-yellow"><span>told by the client.</span></span>
          </h2>
          <p className="max-w-sm text-[1rem] leading-[1.55] text-paper/65 lg:col-span-3 lg:col-start-10">
            Every quote below belongs to a project on this page. Follow it through
            to the drawing set and the job facts.
          </p>
        </div>
        <TestimonialRail items={quotes} />
      </div>
    </section>
  );
}
