import Link from "next/link";
import { Photo } from "./ui";
import type { services } from "@/lib/content";

export function ServiceCard({
  service,
}: {
  service: (typeof services)[number];
}) {
  return (
    <article className="service-card">
      <Photo
        slot={service.slot} src={service.image}
        alt={service.alt}
        sizes="(max-width: 767px) 100vw, 33vw"
      />
      <div className="service-copy">
        <div>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          <Link className="text-link" href="/contact" aria-label={`Enquire about ${service.title} photography`}>Plan this celebration <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </article>
  );
}
