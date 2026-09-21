import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SignPlate } from "@/components/sign-plate";
import { StarMark } from "@/components/star-mark";
import { CtaBand } from "@/components/cta-band";
import { Action, Kicker, SpecTable, TextLink } from "@/components/ui";
import { getProject, getService, projects, testimonials } from "@/lib/content";
import { d } from "@/lib/util";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.client} — ${project.location}`,
    description: project.summary,
  };
}

export default async function ProjectPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];
  const quote = testimonials.find((t) => t.projectSlug === slug);

  return (
    <>
      {/* ---------- header ---------- */}
      <header className="shell pb-10 pt-32 sm:pt-40 lg:pt-48">
        <div className="flex flex-wrap items-center gap-3">
          <StarMark className="h-2.5 w-2.5 shrink-0 text-accent" />
          <TextLink href="/work" className="label text-fg-muted">
            Work
          </TextLink>
          <span className="label text-fg-faint">/</span>
          <span className="label text-fg-faint">{project.sector}</span>
          <span data-reveal="draw" className="h-px flex-1 bg-line" aria-hidden />
          <span className="label text-fg-faint tnum">{project.year}</span>
        </div>

        <h1 className="display-wide mt-8 text-[clamp(2.6rem,8.5vw,7rem)]">
          <span data-reveal="rise" className="block">
            <span>{project.client}</span>
          </span>
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <p
            data-reveal="fade"
            style={d(160)}
            className="measure-wide text-[1.1rem] leading-[1.5] text-fg-muted lg:col-span-6"
          >
            {project.summary}
          </p>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 lg:col-span-5 lg:col-start-8">
            <div className="rule-t pt-2.5">
              <dt className="label text-fg-faint">Location</dt>
              <dd className="spec mt-2">{project.location}</dd>
            </div>
            <div className="rule-t pt-2.5">
              <dt className="label text-fg-faint">Sector</dt>
              <dd className="spec mt-2">{project.sector}</dd>
            </div>
            <div className="col-span-2 rule-t pt-2.5">
              <dt className="label text-fg-faint">Scope</dt>
              <dd className="mt-2.5 flex flex-wrap gap-1.5">
                {project.scope.map((s) => (
                  <span
                    key={s}
                    className="label rounded-full px-3 py-1.5 ring-1 ring-line"
                  >
                    {s}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </header>

      {/* ---------- elevation ---------- */}
      <section className="shell pb-16">
        <div data-reveal="fade">
          <SignPlate
            wordmark={project.wordmark}
            form={project.form}
            accent={project.accent}
            ratio="2/1"
            sheet="SH. 01 / ELEVATION"
            note={project.scope[0]?.toUpperCase()}
            width={project.location.toUpperCase()}
          />
        </div>
      </section>

      {/* ---------- narrative ---------- */}
      <section className="shell pb-20 sm:pb-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Kicker index="01">The brief</Kicker>
            <p
              data-reveal="fade"
              className="measure-wide mt-7 text-[1.05rem] leading-[1.65] text-fg-muted"
            >
              {project.brief}
            </p>

            <div className="mt-14">
              <Kicker index="02">What we did</Kicker>
              <ol className="mt-8">
                {project.approach.map((a, i) => (
                  <li
                    key={i}
                    data-reveal="fade"
                    style={d(i * 90)}
                    className="flex gap-5 rule-t py-5"
                  >
                    <span className="label w-7 shrink-0 pt-1 text-fg-faint tnum">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="measure-wide text-[1rem] leading-[1.6] text-fg-muted">
                      {a}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-14">
              <Kicker index="03">Outcome</Kicker>
              <p
                data-reveal="fade"
                className="measure-wide mt-7 headline text-[clamp(1.25rem,2.4vw,1.75rem)] leading-[1.35]"
              >
                {project.outcome}
              </p>
            </div>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-28">
              <Kicker>Job facts</Kicker>
              <SpecTable rows={project.facts} className="mt-7" />

              <div className="mt-8">
                <p className="label text-fg-faint">Services used</p>
                <ul className="mt-4 space-y-2">
                  {project.serviceSlugs.map((sl) => {
                    const s = getService(sl);
                    if (!s) return null;
                    return (
                      <li key={sl}>
                        <TextLink
                          href={`/services/${sl}`}
                          className="text-[0.95rem] text-fg"
                        >
                          {s.title}
                        </TextLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ---------- client quote ---------- */}
      {quote && (
        <section className="relative overflow-hidden bg-blue-deep py-20 text-paper sm:py-28">
          <span className="grain-layer z-20" aria-hidden="true" />
          <div className="shell relative z-10">
            <StarMark className="h-5 w-5 text-yellow" />
            <blockquote className="mt-8">
              <p className="headline max-w-4xl text-[clamp(1.35rem,3.2vw,2.4rem)] leading-[1.25]">
                “{quote.quote}”
              </p>
            </blockquote>
            <div className="mt-9 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow text-ink">
                <span className="label text-[0.6rem]">{quote.initials}</span>
              </span>
              <span>
                <span className="block text-[0.95rem]">{quote.name}</span>
                <span className="label mt-1 block text-paper/50">
                  {quote.role}, {quote.company}
                </span>
              </span>
            </div>
          </div>
        </section>
      )}

      {/* ---------- next ---------- */}
      <section className="shell py-16">
        <Link
          href={`/work/${next.slug}`}
          className="group relative block overflow-hidden rounded-2xl bg-paper-2 p-8 transition-colors duration-500 hover:bg-ink sm:p-12"
        >
          <span className="label text-fg-faint transition-colors duration-500 group-hover:text-yellow">
            Next project
          </span>
          <span className="mt-4 flex flex-wrap items-center justify-between gap-6">
            <span className="display text-[clamp(1.7rem,4.5vw,3.25rem)] transition-[color,transform] duration-[620ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:text-paper">
              {next.client}
            </span>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full ring-1 ring-line transition-colors duration-500 group-hover:bg-yellow group-hover:ring-yellow">
              <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1">
                <path d="M1 8h13M9.5 3.5 14 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </span>
          </span>
          <span className="label mt-3 block text-fg-faint transition-colors duration-500 group-hover:text-paper/50">
            {next.location} — {next.year}
          </span>
        </Link>

        <div className="mt-8">
          <Action href="/work" tone="ghost">
            All projects
          </Action>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
