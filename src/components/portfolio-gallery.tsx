"use client";
import { useState } from "react";
import { Photo, SectionHeading } from "./ui";
import {
  fullGallery,
  gallerySections,
  type Category,
  type Gallery,
} from "@/lib/content";

function GalleryCard({ gallery }: { gallery: Gallery }) {
  return (
    <article className="gallery-card" data-category={gallery.category}>
      <Photo
        slot={gallery.slot} src={gallery.image}
        alt={gallery.alt}
        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 60vw"
      />
    </article>
  );
}

export function PortfolioGallery() {
  const [category, setCategory] = useState<Category>("All");
  const filteredGrid = fullGallery.filter(
    (item) => category === "All" || item.category === category,
  );
  return (
    <div className="page-width portfolio-content">
      <p className="sr-only" role="status">
        {category === "All"
          ? "Showing all photography categories."
          : `Showing ${category.toLowerCase()} photography. ${filteredGrid.length} photographs in the full gallery.`}
      </p>
      <div id="gallery-results">
        {gallerySections.map((section) => {
          const items = section.items.filter(
            (item) => category === "All" || item.category === category,
          );
          if (!items.length) return null;
          return (
            <section
              id={section.id}
              key={section.id}
              className="gallery-section"
            >
              <SectionHeading eyebrow={section.eyebrow}>
                {section.title}
              </SectionHeading>
              <div
                className={`gallery-composition ${section.featured ? "featured-composition" : ""} ${items.length < 3 ? "filtered-composition" : ""}`}
              >
                {items.map((item) => (
                  <GalleryCard key={item.id} gallery={item} />
                ))}
              </div>
            </section>
          );
        })}
        <section id="full-gallery" className="gallery-section">
          <SectionHeading eyebrow="Full Gallery">
            A Complete Look at the Work
          </SectionHeading>
          {filteredGrid.length ? (
            <div className="full-gallery-grid">
              {filteredGrid.map((item) => (
                <GalleryCard key={item.id} gallery={item} />
              ))}
            </div>
          ) : (
            <div className="gallery-empty">
              <h3>No event galleries yet.</h3>
              <p>Explore the wedding, portrait and editorial collections.</p>
              <button
                className="text-link"
                type="button"
                onClick={() => setCategory("All")}
              >
                View all photography
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
