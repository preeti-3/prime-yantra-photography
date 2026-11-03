import { InquiryForm } from "./inquiry-form";

export function ContactSection({ page = false }: { page?: boolean }) {
  const Heading = page ? "h1" : "h2";
  return (
    <section
      id="inquire"
      className="contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="contact-grid page-width">
        <div className="contact-copy">
          <p className="eyebrow">Something beautiful starts here</p>
          <Heading id="contact-heading">Let&apos;s make<br />a little history.</Heading>
          <p className="text-base leading-[1.7]">
            Please reach out with your date, location and details about your upcoming
            celebration to co-create something beautifully permanent.
          </p>
          <address className="flex flex-col items-start text-sm leading-normal not-italic max-md:gap-0">
            <strong className="mb-1.5 font-bold text-[var(--ink)] md:mb-3">Direct Contact</strong>
            <a className="flex min-h-11 items-center md:min-h-0 md:py-1.5" href="mailto:kumaraman50099@gmail.com">kumaraman50099@gmail.com</a>
            <a className="flex min-h-11 items-center md:min-h-0 md:py-1.5" href="tel:+919350003424">+91 93500 03424</a>
            <p className="mt-3">Hansi · Hisar · Rohtak · Delhi · Gurgaon · Chandigarh</p>
            <a className="flex min-h-11 items-center" href="https://www.instagram.com/prime__yantra_photography/" target="_blank" rel="noreferrer">Instagram: @prime__yantra_photography</a>
          </address>
        </div>
        <InquiryForm />
      </div>
    </section>
  );
}
