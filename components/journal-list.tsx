"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { StarMark } from "./star-mark";
import { formatDateShort, type Post } from "@/lib/content";
import { d } from "@/lib/util";

export function JournalList({
  posts,
  categories,
}: {
  posts: Post[];
  categories: string[];
}) {
  const [filter, setFilter] = useState("All");

  const shown = useMemo(
    () => (filter === "All" ? posts : posts.filter((p) => p.category === filter)),
    [filter, posts],
  );

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 pb-12">
        {categories.map((c) => {
          const on = c === filter;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={on}
              className={`group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full px-4 ring-1 ring-inset transition-colors duration-[420ms] ${
                on ? "bg-ink text-paper ring-ink" : "ring-line hover:ring-ink"
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute inset-0 origin-bottom bg-yellow transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  on ? "scale-y-0" : "scale-y-0 group-hover:scale-y-100"
                }`}
              />
              <span className="label relative z-10 leading-none transition-colors duration-300 group-hover:text-ink">
                {c}
              </span>
            </button>
          );
        })}
      </div>

      <ul className="rule-t">
        {shown.map((post, i) => (
          <li key={post.slug}>
            <Link
              href={`/journal/${post.slug}`}
              className="group relative block overflow-hidden rule-b"
              data-reveal="fade"
              style={d(i * 70)}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-left scale-x-0 bg-yellow transition-transform duration-[620ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />

              <span className="relative grid gap-x-8 gap-y-3 px-1 py-7 lg:grid-cols-12 lg:py-9">
                <span className="flex items-center gap-4 lg:col-span-3">
                  <span className="label text-fg-faint tnum">
                    {formatDateShort(post.date)}
                  </span>
                  <span className="label flex items-center gap-2 text-fg-faint">
                    <StarMark className="h-2 w-2 text-blue" />
                    {post.category}
                  </span>
                </span>

                <span className="lg:col-span-7">
                  <span className="headline block text-[clamp(1.2rem,2.5vw,1.85rem)] leading-[1.15] transition-transform duration-[620ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                    {post.title}
                  </span>
                  <span className="measure-wide mt-3 block text-[0.95rem] leading-[1.5] text-fg-muted transition-colors duration-500 group-hover:text-ink/70">
                    {post.excerpt}
                  </span>
                </span>

                <span className="flex items-center justify-between gap-4 lg:col-span-2 lg:justify-end">
                  <span className="label text-fg-faint tnum transition-colors duration-500 group-hover:text-ink/60">
                    {post.readingTime} min
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-1 ring-line transition-colors duration-500 group-hover:bg-ink group-hover:ring-ink">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className="h-3.5 w-3.5 transition-[transform,color] duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-45 group-hover:text-paper"
                    >
                      <path
                        d="M1 8h13M9.5 3.5 14 8l-4.5 4.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {shown.length === 0 && (
        <p className="spec py-20 text-center text-fg-muted">
          Nothing filed under {filter} yet.
        </p>
      )}
    </>
  );
}
