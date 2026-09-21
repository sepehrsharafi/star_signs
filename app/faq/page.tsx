import type { Metadata } from "next";

import { FaqAccordion } from "@/components/accordion";
import { Counter } from "@/components/counter";
import { CtaBand } from "@/components/cta-band";
import { TickerBand } from "@/components/marquee";
import { MotionEngine } from "@/components/motion-engine";
import { PageHero } from "@/components/page-hero";
import { StarMark } from "@/components/star-mark";
import { Action, Kicker } from "@/components/ui";
import { VisualTestScroller } from "@/components/visual-test-scroller";
import { company, faqGroups, stats } from "@/lib/content";
import { photos } from "@/lib/photos";
import { d } from "@/lib/util";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "What signs cost, how long they take, who files the permit, what the warranty covers and how fast we respond to a service call.",
};

const total = faqGroups.reduce((n, group) => n + group.items.length, 0);
const permits = stats.find((stat) => stat.label === "Permits cleared first pass");
const service = stats.find((stat) => stat.label === "Emergency service window");

/** Structured data so these answers can surface directly in search results. */
function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((g) =>
      g.items.map((i) => ({
        "@type": "Question",
        name: i.q,
        acceptedAnswer: { "@type": "Answer", text: i.a },
      })),
    ),
  };
}

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />

      <MotionEngine />
      <VisualTestScroller />
      <PageHero
        chip="Asked and answered"
        meta={`${total} questions / ${faqGroups.length} sections`}
        titleTop="Straight"
        titleSign="answers."
        lede="Including the ones that cost us money. If yours is not here, call the shop — you will get a person, not an intake queue."
        action={{ href: "#sections", label: "Jump to a section", labelAlt: `All ${total} answers` }}
        photo={photos.meeting}
        caption="No intake queue / you get a person"
        metrics={[
          { v: <Counter to={total} />, k: "Questions answered" },
          { v: <Counter to={faqGroups.length} />, k: "Sections" },
          {
            v: permits ? <Counter to={permits.value} suffix={permits.suffix} /> : "96%",
            k: "Permits cleared first pass",
          },
          {
            v: service ? <Counter to={service.value} suffix={service.suffix} /> : "48h",
            k: "Service response",
          },
        ]}
      />

      <TickerBand
        items={["FIXED PRICES", "NO INTAKE QUEUE", "WE FILE THE PERMIT", "48-HOUR SERVICE", "STRAIGHT ANSWERS"]}
        tone="yellow"
        speed={44}
        size="sm"
      />

      <SectionBoard />
      <Groups />
      <StillStuck />
      <CtaBand />
    </>
  );
}

/** The four sections as a board, each tile jumping to its questions. */
function SectionBoard() {
  return (
    <section id="sections" className="shell scroll-mt-24 py-20 sm:py-24">
      <Kicker index="01">Where to look</Kicker>

      <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
        <h2 className="display-wide text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.95] tracking-[-0.035em] lg:col-span-8">
          <span data-reveal="rise" className="block"><span>Four sections,</span></span>
          <span data-reveal="rise" style={d(100)} className="block text-blue"><span>no hedging.</span></span>
        </h2>
        <p className="max-w-sm text-[1rem] leading-[1.55] text-fg-muted lg:col-span-3 lg:col-start-10 lg:pb-2">
          Pick the one your question belongs to. If it spans two, start with
          cost — most of them really do.
        </p>
      </div>

      <nav aria-label="Question sections">
        <ol className="number-board mt-12 grid gap-px bg-ink sm:grid-cols-2 lg:grid-cols-4">
          {faqGroups.map((group, index) => (
            <li key={group.id}>
              <a
                href={`#${group.id}`}
                className={`number-tile group relative isolate flex h-full min-h-[15rem] flex-col justify-between overflow-hidden p-6 sm:p-7 ${
                  index % 2 === 0 ? "bg-blue text-paper" : "bg-paper text-ink"
                }`}
              >
                <span aria-hidden className="display-wide absolute -right-3 -top-7 -z-10 text-[8rem] leading-none opacity-[0.09]">
                  0{index + 1}
                </span>
                <div className="flex items-center justify-between border-b border-current/20 pb-4">
                  <span className="label">Section / 0{index + 1}</span>
                  <span className="label tnum opacity-60">{group.items.length}</span>
                </div>
                <div className="mt-7">
                  <h3 className="display text-[clamp(1.25rem,2vw,1.7rem)] leading-none">{group.title}</h3>
                  <p className={`mt-3 text-[0.88rem] leading-[1.45] ${index % 2 === 0 ? "text-paper/65" : "text-fg-muted"}`}>
                    {group.blurb}
                  </p>
                </div>
                <span
                  aria-hidden
                  className={`mt-6 flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-inset transition-transform duration-500 group-hover:translate-y-1 ${
                    index % 2 === 0 ? "ring-paper/30" : "ring-line"
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
      </nav>
    </section>
  );
}

function Groups() {
  return (
    <section className="border-y border-line bg-white py-20 sm:py-28">
      <div className="shell space-y-20 sm:space-y-28">
        {faqGroups.map((group, index) => (
          <div key={group.id} id={group.id} className="scroll-mt-28">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-3">
                <div className="lg:sticky lg:top-28">
                  <span aria-hidden className="display-wide block text-[clamp(3.5rem,6vw,5rem)] leading-none text-blue/15">
                    0{index + 1}
                  </span>
                  <h2 className="display-wide mt-3 text-[clamp(1.5rem,2.8vw,2.1rem)] leading-[0.98]">
                    <span data-reveal="rise" className="block">
                      <span>{group.title}</span>
                    </span>
                  </h2>
                  <p className="measure mt-4 border-l-2 border-blue pl-3.5 text-[0.93rem] leading-[1.5] text-fg-muted">
                    {group.blurb}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-8 lg:col-start-5">
                <FaqAccordion group={group} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StillStuck() {
  return (
    <section id="ask" className="relative overflow-hidden bg-blue py-20 text-paper sm:py-28">
      <div aria-hidden className="hero-grid absolute inset-0 opacity-[0.14]" />
      <div className="shell relative z-10">
        <div className="flex items-center gap-3">
          <StarMark className="h-2.5 w-2.5 text-yellow" />
          <span className="label text-paper/55">06 / Not covered here</span>
          <span data-reveal="draw" className="h-px flex-1 bg-paper/20" />
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h2 className="display-wide text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.94] tracking-[-0.035em]">
              <span data-reveal="rise" className="block"><span>Ask the actual</span></span>
              <span data-reveal="rise" style={d(100)} className="block text-yellow"><span>question.</span></span>
            </h2>
            <p data-reveal="fade" style={d(180)} className="measure-wide mt-8 border-l-2 border-yellow pl-4 text-[1.05rem] leading-[1.6] text-paper/70">
              Sign questions are usually specific to one building, one ordinance
              and one wall. We answer these ourselves, so the answer you get is
              about your wall rather than walls in general.
            </p>
          </div>

          <div data-reveal="fade" style={d(240)} className="flex flex-col justify-end gap-4 lg:col-span-4 lg:col-start-9">
            <Action href="/contact" tone="yellow">Send a question</Action>
            <a
              href={company.phoneHref}
              className="group relative flex items-center justify-between gap-4 overflow-hidden border border-paper/30 px-5 py-4"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-bottom scale-y-0 bg-paper transition-transform duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
              />
              <span className="label relative z-10 transition-colors duration-300 group-hover:text-ink">
                Call the shop
              </span>
              <span className="label relative z-10 tnum text-yellow transition-colors duration-300 group-hover:text-blue">
                {company.phone}
              </span>
            </a>
            <p className="label text-paper/50">
              {company.hours[0].days}, {company.hours[0].time}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
