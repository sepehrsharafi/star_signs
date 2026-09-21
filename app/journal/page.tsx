import type { Metadata } from "next";
import Link from "next/link";

import { Counter } from "@/components/counter";
import { CtaBand } from "@/components/cta-band";
import { JournalList } from "@/components/journal-list";
import { TickerBand } from "@/components/marquee";
import { MotionEngine } from "@/components/motion-engine";
import { PageHero } from "@/components/page-hero";
import { StarMark } from "@/components/star-mark";
import { Action, Kicker } from "@/components/ui";
import { VisualTestScroller } from "@/components/visual-test-scroller";
import { formatDate, postCategories, posts } from "@/lib/content";
import { photos } from "@/lib/photos";
import { d } from "@/lib/util";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes from a working sign shop — permitting costs, specification trade-offs, ADA rules people get wrong, and how to read a shop drawing.",
};

/* Derived once: the posts array is ordered newest first in the content file. */
const latest = posts[0];
const topics = postCategories.filter((category) => category !== "All");
const totalReading = posts.reduce((minutes, post) => minutes + post.readingTime, 0);

export default function JournalPage() {
  return (
    <>
      <MotionEngine />
      <VisualTestScroller />
      <PageHero
        chip="Journal"
        meta={`${posts.length} notes / ${topics.length} topics`}
        titleTop="Notes from"
        titleSign="the trade."
        lede="Things we explain on the phone often enough to be worth writing down. No case studies dressed up as advice."
        action={{ href: "#archive", label: "Read the archive", labelAlt: `All ${posts.length} notes` }}
        photo={photos.drafting}
        caption="Written at the bench / not by an agency"
        metrics={[
          { v: <Counter to={posts.length} />, k: "Notes published" },
          { v: <Counter to={topics.length} />, k: "Topics covered" },
          { v: <Counter to={totalReading} suffix=" min" />, k: "The whole lot, read" },
          { v: <Counter to={0} />, k: "Sales pitches" },
        ]}
      />
      <TickerBand items={topics.map((topic) => topic.toUpperCase())} tone="yellow" speed={44} size="sm" />
      <Latest />
      <Archive />
      <CtaBand
        kicker="Still have a question"
        title="Just ask us."
        lede="If it is worth answering once it is worth answering properly. Call the shop or send a note — we would rather talk you out of the wrong sign than sell you one."
      />
    </>
  );
}

function Latest() {
  return (
    <section id="latest" className="relative overflow-hidden bg-blue-deep py-20 text-paper sm:py-28">
      <div aria-hidden className="hero-grid absolute inset-0 opacity-[0.12]" />
      <div className="shell relative z-10">
        <div className="flex items-center gap-3">
          <StarMark className="h-2.5 w-2.5 text-yellow" />
          <span className="label text-paper/50">01 / Latest note</span>
          <span data-reveal="draw" className="h-px flex-1 bg-paper/20" />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="label bg-yellow px-3 py-2 text-ink">{latest.category}</span>
              <span className="label text-paper/55 tnum">{formatDate(latest.date)}</span>
              <span className="label text-paper/40">/</span>
              <span className="label text-paper/55 tnum">{latest.readingTime} min read</span>
            </div>

            <h2 className="display-wide mt-8 text-[clamp(2.2rem,4.6vw,4.1rem)] leading-[0.96] tracking-[-0.035em]">
              <Link href={`/journal/${latest.slug}`} className="group inline-block">
                <span data-reveal="rise" className="block">
                  <span className="transition-colors duration-500 group-hover:text-yellow">
                    {latest.title}
                  </span>
                </span>
              </Link>
            </h2>

            <p data-reveal="fade" style={d(160)} className="measure-wide mt-8 border-l-2 border-yellow pl-4 text-[1.05rem] leading-[1.6] text-paper/70">
              {latest.excerpt}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Action href={`/journal/${latest.slug}`} tone="yellow">Read the note</Action>
              <span className="label text-paper/50">By {latest.author}</span>
            </div>
          </div>

          {/* The topic ledger — what the archive actually covers. */}
          <dl data-reveal="fade" style={d(240)} className="lg:col-span-3 lg:col-start-10">
            <dt className="label border-b border-paper/25 pb-3 text-yellow">Filed under</dt>
            {topics.map((topic) => {
              const count = posts.filter((post) => post.category === topic).length;
              return (
                <dd key={topic} className="group/row flex items-baseline gap-3 overflow-hidden border-b border-paper/15 py-2.5">
                  <span className="h-1.5 w-1.5 shrink-0 bg-yellow transition-[width] duration-500 group-hover/row:w-5" />
                  <span className="text-[0.92rem] text-paper/75 transition-transform duration-500 group-hover/row:translate-x-1">
                    {topic}
                  </span>
                  <span className="label ml-auto text-paper/45 tnum">{count}</span>
                </dd>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Archive() {
  return (
    <section id="archive" className="scroll-mt-24 border-y border-line bg-white py-20 sm:py-28">
      <div className="shell">
        <Kicker index="02">The archive</Kicker>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="display-wide text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.95] tracking-[-0.035em] lg:col-span-8">
            <span data-reveal="rise" className="block"><span>Everything</span></span>
            <span data-reveal="rise" style={d(100)} className="block text-blue"><span>we have written down.</span></span>
          </h2>
          <p className="max-w-sm text-[1rem] leading-[1.55] text-fg-muted lg:col-span-3 lg:col-start-10 lg:pb-2">
            Filter by topic. Every note is written by whoever does that part of
            the job, which is why they read like shop talk.
          </p>
        </div>

        <div className="mt-14">
          <JournalList posts={posts} categories={postCategories} />
        </div>
      </div>
    </section>
  );
}
