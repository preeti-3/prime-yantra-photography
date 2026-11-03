import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { assets } from "@/lib/assets";
import { ManagedImage } from "./managed-image";

export function Photo({
  src,
  slot,
  alt,
  className = "",
  sizes = "(max-width: 767px) 100vw, 50vw",
  priority = false,
}: {
  src: string;
  slot?: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`photo ${className}`}>
      <ManagedImage
        slot={slot}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={85}
        priority={priority}
      />
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  children,
  centered = false,
  className = "",
}: {
  eyebrow: string;
  children: ReactNode;
  centered?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`section-heading ${centered ? "text-center" : ""} ${className}`}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2>{children}</h2>
    </div>
  );
}

export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className="text-link">
      {children}
      <Image src={assets.home.imgArrowRight} alt="" width={16} height={16} />
    </Link>
  );
}
