"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { locations } from "@/content/locations";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const items = footer.querySelectorAll("[data-footer-animate]");
    gsap.set(items, { y: 30, opacity: 0 });

    const st = ScrollTrigger.create({
      trigger: footer,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(items, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.08,
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <footer ref={footerRef} className="border-t border-charcoal-light bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div data-footer-animate>
            <Image
              src="/images/logo.png"
              alt="Malt Barrel & Fire"
              width={120}
              height={50}
              className="mb-6 h-12 w-auto"
            />
            <p className="max-w-xs text-sm leading-relaxed text-warm-gray">
              Wood-fired cuisine, rare spirits, and an atmosphere forged in flame. Four locations across Gauteng.
            </p>
          </div>

          {/* Locations */}
          <div data-footer-animate>
            <h4 className="mb-5 text-xs tracking-[0.2em] uppercase text-amber">
              Our Locations
            </h4>
            <div className="space-y-3">
              {locations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/${loc.slug}`}
                  className="block text-sm text-warm-gray transition-colors hover:text-cream"
                >
                  {loc.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div data-footer-animate>
            <h4 className="mb-5 text-xs tracking-[0.2em] uppercase text-amber">
              Navigate
            </h4>
            <div className="space-y-3">
              <Link
                href="/menu"
                className="block text-sm text-warm-gray transition-colors hover:text-cream"
              >
                Menu
              </Link>
              <Link
                href="/book"
                className="block text-sm text-warm-gray transition-colors hover:text-cream"
              >
                Book a Table
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-warm-gray transition-colors hover:text-cream"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div data-footer-animate>
            <h4 className="mb-5 text-xs tracking-[0.2em] uppercase text-amber">
              Get in Touch
            </h4>
            <div className="space-y-3 text-sm text-warm-gray">
              <a
                href="mailto:info@maltmidrand.co.za"
                className="block transition-colors hover:text-cream"
              >
                info@maltmidrand.co.za
              </a>
              <a
                href="tel:0115947947"
                className="block transition-colors hover:text-cream"
              >
                011 594 7947
              </a>
              <p className="text-warm-gray/60">
                General enquiries &amp; bookings
              </p>
            </div>
            <Link
              href="/book"
              className="mt-6 inline-block rounded-sm border border-amber px-6 py-2.5 text-xs tracking-[0.2em] uppercase text-amber transition-all duration-300 hover:bg-amber hover:text-background"
            >
              Reserve a Table
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div data-footer-animate className="mt-14 border-t border-charcoal-light pt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-xs text-warm-gray/60">
            &copy; {new Date().getFullYear()} Collaros &amp; Moore Consulting (PTY) LTD
          </p>
          <p className="text-xs text-warm-gray/40">
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
