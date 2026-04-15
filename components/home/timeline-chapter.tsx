"use client";

import { motion } from "motion/react";

type Chapter = {
  year: string;
  label: string;
  heading: string;
  body: string;
  accent: string;
};

type Props = {
  chapter: Chapter;
  index: number;
};

export function TimelineChapter({ chapter, index }: Props) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -24 : 24, y: 24 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
      className={`relative flex flex-col items-center gap-12 md:flex-row ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <div className="absolute left-1/2 z-10 hidden -translate-x-1/2 md:flex flex-col items-center gap-1">
        <motion.div
          whileInView={{ scale: [0.8, 1.3, 1] }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="h-3 w-3 rounded-full border-2 border-accent bg-background"
        />
      </div>

      <div
        className={`flex-1 ${
          isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"
        }`}
      >
        <p className="mb-2 font-sans text-xs tracking-[0.3em] uppercase text-accent">
          {chapter.label}
        </p>

        <p className="mb-3 font-heading text-5xl leading-none text-primary/10">
          {chapter.year}
        </p>

        <h2 className="mb-4 font-heading text-2xl leading-snug text-primary md:text-3xl">
          {chapter.heading}
        </h2>

        <p className="mx-auto max-w-sm font-sans text-base leading-relaxed text-foreground/60 md:mx-0">
          {chapter.body}
        </p>

        <p className="mt-4 font-heading text-sm italic text-accent/70">
          {chapter.accent}
        </p>
      </div>

      <div className="hidden flex-1 md:block" />
    </motion.div>
  );
}
