import type { Metadata } from "next";
import Link from "next/link";
import { ContactSection } from "@/components/contact-section";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ServiceCard } from "@/components/service-card";
import { Photo } from "@/components/ui";
import { assets } from "@/lib/assets";
import { services } from "@/lib/content";

const selectedStories = [
  {
    src: assets.home.imgRectangle3,
    slot: "home.imgRectangle3",
    alt: "Bride standing close to the groom in formal wedding attire",
    category: "Wedding portrait",
    title: "Close, naturally",
  },
  {
    src: assets.home.imgRectangle1,
    slot: "home.imgRectangle1",
    alt: "Bride and groom embracing beneath wedding lights",
    category: "Together",
    title: "A quiet embrace",
  },
  {
    src: assets.home.imgRectangle,
    slot: "home.imgRectangle",
    alt: "Bride seated in red wedding attire before dark curtains",
    category: "Bridal portrait",
    title: "In her own light",
  },
  {
    src: assets.home.imgRectangle2,
    slot: "home.imgRectangle2",
    alt: "Bride in profile adjusting her red wedding veil",
    category: "Wedding details",
    title: "The finishing touch",
  },
];

export const metadata: Metadata = {
  title: "Wedding Photographer in Hansi & Hisar",
  description:
    "Candid engagement, haldi, sangeet and wedding photography in Hansi, Hisar, Rohtak, Delhi, Gurgaon and Chandigarh. Enquire with Prime Yantra Photography.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <section className="home-hero" aria-labelledby="home-title">
        <Photo
          slot="home.imgFrame"
          src={assets.home.imgFrame}
          alt="Bride leaning on the groom beneath wedding lights"
          className="home-hero-photo"
          priority
          sizes="100vw"
        />
        <div className="hero-copy page-width">
          <p className="hero-kicker">Wedding photography · Hansi and beyond</p>
          <h1 id="home-title">
            The moments.<br />The feeling.<br /><em>Forever.</em>
          </h1>
          <div className="hero-actions">
            <Link className="hero-text-link" href="/portfolio">
              Explore our work <span aria-hidden="true">↗</span>
            </Link>
            <Link className="button button-orange" href="/contact">
              Check availability
            </Link>
          </div>
        </div>
      </section>

      <section className="selected-section page-width" aria-labelledby="selected-title" data-reveal>
        <div className="editorial-heading">
          <div>
            <p className="eyebrow">Selected stories</p>
            <h2 id="selected-title">Photographs that feel like you.</h2>
          </div>
          <div>
            <p>Honest celebrations, expressive portraits and all the fleeting moments in between.</p>
            <Link className="text-link" href="/portfolio">View the full portfolio <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className="selected-editorial-grid">
          {selectedStories.map((story, index) => (
            <Link
              href="/portfolio"
              key={story.slot}
              data-testid="selected-card"
              className={`story-card story-card-${index + 1}`}
              aria-label={`View ${story.category} story: ${story.title}`}
            >
              <Photo
                slot={story.slot}
                src={story.src}
                alt={story.alt}
                className="story-photo"
                sizes="(max-width: 767px) 100vw, 65vw"
              />
              <span className="story-caption">
                <small>{story.category}</small>
                <strong>{story.title}</strong>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="studio-section" id="the-studio" aria-labelledby="studio-title" data-reveal>
        <div className="studio-grid page-width">
          <figure className="studio-visual">
            <Photo
              slot="home.imgRectangle4"
              src={assets.home.imgRectangle4}
              alt="Black-and-white portrait of the groom beneath a geometric ceiling"
              className="studio-photo"
              sizes="(max-width: 767px) 100vw, 48vw"
            />
            <figcaption>Prime Yantra Photography · Hansi, Haryana</figcaption>
          </figure>
          <div className="studio-copy">
            <p className="eyebrow">The studio</p>
            <h2 id="studio-title">Honest moments, composed with intention.</h2>
            <p>We photograph celebrations as they unfold—gently guiding when needed and leaving room for everything real. The result is a wedding story that feels cinematic, personal and entirely yours.</p>
            <Link className="text-link text-link-light" href="/about">
              Meet the studio <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="services-section page-width" id="services" aria-labelledby="services-title" data-reveal>
        <div className="editorial-heading services-heading">
          <div>
            <p className="eyebrow">The wedding journey</p>
            <h2 id="services-title">Every celebration, thoughtfully seen.</h2>
          </div>
          <p>From the first promise to the final ritual, each chapter receives the same care.</p>
        </div>
        <div className="service-grid">
          {services.map((service) => <ServiceCard key={service.title} service={service} />)}
        </div>
      </section>

      <ContactSection />
    </>
  );
}
