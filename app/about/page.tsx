import type { Metadata } from "next";

import { Counter } from "@/components/counter";
import { CtaBand } from "@/components/cta-band";
import { TickerBand } from "@/components/marquee";
import { MotionEngine } from "@/components/motion-engine";
import { PageHero } from "@/components/page-hero";
import { SignPlate } from "@/components/sign-plate";
import { StarMark } from "@/components/star-mark";
import { Action, Kicker } from "@/components/ui";
import { VisualTestScroller } from "@/components/visual-test-scroller";
import { capabilities, company, stats, team } from "@/lib/content";
import { photos } from "@/lib/photos";
import { d } from "@/lib/util";

export const metadata: Metadata = {
  title: "About",
  description:
    "Star Signs is a sign fabrication shop in Scott's Addition, Richmond. Founded 1998. We survey, draw, permit, weld, wire, hang and service our own work.",
};

export default function AboutPage() {
  return (
    <>
      <MotionEngine />
      <VisualTestScroller />
      <PageHero
        chip="The shop"
        meta={`Est. ${company.founded} / ${company.address.line2}`}
        titleTop="A shop on"
        titleSign="Altamont Ave."
        lede="Twenty-seven years, one building, one crew. We have never subcontracted a fabrication or an installation, and we are not going to start."
        action={{ href: "/contact", label: "Arrange a visit", labelAlt: "Come and see it" }}
        photo={photos.shopFloor}
        caption={`${company.address.line1} / since 2006`}
        metrics={[
          { v: company.founded.toString(), k: "Founded" },
          { v: <Counter to={19} />, k: "People on payroll" },
          { v: <Counter to={0} />, k: "Jobs subcontracted" },
          { v: "Class A", k: "VA contractor licence" },
        ]}
      />
      <TickerBand items={capabilities} tone="yellow" speed={46} size="sm" />
      <Story />
      <Numbers />
      <People />
      <Principles />
      <Visit />
      <CtaBand />
    </>
  );
}

function Story() {
  return (
    <section id="story" className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
      <div className="shell">
        <Kicker index="01">How it started</Kicker>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6">
            {/* Narrower clamp than the full-width heads: this one sits in a
                six-column measure and would otherwise run to four lines. */}
            <h2 className="display-wide text-[clamp(2.1rem,3.9vw,3.4rem)] leading-[0.96] tracking-[-0.035em]">
              <span data-reveal="rise" className="block"><span>From a rented bay</span></span>
              <span data-reveal="rise" style={d(100)} className="block text-blue"><span>to a working shop.</span></span>
            </h2>

            <div className="mt-9 space-y-5 text-[1.05rem] leading-[1.65] text-fg-muted">
              <p data-reveal="fade" className="measure-wide border-l-2 border-blue pl-4">
                Marcus Bell started bending glass in a rented bay off Broad
                Street in {company.founded}, mostly repairing other people&apos;s
                neon. The repair work taught him something useful: almost every
                sign that failed early failed for the same handful of reasons,
                and none of them were about the design.
              </p>
              <p data-reveal="fade" style={d(120)} className="measure-wide">
                Water got into a badly drained can. A transformer cooked itself
                in a sealed raceway. Anchors went into brick face instead of
                mortar joint. Somebody guessed at the wall construction and was
                wrong. These are not aesthetic problems. They are the reason we
                fabricate and install everything ourselves.
              </p>
              <p data-reveal="fade" style={d(240)} className="measure-wide">
                The shop moved to Altamont Avenue in 2006 and has grown into
                aluminium fabrication, a paint booth, CNC routing, large-format
                print and a lift fleet — but the glass bench is still in the
                back, and Marcus is still on it.
              </p>
            </div>

            <div data-reveal="fade" style={d(340)} className="mt-10 flex flex-wrap gap-3">
              <Action href="/work" tone="solid">See the work</Action>
              <Action href="/process" tone="ghost">How we work</Action>
            </div>
          </div>

          <div className="relative lg:col-span-5 lg:col-start-8 lg:pt-3">
            <div data-reveal="fade" style={d(160)} className="group/plate-wrap">
              <SignPlate
                wordmark="STAR"
                form="blade"
                accent="yellow"
                ratio="4/5"
                sheet="SH. 00 / OUR OWN SIGN"
                note="HAND-BENT, 1998. STILL LIT."
                width={'34"'}
                height={'28"'}
              />
            </div>
            <div className="absolute -bottom-5 -left-3 z-30 max-w-[13rem] bg-yellow px-4 py-3 shadow-[6px_6px_0_var(--blue)] sm:-left-5">
              <span className="label leading-[1.35]">
                The first sign he built<br />was his own.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Numbers() {
  const skins = [
    "bg-blue-deep text-paper",
    "bg-yellow text-ink",
    "bg-blue text-paper",
    "bg-ink text-paper",
  ];

  return (
    <section id="numbers" className="overflow-hidden bg-paper pb-20 sm:pb-28">
      <div className="shell">
        <div className="grid gap-7 border-t-4 border-ink pt-7 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <StarMark className="h-3 w-3 text-blue" />
              <span className="label text-ink/55">02 / The numbers on the shop wall</span>
            </div>
            <h2 className="display-wide mt-6 text-[clamp(2.4rem,4.8vw,4.3rem)] leading-[0.93] tracking-[-0.035em]">
              Measured in work,<br /><span className="text-blue">not adjectives.</span>
            </h2>
          </div>
          <p className="max-w-md text-[1rem] leading-[1.6] text-fg-muted lg:col-span-4 lg:col-start-9">
            Years on the floor, finished signs, permits cleared and the window
            for getting a dark sign lit again. Nothing here we cannot show you.
          </p>
        </div>

        <div className="number-board mt-12 grid gap-px bg-ink sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <article
              key={stat.label}
              className={`number-tile group relative isolate flex min-h-[19rem] flex-col overflow-hidden p-6 sm:p-7 ${skins[index]}`}
            >
              <span aria-hidden className="display-wide absolute -right-3 -top-7 -z-10 text-[8.5rem] leading-none opacity-[0.08]">
                0{index + 1}
              </span>
              <div className="flex items-center justify-between border-b border-current/20 pb-4">
                <span className="label">Shop record / 0{index + 1}</span>
                <span aria-hidden className="h-2.5 w-2.5 bg-current opacity-60" />
              </div>
              <p className={`display-wide mt-auto text-[clamp(3.1rem,5vw,5.2rem)] leading-none ${index === 1 ? "text-blue-deep" : "text-yellow"}`}>
                <Counter to={stat.value} suffix={stat.suffix} />
              </p>
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

function People() {
  return (
    <section id="people" className="relative overflow-hidden bg-blue-deep py-20 text-paper sm:py-28">
      <div aria-hidden className="hero-grid absolute inset-0 opacity-[0.12]" />
      <div className="shell relative z-10">
        <div className="flex items-center gap-3">
          <StarMark className="h-2.5 w-2.5 text-yellow" />
          <span className="label text-paper/50">03 / Who you deal with</span>
          <span data-reveal="draw" className="h-px flex-1 bg-paper/20" />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="display-wide text-[clamp(2.5rem,5.2vw,4.6rem)] leading-[0.94] tracking-[-0.035em] lg:col-span-8">
            <span data-reveal="rise" className="block"><span>No account</span></span>
            <span data-reveal="rise" style={d(100)} className="block text-yellow"><span>managers.</span></span>
          </h2>
          <p className="max-w-sm text-[1rem] leading-[1.55] text-paper/60 lg:col-span-3 lg:col-start-10 lg:pb-2">
            You talk to the person doing the work. Whoever surveyed your wall is
            the one who draws it, and is on site when it goes up.
          </p>
        </div>

        <ul className="mt-14 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((person, index) => (
            <li key={person.name}>
              <div data-pointer className="mechanism-grid group relative aspect-[4/5] overflow-hidden bg-blue-mid">
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-70"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, rgb(255 255 255 / 0.07) 0 1px, transparent 1px 22px), repeating-linear-gradient(90deg, rgb(255 255 255 / 0.07) 0 1px, transparent 1px 22px)",
                  }}
                />
                <span aria-hidden className="focus-haze" />
                <span className="absolute inset-0 z-20 grid place-items-center">
                  <span className="display-wide text-[clamp(2.75rem,7vw,4rem)] text-yellow transition-transform duration-[620ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2">
                    {person.initials}
                  </span>
                </span>
                <span className="label absolute bottom-4 left-4 z-20 bg-paper px-2.5 py-1.5 text-ink">
                  Since {person.since}
                </span>
                <span className="label absolute right-4 top-4 z-20 text-paper/45 tnum">
                  0{index + 1}
                </span>
              </div>
              <h3 className="display mt-5 border-t-2 border-paper/25 pt-4 text-[1.2rem]">{person.name}</h3>
              <p className="label mt-2 text-yellow">{person.role}</p>
              <p className="mt-3 text-[0.92rem] leading-[1.5] text-paper/60">{person.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Principles() {
  const principles = [
    {
      title: "Tell you no early",
      copy: "If your idea will not clear the ordinance, you hear it at the survey — not after you have approved a rendering and paid for engineering.",
    },
    {
      title: "Quote the whole thing",
      copy: "Permits, engineering, footings, lifts, patching and disposal are in the number. We would rather lose on price than surprise you at invoice.",
    },
    {
      title: "Overbuild what nobody sees",
      copy: "Welded returns instead of riveted. Drained cans. Marine hardware near salt. It costs us margin and saves you a service call in year six.",
    },
    {
      title: "Say when repair beats replacement",
      copy: "A good portion of our service work ends with us recommending the cheaper option, including when the cheaper option is not us.",
    },
  ];

  return (
    <section id="principles" className="border-b border-line bg-white py-20 sm:py-28">
      <div className="shell">
        <Kicker index="04">How we do it</Kicker>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="display-wide text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.95] tracking-[-0.035em] lg:col-span-8">
            <span data-reveal="rise" className="block"><span>Four rules</span></span>
            <span data-reveal="rise" style={d(100)} className="block text-blue"><span>that cost us money.</span></span>
          </h2>
          <p className="max-w-sm text-[1rem] leading-[1.55] text-fg-muted lg:col-span-3 lg:col-start-10 lg:pb-2">
            Every one of these has lost us a job at some point. We keep them
            because the alternative is a sign that fails in year six.
          </p>
        </div>

        <ol className="mt-12 border-t-4 border-ink">
          {principles.map((principle, index) => (
            <li
              key={principle.title}
              data-reveal="fade"
              style={d(index * 80)}
              className="group/row grid gap-4 overflow-hidden border-b border-line py-7 lg:grid-cols-12 lg:gap-8"
            >
              <div className="flex items-baseline gap-4 lg:col-span-5">
                <span className="label text-fg-faint tnum transition-colors duration-500 group-hover/row:text-blue">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="display text-[clamp(1.25rem,2.6vw,1.9rem)] transition-transform duration-500 group-hover/row:translate-x-1">
                  {principle.title}
                </h3>
              </div>
              <p className="measure-wide text-[1rem] leading-[1.6] text-fg-muted lg:col-span-6 lg:col-start-7">
                {principle.copy}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section id="visit" className="relative overflow-hidden bg-blue py-20 text-paper sm:py-28">
      <div aria-hidden className="hero-grid absolute inset-0 opacity-[0.14]" />
      <div className="shell relative z-10">
        <div className="flex items-center gap-3">
          <StarMark className="h-2.5 w-2.5 text-yellow" />
          <span className="label text-paper/55">05 / Open door</span>
          <span data-reveal="draw" className="h-px flex-1 bg-paper/20" />
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <h2 className="display-wide text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.94] tracking-[-0.035em]">
              <span data-reveal="rise" className="block"><span>Come and see it</span></span>
              <span data-reveal="rise" style={d(100)} className="block text-yellow"><span>being made.</span></span>
            </h2>
            <p data-reveal="fade" style={d(180)} className="measure-wide mt-8 border-l-2 border-yellow pl-4 text-[1.05rem] leading-[1.6] text-paper/70">
              We are happy to show anyone around the shop. It is the fastest way
              to understand why a welded can costs more than a riveted one.
            </p>
            <div className="mt-9">
              <Action href="/contact" tone="yellow">Arrange a visit</Action>
            </div>
          </div>

          <dl className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:col-span-5 lg:col-start-8">
            <div className="border-t border-paper/25 pt-4">
              <dt className="label text-yellow">Shop</dt>
              <dd className="spec mt-3 not-italic leading-relaxed text-paper/75">
                <address className="not-italic">
                  {company.address.line1}
                  <br />
                  {company.address.line2}
                  <br />
                  {company.address.city}, {company.address.state} {company.address.zip}
                </address>
              </dd>
            </div>
            <div className="border-t border-paper/25 pt-4">
              <dt className="label text-yellow">Hours</dt>
              <dd className="mt-3 space-y-2">
                {company.hours.map((hour) => (
                  <span key={hour.days} className="spec flex justify-between gap-3 text-paper/75">
                    <span>{hour.days}</span>
                    <span className="tnum text-paper">{hour.time}</span>
                  </span>
                ))}
              </dd>
            </div>
            <div className="border-t border-paper/25 pt-4">
              <dt className="label text-yellow">Licence</dt>
              <dd className="spec mt-3 text-paper/75">{company.licence}</dd>
            </div>
            <div className="border-t border-paper/25 pt-4">
              <dt className="label text-yellow">Service area</dt>
              <dd className="spec mt-3 text-paper/75">{company.service_area}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
