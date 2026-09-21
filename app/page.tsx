import Image from "next/image";
import Link from "next/link";

import { CtaBand } from "@/components/cta-band";
import { Counter } from "@/components/counter";
import { Figure } from "@/components/figure";
import { MotionEngine } from "@/components/motion-engine";
import { TickerBand } from "@/components/marquee";
import { ServiceBento } from "@/components/service-bento";
import { StarMark } from "@/components/star-mark";
import { TestimonialRail } from "@/components/testimonials";
import { Action, ConveyorArrow, Kicker } from "@/components/ui";
import { ProjectCard } from "@/components/work-grid";
import { VisualTestScroller } from "@/components/visual-test-scroller";
import {
  company,
  processSteps,
  projects,
  services,
  stats,
  testimonials,
  ticker,
} from "@/lib/content";
import { photos, stepPhoto } from "@/lib/photos";
import { d } from "@/lib/util";

const featured = projects.filter((project) => project.featured).slice(0, 3);

export default function HomePage() {
  return (
    <>
      <MotionEngine />
      <VisualTestScroller />
      <Hero />
      <TickerBand items={ticker} tone="yellow" speed={52} size="sm" />
      <Positioning />
      <Services />
      <ShopStory />
      <FeaturedWork />
      <Numbers />
      <Process />
      <Voices />
      <CtaBand
        kicker="Your wall is waiting"
        title="Let's make it unmissable."
        lede="Send us the address and one photograph. We will tell you what the code allows, what the work costs and how long it takes before you commit to a thing."
      />
    </>
  );
}

function Hero() {
  return (
    <section className="group/hero relative isolate overflow-hidden border-b border-line bg-paper pt-24 sm:pt-28 lg:h-[calc(100svh-2rem)]">
      <div aria-hidden className="absolute bottom-24 right-0 top-36 hidden w-[43%] bg-blue lg:block">
        <span className="hero-grid absolute inset-0 opacity-35" />
        <span className="absolute inset-y-0 left-0 w-2 bg-yellow" />
      </div>

      <div className="shell relative grid gap-x-8 gap-y-10 pb-8 lg:h-full lg:grid-cols-12 lg:grid-rows-[minmax(0,1fr)_auto] lg:pb-5">
        <div className="relative z-20 self-center pt-9 lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:py-16">
          <div data-reveal="fade" className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="label bg-blue px-3 py-2 text-paper">Commercial sign makers</span>
            <span className="h-px w-7 bg-blue" />
            <span className="label text-fg-muted">Richmond, VA / Est. {company.founded}</span>
          </div>

          <h1 className="display-wide mt-9 text-[clamp(3.65rem,7.4vw,6.85rem)] leading-[0.86] tracking-[-0.05em]">
            <span data-reveal="rise" className="block"><span>Built</span></span>
            <span
              data-reveal="rise"
              style={d(90)}
              className="hero-sign-face relative z-20 mt-2 block w-fit rotate-[-1deg] bg-blue px-[0.17em] pb-[0.1em] pt-[0.02em] text-paper shadow-[0.11em_0.11em_0_var(--yellow)]"
            >
              <span className="whitespace-nowrap">to be seen.</span>
            </span>
          </h1>

          <div className="mt-12 grid max-w-[42rem] gap-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end lg:mt-14">
            <p data-reveal="fade" style={d(220)} className="max-w-[31rem] border-l-2 border-blue pl-4 text-[clamp(1rem,1.4vw,1.15rem)] leading-[1.6] text-fg-muted">
              We survey, design, permit, fabricate and install commercial signs
              that turn ordinary buildings into landmarks.
            </p>
            <Link
              href="/contact"
              data-reveal="fade"
              data-magnetic
              style={d(320)}
              className="signal-button group relative inline-flex w-fit items-center gap-4 overflow-hidden bg-yellow px-5 py-3.5 text-ink shadow-[5px_5px_0_var(--blue)] [--signal-sheen:var(--sheen-bright)]"
            >
              <span className="h-[1.1rem] overflow-hidden">
                <span className="signal-label-track flex flex-col">
                  <span className="label h-[1.1rem]">Start a project</span>
                  <span className="label h-[1.1rem]">Tell us where</span>
                </span>
              </span>
              <ConveyorArrow />
            </Link>
          </div>
        </div>

        <figure data-pointer data-scroll-shift className="mechanism-grid relative z-10 min-h-[29rem] bg-blue p-3 pb-10 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:my-3 lg:h-[min(56vh,35rem)] lg:min-h-0 lg:self-center lg:p-4 lg:pb-4">
          <span aria-hidden className="absolute -bottom-3 -left-3 h-full w-full bg-yellow lg:-bottom-4 lg:-left-4" />
          <div className="relative h-full min-h-[26rem] overflow-hidden [clip-path:polygon(0_0,100%_0,100%_91%,91%_100%,0_100%)]">
            <Image
              src="/photos/hero-installation.png"
              alt="A sign installer mounting illuminated channel letters on a brick storefront at dusk"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="motion-image object-cover object-[63%_center] saturate-[0.92] contrast-[1.03]"
            />
            <span aria-hidden className="absolute inset-0 bg-blue-deep/10 mix-blend-multiply" />
            <span aria-hidden className="pointer-crosshair" />
          </div>
          <figcaption className="absolute bottom-2 left-6 z-10 flex items-center gap-3 bg-paper px-4 py-3 text-ink shadow-[4px_4px_0_var(--blue)] lg:-bottom-4 lg:left-auto lg:right-8">
            <StarMark className="h-3 w-3 text-blue" />
            <span className="label">Field installation / Richmond, VA</span>
          </figcaption>
          <span aria-hidden className="absolute -right-1 top-10 z-20 h-px w-10 bg-yellow lg:-right-5" />
          <span aria-hidden className="absolute -right-1 top-[2.3rem] z-20 h-2 w-px bg-yellow lg:-right-5" />
        </figure>

        <dl data-reveal="fade" style={d(420)} className="relative z-20 grid grid-cols-2 border-t-4 border-blue bg-paper lg:col-span-12 lg:row-start-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`metric-cell ${index % 2 === 1 ? "border-l border-line pl-4" : "pr-4"} ${index >= 2 ? "border-t border-line" : ""} py-4 sm:py-5 lg:border-t-0 lg:pr-4 lg:pl-6 lg:first:pl-0 ${index > 0 ? "lg:border-l" : "lg:border-l-0"}`}
            >
              <dt className="display-wide text-[clamp(1.7rem,2.8vw,2.45rem)] leading-none text-blue"><Counter to={stat.value} suffix={stat.suffix} /></dt>
              <dd className="label mt-2 text-fg-muted">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Positioning() {
  const promises = [
    { number: "01", tag: "Under one roof", title: "One shop", copy: "Survey, engineering, fabrication, paint, install and service all happen under our roof." },
    { number: "02", tag: "We file it", title: "Permits owned", copy: "We file the package, answer corrections and attend the hearing. You never go to city hall." },
    { number: "03", tag: "Serviceable", title: "Built for decades", copy: "Welded aluminum, serviceable LEDs and finishes selected for your exact exposure." },
  ];
  const promiseSkins = [
    "bg-blue text-paper shadow-[8px_8px_0_var(--yellow)]",
    "bg-yellow text-ink shadow-[8px_8px_0_var(--blue)]",
    "bg-ink text-paper shadow-[8px_8px_0_var(--blue)]",
  ];

  return (
    <section id="why" className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
      <div className="shell">
        <Kicker index="01">Why Star Signs</Kicker>
        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6">
            <h2 className="display-wide text-[clamp(2.6rem,5.5vw,4.9rem)] leading-[0.95] tracking-[-0.035em]">
              <span data-reveal="rise" className="block"><span>From blank wall</span></span>
              <span data-reveal="rise" style={d(100)} className="block text-blue"><span>to local landmark.</span></span>
            </h2>
            <div className="mt-9 grid gap-6 sm:grid-cols-2 sm:items-end">
              <p className="max-w-[34rem] text-[1.05rem] leading-[1.62] text-fg-muted">
                Good signage is not decoration. It is architecture, advertising
                and wayfinding working at the same time. We manage the entire job
                so the idea that gets approved is the one that gets installed.
              </p>
              <div className="sm:justify-self-end"><Action href="/process" tone="solid">See how we work</Action></div>
            </div>
          </div>

          <div className="relative lg:col-span-5 lg:col-start-8 lg:pt-3">
            <div data-reveal="wipe" data-pointer data-scroll-shift className="landmark-stage relative aspect-[4/5] overflow-hidden bg-blue-deep">
              <Image src={photos.localLandmark.src} alt={photos.localLandmark.alt} fill sizes="(min-width: 1024px) 42vw, 100vw" className="motion-image object-cover" />
              <span aria-hidden className="focus-haze" />
              <span aria-hidden className="landmark-frame" />
              <div className="absolute left-5 top-5 z-20 flex flex-col items-start gap-2 text-paper">
                <span className="label bg-blue-deep/80 px-3 py-2 backdrop-blur-sm">Finished / Blue hour</span>
                <span className="label flex items-center gap-2 bg-yellow px-3 py-2 text-ink"><StarMark className="h-2.5 w-2.5" /> Richmond, VA</span>
              </div>
              <div className="landmark-caption absolute bottom-5 right-5 z-20 max-w-[13rem] border-l-2 border-yellow bg-blue-deep/90 px-4 py-3 text-paper backdrop-blur-sm">
                <span className="label text-yellow">Street read / 120 ft</span>
                <p className="mt-2 text-sm leading-snug text-paper/75">A blade sign for the sidewalk. A warm beacon for the block.</p>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-3 z-30 max-w-[12rem] bg-yellow px-4 py-3 shadow-[6px_6px_0_var(--blue)] sm:-left-5">
              <span className="label leading-[1.35]">Ordinary address.<br />Unmistakable place.</span>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {promises.map((promise, index) => (
            <article
              key={promise.number}
              data-reveal="fade"
              data-pointer
              style={d(index * 100)}
              className={`promise-card group relative isolate flex min-h-[19rem] flex-col overflow-hidden p-7 ${promiseSkins[index]}`}
            >
              <span aria-hidden className="display-wide absolute -right-4 -top-7 -z-10 text-[9rem] leading-none opacity-[0.09]">
                {promise.number}
              </span>
              {/* Status tag drops in from above, as on every other card. On
                  the yellow skin it inverts so it still reads. */}
              <span
                className={`card-tag label absolute right-6 top-6 z-20 px-3 py-2.5 ${
                  index === 1 ? "bg-ink text-yellow" : "bg-yellow text-ink"
                }`}
              >
                {promise.tag}
              </span>
              <div className="flex items-center justify-between border-b border-current/20 pb-4">
                <span className="label">Promise / {promise.number}</span>
              </div>
              <h3 className="display mt-8 text-[clamp(1.75rem,2.5vw,2.35rem)]">{promise.title}</h3>
              <div className="card-copy mt-auto">
                <PromiseGraphic index={index} />
                {/* The permit stamp rotates out past its box, so the copy needs
                    more clearance than the other two graphics would want. */}
                <p className={`mt-9 max-w-sm text-[0.95rem] leading-[1.55] ${index === 1 ? "text-ink/65" : "text-paper/68"}`}>{promise.copy}</p>
              </div>
              <span aria-hidden className={`absolute bottom-6 right-6 h-2 w-2 ${index === 1 ? "bg-blue" : "bg-yellow"}`} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PromiseGraphic({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg aria-hidden viewBox="0 0 104 48" className="promise-mechanism text-yellow">
        <path className="route-line" d="M3 8h22l12 16h28L77 8h24M3 40h22l12-16M101 40H77L65 24" />
        <rect className="route-node" x="44" y="16" width="16" height="16" fill="currentColor" />
        <circle cx="3" cy="8" r="3" fill="currentColor" /><circle cx="101" cy="8" r="3" fill="currentColor" />
        <circle cx="3" cy="40" r="3" fill="currentColor" /><circle cx="101" cy="40" r="3" fill="currentColor" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <span aria-hidden className="permit-stack">
        <span className="permit-sheet" /><span className="permit-sheet" />
        <span className="permit-stamp">APPROVED</span>
      </span>
    );
  }
  return <span aria-hidden className="gauge text-paper" />;
}

function Services() {
  return (
    <section id="services-overview" className="relative overflow-hidden bg-blue-deep py-20 text-paper sm:py-28">
      <div aria-hidden className="hero-grid absolute inset-0 opacity-[0.12]" />
      <div className="shell relative z-10">
        <div className="flex items-center gap-3">
          <StarMark className="h-2.5 w-2.5 text-yellow" />
          <span className="label text-paper/50">02 / What we make</span>
          <span data-reveal="draw" className="h-px flex-1 bg-paper/20" />
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="display-wide text-[clamp(2.7rem,5.8vw,5.1rem)] leading-[0.93] tracking-[-0.035em] lg:col-span-8">
            <span data-reveal="rise" className="block"><span>Sign systems</span></span>
            <span data-reveal="rise" style={d(100)} className="block text-yellow"><span>built to work.</span></span>
          </h2>
          <p className="max-w-sm text-[1rem] leading-[1.55] text-paper/60 lg:col-span-3 lg:col-start-10 lg:pb-2">Six fabrication disciplines. One accountable team from drawing set to switch-on.</p>
        </div>
        <div className="mt-14">
          <ServiceBento services={services} />
        </div>
        <div className="mt-14 flex justify-end"><Action href="/services" tone="yellow">Explore every service</Action></div>
      </div>
    </section>
  );
}

function ShopStory() {
  return (
    <section id="shop" className="shell py-20 sm:py-28 lg:py-36">
      <Kicker index="03">Made on Altamont Avenue</Kicker>
      <div className="mt-10 grid gap-5 lg:h-[42rem] lg:grid-cols-12 lg:grid-rows-[minmax(0,1fr)_minmax(0,1fr)]">
        <div data-pointer data-scroll-shift className="mechanism-grid group relative min-h-[30rem] overflow-hidden rounded-2xl lg:col-span-8 lg:row-span-2 lg:min-h-0">
          <Image src={photos.fabrication.src} alt={photos.fabrication.alt} fill sizes="(min-width: 1024px) 66vw, 100vw" className="motion-image object-cover" />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-blue-deep/90 via-blue-deep/10 to-transparent" />
          <span aria-hidden className="focus-haze" />
          <span aria-hidden className="pointer-crosshair" />
          <span className="card-tag label absolute right-6 top-6 z-30 bg-yellow px-3 py-2.5 text-ink">Fabrication / live</span>
          <div className="card-copy absolute inset-x-0 bottom-0 z-20 p-6 text-paper sm:p-9">
            <span className="label text-yellow">Not an agency. A fabrication shop.</span>
            <h2 className="display-wide mt-4 max-w-[52rem] text-[clamp(2.4rem,4.8vw,4.25rem)] leading-[0.95]">Where the drawing becomes the thing.</h2>
          </div>
        </div>
        <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-yellow p-7 text-ink lg:col-span-4 lg:row-start-1">
          <span aria-hidden className="absolute -bottom-12 -right-8 display-wide text-[8rem] text-blue/12 transition-transform duration-700 group-hover:-translate-x-3 group-hover:-translate-y-3 group-hover:rotate-[-8deg]">27</span>
          <div className="flex items-center justify-between"><span className="label">27 years / Richmond</span><StarMark className="h-4 w-4 text-blue" /></div>
          <p className="headline mt-14 text-[clamp(1.5rem,2.5vw,2.25rem)] leading-[1.05]">Welded aluminum. Hand-bent glass. Matthews paint. No mystery subcontractor.</p>
        </article>
        <div className="grid grid-cols-2 gap-5 lg:col-span-4 lg:row-start-2 lg:min-h-0">
          <Figure photo={photos.shopFloor} ratio="auto" tint="none" rounded className="h-full" />
          <div className="flex h-full flex-col justify-between rounded-2xl bg-paper-2 p-5">
            <span className="label text-blue">The whole job</span>
            <ul className="space-y-1 text-[0.9rem] text-fg-muted">
              {["Survey", "Engineering", "Fabrication", "Installation"].map((item, index) => (
                <li key={item} className="group/row flex items-center gap-2 overflow-hidden border-t border-line py-1.5">
                  <span className="h-1.5 w-1.5 shrink-0 bg-blue transition-[width] duration-500 group-hover/row:w-6" />
                  <span className="transition-transform duration-500 group-hover/row:translate-x-1">{item}</span>
                  <span className="label ml-auto text-fg-faint">0{index + 1}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedWork() {
  return (
    <section id="featured-work" className="border-y border-line bg-white py-20 sm:py-28">
      <div className="shell">
        <Kicker index="04">Selected builds</Kicker>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-7">
          <h2 className="display-wide max-w-4xl text-[clamp(2.6rem,5.4vw,4.8rem)] leading-[0.95] tracking-[-0.035em]">
            <span data-reveal="rise" className="block"><span>On buildings</span></span>
            <span data-reveal="rise" style={d(100)} className="block text-blue"><span>right now.</span></span>
          </h2>
          <Action href="/work" tone="ghost">View every project</Action>
        </div>
        <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">{featured.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div>
      </div>
    </section>
  );
}

function Numbers() {
  const skins = [
    "bg-blue-deep text-paper",
    "bg-yellow text-ink",
    "bg-blue text-paper",
    "bg-paper text-ink",
  ];

  return (
    <section id="numbers" className="overflow-hidden bg-paper py-20 sm:py-28">
      <div className="shell">
        <div className="grid gap-7 border-t-4 border-ink pt-7 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3"><StarMark className="h-3 w-3 text-blue" /><span className="label text-ink/55">The numbers on the shop wall</span></div>
            <h2 className="display-wide mt-6 text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.93] tracking-[-0.035em]">Measured in work,<br /><span className="text-blue">not adjectives.</span></h2>
          </div>
          <p className="max-w-md text-[1rem] leading-[1.6] text-fg-muted lg:col-span-4 lg:col-start-9">A few figures we can actually stand behind: years on the floor, finished signs, permits cleared and the window for getting a dark sign lit again.</p>
        </div>

        <div className="number-board mt-12 grid gap-px bg-ink sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <article key={stat.label} className={`number-tile group relative isolate flex min-h-[19rem] flex-col overflow-hidden p-6 sm:p-7 ${skins[index]}`}>
              <span aria-hidden className="display-wide absolute -right-3 -top-7 -z-10 text-[8.5rem] leading-none opacity-[0.08]">0{index + 1}</span>
              <div className="flex items-center justify-between border-b border-current/20 pb-4">
                <span className="label">Shop record / 0{index + 1}</span>
                <span className="h-2.5 w-2.5 bg-current opacity-60" />
              </div>
              <p className={`display-wide mt-auto text-[clamp(3.1rem,5vw,5.2rem)] leading-none ${index === 1 || index === 3 ? "text-blue-deep" : "text-yellow"}`}><Counter to={stat.value} suffix={stat.suffix} /></p>
              <div className="mt-5 border-t border-current/20 pt-4">
                <h3 className="text-[1rem] font-semibold">{stat.label}</h3>
                <p className="label mt-2 opacity-55">{stat.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process-overview" className="relative overflow-hidden bg-blue-deep py-20 text-paper sm:py-28">
      <div className="shell">
        <div className="flex items-center gap-3"><StarMark className="h-2.5 w-2.5 text-yellow" /><span className="label text-paper/50">05 / Six moves, no handoffs</span><span data-reveal="draw" className="h-px flex-1 bg-paper/20" /></div>
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="display-wide text-[clamp(2.7rem,5.6vw,5rem)] leading-[0.94] tracking-[-0.035em] lg:col-span-8">
            <span data-reveal="rise" className="block"><span>From first look</span></span>
            <span data-reveal="rise" style={d(100)} className="block text-yellow"><span>to switch-on.</span></span>
          </h2>
          <p className="max-w-sm text-[1rem] leading-[1.55] text-paper/60 lg:col-span-3 lg:col-start-10">One team carries the same promise through every drawing, permit, weld and anchor.</p>
        </div>
        <ol className="no-scrollbar -mx-[var(--gutter)] mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-3">
          {processSteps.map((step, index) => (
            <li key={step.index} data-reveal="fade" style={d(index * 65)} className="process-card group w-[min(19rem,78vw)] shrink-0 snap-start">
              <div data-pointer className="mechanism-grid relative aspect-[4/5] overflow-hidden rounded-[0.75rem] bg-blue-mid">
                <Image src={photos[stepPhoto[step.index]].src} alt={photos[stepPhoto[step.index]].alt} fill sizes="19rem" className="process-photo object-cover" />
                <span aria-hidden className="absolute inset-0 bg-blue-deep/25 mix-blend-multiply" />
                <span className="process-index display-wide absolute bottom-4 left-5 text-[4rem] leading-none text-yellow">{step.index}</span>
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-3 border-t border-paper/20 pt-4"><h3 className="display text-[1.45rem]">{step.title}</h3><span className="label text-yellow">{step.duration}</span></div>
              <p className="mt-3 text-[0.9rem] leading-[1.55] text-paper/55">{step.summary}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex justify-end"><Action href="/process" tone="yellow">The full process</Action></div>
      </div>
    </section>
  );
}

function Voices() {
  return (
    <section id="reviews" className="relative overflow-hidden bg-blue py-20 text-paper sm:py-28">
      <div aria-hidden className="hero-grid absolute inset-0 opacity-[0.14]" />
      <div className="shell relative z-10">
        <div className="flex items-center gap-3"><StarMark className="h-2.5 w-2.5 text-yellow" /><span className="label text-paper/55">06 / Field reports</span><span data-reveal="draw" className="h-px flex-1 bg-paper/20" /></div>
        <div className="mb-12 mt-10 grid gap-7 lg:grid-cols-12 lg:items-end">
          <h2 className="display-wide text-[clamp(2.6rem,5.3vw,4.7rem)] leading-[0.95] tracking-[-0.035em] lg:col-span-8">
            <span data-reveal="rise" className="block"><span>Trusted by people</span></span>
            <span data-reveal="rise" style={d(100)} className="block text-yellow"><span>who have to open on time.</span></span>
          </h2>
          <p className="max-w-sm text-[1rem] leading-[1.55] text-paper/65 lg:col-span-3 lg:col-start-10">The useful reviews are about what happened after approval, after install and after the invoice was paid.</p>
        </div>
        <TestimonialRail items={testimonials} />
      </div>
    </section>
  );
}
