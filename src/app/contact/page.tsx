"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { locations } from "@/content/locations";
gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!contentRef.current) return;
    const items = contentRef.current.querySelectorAll("[data-animate]");
    gsap.set(items, { y: 40, opacity: 0 });

    const triggers: ScrollTrigger[] = [];
    const sections = contentRef.current.querySelectorAll("[data-section]");
    sections.forEach((section) => {
      const sectionItems = section.querySelectorAll("[data-animate]");
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(sectionItems, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.08,
          });
        },
      });
      triggers.push(st);
    });

    return () => triggers.forEach((st) => st.kill());
  }, []);

  return (
    <main className="min-h-screen pt-24">
      {/* Header */}
      <div className="py-20 px-6 md:px-12">
        <div ref={headerRef} className="mx-auto max-w-4xl text-center">
          <p data-animate className="mb-4 text-sm tracking-[0.3em] uppercase text-amber">
            Get in Touch
          </p>
          <h1 data-animate className="font-serif text-5xl font-bold text-cream md:text-7xl">
            Contact
          </h1>
          <div
            data-animate
            className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-amber/50 to-transparent"
          />
          <p data-animate className="mx-auto mt-8 max-w-lg text-lg text-warm-gray">
            Whether you&apos;re looking to book a table, host a private event, or just say hello —
            we&apos;d love to hear from you.
          </p>
        </div>
      </div>

      <div ref={contentRef}>
        {/* Locations grid */}
        <section data-section className="px-6 pb-24 md:px-12">
          <div className="mx-auto max-w-6xl">
            <p
              data-animate
              className="mb-10 text-center text-sm tracking-[0.3em] uppercase text-amber"
            >
              Our Branches
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {locations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/locations/${loc.slug}`}
                  data-animate
                  className="group rounded-sm border border-charcoal-light p-7 transition-all duration-300 hover:border-amber/40 hover:bg-charcoal/50"
                >
                  <h3 className="font-serif text-xl text-cream transition-colors group-hover:text-amber">
                    {loc.name}
                  </h3>
                  <p className="mt-2 text-sm text-warm-gray">{loc.address}</p>
                  <p className="mt-1 text-xs text-warm-gray/60">{loc.hours}</p>
                  <a
                    href={`tel:${loc.phone.replace(/\s/g, "")}`}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-3 inline-block text-sm text-amber transition-colors hover:text-amber-light"
                  >
                    {loc.phone}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* General enquiries */}
        <section
          data-section
          className="border-t border-charcoal-light py-20 px-6 md:px-12"
        >
          <div className="mx-auto max-w-lg text-center">
            <p data-animate className="mb-4 text-sm tracking-[0.3em] uppercase text-amber">
              General Enquiries
            </p>
            <p data-animate className="text-warm-gray">
              For partnerships, press, or general enquiries:
            </p>
            <a
              data-animate
              href="mailto:info@maltmidrand.co.za"
              className="mt-4 inline-block text-lg text-amber transition-colors hover:text-amber-light"
            >
              info@maltmidrand.co.za
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
