"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { MobileMenu } from "./mobile-menu";

type NavbarProps = {
  backHref?: string;
  backLabel?: string;
  actionHref?: string;
  actionLabel?: string;
  fixed?: boolean;
  showDefaultLinks?: boolean;
};

export function Navbar({
  backHref = "/",
  backLabel = "Olusola · 100",
  actionHref,
  actionLabel,
  fixed = true,
  showDefaultLinks = true,
}: NavbarProps) {
  const isPageNav = Boolean(actionHref && actionLabel);

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`left-0 right-0 z-50 flex items-center justify-between gap-4 border-b border-border bg-background/80 px-4 py-4 backdrop-blur-sm md:px-8 md:py-5 ${
        fixed ? "fixed top-0" : "relative"
      }`}
    >
      <Link
        href={backHref}
        className="whitespace-nowrap font-sans text-xs font-medium uppercase tracking-[0.2em] text-accent md:text-sm"
      >
        {backLabel}
      </Link>

      <div className="hidden items-center gap-6 font-sans text-sm md:flex">
        {showDefaultLinks && !isPageNav ? (
          <>
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/tributes"
                className="inline-block border border-accent px-4 py-2 font-sans uppercase tracking-[0.15em] text-accent transition-all ease-linear hover:bg-accent/10"
              >
                Tributes
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/tributes/new"
                className="inline-block border border-accent bg-accent px-4 py-2 font-sans uppercase tracking-[0.15em] text-background transition-all ease-linear hover:border-primary hover:bg-primary"
              >
                Write a Tribute
              </Link>
            </motion.div>
          </>
        ) : null}

        {actionHref && actionLabel ? (
          <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
            <Link
              href={actionHref}
              className="inline-block border border-accent bg-accent px-4 py-2 font-sans text-sm uppercase tracking-[0.15em] text-background transition-all ease-linear hover:border-primary hover:bg-primary"
            >
              {actionLabel}
            </Link>
          </motion.div>
        ) : null}
      </div>

      <MobileMenu
        items={
          actionHref && actionLabel
            ? [{ href: actionHref, label: actionLabel, highlight: true }]
            : undefined
        }
      />
    </motion.nav>
  );
}
