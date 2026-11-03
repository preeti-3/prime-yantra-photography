import type { Metadata } from "next";
import { Photo, SectionHeading } from "@/components/ui";
import { ContactSection } from "@/components/contact-section";
import { assets } from "@/lib/assets";
import { philosophy } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the wedding photographer behind Prime Yantra Photography, serving Hansi, Hisar, Rohtak, Delhi, Gurgaon and Chandigarh with candid, cinematic storytelling.",
  alternates: { canonical: "/about" },
};
export default function About() {
  return (
    <>
      <section className="about-hero page-width" aria-labelledby="about-title">
        <Photo
          slot="about.imgHeroImage" src={assets.about.imgHeroImage}
          alt="Bride in a red veil photographed in dramatic directional light"
          className="about-hero-photo rounded-photo"
          sizes="100vw"
          priority
        />
        <div className="about-introduction">
          <p className="eyebrow">Behind the Lens</p>
          <h1 id="about-title">
            More than photographs.
            <br />
            Stories with a soul.
          </h1>
          <p>
            I believe the most meaningful photographs are not always the
            perfectly posed ones. They are the quiet glances, genuine laughter,
            and little moments that happen between everything else.
          </p>
          <p className="signature">
            Prime Yantra Photography - Photographer &amp; Visual Storyteller
          </p>
        </div>
      </section>
      <section id="my-story" className="about-story page-width">
        <SectionHeading eyebrow="The Story Behind the Lens" centered>
          It started with a curiosity for light.
        </SectionHeading>
        <div className="story-grid">
          <div className="story-copy">
            <p>
              What began as a simple fascination with cameras slowly became a
              way of seeing the world differently.
            </p>
            <p>
              Serving Hansi, Hisar, Rohtak, Delhi, Gurgaon and Chandigarh, I photograph engagements,
              haldi, sangeet and wedding celebrations with a cinematic yet
              honest approach. My work is inspired by natural light, real
              emotions and the people behind every story.
            </p>
          </div>
          <Photo
            slot="about.imgFrame" src={assets.about.imgFrame}
            alt="Couple looking at each other during a black-and-white portrait session"
            className="story-photo rounded-photo"
          />
        </div>
      </section>
      <section id="philosophy" className="philosophy-section page-width">
        <SectionHeading eyebrow="How I See Photography" centered>
          Feel first.
          <br />
          Photograph second.
        </SectionHeading>
        <div className="philosophy-grid">
          {philosophy.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
      <ContactSection />
    </>
  );
}
