"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type MobileMenuItem = {
  href: string;
  label: string;
  highlight?: boolean;
};

type MobileMenuProps = {
  items?: MobileMenuItem[];
};

export function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems =
    items && items.length > 0
      ? items
      : [
          { href: "/tributes", label: "Tributes" },
          { href: "/tributes/new", label: "Write a Tribute", highlight: true },
        ];

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <span className="relative h-5 w-6">
          <motion.span
            animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute left-0 top-0 block h-px w-6 bg-accent"
          />

          <motion.span
            animate={isOpen ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 top-2.25 block h-px w-6 bg-accent"
          />

          <motion.span
            animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute bottom-0 left-0 block h-px w-6 bg-accent"
          />
        </span>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-background md:hidden"
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute left-4 right-4 top-[calc(100%+0.75rem)] z-50 overflow-hidden border border-accent/20 bg-background/95 shadow-[0_18px_45px_rgba(28,20,16,0.16)] backdrop-blur-md md:hidden"
          >
            <nav className="flex flex-col p-3">
              {menuItems.map((item) =>
                item.highlight ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="mt-2 inline-flex items-center justify-center bg-accent px-5 py-4 font-sans text-xs font-medium uppercase tracking-[0.18em] text-background transition-colors hover:bg-primary"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="border-b border-accent/10 px-2 py-4 font-sans text-xs font-medium uppercase tracking-[0.18em] text-foreground/65 transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
