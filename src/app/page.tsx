"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { locations } from "@/content/locations";
import { partners } from "@/content/partners";
import EmberParticles from "@/components/EmberParticles";

gsap.registerPlugin(ScrollTrigger);

function useMouseParallax(ref: React.RefObject<HTMLDivElement | null>, intensity: number = 0.02) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const xOffset = (e.clientX / window.innerWidth - 0.5) * intensity * 100;
      const yOffset = (e.clientY / window.innerHeight - 0.5) * intensity * 100;
      gsap.to(el, {
        x: -xOffset,
        y: -yOffset,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [ref, intensity]);
}

// Card tilt effect
function useCardTilt(cardRef: React.RefObject<HTMLElement | null>) {
  const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: x * 8,
      rotateX: -y * 8,
      duration: 0.4,
      ease: "power2.out",
    });

    // Move glow element
    const glow = card.querySelector("[data-glow]") as HTMLElement;
    if (glow) {
      gsap.to(glow, {
        x: x * 80,
        y: y * 80,
        opacity: 0.15,
        duration: 0.4,
      });
    }
  }, [cardRef]);

  const onLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: "power2.out" });
    const glow = card.querySelector("[data-glow]") as HTMLElement;
    if (glow) {
      gsap.to(glow, { opacity: 0, duration: 0.4 });
    }
  }, [cardRef]);

  return { onMove, onLeave };
}

function LocationCard({ loc, index }: { loc: typeof locations[0]; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const { onMove, onLeave } = useCardTilt(cardRef as React.RefObject<HTMLElement | null>);

  return (
    <Link
      ref={cardRef}
      href={`/${loc.slug}`}
      data-animate
      data-delay={index * 0.08}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="card-3d group relative overflow-hidden rounded-sm border border-charcoal-light p-8 transition-all duration-500 hover:border-amber/40 hover:bg-charcoal/50"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Ambient glow */}
      <div
        data-glow
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          background: "radial-gradient(circle 120px, rgba(212,145,26,0.2), transparent)",
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

const menuShowcase = [
  {
    title: "Prime Cuts",
    image: "/images/food/ribs.jpg",
    alt: "Plated MALT ribs and prime cuts",
    copy: "Generous plates, steaks, ribs and signature dishes made for the table.",
  },
  {
    title: "Seafood",
    image: "/images/menu-prawns.jpg",
    alt: "MALT prawns served at the table",
    copy: "Prawns, seafood plates and bright coastal flavours across the menu.",
  },
  {
    title: "Cocktails",
    image: "/images/drinks/espresso-martini.jpg",
    alt: "MALT espresso martini cocktail",
    copy: "Classic cocktails, signature serves and premium spirits from the bar.",
  },
];

const newToMalt = [
  {
    label: "Sushi",
    title: "MALT Signature Sushi",
    copy: "Rock & Roll, Tiger Roll, Crunchy Roll and platters at select locations.",
  },
  {
    label: "Seafood",
    title: "Tiger Giants",
    copy: "Large prawns with lemon butter, Porto sauce or peri-peri.",
  },
  {
    label: "Cocktails",
    title: "Malt Espresso Martini",
    copy: "Vodka, Kahlua, Illy espresso, vanilla, cream and cocoa.",
  },
  {
    label: "Signature",
    title: "Tomahawk Steak",
    copy: "A 900g rib-eye on the bone, served as a proper occasion dish.",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  useMouseParallax(heroTextRef, 0.015);

  // Hero entrance animation — text reveal with clip-path
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const els = hero.querySelectorAll("[data-hero-animate]");

    gsap.set(els, {
      y: 60,
      opacity: 0,
      filter: "blur(8px)",
    });

    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(els, {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.4,
      ease: "power3.out",
      stagger: 0.15,
    });
  }, []);

  // Scroll-triggered animations — varied entrances
  useEffect(() => {
    const container = sectionsRef.current;
    if (!container) return;

    const sections = container.querySelectorAll("[data-section]");
    const triggers: ScrollTrigger[] = [];

    sections.forEach((section) => {
      const items = section.querySelectorAll("[data-animate]");

      items.forEach((item) => {
        const direction = (item as HTMLElement).dataset.from || "bottom";
        const initial: gsap.TweenVars = { opacity: 0 };

        switch (direction) {
          case "left":
            initial.x = -60;
            break;
          case "right":
            initial.x = 60;
            break;
          case "scale":
            initial.scale = 0.85;
            break;
          default:
            initial.y = 50;
        }

        gsap.set(item, initial);
      });

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top 82%",
        once: true,
        onEnter: () => {
          items.forEach((item, i) => {
            const direction = (item as HTMLElement).dataset.from || "bottom";
            const delay = parseFloat((item as HTMLElement).dataset.delay || "0");
            const target: gsap.TweenVars = {
              opacity: 1,
              duration: 0.9,
              ease: "power2.out",
              delay: i * 0.12 + delay,
            };

            switch (direction) {
              case "left":
              case "right":
                target.x = 0;
                break;
              case "scale":
                target.scale = 1;
                break;
              default:
                target.y = 0;
            }

            gsap.to(item, target);
          });
        },
      });
      triggers.push(st);
    });

    // Parallax + zoom on image dividers
    const dividers = container.querySelectorAll("[data-parallax]");
    dividers.forEach((div) => {
      const img = div.querySelector("img");
      if (!img) return;
      const st = ScrollTrigger.create({
        trigger: div,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          gsap.set(img, {
            y: self.progress * 60 - 30,
            scale: 1 + self.progress * 0.1,
          });
        },
      });
      triggers.push(st);
    });

    // CTA parallax
    const ctaBg = container.querySelector("[data-cta-bg]");
    if (ctaBg) {
      const st = ScrollTrigger.create({
        trigger: ctaBg.parentElement,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          gsap.set(ctaBg, { y: self.progress * 40 - 20 });
        },
      });
      triggers.push(st);
    }

    return () => triggers.forEach((st) => st.kill());
  }, []);

  return (
    <div ref={sectionsRef}>
      {/* ──────────── HERO ──────────── */}
      <section
        ref={heroRef}
        className="relative flex h-screen items-center justify-center overflow-hidden"
      >
        <Image
          src="/images/locations/midrand-hero.jpg"
          alt="MALT Barrel & Fire Midrand interior"
          fill
          className="object-cover object-[54%_45%] ken-burns"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-black/68" />
        {/* Vignette */}
        <div className="absolute inset-0 vignette" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 85%, rgba(212, 145, 26, 0.12) 0%, transparent 70%)",
            animation: "fireGlow 4s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{
            background: "linear-gradient(to top, var(--background) 0%, transparent 100%)",
          }}
        />

        <EmberParticles />

        <div ref={heroTextRef} className="relative z-10 px-6 text-center max-w-5xl mx-auto">
          <p
            data-hero-animate
            className="mb-5 text-xs tracking-[0.5em] uppercase text-amber/90 md:text-sm"
          >
            Dining &bull; Sushi &bull; Cocktails &bull; Premium Spirits
          </p>
          <h1
            data-hero-animate
            className="font-sans leading-none text-cream"
            style={{ textShadow: "0 2px 30px rgba(0,0,0,0.7)" }}
          >
            <span className="block text-6xl font-black tracking-[0.18em] text-amber md:text-8xl lg:text-9xl">
              MALT
            </span>
            <span className="mt-3 block text-xl font-semibold tracking-[0.28em] text-cream md:text-3xl lg:text-4xl">
              Barrel &amp; Fire
            </span>
          </h1>
          <div
            data-hero-animate
            className="mx-auto my-6 h-px w-28 bg-gradient-to-r from-transparent via-amber/60 to-transparent"
          />
          <p
            data-hero-animate
            className="text-lg tracking-[0.4em] uppercase text-cream/70 md:text-xl"
            style={{ textShadow: "0 1px 12px rgba(0,0,0,0.5)" }}
          >
            Dine. Sip. Stay awhile.
          </p>
          <p
            data-hero-animate
            className="mx-auto mt-3 max-w-lg text-sm text-cream/50 leading-relaxed md:text-base"
          >
            A contemporary dining and drinks destination with bold plates, sushi, cocktails and premium pours across Gauteng.
          </p>
          <div
            data-hero-animate
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/menu"
              className="button-pulse group inline-flex items-center gap-3 rounded-sm border border-amber px-10 py-4 text-sm tracking-[0.25em] uppercase text-amber transition-all duration-300 hover:bg-amber hover:text-background hover:shadow-[0_0_40px_rgba(212,145,26,0.25)]"
            >
              Explore Menu
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/book"
              className="rounded-sm border border-cream/20 px-10 py-4 text-sm tracking-[0.25em] uppercase text-cream transition-all duration-300 hover:border-amber hover:text-amber hover:bg-amber/5"
            >
              Book a Table
            </Link>
          </div>
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
            Built for the table, the glass and the night out
          </h2>
          <div
            data-animate
            className="mx-auto mt-6 h-px w-20 bg-gradient-to-r from-transparent via-amber/40 to-transparent"
          />
          <p
            data-animate
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-warm-gray md:text-xl"
          >
            MALT Barrel &amp; Fire brings together generous food, fresh sushi at select locations,
            crafted cocktails, premium pours and a room with energy. It is polished without being
            stiff, social without losing the food, and built for everything from lunch to late nights.
          </p>
        </div>
      </section>

      {/* ──────────── IMAGE DIVIDER ──────────── */}
      <div data-parallax className="relative h-[50vh] overflow-hidden">
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

      {/* ──────────── MENU SHOWCASE ──────────── */}
      <section data-section className="relative overflow-hidden px-6 py-32 md:px-12">
        <div className="absolute inset-0 bg-charcoal/40" />
        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p data-animate data-from="left" className="mb-5 text-sm tracking-[0.4em] uppercase text-amber">
              From the Menu
            </p>
            <h2
              data-animate
              data-from="left"
              className="font-serif text-4xl font-bold text-cream md:text-5xl lg:text-6xl"
            >
              More than flame
            </h2>
            <div data-animate data-from="left" className="mt-5 h-px w-20 bg-gradient-to-r from-amber/40 to-transparent" />
            <p data-animate data-from="left" className="mt-8 text-lg leading-relaxed text-warm-gray md:text-xl">
              From sushi and seafood to prime cuts, casual plates and cocktails, the menu is built
              around choice. Come for a full table, a quick bite, a drink at the bar or something new.
            </p>
          </div>

          <div data-animate data-from="bottom" className="mt-14 grid gap-6 md:grid-cols-3">
            {menuShowcase.map((item) => (
              <article key={item.title} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-charcoal">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-cream">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-warm-gray">{item.copy}</p>
              </article>
            ))}
          </div>

          <div data-animate className="mt-12">
            <Link
              href="/menu"
              className="group inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase text-amber transition-colors hover:text-amber-light"
            >
              View Full Menu
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ──────────── NEW TO MALT ──────────── */}
      <section data-section className="relative border-y border-charcoal-light px-6 py-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p data-animate className="mb-5 text-sm tracking-[0.4em] uppercase text-amber">
                New to MALT
              </p>
              <h2 data-animate className="font-serif text-4xl font-bold text-cream md:text-5xl">
                Dishes, sushi and cocktails to try
              </h2>
            </div>
            <p data-animate className="max-w-md text-sm leading-relaxed text-warm-gray">
              Featured from the current menu data. Sushi is available at select locations.
            </p>
          </div>

          <div data-animate className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {newToMalt.map((item) => (
              <article
                key={item.title}
                className="rounded-sm border border-charcoal-light bg-charcoal/30 p-6 transition-all duration-300 hover:border-amber/40 hover:bg-charcoal/50"
              >
                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-amber">
                  {item.label}
                </p>
                <h3 className="mt-5 text-xl font-semibold text-cream">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-warm-gray">{item.copy}</p>
              </article>
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
            className="grid grid-cols-4 gap-8 sm:grid-cols-4 md:grid-cols-8"
          >
            {partners.map((partner) => (
              <div
                key={partner.slug}
                className="group flex flex-col items-center justify-center gap-3 py-4 transition-all duration-300 hover:opacity-100 opacity-50 hover:scale-105"
              >
                {/* Logo placeholder — drop official logos into /public/images/partners/ */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-charcoal-light bg-charcoal/30 transition-all duration-300 group-hover:border-amber/40 group-hover:bg-charcoal/50">
                  <span className="text-[10px] font-bold uppercase text-warm-gray/80 group-hover:text-amber transition-colors">
                    {partner.name.slice(0, 2)}
                  </span>
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
          data-cta-bg
          src="/images/bar-interior.jpg"
          alt="Bar ambience"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

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
