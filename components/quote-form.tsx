"use client";

import { useState } from "react";
import { StarMark } from "./star-mark";
import { ConveyorArrow } from "./ui";
import { services } from "@/lib/content";

type Status = "idle" | "sending" | "sent" | "error";

const BUDGETS = [
  "Under $5k",
  "$5k – $15k",
  "$15k – $50k",
  "$50k+",
  "Not sure yet",
];
const TIMELINES = ["As soon as possible", "1 – 3 months", "3 – 6 months", "Just planning"];

/**
 * Quote request. Wired to a mock submit — swap `send()` for a POST to your
 * endpoint and the rest of the component is unchanged.
 */
export function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [scope, setScope] = useState<string[]>([]);
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [timeline, setTimeline] = useState(TIMELINES[1]);

  const toggleScope = (slug: string) =>
    setScope((s) =>
      s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug],
    );

  async function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const data = Object.fromEntries(new FormData(e.currentTarget));
    const payload = { ...data, scope, budget, timeline };

    // --- MOCK ------------------------------------------------------
    // Replace with: await fetch("/api/quote", { method: "POST", body: ... })
    console.info("[quote request]", payload);
    await new Promise((r) => setTimeout(r, 900));
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div
        className="relative overflow-hidden rounded-2xl bg-blue-deep p-8 text-paper sm:p-12"
        role="status"
      >
        <span className="grain-layer" aria-hidden="true" />
        <StarMark className="relative h-6 w-6 text-yellow" />
        <h2 className="display relative mt-7 text-d3">That&apos;s in.</h2>
        <p className="measure-wide relative mt-5 text-[1.05rem] leading-[1.55] text-paper/70">
          We read every one of these ourselves — no intake form queue. Expect a
          reply within one business day, usually with a question about your wall
          and a rough number.
        </p>
        <p className="spec relative mt-8 text-paper/45">
          Urgent or a dark sign? Call the shop instead.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setScope([]);
          }}
          className="label relative mt-8 rounded-full px-5 py-3 ring-1 ring-paper/25 transition-colors duration-300 hover:bg-yellow hover:text-ink hover:ring-yellow"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={send} className="grid gap-12">
      {/* ---- 01 scope ---- */}
      <Fieldset index="01" legend="What do you need built?" hint="Pick any that apply">
        <div className="flex flex-wrap gap-2">
          {services.map((s) => {
            const on = scope.includes(s.slug);
            return (
              <button
                key={s.slug}
                type="button"
                onClick={() => toggleScope(s.slug)}
                aria-pressed={on}
                className={`group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full px-4 ring-1 ring-inset transition-colors duration-[400ms] ${
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
                  {s.short}
                </span>
              </button>
            );
          })}
        </div>
      </Fieldset>

      {/* ---- 02 project ---- */}
      <Fieldset index="02" legend="The building">
        <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
          <Field name="business" label="Business name" required />
          <Field name="address" label="Street address of the sign" required />
          <Field name="city" label="City" defaultValue="Richmond" required />
          <Field name="state" label="State" defaultValue="VA" required />
        </div>
      </Fieldset>

      {/* ---- 03 budget + timeline ---- */}
      <Fieldset index="03" legend="Budget and timing" hint="Rough is fine">
        <div className="grid gap-8 sm:grid-cols-2">
          <PillGroup
            name="budget"
            label="Budget"
            options={BUDGETS}
            value={budget}
            onChange={setBudget}
          />
          <PillGroup
            name="timeline"
            label="Timeline"
            options={TIMELINES}
            value={timeline}
            onChange={setTimeline}
          />
        </div>
      </Fieldset>

      {/* ---- 04 you ---- */}
      <Fieldset index="04" legend="You">
        <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
          <Field name="name" label="Name" required autoComplete="name" />
          <Field name="email" label="Email" type="email" required autoComplete="email" />
          <Field name="phone" label="Phone" type="tel" autoComplete="tel" />
          <Field name="referral" label="How did you find us?" />
        </div>
        <div className="mt-7">
          <Field
            name="message"
            label="Anything else we should know"
            textarea
            hint="Existing sign, landlord restrictions, a deadline you are working to"
          />
        </div>
      </Fieldset>

      <div className="flex flex-wrap items-center gap-6 rule-t pt-8">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-ink py-4 pl-7 pr-5 text-paper disabled:opacity-60"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 origin-bottom scale-y-0 bg-yellow transition-transform duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
          />
          <span className="label relative z-10 transition-colors duration-300 group-hover:text-ink">
            {status === "sending" ? "Sending…" : "Send it to the shop"}
          </span>
          <ConveyorArrow />
        </button>
        <p className="spec max-w-xs text-fg-faint">
          No mailing list, no CRM sequence. It goes to the people who would
          build your sign.
        </p>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */

function Fieldset({
  index,
  legend,
  hint,
  children,
}: {
  index: string;
  legend: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="rule-t pt-7">
      <legend className="sr-only">{legend}</legend>
      <div className="grid gap-7 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-3">
          <div className="flex items-baseline gap-3">
            <span className="label text-fg-faint">{index}</span>
            <h2 className="headline text-[1.15rem]">{legend}</h2>
          </div>
          {hint && <p className="spec mt-2 pl-10 text-fg-faint">{hint}</p>}
        </div>
        <div className="lg:col-span-8 lg:col-start-5">{children}</div>
      </div>
    </fieldset>
  );
}

/** Underlined input; the rule thickens and goes blue on focus. */
function Field({
  name,
  label,
  type = "text",
  required = false,
  textarea = false,
  hint,
  defaultValue,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  hint?: string;
  defaultValue?: string;
  autoComplete?: string;
}) {
  const shared =
    "peer w-full border-0 border-b border-line bg-transparent pb-2.5 pt-1 text-[1rem] outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-fg-faint focus:border-blue focus:shadow-[0_1px_0_0_var(--blue)]";

  return (
    <label className="block">
      <span className="label mb-2.5 block text-fg-faint">
        {label}
        {required && <span className="ml-1 text-blue">*</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          rows={4}
          required={required}
          className={`${shared} resize-y`}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          defaultValue={defaultValue}
          autoComplete={autoComplete}
          className={shared}
        />
      )}
      {hint && <span className="spec mt-2 block text-fg-faint">{hint}</span>}
    </label>
  );
}

function PillGroup({
  name,
  label,
  options,
  value,
  onChange,
}: {
  name: string;
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div role="radiogroup" aria-label={label}>
      <span className="label mb-3 block text-fg-faint">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = o === value;
          return (
            /* The pill is a flex box with its own line-height rather than a
               block: as a block, the button's 16px strut set the line box while
               the label renders at 12px, which sat the text below the pill's
               optical centre. `tnum` keeps the figures the same width from one
               pill to the next. */
            <button
              key={o}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(o)}
              className={`group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full px-4 ring-1 ring-inset transition-colors duration-[400ms] ${
                on ? "bg-blue-deep text-paper ring-blue-deep" : "ring-line hover:ring-ink"
              }`}
            >
              <span className="label relative z-10 leading-none tnum">{o}</span>
            </button>
          );
        })}
      </div>
      <input type="hidden" name={name} value={value} />
    </div>
  );
}
