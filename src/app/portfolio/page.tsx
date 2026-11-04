import type { Metadata } from "next";
import { Photo } from "@/components/ui";
import { ContactSection } from "@/components/contact-section";
import { PortfolioGallery } from "@/components/portfolio-gallery";
import { assets } from "@/lib/assets";
import { introduction } from "@/lib/content";

export const metadata: Metadata = {
  title: "Indian Wedding Photography Portfolio",
  description:
    "Explore engagement, haldi, sangeet and wedding photography by Prime Yantra Photography in Hansi, Hisar, Rohtak, Delhi, Gurgaon and Chandigarh.",
  alternates: { canonical: "/portfolio" },
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
          <h1 id="portfolio-title">Every Celebration, Framed With Heart.</h1>
        </div>
        <p>{introduction}</p>
        <Photo
          slot="portfolio.imgHeroImage" src={assets.portfolio.imgHeroImage}
          alt="Bride and groom standing together beneath colourful wedding lights"
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
