"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const locations = [
  {
    slug: "silver-lakes",
    name: "Silver Lakes & Queenswood",
    pdf: "/menu-silverlakes-queenswood.pdf",
  },
  {
    slug: "monte-casino",
    name: "Montecasino",
    pdf: "/menu-montecasino.pdf",
  },
  {
    slug: "midrand",
    name: "Midrand",
    pdf: "/menu-midrand.pdf",
  },
];

export default function MenuPage() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0].slug);
  const headerRef = useRef<HTMLDivElement>(null);

  const currentLocation = locations.find((l) => l.slug === selectedLocation)!;

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
            The Menu
          </h1>
          <div
            data-animate
            className="mt-4 h-px w-20 bg-gradient-to-r from-transparent via-amber/50 to-transparent"
          />
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 pt-12 md:px-12">
        {/* Location selector */}
        <div className="mb-10">
          <p className="mb-4 text-center text-xs tracking-[0.3em] uppercase text-warm-gray/60">
            Select Location
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {locations.map((loc) => (
              <button
                key={loc.slug}
                onClick={() => setSelectedLocation(loc.slug)}
                className={`cursor-pointer rounded-sm px-6 py-2.5 text-xs tracking-[0.15em] uppercase transition-all ${
                  selectedLocation === loc.slug
                    ? "border border-amber bg-amber/10 text-amber"
                    : "border border-charcoal-light text-warm-gray hover:border-amber/30 hover:text-cream"
                }`}
              >
                {loc.name}
              </button>
            ))}
          </div>
        </div>

        {/* View Menu button */}
        <div className="flex flex-col items-center gap-6 py-10">
          <p className="text-sm text-warm-gray/60">
            Viewing menu for{" "}
            <span className="text-cream">{currentLocation.name}</span>
          </p>
          
            href={currentLocation.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm border border-amber bg-amber/10 px-10 py-4 text-sm tracking-[0.2em] uppercase text-amber transition-all hover:bg-amber hover:text-charcoal"
          >
            View Menu
          </a>
        </div>

        {/* Note */}
        <div className="border-t border-charcoal-light py-12 text-center">
          <p className="text-xs text-warm-gray/50">
            Prices are in ZAR. Menu items and availability may vary by location and season.
          </p>
        </div>
      </div>
    </main>
  );
}
