import type { Metadata } from "next";

import { QuoteForm } from "@/components/quote-form";
import { TickerBand } from "@/components/marquee";
import { Kicker } from "@/components/ui";
import { company, processSteps } from "@/lib/content";
import { d } from "@/lib/util";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a sign project, book a free site survey, or call for a service visit. Star Signs, Scott's Addition, Richmond, Virginia.",
};

export default function ContactPage() {
  return (
    <>
      {/* ---------- header ---------- */}
      <header className="relative overflow-hidden bg-blue-deep pb-16 pt-32 text-paper sm:pt-40 lg:pb-20 lg:pt-44">
        <span className="grain-layer z-20" aria-hidden="true" />
        <span
          aria-hidden="true"
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 8.3333%)",
          }}
        />

        <div className="shell relative z-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <h1 className="display-wide text-d1 lg:col-span-7">
              <span data-reveal="rise" className="block">
                <span>START A</span>
              </span>
              <span data-reveal="rise" style={d(110)} className="block">
                <span className="text-yellow">PROJECT</span>
              </span>
            </h1>

            <div className="lg:col-span-4 lg:col-start-9 lg:pt-3">
              <p
                data-reveal="fade"
                style={d(180)}
                className="measure-wide text-[1.05rem] leading-[1.55] text-paper/70"
              >
                The survey is free and there is no obligation attached to it.
                You get a written report with a code summary either way.
              </p>

              <dl
                data-reveal="fade"
                style={d(300)}
                className="mt-8 space-y-4"
              >
                <div className="rule-t border-paper/15 pt-3">
                  <dt className="label text-paper/40">Call the shop</dt>
                  <dd className="mt-2">
                    <a
                      href={company.phoneHref}
                      className="display text-[1.5rem] transition-colors hover:text-yellow"
                    >
                      {company.phone}
                    </a>
                  </dd>
                </div>
                <div className="rule-t border-paper/15 pt-3">
                  <dt className="label text-paper/40">Email</dt>
                  <dd className="spec mt-2">
                    <a
                      href={`mailto:${company.email}`}
                      className="transition-colors hover:text-yellow"
                    >
                      {company.email}
                    </a>
                  </dd>
                </div>
                <div className="rule-t border-paper/15 pt-3">
                  <dt className="label text-paper/40">Dark sign?</dt>
                  <dd className="spec mt-2 text-paper/70">
                    Call rather than email. 48-hour response statewide, usually
                    next day around Richmond.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </header>

      <TickerBand
        items={[
          "FREE SITE SURVEY",
          "FIXED QUOTE AFTER THE VISIT",
          "WE FILE THE PERMIT",
          "NO INTAKE QUEUE",
        ]}
        tone="yellow"
        speed={44}
      />

      {/* ---------- form ---------- */}
      <section className="shell py-20 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <QuoteForm />
          </div>

          <aside className="lg:col-span-3 lg:col-start-10">
            <div className="lg:sticky lg:top-28">
              <Kicker>What happens next</Kicker>
              <ol className="mt-7">
                {processSteps.slice(0, 3).map((s, i) => (
                  <li key={s.index} className="rule-t py-4">
                    <div className="flex items-baseline gap-3">
                      <span className="label text-fg-faint tnum">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="headline text-[1rem]">{s.title}</h3>
                    </div>
                    <p className="mt-2 pl-8 text-[0.88rem] leading-[1.5] text-fg-muted">
                      {s.summary}
                    </p>
                  </li>
                ))}
              </ol>

              <div className="mt-8 rounded-2xl bg-paper-2 p-6">
                <p className="label text-fg-faint">Shop</p>
                <address className="spec mt-3 not-italic leading-relaxed">
                  {company.address.line1}
                  <br />
                  {company.address.line2}
                  <br />
                  {company.address.city}, {company.address.state}{" "}
                  {company.address.zip}
                </address>
                <p className="label mt-5 text-fg-faint">Hours</p>
                <dl className="mt-3 space-y-2">
                  {company.hours.map((h) => (
                    <div key={h.days} className="spec flex justify-between gap-3">
                      <dt className="text-fg-muted">{h.days}</dt>
                      <dd className="tnum">{h.time}</dd>
                    </div>
                  ))}
                </dl>
                <p className="spec mt-5 text-fg-faint">{company.licence}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ---------- coverage ---------- */}
      <section className="shell pb-20 sm:pb-28">
        <div className="rounded-[1.75rem] bg-ink p-8 text-paper sm:p-12">
          <span className="label text-yellow">Service area</span>
          <p className="mt-6 headline max-w-4xl text-[clamp(1.2rem,2.8vw,2rem)] leading-[1.3]">
            {company.service_area}
          </p>
          <p className="spec mt-6 text-paper/50">
            Outside that? Ask anyway — we travel for the right job.
          </p>
        </div>
      </section>
    </>
  );
}
