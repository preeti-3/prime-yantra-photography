import type { Metadata } from "next";
import { ContactSection } from "@/components/contact-section";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us your story. Inquire about wedding, portrait and editorial photography with Prime Yantra Photography, available in Hansi, Hisar, Rohtak, Delhi, Gurgaon and Chandigarh.",
};
export default function Contact() {
  return <ContactSection page />;
}
