import { Photo, SectionHeading } from "./ui";
import { portfolioGallery, type Gallery } from "@/lib/content";

function GalleryCard({ gallery }: { gallery: Gallery }) {
  return (
    <figure className="gallery-card">
      <Photo
        slot={gallery.slot} src={gallery.image}
        alt={gallery.alt}
        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 60vw"
      />
    </figure>
  );
}

export function PortfolioGallery() {
  return (
    <div className="page-width portfolio-content">
      <section id="full-gallery" className="gallery-section">
        <SectionHeading eyebrow="Selected Work">
          A Complete Look at the Work
        </SectionHeading>
        <div className="full-gallery-grid">
          {portfolioGallery.map((item) => (
            <GalleryCard key={item.id} gallery={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
