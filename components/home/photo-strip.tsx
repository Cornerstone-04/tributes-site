"use client";

import { motion } from "motion/react";
import { useRef, useState } from "react";

const photos = [
  "/images/1926.jpg",
  "/images/30-50.jpg",
  "/images/62-96(1).jpg",
  "/images/62-96(2).jpg",
  "/images/62-96.jpg",
  "/images/68-03.jpg",
  "/images/84.jpg",
  "/images/scotland.jpg",
  "/images/26-legacy.jpg",
  "/images/family.jpg",
  "/images/event.jpg",
  "/images/grandkids.jpg",
  "/images/father-son.jpg",
  "/images/family(2).jpg",
];

export function PhotoStrip() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const doubled = [...photos, ...photos];

  return (
    <section className="relative overflow-hidden border-y border-accent/15 bg-muted/40 py-14 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.7),transparent_55%)]" />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 mb-3 text-center font-sans text-xs font-medium uppercase tracking-[0.35em] text-accent"
      >
        A Life in Photographs
      </motion.p>

      <p className="relative z-10 mb-9 text-center font-sans text-xs text-foreground/40 md:mb-12">
        Swipe, scroll, or hover to pause the gallery
      </p>

      <div className="relative z-10 w-full">
        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-12 bg-linear-to-r from-muted/90 to-transparent md:w-28" />
        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-12 bg-linear-to-l from-muted/90 to-transparent md:w-28" />

        <div
          ref={scrollRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          onPointerDown={() => setPaused(true)}
          onPointerUp={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          className="scrollbar-hide overflow-x-auto overflow-y-hidden px-6 pb-6 pt-3 md:px-10"
        >
          <div
            className={`flex w-max gap-4 md:gap-5 ${
              paused ? "animate-scroll-paused" : "animate-scroll"
            }`}
          >
            {doubled.map((url, index) => (
              <motion.figure
                key={`${url}-${index}`}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                  rotate: 0,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`shrink-0 overflow-hidden border border-accent/25 bg-[#f8f0dc] p-2 shadow-[0_12px_30px_rgba(28,20,16,0.12)] ${
                  index % 2 === 0 ? "-rotate-1" : "rotate-1"
                }`}
              >
                <div className="overflow-hidden bg-background">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt=""
                    loading="lazy"
                    className="h-44 w-34 object-cover transition-transform duration-500 hover:scale-105 md:h-60 md:w-48"
                  />
                </div>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
