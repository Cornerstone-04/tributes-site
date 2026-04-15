"use client";

import Link from "next/link";
import { motion } from "motion/react";

export function LandingCta() {
  return (
    <section className="relative mx-auto max-w-3xl px-6 py-28 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <p className="mb-6 font-sans text-xs tracking-[0.35em] uppercase text-accent">
          Now it&apos;s your turn
        </p>

        <h2 className="mb-6 font-heading text-4xl leading-snug text-primary md:text-5xl">
          What has Baba meant to you?
        </h2>

        <p className="mx-auto mb-12 max-w-xl font-sans text-lg leading-relaxed text-foreground/55">
          Write a message. Share a memory. Upload a photo or voice note. Help us
          build a keepsake he will treasure for years to come.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/tributes/new"
              className="inline-block bg-accent px-10 py-4 font-sans text-sm tracking-[0.15em] uppercase text-background transition-colors hover:bg-primary"
            >
              Write a Tribute
            </Link>
          </motion.div>

          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/tributes"
              className="inline-block border border-accent px-10 py-4 font-sans text-sm tracking-[0.15em] uppercase text-accent transition-colors hover:bg-accent/10"
            >
              View Tributes
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
