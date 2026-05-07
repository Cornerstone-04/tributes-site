"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

type Chapter = {
  year: string;
  label: string;
  heading: string;
  body: string;
  accent: string;
  image?: string;
  imageAlt?: string;
};

type Props = {
  chapter: Chapter;
  index: number;
};

export function TimelineChapter({ chapter, index }: Props) {
  const isEven = index % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className="relative grid gap-10 md:grid-cols-[1fr_72px_1fr] md:gap-8"
    >
      {/* Timeline center */}
      <div className="absolute left-4 top-0 h-full w-px bg-accent/20 md:left-1/2 md:-translate-x-1/2" />

      <div className="absolute left-4 top-2 z-10 -translate-x-1/2 md:left-1/2">
        <motion.div
          initial={{ scale: 0.6 }}
          whileInView={{ scale: [0.6, 1.25, 1] }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="grid h-9 w-9 place-items-center rounded-full border border-accent/30 bg-background shadow-[0_0_0_8px_rgba(248,240,220,0.9)]"
        >
          <span className="h-3 w-3 rounded-full bg-accent" />
        </motion.div>
      </div>

      {/* Text */}
      <div
        className={`pl-12 md:pl-0 ${
          isEven
            ? "md:col-start-1 md:text-right"
            : "md:col-start-3 md:text-left"
        }`}
      >
        <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.32em] text-accent">
          {chapter.label}
        </p>

        <p className="mb-2 font-heading text-6xl leading-none text-primary/10 md:text-7xl">
          {chapter.year}
        </p>

        <h2 className="max-w-md font-heading text-2xl leading-tight text-primary md:text-4xl">
          {chapter.heading}
        </h2>

        <p
          className={`mt-5 max-w-md font-sans text-base leading-8 text-foreground/65 ${
            isEven ? "md:ml-auto" : ""
          }`}
        >
          {chapter.body}
        </p>

        <p className="mt-5 font-heading text-base italic text-accent/75">
          {chapter.accent}
        </p>
      </div>

      {/* Spacer column */}
      <div className="hidden md:col-start-2 md:block" />

      {/* Image */}
      <div
        className={`pl-12 md:pl-0 ${
          isEven ? "md:col-start-3" : "md:col-start-1 md:row-start-1"
        }`}
      >
        {chapter.image ? (
          <motion.div
            whileHover={{ y: -8, scale: 1.025, rotate: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`relative mx-auto max-w-sm ${
              isEven ? "md:rotate-2" : "md:-rotate-2"
            }`}
          >
            <div className="absolute -inset-3 -z-10 rounded-sm bg-accent/10 blur-xl" />

            <div className="rounded-sm border border-accent/25 bg-[#f8f0dc] p-3 shadow-[0_18px_45px_rgba(28,20,16,0.16)]">
              <div className="overflow-hidden rounded-xs bg-background">
                <ImageWithSkeleton
                  src={chapter.image}
                  alt={chapter.imageAlt ?? chapter.heading}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="hidden md:block" />
        )}
      </div>
    </motion.article>
  );
}

function ImageWithSkeleton({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative h-72 w-full overflow-hidden bg-[#efe4c8]">
      {!loaded ? (
        <div className="absolute inset-0 z-10 animate-pulse bg-[linear-gradient(110deg,#efe4c8_8%,#f7efd9_18%,#efe4c8_33%)] bg-size-[200%_100%]" />
      ) : null}

      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 400px"
        onLoad={() => setLoaded(true)}
        className={`object-cover object-top transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
