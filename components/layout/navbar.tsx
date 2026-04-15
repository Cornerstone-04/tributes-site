"use client";

import Link from "next/link";
import { motion } from "motion/react";

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-background/80 backdrop-blur-sm border-b border-border"
    >
      <span className="text-sm tracking-[0.2em] uppercase text-accent font-sans font-medium">
        Olusola · 100
      </span>

      <div className="flex gap-6 text-sm font-sans">
        <Link
          href="/tributes"
          className="text-foreground/60 hover:text-accent transition-colors tracking-wide"
        >
          Tributes
        </Link>

        <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/tributes/new"
            className="text-background bg-accent px-4 py-1.5 rounded-sm hover:bg-primary transition-colors tracking-wide"
          >
            Write a Tribute
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
}
