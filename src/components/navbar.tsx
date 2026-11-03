"use client";

import { ManagedImage as Image } from "./managed-image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { assets } from "@/lib/assets";

const links = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    function closeOutside(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    }
    function closeOnDesktop() {
      if (window.innerWidth > 767) setOpen(false);
    }
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [open]);

  return (
    <header ref={header} className="site-header">
      <div className="navbar page-width">
        <Link
          href="/"
          aria-label="Prime Yantra Photography home"
          className="logo-link"
          onClick={() => setOpen(false)}
        >
          <Image
            slot="shared.logo" src={assets.shared.logo}
            alt="Prime Yantra Photography"
            width={150}
            height={58}
            sizes="100vw"
            unoptimized
          />
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link className="button button-dark nav-inquiry" href="/contact">
          Book your shoot
        </Link>
        <button
          ref={toggle}
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          <span className={open ? "hamburger is-open" : "hamburger"}>
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
      <div className={`mobile-menu ${open ? "is-open" : ""}`} inert={!open}>
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="mobile-menu-inner"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            className="button button-dark"
            href="/contact"
            onClick={() => setOpen(false)}
          >
            Book your shoot
          </Link>
        </nav>
      </div>
    </header>
  );
}
