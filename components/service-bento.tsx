import Image from "next/image";
import Link from "next/link";

import type { Service } from "@/lib/content";
import { photos, servicePhoto } from "@/lib/photos";

/**
 * The service bento — six photographic tiles on an asymmetric twelve-column
 * bed, each one a link into the discipline. Shared by the landing page and the
 * services index so the two never drift apart.
 *
 * The tiles carry no scroll reveal on purpose. They sit on a full-bleed navy
 * band, so fading them in leaves the band on screen as a large empty colour
 * field that fills in afterwards. Painting them with the band is the whole fix.
 *
 * The layout assumes six services; a shorter or longer list falls back to an
 * even half-width tile rather than breaking the bed.
 */
const layouts = [
  "lg:col-span-7 lg:row-start-1",
  "lg:col-span-5 lg:row-start-1",
  "lg:col-span-5 lg:row-start-2",
  "lg:col-span-7 lg:row-start-2",
  "lg:col-span-6 lg:row-start-3",
  "lg:col-span-6 lg:row-start-3",
];

export function ServiceBento({ services }: { services: Service[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[28rem_24rem_24rem]">
      {services.map((service, index) => (
        <ServiceCard key={service.slug} service={service} index={index} />
      ))}
    </div>
  );
}

export function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={`group block lg:h-full ${layouts[index] ?? "lg:col-span-6"}`}
    >
      <article
        data-pointer
        className="service-card mechanism-grid relative min-h-[22rem] overflow-hidden bg-blue-mid sm:h-full"
      >
        <Image
          src={photos[servicePhoto[service.slug]].src}
          alt={photos[servicePhoto[service.slug]].alt}
          fill
          sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
          className="motion-image service-image object-cover"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,20,60,0.08)_20%,rgba(3,20,60,0.92)_100%)] transition-opacity duration-500 group-hover:opacity-90"
        />
        <span aria-hidden className="focus-haze" />
        <span className="label absolute left-5 top-5 z-20 bg-paper px-3 py-2 text-ink">
          Service / {service.index}
        </span>
        {/* The status tag: drops in from above on hover, same as every other
            card on the site. It carries the arrow, so it doubles as the link
            affordance once you are on the card. */}
        <span className="card-tag absolute right-5 top-5 z-20 flex items-center gap-2.5 bg-yellow px-3 py-2.5 text-ink">
          <span className="label">In-house build</span>
          <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden>
            <path d="M2 8h12M9.5 3.5 14 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </span>
        <div className="card-copy absolute inset-x-0 bottom-0 z-20 p-6 text-paper sm:p-7">
          <p className="service-summary mb-5 max-w-[36rem] text-[0.9rem] leading-[1.5] text-paper/75">
            {service.summary}
          </p>
          <div className="flex items-end justify-between gap-5">
            <div>
              <h3 className="display max-w-[16ch] text-[clamp(1.65rem,2.5vw,2.5rem)] leading-[0.95]">
                {service.short}
              </h3>
              <p className="label mt-4 text-paper/65">From {service.from}</p>
            </div>
            <span className="label shrink-0 border-t border-yellow pt-2 text-yellow">
              {service.leadTime.split(" ").slice(0, 3).join(" ")}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
