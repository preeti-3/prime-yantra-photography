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
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://primeyantraphotography.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: { icon: "/assets/prime-yatra-logo.svg" },
  title: { default: "Prime Yantra Photography | Wedding Photographer in Hansi", template: "%s | Prime Yantra Photography" },
  description: "Candid engagement, haldi, sangeet and wedding photography in Hansi, Hisar, Rohtak, Delhi, Gurgaon and Chandigarh.",
  applicationName: "Prime Yantra Photography",
  authors: [{ name: "Prime Yantra Photography" }],
  creator: "Prime Yantra Photography",
  publisher: "Prime Yantra Photography",
  category: "Wedding Photography",
  keywords: ["wedding photographer Hansi", "wedding photographer Hisar", "engagement photography", "haldi photography", "sangeet photography", "Indian wedding photography", "wedding photographer Haryana", "Prime Yantra Photography"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Prime Yantra Photography",
    title: "Prime Yantra Photography | Indian Wedding Stories",
    description: "Engagement, haldi, sangeet and wedding photography across Haryana, Delhi and Chandigarh.",
    url: siteUrl,
    images: [{ url: "/assets/figma/couple-ceremony-lights.webp", alt: "Prime Yantra wedding photography" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prime Yantra Photography | Indian Wedding Stories",
    description: "Engagement, haldi, sangeet and wedding photography across Haryana, Delhi and Chandigarh.",
    images: ["/assets/figma/couple-ceremony-lights.webp"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const images = await readImageOverrides().catch(() => ({}));
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#business`,
    name: "Prime Yantra Photography",
    url: siteUrl,
    logo: `${siteUrl}/assets/prime-yatra-logo.svg`,
    image: `${siteUrl}/assets/figma/couple-ceremony-lights.webp`,
    description: "Wedding photography for engagements, haldi, sangeet and marriage celebrations.",
    telephone: "+91-93500-03424",
    email: "kumaraman50099@gmail.com",
    address: { "@type": "PostalAddress", addressLocality: "Hansi", addressRegion: "Haryana", addressCountry: "IN" },
    areaServed: ["Hansi", "Hisar", "Rohtak", "Delhi", "Gurgaon", "Chandigarh"],
    sameAs: ["https://www.instagram.com/prime__yantra_photography/"],
    priceRange: "₹₹",
  };
  return <html lang="en"><body className={`${serif.variable} ${sans.variable}`}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <a href="#main-content" className="skip-link">Skip to content</a>
    <ImagesProvider initialImages={images}>
    <Navbar />
    <main id="main-content" tabIndex={-1}>{children}</main>
    <Footer />
    <SamePageScroll />
    </ImagesProvider>
  </body></html>;
}
