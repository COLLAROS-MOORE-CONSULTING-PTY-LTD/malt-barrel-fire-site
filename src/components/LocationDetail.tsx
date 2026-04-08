"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Location } from "@/content/locations";

gsap.registerPlugin(ScrollTrigger);

interface LocationDetailProps {
  location: Location;
}

export default function LocationDetail({ location }: LocationDetailProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const els = heroRef.current.querySelectorAll("[data-hero-animate]");
    gsap.set(els, { y: 40, opacity: 0 });
    gsap.to(els, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      stagger: 0.15,
      delay: 0.3,
    });
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;
    const sections = contentRef.current.querySelectorAll("[data-section]");
    const triggers: ScrollTrigger[] = [];

    sections.forEach((section) => {
      const items = section.querySelectorAll("[data-animate]");
      gsap.set(items, { y: 40, opacity: 0 });
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top 82%",
        once: true,
        onEnter: () => {
          gsap.to(items, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
          });
        },
      });
      triggers.push(st);
    });

    return () => triggers.forEach((st) => st.kill());
  }, []);

  const tradingHoursEntries = Object.entries(location.tradingHours);
  const dayLabels: Record<string, string> = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  };

  return (
    <main className="min-h-screen">
      {/* ──────────── HERO ──────────── */}
      <section
        ref={heroRef}
        className="relative flex min-h-[60vh] items-center justify-center overflow-hidden lg:min-h-[55vh]"
      >
        {/* Hero image — shows real photo or placeholder */}
        <div className="absolute inset-0 bg-charcoal" />
        {location.heroImage ? (
          <>
            <Image
              src={location.heroImage}
              alt={`${location.name} interior`}
              fill
              className="object-cover"
              priority
              quality={85}
              sizes="100vw"
            />
            {/* Multi-layer overlay for readable text */}
            <div className="absolute inset-0 bg-black/55" />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.4) 100%)",
              }}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-warm-gray/20">
              <svg
                className="mx-auto mb-3 h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={0.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V4.5a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v15a1.5 1.5 0 001.5 1.5z"
                />
              </svg>
              <p className="text-xs tracking-wider uppercase">Photo coming soon</p>
            </div>
          </div>
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 80%, rgba(212, 145, 26, 0.06) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: "linear-gradient(to top, var(--background) 0%, transparent 100%)",
          }}
        />

        <div className="relative z-10 px-6 text-center max-w-4xl mx-auto">
          <p
            data-hero-animate
            className="mb-3 text-xs tracking-[0.4em] uppercase text-amber/90 md:text-sm"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
          >
            Malt Barrel &amp; Fire
          </p>
          <h1
            data-hero-animate
            className="font-serif text-4xl font-bold text-cream md:text-6xl lg:text-7xl"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.7)" }}
          >
            {location.name}
          </h1>
          <div
            data-hero-animate
            className="mx-auto my-5 h-px w-24 bg-gradient-to-r from-transparent via-amber/50 to-transparent"
          />
          <p
            data-hero-animate
            className="text-base tracking-wide text-cream/70 md:text-lg"
            style={{ textShadow: "0 1px 12px rgba(0,0,0,0.5)" }}
          >
            {location.tagline}
          </p>
        </div>
      </section>

      {/* ──────────── CONTENT ──────────── */}
      <div ref={contentRef} className="mx-auto max-w-5xl px-6 py-20 md:px-12">
        {/* Breadcrumb */}
        <nav className="mb-16 text-sm text-warm-gray">
          <Link href="/" className="transition-colors hover:text-cream">
            Home
          </Link>
          <span className="mx-2 text-charcoal-light">/</span>
          <span className="text-cream">{location.name}</span>
        </nav>

        {/* ── Location Info ── */}
        <section data-section>
          <h2 data-animate className="font-serif text-3xl font-bold text-cream md:text-4xl">
            Location Details
          </h2>
          <div data-animate className="mt-4 h-px w-16 bg-amber/40" />

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <div data-animate>
              <h3 className="mb-3 text-xs tracking-[0.2em] uppercase text-amber">
                Address
              </h3>
              <p className="text-lg text-cream">{location.address}</p>
            </div>
            <div data-animate>
              <h3 className="mb-3 text-xs tracking-[0.2em] uppercase text-amber">
                Phone
              </h3>
              <a
                href={`tel:${location.phone.replace(/\s/g, "")}`}
                className="text-lg text-cream transition-colors hover:text-amber"
              >
                {location.phone}
              </a>
            </div>
            <div data-animate>
              <h3 className="mb-3 text-xs tracking-[0.2em] uppercase text-amber">
                Email
              </h3>
              <a
                href={`mailto:${location.email}`}
                className="text-lg text-cream transition-colors hover:text-amber"
              >
                {location.email}
              </a>
            </div>
            <div data-animate>
              <h3 className="mb-3 text-xs tracking-[0.2em] uppercase text-amber">
                Instagram
              </h3>
              <a
                href={location.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-lg text-cream transition-colors hover:text-amber"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                {location.instagramHandle}
              </a>
            </div>
          </div>
        </section>

        {/* ── Trading Hours ── */}
        <section data-section className="mt-24">
          <h2 data-animate className="font-serif text-3xl font-bold text-cream md:text-4xl">
            Trading Hours
          </h2>
          <div data-animate className="mt-4 h-px w-16 bg-amber/40" />

          <div data-animate className="mt-10 max-w-sm">
            {tradingHoursEntries.map(([day, hours]) => (
              <div
                key={day}
                className="flex items-center justify-between border-b border-charcoal-light/40 py-3"
              >
                <span className="text-sm text-cream">{dayLabels[day]}</span>
                <span className="text-sm text-warm-gray">{hours}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Menu ── */}
        <section data-section className="mt-24">
          <h2 data-animate className="font-serif text-3xl font-bold text-cream md:text-4xl">
            Our Menu
          </h2>
          <div data-animate className="mt-4 h-px w-16 bg-amber/40" />

          <div data-animate className="mt-10">
            <a
              href={location.menuPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-sm border border-amber bg-amber px-8 py-4 text-sm tracking-[0.2em] uppercase text-background transition-all duration-300 hover:bg-amber-light hover:shadow-[0_0_40px_rgba(212,145,26,0.2)]"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View Menu
            </a>
          </div>
        </section>

        {/* ── Google Map Embed Placeholder ── */}
        <section data-section className="mt-24">
          <h2 data-animate className="font-serif text-3xl font-bold text-cream md:text-4xl">
            Find Us
          </h2>
          <div data-animate className="mt-4 h-px w-16 bg-amber/40" />

          <div
            data-animate
            className="mt-10 flex aspect-[16/9] items-center justify-center overflow-hidden rounded-sm border border-charcoal-light bg-charcoal/30"
          >
            <div className="text-center px-6">
              <svg
                className="mx-auto mb-4 h-14 w-14 text-warm-gray/20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="text-sm text-warm-gray/50">
                Google Maps embed — {location.address}
              </p>
              <a
                href={location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-xs tracking-[0.15em] uppercase text-amber transition-colors hover:text-amber-light"
              >
                Open in Google Maps &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* ── Follow Us — Per-location Instagram ── */}
        <section data-section className="mt-24">
          <h2 data-animate className="font-serif text-3xl font-bold text-cream md:text-4xl">
            Follow {location.name}
          </h2>
          <div data-animate className="mt-4 h-px w-16 bg-amber/40" />

          <div data-animate className="mt-10">
            <a
              href={location.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 rounded-sm border border-charcoal-light px-8 py-5 transition-all duration-300 hover:border-amber/40 hover:bg-charcoal/30"
            >
              <svg className="h-8 w-8 text-warm-gray transition-colors group-hover:text-amber" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              <div>
                <p className="text-lg text-cream transition-colors group-hover:text-amber">
                  {location.instagramHandle}
                </p>
                <p className="text-sm text-warm-gray/60">
                  Follow for specials, events &amp; updates
                </p>
              </div>
            </a>
          </div>
        </section>

        {/* ── Events Link ── */}
        <section data-section className="mt-24">
          <h2 data-animate className="font-serif text-3xl font-bold text-cream md:text-4xl">
            Events at {location.name}
          </h2>
          <div data-animate className="mt-4 h-px w-16 bg-amber/40" />
          <p data-animate className="mt-6 text-warm-gray">
            Check out what&apos;s happening at this location — from live music to tastings and specials.
          </p>
          <div data-animate className="mt-8">
            <Link
              href={`/events/${location.slug}`}
              className="group inline-flex items-center gap-2 rounded-sm border border-amber px-8 py-3 text-sm tracking-[0.2em] uppercase text-amber transition-all duration-300 hover:bg-amber hover:text-background"
            >
              View Events
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        {/* ── CTA ── */}
        <section data-section className="mt-24 border-t border-charcoal-light pt-16">
          <div data-animate className="text-center">
            <h2 className="font-serif text-3xl font-bold text-cream md:text-4xl">
              Ready to dine?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-warm-gray">
              Reserve your spot at Malt Barrel &amp; Fire {location.name}.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/book"
                className="rounded-sm border border-amber bg-amber px-10 py-4 text-sm tracking-[0.25em] uppercase text-background transition-all duration-300 hover:bg-amber-light hover:shadow-[0_0_40px_rgba(212,145,26,0.2)]"
              >
                Book a Table
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-sm border border-cream/20 px-10 py-4 text-sm tracking-[0.25em] uppercase text-cream transition-all duration-300 hover:border-cream/50"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                All Locations
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
