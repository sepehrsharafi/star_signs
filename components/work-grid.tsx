"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SignPlate } from "./sign-plate";
import { StarMark } from "./star-mark";
import type { Project } from "@/lib/content";
import { d } from "@/lib/util";

/**
 * A project card: the elevation drawing, with the job sliding up over it on
 * hover. One treatment everywhere — the landing page and the work index share
 * this component, so the two cannot drift apart.
 */
function ProjectCard({
  project,
  index,
  size = "md",
}: {
  project: Project;
  index: number;
  size?: "sm" | "md" | "lg";
}) {
  const ratio = size === "lg" ? "16/11" : size === "sm" ? "4/3" : "3/2";

  return (
    <Link
      href={`/work/${project.slug}`}
      className="project-card group relative block"
      data-reveal="fade"
      style={d(index * 90)}
    >
      <div className="project-visual relative overflow-hidden bg-paper-2">
        <SignPlate
          wordmark={project.wordmark}
          form={project.form}
          accent={project.accent}
          ratio={ratio}
          sheet={`SH. ${String(index + 1).padStart(2, "0")}`}
          note={project.scope[0]?.toUpperCase()}
          width={project.year.toString()}
        />

        <div className="project-overlay absolute inset-0 z-40 flex flex-col justify-between bg-blue-deep/95 p-6 text-paper sm:p-7">
          <div className="flex items-center justify-between border-b border-paper/20 pb-4">
            <span className="label text-yellow">Built / {project.year}</span>
            <span className="flex h-10 w-10 items-center justify-center bg-yellow text-ink">
              <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden>
                <path d="M2 8h12M9.5 3.5 14 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </span>
          </div>
          <div>
            <p className="max-w-sm text-[0.95rem] leading-[1.5] text-paper/72">
              {project.summary}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.scope.slice(0, 2).map((scope) => (
                <li key={scope} className="label border border-paper/25 px-2.5 py-1.5 text-paper/75">
                  {scope}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t-2 border-ink pt-4">
        <h3 className="display text-[clamp(1.15rem,2vw,1.6rem)] leading-tight">
          {project.client}
        </h3>
        <span className="label ml-auto text-fg-faint tnum">{project.year}</span>
      </div>
      <p className="label mt-2 text-fg-faint">
        {project.location} — {project.sector}
      </p>
    </Link>
  );
}

/* ------------------------------------------------------------------ */

export function WorkGrid({
  projects,
  sectors,
}: {
  projects: Project[];
  sectors: string[];
}) {
  const [filter, setFilter] = useState("All");

  const shown = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.sector === filter),
    [filter, projects],
  );

  return (
    <>
      {/* filter — pills that fill, with a live count */}
      <div className="flex flex-wrap items-center gap-2 pb-10">
        {sectors.map((s) => {
          const on = s === filter;
          const n =
            s === "All"
              ? projects.length
              : projects.filter((p) => p.sector === s).length;
          return (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              aria-pressed={on}
              className={`group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full px-4 ring-1 ring-inset transition-colors duration-[420ms] ${
                on
                  ? "bg-ink text-paper ring-ink"
                  : "text-fg ring-line hover:ring-ink"
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute inset-0 origin-bottom bg-yellow transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  on ? "scale-y-0" : "scale-y-0 group-hover:scale-y-100"
                }`}
              />
              <span className="label relative z-10 flex items-center gap-2 leading-none transition-colors duration-300 group-hover:text-ink">
                {s}
                <span className="tnum opacity-45">{n}</span>
              </span>
            </button>
          );
        })}
        <span className="label ml-auto hidden items-center gap-2 text-fg-faint sm:flex">
          <StarMark className="h-2.5 w-2.5 text-accent" />
          {shown.length} {shown.length === 1 ? "project" : "projects"}
        </span>
      </div>

      <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>

      {shown.length === 0 && (
        <p className="spec py-20 text-center text-fg-muted">
          Nothing filed under {filter} yet.
        </p>
      )}
    </>
  );
}

export { ProjectCard };
