import type { Metadata } from "next";
import Image from "next/image";

import { Counter } from "@/components/counter";
import { CtaBand } from "@/components/cta-band";
import { Deliverable } from "@/components/deliverable";
import { TickerBand } from "@/components/marquee";
import { MotionEngine } from "@/components/motion-engine";
import { PageHero } from "@/components/page-hero";
import { StarMark } from "@/components/star-mark";
import { Action, Kicker } from "@/components/ui";
import { VisualTestScroller } from "@/components/visual-test-scroller";
import { company, processSteps } from "@/lib/content";
import { photos, stepPhoto } from "@/lib/photos";
import { d } from "@/lib/util";

export const metadata: Metadata = {
  title: "Process",
  description:
    "Survey, design, engineering, permitting, fabrication and installation — how a Star Signs project actually runs, and who owns each step.",
};

const permitTicker = [
  "WE FILE THE PERMIT",
  "WE TAKE THE CORRECTIONS",
  "WE ATTEND THE HEARING",
  "YOU NEVER GO TO CITY HALL",
];

export default function ProcessPage() {
  return (
    <>
      <MotionEngine />
      <VisualTestScroller />
      <PageHero
        chip="How a job runs"
        meta={`${processSteps.length} moves / no handoffs`}
        titleTop="Survey"
        titleSign="to service."
        lede="Six steps. We own all of them, including the one that derails most sign projects — permitting."
        action={{ href: "/contact", label: "Book a site survey", labelAlt: "It is free" }}
        photo={photos.drawing}
        caption="Drawing set / before anything is cut"
        metrics={[
          { v: <Counter to={processSteps.length} />, k: "Steps we own" },
          { v: "6 – 14 wks", k: "Typical duration" },
          { v: <Counter to={2} />, k: "Approvals from you" },
          { v: <Counter to={0} />, k: "Trips to city hall" },
        ]}
      />
      <TickerBand items={permitTicker} tone="yellow" speed={44} size="sm" />
      <StepMap />
      <Steps />
      <TickerBand items={permitTicker} tone="blue" speed={40} size="md" />
      <YourPart />
      <Afterwards />
      <CtaBand
        kicker="Step one"
        title="Book the survey."
        lede="It is free, it takes about an hour, and you get a written report with a code summary whether or not you go ahead with us."
      />
    </>
  );
}

/** A scannable map of the whole job that jumps to each step below. */
function StepMap() {
  return (
    <section id="map" className="shell py-20 sm:py-24">
      <Kicker index="01">The shape of it</Kicker>

      <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
        <h2 className="display-wide text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.95] tracking-[-0.035em] lg:col-span-8">
          <span data-reveal="rise" className="block"><span>Six moves,</span></span>
          <span data-reveal="rise" style={d(100)} className="block text-blue"><span>one accountable crew.</span></span>
        </h2>
        <p className="max-w-sm text-[1rem] leading-[1.55] text-fg-muted lg:col-span-3 lg:col-start-10 lg:pb-2">
          The whole job at a glance. Pick a step to read what happens in it and
          what you get at the end.
        </p>
      </div>

      <ol className="number-board mt-12 grid gap-px bg-ink sm:grid-cols-2 lg:grid-cols-3">
        {processSteps.map((step, index) => (
          <li key={step.index}>
            <a
              href={`#step-${step.index}`}
              className={`number-tile group relative isolate flex h-full min-h-[13rem] flex-col justify-between overflow-hidden p-6 sm:p-7 ${
                index % 2 === 0 ? "bg-paper text-ink" : "bg-blue-deep text-paper"
              }`}
            >
              <span aria-hidden className="display-wide absolute -right-3 -top-7 -z-10 text-[8rem] leading-none opacity-[0.08]">
                {step.index}
              </span>
              <div className="flex items-center justify-between border-b border-current/20 pb-4">
                <span className="label">Step / {step.index}</span>
                <span aria-hidden className={`h-2.5 w-2.5 ${index % 2 === 0 ? "bg-blue" : "bg-yellow"}`} />
              </div>
              <div className="mt-8">
                <h3 className="display text-[clamp(1.35rem,2.2vw,1.85rem)] leading-none">{step.title}</h3>
                <p className="label mt-3 opacity-60">{step.duration}</p>
              </div>
              <span
                aria-hidden
                className={`absolute bottom-6 right-6 flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-inset transition-transform duration-500 group-hover:translate-y-1 ${
                  index % 2 === 0 ? "ring-line" : "ring-paper/25"
                }`}
              >
                <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 rotate-90">
                  <path d="M1 8h13M9.5 3.5 14 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Steps() {
  return (
    <section id="steps" className="shell pb-20 sm:pb-28">
      <ol className="space-y-16 sm:space-y-24">
        {processSteps.map((step, index) => {
          const flip = index % 2 === 1;
          return (
            <li
              key={step.index}
              id={`step-${step.index}`}
              className="group scroll-mt-28 grid items-center gap-8 lg:grid-cols-12 lg:gap-10"
            >
              <figure
                data-pointer
                data-scroll-shift
                className={`mechanism-grid relative aspect-[16/10] overflow-hidden rounded-2xl bg-blue-mid lg:col-span-6 ${
                  flip ? "lg:order-2 lg:col-start-7" : ""
                }`}
              >
                <Image
                  src={photos[stepPhoto[step.index]].src}
                  alt={photos[stepPhoto[step.index]].alt}
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="motion-image object-cover"
                />
                <span aria-hidden className="absolute inset-0 bg-blue-deep/25 mix-blend-multiply" />
                <span aria-hidden className="focus-haze" />
                <span aria-hidden className="pointer-crosshair" />
                <span className="display-wide absolute bottom-4 left-5 z-20 text-[clamp(3.5rem,6vw,5.5rem)] leading-none text-yellow">
                  {step.index}
                </span>
                <figcaption className="label absolute right-5 top-5 z-20 bg-paper px-3 py-2 text-ink">
                  {step.duration}
                </figcaption>
              </figure>

              <div className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>
                <h2 className="display-wide text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[0.98] tracking-[-0.03em]">
                  <span data-reveal="rise" className="block">
                    <span>{step.title}</span>
                  </span>
                </h2>

                <p
                  data-reveal="fade"
                  style={d(120)}
                  className="measure-wide mt-5 text-[1rem] leading-[1.6] text-fg-muted"
                >
                  {step.summary}
                </p>

                <ul className="mt-7 border-t-2 border-ink">
                  {step.detail.map((line, j) => (
                    <li
                      key={j}
                      data-reveal="fade"
                      style={d(j * 70)}
                      className="group/row flex items-start gap-3.5 overflow-hidden border-b border-line py-3"
                    >
                      <span className="label shrink-0 pt-[3px] text-fg-faint tnum transition-colors duration-500 group-hover/row:text-blue">
                        {step.index}.{j + 1}
                      </span>
                      <span className="text-[0.92rem] leading-[1.5] text-fg-muted transition-transform duration-500 group-hover/row:translate-x-1">
                        {line}
                      </span>
                    </li>
                  ))}
                </ul>

                <div data-reveal="fade" style={d(220)}>
                  <Deliverable label={step.deliverable} note={step.deliverableNote} />
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function YourPart() {
  const asks = [
    {
      title: "Approve the rendering",
      copy: "Mounted on a photograph of your building. One round of revisions included.",
    },
    {
      title: "Approve the drawing",
      copy: "Check spelling, dimensions and colour call-outs. Twenty minutes, and it is what gets built.",
    },
    {
      title: "Name the landlord",
      copy: "A name and an email. We produce the approval package and chase it ourselves.",
    },
    {
      title: "Open up on install day",
      copy: "Someone to let the crew in and a space for the lift. Most installs take a few hours.",
    },
  ];
  const skins = [
    "bg-blue text-paper shadow-[8px_8px_0_var(--yellow)]",
    "bg-yellow text-ink shadow-[8px_8px_0_var(--blue)]",
    "bg-ink text-paper shadow-[8px_8px_0_var(--blue)]",
    "bg-blue-deep text-paper shadow-[8px_8px_0_var(--yellow)]",
  ];

  return (
    <section id="your-part" className="relative overflow-hidden bg-paper py-20 sm:py-28">
      <div className="shell">
        <Kicker index="07">Your part</Kicker>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="display-wide text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.95] tracking-[-0.035em] lg:col-span-8">
            <span data-reveal="rise" className="block"><span>Two approvals</span></span>
            <span data-reveal="rise" style={d(100)} className="block text-blue"><span>and a key.</span></span>
          </h2>
          <p className="max-w-sm text-[1rem] leading-[1.55] text-fg-muted lg:col-span-3 lg:col-start-10 lg:pb-2">
            That is genuinely the whole ask. Everything between those points is
            ours, including the parts that go wrong.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {asks.map((ask, index) => (
            <article
              key={ask.title}
              data-reveal="fade"
              data-pointer
              style={d(index * 90)}
              className={`promise-card group relative isolate flex min-h-[17rem] flex-col overflow-hidden p-6 ${skins[index]}`}
            >
              <span aria-hidden className="display-wide absolute -right-4 -top-7 -z-10 text-[8rem] leading-none opacity-[0.09]">
                0{index + 1}
              </span>
              <div className="flex items-center justify-between border-b border-current/20 pb-4">
                <span className="label">Ask / 0{index + 1}</span>
                <span aria-hidden className={`h-2 w-2 ${index === 1 ? "bg-blue" : "bg-yellow"}`} />
              </div>
              <h3 className="display mt-7 text-[clamp(1.2rem,1.8vw,1.55rem)] leading-[1.05]">{ask.title}</h3>
              <p className={`mt-auto pt-6 text-[0.9rem] leading-[1.5] ${index === 1 ? "text-ink/65" : "text-paper/68"}`}>
                {ask.copy}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12">
          <Action href="/contact" tone="solid">
            Book a site survey
          </Action>
        </div>
      </div>
    </section>
  );
}

function Afterwards() {
  const cover = [
    { v: <Counter to={5} suffix=" yr" />, k: "LED components", note: "Parts and modules" },
    { v: <Counter to={1} suffix=" yr" />, k: "Labour and installation", note: "Anything we hung" },
    { v: <Counter to={48} suffix="h" />, k: "Service response", note: "Anywhere in Virginia" },
    { v: "Next day", k: "Around Richmond", note: "Typical, not promised" },
  ];

  return (
    <section id="after" className="relative overflow-hidden bg-blue-deep py-20 text-paper sm:py-28">
      <div aria-hidden className="hero-grid absolute inset-0 opacity-[0.12]" />
      <div className="shell relative z-10">
        <div className="flex items-center gap-3">
          <StarMark className="h-2.5 w-2.5 text-yellow" />
          <span className="label text-paper/50">08 / After it is hung</span>
          <span data-reveal="draw" className="h-px flex-1 bg-paper/20" />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="display-wide text-[clamp(2.5rem,5.2vw,4.6rem)] leading-[0.94] tracking-[-0.035em] lg:col-span-8">
            <span data-reveal="rise" className="block"><span>We are still</span></span>
            <span data-reveal="rise" style={d(100)} className="block text-yellow"><span>on the hook.</span></span>
          </h2>
          <p className="max-w-sm text-[1rem] leading-[1.55] text-paper/60 lg:col-span-3 lg:col-start-10 lg:pb-2">
            Service area — {company.service_area}
          </p>
        </div>

        {/* No reveal: the board sits on a full-bleed navy band, so animating
            it in would leave that band on screen as an empty colour field. */}
        <div className="number-board mt-14 grid gap-px bg-ink sm:grid-cols-2 lg:grid-cols-4">
          {cover.map((item, index) => (
            <article
              key={item.k}
              className={`number-tile group relative isolate flex min-h-[17rem] flex-col overflow-hidden p-6 sm:p-7 ${
                index === 1 || index === 3 ? "bg-yellow text-ink" : "bg-blue text-paper"
              }`}
            >
              <span aria-hidden className="display-wide absolute -right-3 -top-7 -z-10 text-[8.5rem] leading-none opacity-[0.08]">
                0{index + 1}
              </span>
              <div className="flex items-center justify-between border-b border-current/20 pb-4">
                <span className="label">Cover / 0{index + 1}</span>
                <span aria-hidden className="h-2.5 w-2.5 bg-current opacity-60" />
              </div>
              <p className={`display-wide mt-auto text-[clamp(2.4rem,3.6vw,3.6rem)] leading-none tnum ${index === 1 || index === 3 ? "text-blue-deep" : "text-yellow"}`}>
                {item.v}
              </p>
              <div className="mt-5 border-t border-current/20 pt-4">
                <h3 className="text-[0.98rem] font-semibold leading-tight">{item.k}</h3>
                <p className="label mt-2 opacity-55">{item.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
