"use client";

import Link from "next/link";
import { motion } from "motion/react";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-24 text-center md:px-6 md:pt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/26-legacy.jpg"
          alt="Olusola"
          className="h-full w-full object-cover object-top"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#1c1410]/55" />

        {/* Soft Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />
      </div>

      {/* Decorative Rings */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-1/2 top-1/2 h-152 w-152 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
        />

        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-1/2 top-1/2 h-104 w-104 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="relative z-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="mb-6 font-sans text-xs uppercase tracking-[0.35em] text-[#f1d59a]"
        >
          July 2026 · A Centennial Celebration
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.9 }}
          className="mb-6 font-heading text-[clamp(3.5rem,10vw,7rem)] leading-[1.02] text-white"
          style={{ fontVariant: "small-caps" }}
        >
          One Hundred
          <br />
          <span className="text-[#f1d59a]">Years of Olusola</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.9 }}
          className="mx-auto max-w-2xl font-sans text-lg leading-relaxed text-white/75 md:text-xl"
        >
          A century of life, love, wisdom, and legacy remembered by family,
          friends, and generations touched by his journey.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/tributes/new"
              className="inline-flex items-center justify-center bg-accent px-8 py-4 font-sans text-sm uppercase tracking-[0.15em] text-background shadow-[0_14px_35px_rgba(196,151,72,0.28)] transition-colors hover:bg-primary"
            >
              Write a Tribute
            </Link>
          </motion.div>

          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/tributes"
              className="inline-flex items-center justify-center border border-white/20 bg-white/5 px-8 py-4 font-sans text-sm uppercase tracking-[0.15em] text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              View Tributes
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 1 }}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2 text-white/60"
      >
        <span className="font-sans text-xs uppercase tracking-[0.2em]">
          Scroll
        </span>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-10 w-px bg-white/40"
        />
      </motion.div>
    </section>
  );
}
