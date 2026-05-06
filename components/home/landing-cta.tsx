"use client";

import Link from "next/link";
import { motion } from "motion/react";

export function LandingCta() {
  return (
    <section className="relative overflow-hidden px-4 py-20 text-center md:px-6 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(196,151,72,0.1),transparent_50%)]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-112 w-md -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-3xl"
      >
        <p className="mb-6 font-sans text-xs font-medium uppercase tracking-[0.35em] text-accent">
          Now it&apos;s your turn
        </p>

        <h2 className="mx-auto mb-6 max-w-3xl font-heading text-4xl leading-tight text-primary md:text-6xl">
          What has Baba meant to you?
        </h2>

        <p className="mx-auto mb-12 max-w-xl font-sans text-lg leading-8 text-foreground/60">
          Write a message. Share a memory. Upload a photo or voice note. Help us
          build a keepsake he will treasure for years to come.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
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
        </div>
      </motion.div>
    </section>
  );
}