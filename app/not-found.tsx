import { Action } from "@/components/ui";
import { StarMark } from "@/components/star-mark";
import { SignPlate } from "@/components/sign-plate";
import { navItems } from "@/lib/nav";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell grid min-h-[80svh] content-center gap-12 py-32 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-6">
        <div className="flex items-center gap-3">
          <StarMark className="h-2.5 w-2.5 shrink-0 text-accent" />
          <span className="label text-fg-muted">Error 404</span>
          <span className="h-px flex-1 bg-line" aria-hidden />
        </div>

        <h1 className="display-wide mt-8 text-d1">
          <span className="block">NOTHING</span>
          <span className="block text-fg-faint">HANGING HERE</span>
        </h1>

        <p className="measure-wide mt-7 text-[1.05rem] leading-[1.6] text-fg-muted">
          This page came down, or the address has a typo in it. Either way,
          nothing is lit at this location.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Action href="/" tone="solid">
            Back to the index
          </Action>
          <Action href="/contact" tone="ghost">
            Talk to the shop
          </Action>
        </div>

        <nav className="mt-12">
          <p className="label text-fg-faint">Or try</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {navItems.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full px-4 ring-1 ring-inset ring-line transition-colors duration-300 hover:ring-ink"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 origin-bottom scale-y-0 bg-yellow transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                  />
                  <span className="label relative z-10">{n.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="lg:col-span-5 lg:col-start-8">
        <SignPlate
          wordmark="404"
          form="blade"
          accent="yellow"
          ratio="4/5"
          sheet="SH. 404 / NOT FOUND"
          note="NO SUCH SIGN ON THIS BUILDING"
          width="—"
        />
      </div>
    </section>
  );
}
