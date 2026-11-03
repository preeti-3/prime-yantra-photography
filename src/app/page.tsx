import Link from "next/link";
import { Photo, SectionHeading, TextLink } from "@/components/ui";
import { ContactSection } from "@/components/contact-section";
import { ServiceCard } from "@/components/service-card";
import { assets } from "@/lib/assets";
import { services } from "@/lib/content";

const selectedPhotos = [
  { src: assets.home.imgRectangle, slot: "home.imgRectangle", alt: "An intimate moment between a couple", caption: "Together, always" },
  { src: assets.home.imgRectangle1, slot: "home.imgRectangle1", alt: "A portrait in soft natural light", caption: "A little everyday magic" },
  { src: assets.home.imgRectangle2, slot: "home.imgRectangle2", alt: "A couple celebrating their story", caption: "Stories worth keeping" },
  { src: assets.home.imgRectangle3, slot: "home.imgRectangle3", alt: "A thoughtful study of light and detail", caption: "Beauty in the details" },
];

export default function Home() {
  return (
    <>
      <section className="home-hero page-width" aria-labelledby="home-title">
        <div className="hero-copy">
          <p className="eyebrow">Prime Yantra Photography</p>
          <h1 id="home-title">Your moments.<br /><em>Beautifully kept.</em></h1>
          <p>For the big celebrations and the little in-between moments. Wedding, portrait and editorial photography that feels like you.</p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/portfolio">Explore the portfolio <span aria-hidden="true">↗</span></Link>
            <TextLink href="/contact">Let’s tell your story</TextLink>
          </div>
          <div className="hero-note"><span aria-hidden="true" /> Weddings · Portraits · Editorial</div>
        </div>
        <div className="hero-visual">
          <Photo slot="home.imgFrame" src={assets.home.imgFrame} alt="A bridal portrait with a red veil" className="home-hero-photo" priority sizes="(max-width: 767px) 100vw, 50vw" />
          <div className="hero-photo-caption"><span>Real moments. Lasting stories.</span><span aria-hidden="true">01 / PY</span></div>
        </div>
      </section>
      <div className="locations-band"><div className="page-width"><span className="eyebrow">Close to your story</span><p>Hansi <span>·</span> Hisar <span>·</span> Rohtak <span>·</span> Delhi <span>·</span> Gurgaon <span>·</span> Chandigarh</p></div></div>
      <section className="selected-section page-width" aria-labelledby="selected-title">
        <div className="section-topline"><div><p className="eyebrow">A few favourites</p><h2 id="selected-title">Life, in its best light.</h2></div><TextLink href="/portfolio">View all stories</TextLink></div>
        <div className="selected-grid">
          {selectedPhotos.map((photo, index) => (
            <Link href="/portfolio" key={photo.slot} data-testid="selected-card" className="selected-card" aria-label={`View portfolio: ${photo.caption}`}>
              <Photo slot={photo.slot} src={photo.src} alt={photo.alt} className="selected-card-photo" sizes="(max-width: 767px) 45vw, 25vw" />
              <div className="selected-card-caption"><span>{photo.caption}</span><span className="photo-index">0{index + 1}</span></div>
            </Link>
          ))}
        </div>
      </section>
      <section className="about-band" id="the-artist">
        <div className="home-about page-width">
          <div className="biography-collage">
            <Photo slot="home.imgRectangle4" src={assets.home.imgRectangle4} alt="A portrait in warm natural light" className="biography-main" />
            <Photo slot="home.imgRectangle5" src={assets.home.imgRectangle5} alt="A close-up of a celebration outfit" className="biography-detail" sizes="(max-width: 767px) 40vw, 20vw" />
          </div>
          <div className="biography-copy">
            <SectionHeading eyebrow="Behind the camera">A familiar feeling.<br />A fresh perspective.</SectionHeading>
            <blockquote>“The best photographs bring you back to how it felt.”</blockquote>
            <p>We’re Prime Yantra Photography. We capture the laughter, the quiet glances, and the people who make your story yours. From weddings to personal portraits, we make room for moments to unfold naturally.</p>
            <TextLink href="/about">Get to know us</TextLink>
          </div>
        </div>
      </section>
      <section className="services-section page-width" id="services">
        <div className="section-topline"><SectionHeading eyebrow="What we photograph">Made for your moments.</SectionHeading><p>Thoughtful photography for the stories<br className="desktop-break" /> you’ll want to come back to.</p></div>
        <div className="service-grid">{services.map((service) => <ServiceCard key={service.title} service={service} />)}</div>
      </section>
      <ContactSection />
    </>
  );
}