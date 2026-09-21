import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SignPlate } from "@/components/sign-plate";
import { StarMark } from "@/components/star-mark";
import { CtaBand } from "@/components/cta-band";
import { ProjectCard } from "@/components/work-grid";
import { Action, Kicker, SpecTable, TextLink } from "@/components/ui";
import {
  getService,
  projectsForService,
  services,
} from "@/lib/content";
import { d } from "@/lib/util";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  props: PageProps<"/services/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
  };
}

export default async function ServiceDetailPage(
  props: PageProps<"/services/[slug]">,
) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) notFound();

  const related = projectsForService(slug);
  const idx = services.findIndex((s) => s.slug === slug);
  const next = services[(idx + 1) % services.length];

  return (
    <>
      {/* ---------- header ---------- */}
      <header className="shell pb-12 pt-32 sm:pt-40 lg:pt-48">
        <div className="flex flex-wrap items-center gap-3">
          <StarMark className="h-2.5 w-2.5 shrink-0 text-accent" />
          <TextLink href="/services" className="label text-fg-muted">
            Services
          </TextLink>
          <span className="label text-fg-faint">/</span>
          <span className="label text-fg-faint">{service.index}</span>
          <span data-reveal="draw" className="h-px flex-1 bg-line" aria-hidden />
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h1 className="display-wide text-[clamp(2.4rem,7vw,5.5rem)]">
              <span data-reveal="rise" className="block">
                <span>{service.title}</span>
              </span>
            </h1>
            <p className="label mt-6 text-fg-faint">{service.kicker}</p>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 lg:pt-3">
            <p
              data-reveal="fade"
              style={d(160)}
              className="measure-wide text-[1.05rem] leading-[1.55] text-fg-muted"
            >
              {service.summary}
            </p>
            <dl
              data-reveal="fade"
              style={d(280)}
              className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4"
            >
              <div className="rule-t pt-2.5">
                <dt className="label text-fg-faint">Starting at</dt>
                <dd className="display mt-2 text-[1.5rem] tnum">{service.from}</dd>
              </div>
              <div className="rule-t pt-2.5">
                <dt className="label text-fg-faint">Lead time</dt>
                <dd className="spec mt-2.5">{service.leadTime}</dd>
              </div>
            </dl>
            <div data-reveal="fade" style={d(380)} className="mt-8">
              <Action href="/contact" tone="solid">
                Get a quote
              </Action>
            </div>
          </div>
        </div>
      </header>

      {/* ---------- elevation ---------- */}
      <section className="shell pb-16">
        <div data-reveal="fade">
          <SignPlate
            wordmark={service.short.split(" ")[0].toUpperCase()}
            form={service.form}
            accent={service.accent}
            ratio="21/9"
            sheet={`SH. ${service.index} / TYPICAL ELEVATION`}
            note={service.kicker.toUpperCase()}
            width="TYPICAL"
          />
        </div>
        <p className="label mt-3 text-fg-faint">
          Hover the drawing to see it built
        </p>
      </section>

      {/* ---------- body + specs ---------- */}
      <section className="shell pb-20 sm:pb-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <Kicker index="01">The detail</Kicker>
            <div className="mt-8 space-y-6">
              {service.body.map((p, i) => (
                <p
                  key={i}
                  data-reveal="fade"
                  style={d(i * 110)}
                  className="measure-wide text-[1.05rem] leading-[1.65] text-fg-muted"
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-12">
              <Kicker index="02">What you get</Kicker>
              <ul className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {service.includes.map((inc, i) => (
                  <li
                    key={inc}
                    data-reveal="fade"
                    style={d(i * 70)}
                    className="flex items-start gap-2.5 rule-t pt-3"
                  >
                    <StarMark className="mt-[3px] h-2 w-2 shrink-0 text-blue" />
                    <span className="text-[0.93rem] leading-snug text-fg-muted">
                      {inc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:col-span-5 lg:col-start-8">
            <div className="lg:sticky lg:top-28">
              <Kicker index="03">Specification</Kicker>
              <SpecTable rows={service.specs} className="mt-7" />

              <div className="mt-8 rounded-2xl bg-paper-2 p-6">
                <p className="label text-fg-faint">Not sure about scope?</p>
                <p className="mt-3 text-[0.95rem] leading-[1.55] text-fg-muted">
                  Send a photograph of the building. We will tell you what the
                  ordinance allows before you spend anything.
                </p>
                <div className="mt-5">
                  <Action href="/contact" tone="ghost">
                    Ask us
                  </Action>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ---------- related work ---------- */}
      {related.length > 0 && (
        <section className="shell pb-20 sm:pb-28">
          <Kicker index="04">Built recently</Kicker>
          <div className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.slice(0, 3).map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* ---------- next service ---------- */}
      <section className="shell pb-20">
        <Link
          href={`/services/${next.slug}`}
          className="group relative block overflow-hidden rounded-2xl bg-paper-2 p-8 transition-colors duration-500 hover:bg-blue-deep sm:p-12"
        >
          <span className="label text-fg-faint transition-colors duration-500 group-hover:text-yellow">
            Next — {next.index}
          </span>
          <span className="mt-4 flex flex-wrap items-center justify-between gap-6">
            <span className="display text-[clamp(1.6rem,4vw,3rem)] transition-[color,transform] duration-[620ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:text-paper">
              {next.title}
            </span>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full ring-1 ring-line transition-colors duration-500 group-hover:bg-yellow group-hover:ring-yellow">
              <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1">
                <path d="M1 8h13M9.5 3.5 14 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </span>
          </span>
        </Link>
      </section>

      <CtaBand />
    </>
  );
}
