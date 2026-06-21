"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { locations } from "@/content/locations";
import { partners } from "@/content/partners";
import EmberParticles from "@/components/EmberParticles";

function LocationCard({ loc, index }: { loc: typeof locations[0]; index: number }) {
  return (
    <Link
      href={`/${loc.slug}`}
      data-animate
      data-delay={index * 0.08}
      className="group relative overflow-hidden rounded-sm border border-charcoal-light p-8 transition-[border-color,background-color] duration-300 hover:border-amber/40 hover:bg-charcoal/50"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "radial-gradient(circle at 50% 100%, rgba(212,145,26,0.12), transparent 55%)",
        }}
      />
      <div className="absolute top-0 left-0 h-1 w-0 bg-amber transition-all duration-700 group-hover:w-full" />
      <h3 className="font-serif text-2xl text-cream transition-colors duration-300 group-hover:text-amber">
        {loc.name}
      </h3>
      <p className="mt-3 text-sm text-warm-gray/80">{loc.tagline}</p>
      <p className="mt-2 text-sm text-warm-gray">{loc.address}</p>
      <p className="mt-1 text-xs text-warm-gray/60">{loc.hours}</p>
      <div className="mt-6 flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-amber opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
        View Details
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const els = hero.querySelectorAll("[data-hero-animate]");
    const context = gsap.context(() => {
      gsap.set(els, { y: 36, opacity: 0, willChange: "transform, opacity" });
      gsap.to(els, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.15,
        clearProps: "transform,opacity,willChange",
      });
    }, hero);

    return () => context.revert();
  }, []);

  return (
    <div>
      {/* ──────────── HERO ──────────── */}
      <section
        ref={heroRef}
        className="relative flex min-h-svh items-center justify-center overflow-hidden"
      >
        <Image
          src="/images/locations/midrand-hero.jpg"
          alt="MALT Barrel & Fire Midrand interior"
          fill
          className="object-cover object-[54%_45%]"
          priority
          quality={80}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/68" />
        {/* Vignette */}
        <div className="absolute inset-0 vignette" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 85%, rgba(212, 145, 26, 0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{
            background: "linear-gradient(to top, var(--background) 0%, transparent 100%)",
          }}
        />

        <EmberParticles />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <h1
            data-hero-animate
            className="mx-auto flex items-center justify-center"
          >
            <Image
              src="/images/logo-hd-clean.png"
              alt="MALT Barrel & Fire"
              width={1600}
              height={1600}
              className="h-auto w-[clamp(12rem,28vw,23rem)] max-h-[42vh] object-contain drop-shadow-[0_16px_45px_rgba(0,0,0,0.75)]"
              priority
              unoptimized
            />
          </h1>
          <div
            data-hero-animate
            className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-amber/60 to-transparent"
          />
          <p
            data-hero-animate
            className="mx-auto mt-6 max-w-3xl text-lg font-medium tracking-[0.18em] uppercase text-cream/85 md:text-2xl"
            style={{ textShadow: "0 1px 20px rgba(0,0,0,0.65)" }}
          >
            Savour the Malt. Share the Moment.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[10px] tracking-[0.4em] uppercase text-warm-gray/50">
            Discover
          </span>
          <div
            className="flex flex-col items-center"
            style={{ animation: "scrollBounce 2s ease-in-out infinite" }}
          >
            <svg
              className="h-5 w-5 text-amber/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* ──────────── ABOUT STRIP ──────────── */}
      <section data-section className="relative py-32 px-6 md:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <p data-animate className="mb-5 text-sm tracking-[0.4em] uppercase text-amber">
            The MALT Experience
          </p>
          <h2
            data-animate
            className="font-serif text-3xl font-bold leading-snug text-cream md:text-5xl lg:text-6xl"
          >
            MALT Barrel &amp; Fire is a destination for memorable dining, handcrafted cocktails, premium spirits, and vibrant moments.
          </h2>
          <div
            data-animate
            className="mx-auto mt-6 h-px w-20 bg-gradient-to-r from-transparent via-amber/40 to-transparent"
          />
          <p
            data-animate
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-warm-gray md:text-xl"
          >
            Whether you&apos;re joining us for a relaxed lunch, after-work drinks, or a night out,
            every visit is designed to be savoured.
          </p>
        </div>
      </section>

      {/* ──────────── IMAGE DIVIDER ──────────── */}
      <div className="relative h-[50vh] overflow-hidden">
        <Image
          src="/images/drinks/spirits-bar.jpg"
          alt="Spirit bottles at the bar"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      {/* ──────────── LOCATIONS ──────────── */}
      <section data-section className="relative py-32 px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p data-animate className="mb-5 text-sm tracking-[0.4em] uppercase text-amber">
              Visit Us
            </p>
            <h2 data-animate className="font-serif text-4xl font-bold text-cream md:text-5xl lg:text-6xl">
              Our Locations
            </h2>
            <div
              data-animate
              className="mx-auto mt-5 h-px w-20 bg-gradient-to-r from-transparent via-amber/40 to-transparent"
            />
          </div>

          <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ perspective: "800px" }}>
            {locations.map((loc, i) => (
              <LocationCard key={loc.slug} loc={loc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── PROUD PARTNERS ──────────── */}
      <section data-section className="relative py-24 px-6 md:px-12 border-t border-b border-charcoal-light">
        <div className="mx-auto max-w-6xl">
          <p
            data-animate
            className="mb-4 text-center text-xs tracking-[0.4em] uppercase text-amber"
          >
            Proud Partners
          </p>
          <p
            data-animate
            className="mb-14 text-center text-sm text-warm-gray/60"
          >
            Crafted with the finest brands
          </p>
          <div
            data-animate
            data-from="scale"
            className="mx-auto grid max-w-5xl grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 md:gap-x-10"
          >
            {partners.map((partner) => (
              <div
                key={partner.slug}
                className="group flex min-h-36 flex-col items-center justify-between gap-3 py-4 opacity-85 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:opacity-100"
              >
                <div className="relative h-20 w-full max-w-40 drop-shadow-[0_7px_16px_rgba(0,0,0,0.7)]">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 40vw, 160px"
                  />
                </div>
                <span className="text-[10px] tracking-wider uppercase text-warm-gray/60 text-center leading-tight group-hover:text-warm-gray transition-colors">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── CTA STRIP ──────────── */}
      <section data-section className="relative overflow-hidden py-36 px-6 md:px-12">
        <Image
          src="/images/bar-interior.jpg"
          alt="Bar ambience"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/85" />

        <div className="relative text-center">
          <h2
            data-animate
            className="text-shimmer font-serif text-4xl font-bold md:text-6xl lg:text-7xl"
          >
            Your table awaits
          </h2>
          <p
            data-animate
            className="mx-auto mt-6 max-w-md text-lg text-warm-gray"
          >
            Join us for an evening shaped by smoke, spirit, and craft.
          </p>
          <div
            data-animate
            className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/book"
              className="button-pulse rounded-sm border border-amber bg-amber px-12 py-4 text-sm tracking-[0.25em] uppercase text-background transition-all duration-300 hover:bg-amber-light hover:shadow-[0_0_40px_rgba(212,145,26,0.2)]"
            >
              Book a Table
            </Link>
            <Link
              href="/contact"
              className="rounded-sm border border-cream/20 px-12 py-4 text-sm tracking-[0.25em] uppercase text-cream transition-all duration-300 hover:border-cream/50"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
