import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SamePageScroll } from "@/components/same-page-scroll";
import { ImagesProvider } from "@/components/managed-image";
import { readImageOverrides } from "@/lib/sanity-images";
import "./globals.css";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  icons: { icon: "/assets/prime-yatra-logo.svg" },
  title: { default: "Prime Yantra Photography | Fine Art & Editorial Photography", template: "%s | Prime Yantra Photography" },
  description: "Luxury weddings, intimate portraits and timeless visual stories, available in Hansi, Hisar, Rohtak, Delhi, Gurgaon and Chandigarh.",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const images = await readImageOverrides().catch(() => ({}));
  return <html lang="en"><body className={`${serif.variable} ${sans.variable}`}>
    <a href="#main-content" className="skip-link">Skip to content</a>
    <ImagesProvider initialImages={images}>
    <Navbar />
    <main id="main-content" tabIndex={-1}>{children}</main>
    <Footer />
    <SamePageScroll />
    </ImagesProvider>
  </body></html>;
}
