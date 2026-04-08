"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { locations } from "@/content/locations";

const navLinks = [
  { label: "Menu", href: "/menu" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      scrollProgress.current = Math.min(y / 300, 1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setLocationsOpen(false);
  }, [pathname]);

  // Staggered mobile menu entrance
  useEffect(() => {
    if (!mobileLinksRef.current) return;
    const links = mobileLinksRef.current.querySelectorAll("[data-mobile-link]");

    if (mobileOpen) {
      gsap.set(links, { y: 30, opacity: 0 });
      gsap.to(links, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.06,
        delay: 0.15,
      });
    }
  }, [mobileOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLocationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isLocationPage = locations.some(
    (loc) => pathname === `/${loc.slug}` || pathname === `/locations/${loc.slug}`
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || mobileOpen
          ? "bg-background/95 shadow-lg shadow-black/20 backdrop-blur-lg"
          : "bg-transparent backdrop-blur-none"
      }`}
    >
      {/* Scroll progress line */}
      <div
        className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-amber/60 via-amber to-amber/60 transition-opacity duration-300"
        style={{
          width: `${scrollProgress.current * 100}%`,
          opacity: scrolled ? 0.5 : 0,
        }}
      />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
        {/* Logo */}
        <Link href="/" className="relative z-50 flex items-center">
          <Image
            src="/images/logo.png"
            alt="Malt Barrel & Fire"
            width={160}
            height={67}
            className="h-12 w-auto md:h-14"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-10 md:flex">
          {/* Locations dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setLocationsOpen(!locationsOpen)}
              className={`flex items-center gap-1.5 text-sm tracking-[0.18em] uppercase transition-colors cursor-pointer ${
                isLocationPage ? "text-amber" : "text-warm-gray hover:text-cream"
              }`}
            >
              Locations
              <svg
                className={`h-3 w-3 transition-transform duration-200 ${locationsOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown panel */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 rounded-sm border border-charcoal-light bg-background/98 backdrop-blur-lg p-2 shadow-xl shadow-black/30 transition-all duration-200 ${
                locationsOpen
                  ? "pointer-events-auto opacity-100 translate-y-0"
                  : "pointer-events-none opacity-0 -translate-y-2"
              }`}
            >
              {locations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/${loc.slug}`}
                  className={`block rounded-sm px-4 py-3 text-sm transition-colors ${
                    pathname === `/${loc.slug}`
                      ? "text-amber bg-amber/5"
                      : "text-warm-gray hover:text-cream hover:bg-charcoal/50"
                  }`}
                >
                  {loc.name}
                </Link>
              ))}
            </div>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-[0.18em] uppercase transition-colors ${
                pathname === link.href
                  ? "text-amber"
                  : "text-warm-gray hover:text-cream"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="rounded-sm border border-amber px-6 py-2.5 text-xs tracking-[0.2em] uppercase text-amber transition-all duration-300 hover:bg-amber hover:text-background hover:shadow-[0_0_30px_rgba(212,145,26,0.15)]"
          >
            Book a Table
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden cursor-pointer"
          aria-label="Toggle menu"
        >
          <span
            className={`h-px w-6 bg-cream transition-all duration-300 ${
              mobileOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-cream transition-all duration-300 ${
              mobileOpen ? "-translate-y-[2.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 top-0 z-40 flex flex-col items-center justify-center bg-background/98 backdrop-blur-lg transition-all duration-500 md:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div ref={mobileLinksRef} className="flex flex-col items-center gap-6">
          {/* Locations header */}
          <p data-mobile-link className="text-xs tracking-[0.3em] uppercase text-amber/60">
            Our Locations
          </p>
          {locations.map((loc) => (
            <Link
              key={loc.slug}
              href={`/${loc.slug}`}
              data-mobile-link
              className={`font-serif text-2xl transition-colors ${
                pathname === `/${loc.slug}` ? "text-amber" : "text-cream/80 hover:text-cream"
              }`}
            >
              {loc.name}
            </Link>
          ))}

          <div data-mobile-link className="my-2 h-px w-16 bg-charcoal-light" />

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-mobile-link
              className={`font-serif text-2xl transition-colors ${
                pathname === link.href ? "text-amber" : "text-cream"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book"
            data-mobile-link
            className="mt-4 rounded-sm border border-amber px-10 py-4 text-sm tracking-[0.25em] uppercase text-amber transition-all hover:bg-amber hover:text-background"
          >
            Book a Table
          </Link>
        </div>
      </div>
    </nav>
  );
}
