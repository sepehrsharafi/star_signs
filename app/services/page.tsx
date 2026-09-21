import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Counter } from "@/components/counter";
import { CtaBand } from "@/components/cta-band";
import { Figure } from "@/components/figure";
import { TickerBand } from "@/components/marquee";
import { MotionEngine } from "@/components/motion-engine";
import { PageHero } from "@/components/page-hero";
import { ServiceBento } from "@/components/service-bento";
import { StarMark } from "@/components/star-mark";
import { Action, Kicker } from "@/components/ui";
import { VisualTestScroller } from "@/components/visual-test-scroller";
import { capabilities, company, processSteps, services } from "@/lib/content";
import { photos, stepPhoto } from "@/lib/photos";
import { d } from "@/lib/util";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Illuminated channel letters, monument and pylon signs, storefront and blade signs, hand-bent neon, ADA wayfinding and vehicle graphics — fabricated, permitted and installed in-house across Virginia.",
};

export default function ServicesPage() {
  return (
    <>
      <MotionEngine />
      <VisualTestScroller />
      <PageHero
        chip="What we fabricate"
        meta={`${services.length} disciplines / nothing subcontracted`}
        titleTop="All of it"
        titleSign="in one shop."
        lede="Six disciplines, one crew. We do not subcontract fabrication or installation, which is why we can quote a real number and hold it."
        action={{ href: "/contact", label: "Get a quote", labelAlt: "Describe the building" }}
        photo={photos.fabrication}
        caption="Welding bay / Altamont Avenue"
        metrics={[
          { v: <Counter to={services.length} />, k: "Disciplines in-house" },
          { v: "3 – 12 wks", k: "Typical lead time" },
          { v: <Counter to={85} suffix=" ft" />, k: "Owned lift reach" },
          { v: <Counter to={5} suffix=" yr" />, k: "LED warranty" },
        ]}
      />
      <TickerBand items={capabilities} tone="yellow" speed={48} size="sm" />
      <Disciplines />
      <Schedule />
      <ShopFloor />
      <Entry />
      <CtaBand
        kicker="Not sure which one"
        title="Tell us the problem."
        lede="You do not need to know whether you want channel letters or a monument sign. Describe the building and the road it sits on, and we will tell you what actually works."
      />
    </>
  );
}

function Disciplines() {
  return (
    <section id="disciplines" className="relative overflow-hidden bg-blue-deep py-20 text-paper sm:py-28">
      <div aria-hidden className="hero-grid absolute inset-0 opacity-[0.12]" />
      <div className="shell relative z-10">
        <div className="flex items-center gap-3">
          <StarMark className="h-2.5 w-2.5 text-yellow" />
          <span className="label text-paper/50">01 / What we make</span>
          <span data-reveal="draw" className="h-px flex-1 bg-paper/20" />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="display-wide text-[clamp(2.6rem,5.5vw,4.9rem)] leading-[0.93] tracking-[-0.035em] lg:col-span-8">
            <span data-reveal="rise" className="block"><span>Six disciplines,</span></span>
            <span data-reveal="rise" style={d(100)} className="block text-yellow"><span>one drawing set.</span></span>
          </h2>
          <p className="max-w-sm text-[1rem] leading-[1.55] text-paper/60 lg:col-span-3 lg:col-start-10 lg:pb-2">
            Pick the one that sounds like your building. If none of them do, the
            last one on the list is custom fabrication.
          </p>
        </div>

        <div className="mt-14">
          <ServiceBento services={services} />
        </div>
      </div>
    </section>
  );
}

/** The price-and-lead-time schedule, read like a shop-drawing sheet index. */
function Schedule() {
  return (
    <section id="schedule" className="shell py-20 sm:py-28">
      <Kicker index="02">Price and lead time</Kicker>

      <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
        <h2 className="display-wide text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.95] tracking-[-0.035em] lg:col-span-8">
          <span data-reveal="rise" className="block"><span>Real numbers,</span></span>
          <span data-reveal="rise" style={d(100)} className="block text-blue"><span>before you ask.</span></span>
        </h2>
        <p className="max-w-sm text-[1rem] leading-[1.55] text-fg-muted lg:col-span-3 lg:col-start-10 lg:pb-2">
          Starting prices for a typical single-face job, and the shop time once
          drawings are approved. Permitting runs alongside.
        </p>
      </div>

      {/* A hairline head rather than a slab: every row already carries its own
          rule, so a heavy top border reads as a bar sitting on the list. */}
      <ol className="mt-12 border-t border-ink">
        {services.map((service, index) => (
          <li key={service.slug} data-reveal="fade" style={d(index * 60)}>
            <Link
              href={`/services/${service.slug}`}
              className="schedule-row group relative grid items-center gap-x-5 gap-y-2 overflow-hidden border-b border-line px-5 py-5 sm:grid-cols-[3.5rem_minmax(0,1fr)_auto_13rem_2.5rem] sm:px-7 sm:py-6"
            >
              <span aria-hidden className="schedule-fill absolute inset-0 bg-yellow" />
              <span className="label relative z-10 text-fg-faint tnum">{service.index}</span>
              <span className="relative z-10">
                <span className="display block text-[clamp(1.3rem,2.4vw,1.95rem)] leading-tight">
                  {service.short}
                </span>
                <span className="label mt-2 block text-fg-faint">{service.kicker}</span>
              </span>
              <span className="relative z-10 sm:text-right">
                <span className="label block text-fg-faint">From</span>
                <span className="display mt-1.5 block text-[1.25rem] tnum">{service.from}</span>
              </span>
              <span className="relative z-10 sm:text-right">
                <span className="label block text-fg-faint">Shop time</span>
                <span className="spec mt-1.5 block text-fg">{service.leadTime}</span>
              </span>
              <span className="relative z-10 hidden justify-self-end sm:flex">
                {/* The arrow does not move on hover — only the ring fills. The
                    path is drawn x=2→14 so its ink is centred in the 16-unit
                    box rather than half a pixel left. */}
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1 ring-line transition-colors duration-500 group-hover:bg-ink group-hover:ring-ink">
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 transition-colors duration-500 group-hover:text-paper" aria-hidden>
                    <path d="M2 8h12M9.5 3.5 14 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <p className="label mt-7 flex items-center gap-2.5 text-fg-faint">
        <StarMark className="h-2.5 w-2.5 shrink-0 text-accent" />
        Permit fees and engineering are quoted separately, at cost
      </p>
    </section>
  );
}

function ShopFloor() {
  return (
    <section id="shop" className="shell pb-20 sm:pb-28">
      <Kicker index="03">In the shop</Kicker>

      <div className="mt-10 grid gap-5 lg:h-[42rem] lg:grid-cols-12 lg:grid-rows-[minmax(0,1fr)_minmax(0,1fr)]">
        <div data-pointer data-scroll-shift className="mechanism-grid group relative min-h-[30rem] overflow-hidden rounded-2xl lg:col-span-8 lg:row-span-2 lg:min-h-0">
          <Image
            src={photos.install.src}
            alt={photos.install.alt}
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="motion-image object-cover"
          />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-blue-deep/90 via-blue-deep/10 to-transparent" />
          <span aria-hidden className="focus-haze" />
          <span aria-hidden className="pointer-crosshair" />
          <span className="card-tag label absolute right-6 top-6 z-30 bg-yellow px-3 py-2.5 text-ink">Install / our crew</span>
          <div className="card-copy absolute inset-x-0 bottom-0 z-20 p-6 text-paper sm:p-9">
            <span className="label text-yellow">A sign shop that subcontracts is a broker</span>
            <h2 className="display-wide mt-4 max-w-[46rem] text-[clamp(2.2rem,4.4vw,3.9rem)] leading-[0.95]">
              We build the thing we drew.
            </h2>
          </div>
        </div>

        <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-yellow p-7 text-ink lg:col-span-4 lg:row-start-1">
          <span aria-hidden className="display-wide absolute -bottom-12 -right-8 text-[8rem] leading-none text-blue/12 transition-transform duration-700 group-hover:-translate-x-3 group-hover:-translate-y-3 group-hover:rotate-[-8deg]">
            {company.founded}
          </span>
          <div className="flex items-center justify-between">
            <span className="label">Every step, our payroll</span>
            <StarMark className="h-4 w-4 text-blue" />
          </div>
          <p className="headline relative z-10 mt-12 text-[clamp(1.4rem,2.3vw,2rem)] leading-[1.1]">
            The only reason we can stand behind a fixed price and a real date.
          </p>
        </article>

        <div className="grid grid-cols-2 gap-5 lg:col-span-4 lg:row-start-2 lg:min-h-0">
          <Figure photo={photos.shopFloor} ratio="auto" tint="none" rounded className="h-full" sizes="(min-width: 1024px) 17vw, 45vw" />
          <div className="flex h-full flex-col justify-between rounded-2xl bg-paper-2 p-5">
            <span className="label text-blue">On the floor</span>
            <ul className="space-y-1 text-[0.85rem] text-fg-muted">
              {capabilities.slice(0, 5).map((capability, index) => (
                <li key={capability} className="group/row flex items-center gap-2 overflow-hidden border-t border-line py-1.5">
                  <span className="h-1.5 w-1.5 shrink-0 bg-blue transition-[width] duration-500 group-hover/row:w-5" />
                  <span className="leading-tight transition-transform duration-500 group-hover/row:translate-x-1">{capability}</span>
                  <span className="label ml-auto shrink-0 text-fg-faint">0{index + 1}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <ul className="mt-10 grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((capability, index) => (
          <li
            key={capability}
            data-reveal="fade"
            style={d(index * 50)}
            className="flex items-start gap-2.5 rule-t pt-2.5"
          >
            <StarMark className="mt-[3px] h-2 w-2 shrink-0 text-blue" />
            <span className="text-[0.9rem] leading-snug text-fg-muted">{capability}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <Action href="/about" tone="solid">
          Meet the shop
        </Action>
      </div>
    </section>
  );
}

function Entry() {
  return (
    <section id="entry" className="border-y border-line bg-white py-20 sm:py-28">
      <div className="shell">
        <Kicker index="04">However you come in</Kicker>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-7">
          <h2 className="display-wide max-w-3xl text-[clamp(2.3rem,4.6vw,4rem)] leading-[0.95] tracking-[-0.035em]">
            <span data-reveal="rise" className="block"><span>Every job starts</span></span>
            <span data-reveal="rise" style={d(100)} className="block text-blue"><span>the same three ways.</span></span>
          </h2>
          <Action href="/process" tone="ghost">
            The whole process
          </Action>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-3">
          {processSteps.slice(0, 3).map((step, index) => (
            <article key={step.index} data-reveal="fade" style={d(index * 100)}>
              <div data-pointer className="mechanism-grid relative aspect-[3/2] overflow-hidden rounded-2xl bg-blue-mid">
                <Image
                  src={photos[stepPhoto[step.index]].src}
                  alt={photos[stepPhoto[step.index]].alt}
                  fill
                  sizes="(min-width: 640px) 30vw, 100vw"
                  className="motion-image object-cover"
                />
                <span aria-hidden className="absolute inset-0 bg-blue-deep/25 mix-blend-multiply" />
                <span className="display-wide absolute bottom-3 left-4 z-20 text-[3rem] leading-none text-yellow">
                  {step.index}
                </span>
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-3 border-t-2 border-ink pt-4">
                <h3 className="display text-[1.35rem]">{step.title}</h3>
                <span className="label text-fg-faint">{step.duration}</span>
              </div>
              <p className="mt-3 text-[0.92rem] leading-[1.55] text-fg-muted">{step.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
