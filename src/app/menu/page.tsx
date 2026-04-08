"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { locations } from "@/content/locations";

export default function MenuPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Header entrance animation
  useEffect(() => {
    if (!headerRef.current) return;
    const els = headerRef.current.querySelectorAll("[data-animate]");
    gsap.set(els, { y: 30, opacity: 0 });
    gsap.to(els, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.12,
      delay: 0.3,
    });
  }, []);

  // Cards entrance animation
  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll("[data-card]");
    gsap.set(cards, { y: 40, opacity: 0 });
    gsap.to(cards, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.1,
      delay: 0.5,
    });
  }, []);

  return (
    <main className="min-h-screen pt-24">
      {/* Hero strip */}
      <div className="relative h-[35vh] overflow-hidden">
        <Image
          src="/images/food/prawns.jpg"
          alt="Menu"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
        <div
          ref={headerRef}
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          <p data-animate className="mb-3 text-sm tracking-[0.3em] uppercase text-amber">
            Malt Barrel &amp; Fire
          </p>
          <h1 data-animate className="font-serif text-5xl font-bold text-cream md:text-7xl">
            View Our Menus
          </h1>
          <div
            data-animate
            className="mt-4 h-px w-20 bg-gradient-to-r from-transparent via-amber/50 to-transparent"
          />
          <p data-animate className="mt-6 max-w-md text-center text-warm-gray">
            Select a location to view our full menu
          </p>
        </div>
      </div>

      {/* Location cards */}
      <div className="mx-auto max-w-5xl px-6 py-16 md:px-12">
        <div
          ref={cardsRef}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {locations.map((loc) => (
            <a
              key={loc.slug}
              href={loc.menuPdf}
              target="_blank"
              rel="noopener noreferrer"
              data-card
              className="group relative flex flex-col items-center rounded-sm border border-charcoal-light bg-charcoal/20 p-8 text-center transition-all duration-300 hover:border-amber/40 hover:bg-charcoal/40 hover:shadow-[0_0_40px_rgba(212,145,26,0.1)]"
            >
              {/* Icon */}
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-amber/30 bg-amber/5 transition-all group-hover:border-amber group-hover:bg-amber/10">
                <svg
                  className="h-6 w-6 text-amber"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>

              {/* Location name */}
              <h2 className="font-serif text-xl font-bold text-cream transition-colors group-hover:text-amber">
                {loc.name}
              </h2>

              {/* Tagline */}
              <p className="mt-2 text-xs text-warm-gray/60">
                {loc.tagline}
              </p>

              {/* Button */}
              <div className="mt-6 rounded-sm border border-amber/50 px-6 py-2 text-xs tracking-[0.15em] uppercase text-amber transition-all group-hover:border-amber group-hover:bg-amber group-hover:text-background">
                View Menu
              </div>
            </a>
          ))}
        </div>

        {/* Note */}
        <div className="mt-16 border-t border-charcoal-light pt-12 text-center">
          <p className="text-xs text-warm-gray/50">
            Menus open as PDF files. Prices are in ZAR. Items and availability may vary by location and season.
          </p>
        </div>
      </div>
    </main>
  );
}
