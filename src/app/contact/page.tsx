import type { Metadata } from "next";
import { ContactSection } from "@/components/contact-section";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Enquire about engagement, haldi, sangeet and wedding photography with Prime Yantra Photography in Hansi, Hisar, Rohtak, Delhi, Gurgaon and Chandigarh.",
  alternates: { canonical: "/contact" },
};
export default function Contact() {
  return <ContactSection page />;
}
