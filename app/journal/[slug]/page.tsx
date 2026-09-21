import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { StarMark } from "@/components/star-mark";
import { CtaBand } from "@/components/cta-band";
import { SpecTable, TextLink, Action } from "@/components/ui";
import { formatDate, formatDateShort, getPost, posts } from "@/lib/content";
import { d } from "@/lib/util";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/journal/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
    },
  };
}

export default async function PostPage(props: PageProps<"/journal/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const idx = posts.findIndex((p) => p.slug === slug);
  const more = [posts[(idx + 1) % posts.length], posts[(idx + 2) % posts.length]];

  return (
    <>
      <article>
        {/* ---------- header ---------- */}
        <header className="shell pb-12 pt-32 sm:pt-40 lg:pt-48">
          <div className="flex flex-wrap items-center gap-3">
            <StarMark className="h-2.5 w-2.5 shrink-0 text-accent" />
            <TextLink href="/journal" className="label text-fg-muted">
              Journal
            </TextLink>
            <span className="label text-fg-faint">/</span>
            <span className="label text-fg-faint">{post.category}</span>
            <span data-reveal="draw" className="h-px flex-1 bg-line" aria-hidden />
          </div>

          <h1 className="headline mt-8 max-w-5xl text-[clamp(2rem,5.5vw,4.25rem)]">
            <span data-reveal="rise" className="block">
              <span>{post.title}</span>
            </span>
          </h1>

          <p
            data-reveal="fade"
            style={d(160)}
            className="measure-wide mt-7 text-[1.15rem] leading-[1.5] text-fg-muted"
          >
            {post.excerpt}
          </p>

          <div
            data-reveal="fade"
            style={d(260)}
            className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 rule-t pt-5"
          >
            <span className="label text-fg-faint">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            <span className="label text-fg-faint">{post.author}</span>
            <span className="label text-fg-faint tnum">
              {post.readingTime} min read
            </span>
          </div>
        </header>

        {/* ---------- body ---------- */}
        <div className="shell pb-20 sm:pb-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7 lg:col-start-3">
              {post.body.map((block, i) => {
                if (block.type === "h") {
                  return (
                    <h2
                      key={i}
                      data-reveal="fade"
                      className="display mt-14 text-[clamp(1.35rem,2.8vw,2rem)] first:mt-0"
                    >
                      {block.text}
                    </h2>
                  );
                }

                if (block.type === "p") {
                  return (
                    <p
                      key={i}
                      data-reveal="fade"
                      className="mt-6 text-[1.08rem] leading-[1.7] text-fg-muted"
                    >
                      {block.text}
                    </p>
                  );
                }

                if (block.type === "list") {
                  return (
                    <ul key={i} className="mt-7">
                      {block.items.map((item, j) => (
                        <li
                          key={j}
                          data-reveal="fade"
                          style={d(j * 70)}
                          className="flex gap-4 rule-t py-4"
                        >
                          <span className="label pt-1.5 text-fg-faint tnum">
                            {String(j + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[1.02rem] leading-[1.6] text-fg-muted">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  );
                }

                if (block.type === "quote") {
                  return (
                    <blockquote
                      key={i}
                      data-reveal="fade"
                      className="my-12 rounded-2xl bg-yellow p-8 sm:p-10"
                    >
                      <StarMark className="h-4 w-4 text-ink" />
                      <p className="display mt-5 text-[clamp(1.3rem,3vw,2rem)] leading-[1.15] text-ink">
                        {block.text}
                      </p>
                    </blockquote>
                  );
                }

                return (
                  <div key={i} className="my-10">
                    <SpecTable rows={block.rows} />
                  </div>
                );
              })}

              {/* author sign-off */}
              <div className="mt-16 flex flex-wrap items-center gap-4 rule-t pt-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-deep text-paper">
                  <span className="label text-[0.6rem]">
                    {post.author
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </span>
                </span>
                <span>
                  <span className="block text-[0.95rem] font-medium">
                    {post.author}
                  </span>
                  <span className="label mt-1 block text-fg-faint">
                    Star Signs, Richmond
                  </span>
                </span>
                <Action href="/contact" tone="ghost" className="ml-auto">
                  Ask a question
                </Action>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* ---------- more ---------- */}
      <section className="shell pb-20">
        <div className="flex items-center gap-3">
          <StarMark className="h-2.5 w-2.5 shrink-0 text-accent" />
          <span className="label text-fg-muted">Keep reading</span>
          <span data-reveal="draw" className="h-px flex-1 bg-line" aria-hidden />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {more.map((p) => (
            <Link
              key={p.slug}
              href={`/journal/${p.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-paper-2 p-7 transition-colors duration-500 hover:bg-ink sm:p-9"
            >
              <span className="label flex items-center gap-3 text-fg-faint transition-colors duration-500 group-hover:text-yellow">
                {formatDateShort(p.date)}
                <span className="h-1 w-1 rounded-full bg-current" />
                {p.category}
              </span>
              <h3 className="headline mt-5 text-[clamp(1.1rem,2.2vw,1.5rem)] transition-colors duration-500 group-hover:text-paper">
                {p.title}
              </h3>
              <p className="mt-3 text-[0.93rem] leading-[1.55] text-fg-muted transition-colors duration-500 group-hover:text-paper/60">
                {p.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
