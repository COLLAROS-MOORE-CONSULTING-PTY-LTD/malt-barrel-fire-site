"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

const menuData = [
  {
    category: "Starters",
    items: [
      { name: "Smoked Bone Marrow", desc: "Charred sourdough, herb gremolata, flaked salt", price: "$18" },
      { name: "Ember-Roasted Beets", desc: "Whipped goat cheese, candied walnuts, aged balsamic", price: "$15" },
      { name: "Whiskey-Cured Salmon", desc: "Dill crème fraîche, pickled shallots, rye crisps", price: "$19" },
      { name: "Charred Octopus", desc: "Romesco, crispy potatoes, smoked paprika oil", price: "$22" },
    ],
  },
  {
    category: "Mains",
    items: [
      { name: "36oz Tomahawk Ribeye", desc: "Bone-in, dry-aged 45 days, roasted garlic butter", price: "$89" },
      { name: "Wood-Fired Whole Branzino", desc: "Lemon, capers, brown butter, charred broccolini", price: "$42" },
      { name: "Smoked Short Rib", desc: "12-hour oak smoke, bourbon glaze, truffle mash", price: "$48" },
      { name: "Cast Iron Duck Breast", desc: "Cherry gastrique, roasted root vegetables, jus", price: "$44" },
    ],
  },
  {
    category: "Whiskey",
    items: [
      { name: "Macallan 18", desc: "Sherry oak, Highland Single Malt", price: "$45" },
      { name: "Pappy Van Winkle 15yr", desc: "Kentucky Straight Bourbon", price: "$85" },
      { name: "Yamazaki 12", desc: "Japanese Single Malt Whisky", price: "$38" },
      { name: "Barrel & Fire Old Fashioned", desc: "House bourbon blend, smoked maple, Angostura", price: "$22" },
    ],
  },
  {
    category: "Wine",
    items: [
      { name: "Châteauneuf-du-Pape", desc: "Domaine du Vieux Télégraphe, Rhône Valley 2019", price: "$28" },
      { name: "Barolo Riserva", desc: "Giacomo Conterno, Piedmont 2016", price: "$42" },
      { name: "Opus One", desc: "Napa Valley Red Blend 2018", price: "$65" },
      { name: "Sancerre", desc: "Domaine Vacheron, Loire Valley 2021", price: "$18" },
    ],
  },
];

interface MenuOverlayProps {
  onClose: () => void;
}

export default function MenuOverlay({ onClose }: MenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(0);

  const animateItems = useCallback(() => {
    if (!itemsRef.current) return;
    const items = itemsRef.current.querySelectorAll("[data-menu-item]");
    gsap.set(items, { y: 20, opacity: 0 });
    gsap.to(items, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
      stagger: 0.08,
    });
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !content) return;

    // Lock body scroll
    document.body.style.overflow = "hidden";

    gsap.set(overlay, { opacity: 0 });
    gsap.set(content, { y: 60, opacity: 0 });

    const tl = gsap.timeline();
    tl.to(overlay, { opacity: 1, duration: 0.5, ease: "power2.out" });
    tl.to(content, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.2");
    tl.call(() => animateItems());

    return () => {
      document.body.style.overflow = "";
    };
  }, [animateItems]);

  const switchCategory = (index: number) => {
    if (index === activeCategory || !itemsRef.current) return;

    const items = itemsRef.current.querySelectorAll("[data-menu-item]");
    gsap.to(items, {
      y: -10,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      stagger: 0.03,
      onComplete: () => {
        setActiveCategory(index);
        // animateItems will be triggered by the useEffect below
      },
    });
  };

  // Animate items when category changes
  useEffect(() => {
    const timer = setTimeout(animateItems, 50);
    return () => clearTimeout(timer);
  }, [activeCategory, animateItems]);

  const handleClose = () => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    gsap.to(overlay, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        document.body.style.overflow = "";
        onClose();
      },
    });
  };

  const currentSection = menuData[activeCategory];

  return (
    <div ref={overlayRef} className="menu-overlay">
      <div className="flex min-h-screen flex-col px-6 py-16 md:px-16 lg:px-32">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="fixed top-6 right-6 z-[110] flex h-12 w-12 items-center justify-center rounded-full border border-amber/30 text-cream transition-colors hover:border-amber hover:text-amber cursor-pointer"
          aria-label="Close menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="4" x2="16" y2="16" />
            <line x1="16" y1="4" x2="4" y2="16" />
          </svg>
        </button>

        <div ref={contentRef} className="flex flex-1 flex-col">
          {/* Header */}
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm tracking-[0.3em] uppercase text-amber">Malt Barrel &amp; Fire</p>
            <h2 className="font-serif text-5xl font-bold text-cream md:text-7xl">The Menu</h2>
            <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-amber/50 to-transparent" />
          </div>

          {/* Category tabs */}
          <div className="mx-auto mb-16 flex flex-wrap justify-center gap-2">
            {menuData.map((section, i) => (
              <button
                key={section.category}
                onClick={() => switchCategory(i)}
                className={`rounded-sm px-6 py-3 text-xs tracking-[0.2em] uppercase transition-all cursor-pointer ${
                  activeCategory === i
                    ? "border border-amber bg-amber/10 text-amber"
                    : "border border-charcoal-light text-warm-gray hover:border-amber/30 hover:text-cream"
                }`}
              >
                {section.category}
              </button>
            ))}
          </div>

          {/* Menu items */}
          <div ref={itemsRef} className="mx-auto w-full max-w-3xl flex-1">
            <h3 className="mb-10 text-center font-serif text-3xl text-amber-light">
              {currentSection.category}
            </h3>
            <div className="space-y-0">
              {currentSection.items.map((item) => (
                <div
                  key={item.name}
                  data-menu-item
                  className="group flex items-baseline justify-between gap-6 border-b border-charcoal-light/60 py-6 transition-colors hover:border-amber/20"
                >
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-cream transition-colors group-hover:text-amber-light">
                      {item.name}
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-warm-gray">{item.desc}</p>
                  </div>
                  <span className="shrink-0 font-serif text-xl text-amber">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-16 text-center">
            <p className="text-xs tracking-wider text-warm-gray/60">
              All meats are sourced from local farms. Consuming raw or undercooked meats may increase your risk of foodborne illness.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
