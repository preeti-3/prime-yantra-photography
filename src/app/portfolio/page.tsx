import type { Metadata } from "next";
import { Photo } from "@/components/ui";
import { ContactSection } from "@/components/contact-section";
import { PortfolioGallery } from "@/components/portfolio-gallery";
import { assets } from "@/lib/assets";
import { introduction } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore Prime Yantra Photography’s wedding, portrait and editorial photography. Stories, framed with intention.",
};
export default function Portfolio() {
  return (
    <>
      <section
        className="portfolio-hero page-width"
        aria-labelledby="portfolio-title"
      >
        <div>
          <p className="eyebrow">Portfolio</p>
          <h1 id="portfolio-title">Stories, Framed With Intention.</h1>
        </div>
        <p>{introduction}</p>
        <Photo
          slot="portfolio.imgHeroImage" src={assets.portfolio.imgHeroImage}
          alt="Photographer tossing a camera into the air in an autumn forest"
          className="portfolio-hero-photo rounded-photo"
          sizes="100vw"
          priority
        />
      </section>
      <PortfolioGallery />
      <ContactSection />
    </>
  );
}
