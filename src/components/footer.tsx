import { ManagedImage as Image } from "./managed-image";
import Link from "next/link";
import { assets } from "@/lib/assets";

const groups = [
  {
    title: "Explore",
    links: [
      { label: "Portfolios", href: "/portfolio" },
      { label: "Our Journal", href: "/about#my-story" },
    ],
  },
  {
    title: "Sitemap",
    links: [
      { label: "Client Galleries", href: "/portfolio#full-gallery" },
      { label: "The Experience", href: "/about#philosophy" },
      { label: "Services", href: "/#services" },
      { label: "Inquire", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[var(--footer)] text-[var(--muted)]">
      <div className="page-width flex flex-col gap-10 pt-14 pb-8 md:gap-16 md:pt-20 md:pb-12">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between md:gap-12">
          <div className="flex w-full max-w-80 flex-col gap-3 text-[13px] leading-relaxed md:w-80">
            <Link className="flex min-h-[29px] w-fit items-center" href="/" aria-label="Prime Yantra Photography home">
              <Image
                slot="shared.footerLogo" src={assets.shared.footerLogo}
                alt="Prime Yantra Photography"
                width={102}
                height={29}
                className="h-[29px] w-[102px] object-contain"
                unoptimized
              />
            </Link>
            <p>
              Fine art editorial photography preserving your life&apos;s most
              precious romantic memoirs. Serving Hansi, Hisar, Rohtak, Delhi, Gurgaon and Chandigarh.
            </p>
          </div>
          <div className="flex items-start justify-between gap-8 md:gap-20">
            {groups.map((group) => (
              <nav className="flex flex-col items-start" aria-label={group.title} key={group.title}>
                <h2 className="mb-3 !font-sans !text-[11px] !font-semibold !leading-normal tracking-[2px] !text-gold uppercase">{group.title}</h2>
                {group.links.map((link) => (
                  <Link className="flex min-h-11 items-center text-[13px] leading-normal md:min-h-0 md:py-[5px]" key={link.label} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-6 border-t border-[#2d2d2d] pt-8 text-xs leading-relaxed md:flex-row md:items-center md:leading-normal">
          <p>© {new Date().getFullYear()} Prime Yantra Photography. All Rights Reserved. Co-created with love.</p>
          <ul aria-label="Social platforms" className="m-0 flex list-none p-0">
            <li><a className="flex min-h-11 items-center md:min-h-0" href="https://www.instagram.com/prime__yantra_photography/" target="_blank" rel="noreferrer">Instagram</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
