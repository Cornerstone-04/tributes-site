"use client";

import Link from "next/link";
import { motion } from "motion/react";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-28 text-center md:px-6 md:pt-24">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(196,151,72,0.12),transparent_48%)]" />

      {/* Rotating rings */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 46, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 h-152 w-152 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/10 md:h-176 md:w-176"
        />

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 h-104 w-104 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/15 md:h-128 md:w-lg"
        />

        <div className="absolute left-1/2 top-1/2 h-72 w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/5 md:h-96 md:w-[24rem]" />
      </motion.div>

      {/* Decorative corners */}
      <div className="pointer-events-none absolute left-6 top-28 hidden h-24 w-24 border-l border-t border-accent/20 md:block" />
      <div className="pointer-events-none absolute bottom-28 right-6 hidden h-24 w-24 border-b border-r border-accent/20 md:block" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05, ease: "easeOut" }}
        className="relative z-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.75 }}
          className="mb-6 font-sans text-xs font-medium uppercase tracking-[0.35em] text-accent"
        >
          July 2026 · A Centennial Celebration
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.9 }}
          className="mx-auto mb-6 max-w-5xl font-heading text-[clamp(3.5rem,10vw,8rem)] leading-[0.95] text-primary"
          style={{ fontVariant: "small-caps" }}
        >
          One Hundred
          <br />
          <span className="text-accent">Years of Olusola</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.85 }}
          className="mx-auto max-w-xl font-sans text-lg leading-8 text-foreground/65 md:text-xl"
        >
          A century of life, love, wisdom, family, and legacy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/tributes/new"
              className="inline-flex min-w-52 items-center justify-center bg-accent px-8 py-4 font-sans text-sm font-medium uppercase tracking-[0.16em] text-background shadow-[0_14px_35px_rgba(196,151,72,0.22)] transition-colors hover:bg-primary"
            >
              Write a Tribute
            </Link>
          </motion.div>

          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/tributes"
              className="inline-flex min-w-52 items-center justify-center border border-accent/70 bg-background/40 px-8 py-4 font-sans text-sm font-medium uppercase tracking-[0.16em] text-accent backdrop-blur-sm transition-colors hover:bg-accent/10"
            >
              View Tributes
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.15, duration: 1 }}
        className="absolute bottom-8 z-10 hidden flex-col items-center gap-2 text-accent/60 md:flex"
      >
        <span className="font-sans text-xs uppercase tracking-[0.2em]">
          Scroll
        </span>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-px bg-accent/40"
        />
      </motion.div>
    </section>
  );
}
