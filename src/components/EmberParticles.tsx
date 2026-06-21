"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function EmberParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const embers: HTMLDivElement[] = [];
    const EMBER_COUNT = 40;

    for (let i = 0; i < EMBER_COUNT; i++) {
      const ember = document.createElement("div");
      const isSpark = Math.random() > 0.7;
      const size = isSpark ? Math.random() * 2 + 1 : Math.random() * 5 + 2;

      const sparkColor = isSpark
        ? "radial-gradient(circle, #fff8e0, #e8a832)"
        : "radial-gradient(circle, #e8a832, #c0440e)";
      const glowIntensity = isSpark ? 0.8 : 0.4;
      const glowSize = isSpark ? size * 4 : size * 2;

      ember.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${sparkColor};
        pointer-events: none;
        opacity: 0;
        filter: blur(${size > 4 ? 1 : 0}px);
        box-shadow: 0 0 ${glowSize}px rgba(212, 145, 26, ${glowIntensity}),
                    0 0 ${glowSize * 2}px rgba(212, 145, 26, ${glowIntensity * 0.3});
        will-change: transform, opacity;
      `;
      container.appendChild(ember);
      embers.push(ember);
      animateEmber(ember, isSpark);
    }

    function animateEmber(ember: HTMLDivElement, isSpark: boolean) {
      const startX = Math.random() * 100;
      const duration = isSpark ? 1.5 + Math.random() * 2 : 3 + Math.random() * 5;
      const delay = Math.random() * 4;
      const maxOpacity = isSpark ? 0.9 + Math.random() * 0.1 : 0.5 + Math.random() * 0.4;

      gsap.set(ember, {
        left: `${startX}%`,
        bottom: "-2%",
        opacity: 0,
        scale: 1,
        x: 0,
        y: 0,
        force3D: true,
      });

      gsap.to(ember, {
        y: -(window.innerHeight * (0.4 + Math.random() * 0.5)),
        x: (Math.random() - 0.5) * (isSpark ? 200 : 120),
        opacity: maxOpacity,
        scale: isSpark ? 1.5 : 1,
        duration: duration * 0.3,
        delay,
        ease: "power1.out",
        force3D: true,
        onComplete: () => {
          gsap.to(ember, {
            y: `-=${window.innerHeight * 0.2}`,
            x: `+=${(Math.random() - 0.5) * 60}`,
            opacity: 0,
            scale: 0.3,
            duration: duration * 0.7,
            ease: "power1.in",
            force3D: true,
            onComplete: () => animateEmber(ember, isSpark),
          });
        },
      });
    }

    return () => {
      embers.forEach((ember) => {
        gsap.killTweensOf(ember);
        ember.remove();
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden [contain:strict]"
      aria-hidden="true"
    />
  );
}
