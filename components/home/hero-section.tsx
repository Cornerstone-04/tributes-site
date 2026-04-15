"use client";

import Link from "next/link";
import { motion } from "motion/react";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20 text-center">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 h-152 w-152 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/10"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 h-104 w-104 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/15"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="mb-6 font-sans text-xs tracking-[0.35em] uppercase text-accent"
        >
          July 2025 · A Centennial Celebration
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.9 }}
          className="mb-6 font-heading text-[clamp(3rem,10vw,7rem)] leading-[1.05] text-primary"
          style={{ fontVariant: "small-caps" }}
        >
          One Hundred
          <br />
          <span className="text-accent">Years of Olusola</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.9 }}
          className="mx-auto max-w-xl font-sans text-lg leading-relaxed text-foreground/60"
        >
          A century of life, love, and legacy. Scroll through his story — then
          add your own voice to it.
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
              className="inline-block bg-accent px-8 py-4 font-sans text-sm tracking-[0.15em] uppercase text-background transition-colors hover:bg-primary"
            >
              Write a Tribute
            </Link>
          </motion.div>

          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/tributes"
              className="inline-block border border-accent px-8 py-4 font-sans text-sm tracking-[0.15em] uppercase text-accent transition-colors hover:bg-accent/10"
            >
              View Tributes
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-accent/60"
      >
        <span className="font-sans text-xs tracking-[0.2em] uppercase">
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
