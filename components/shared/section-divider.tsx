"use client";

import { motion } from "motion/react";

export function SectionDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.9 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.7 }}
      className="flex items-center justify-center gap-6 px-6 py-8"
    >
      <div className="h-px max-w-xs flex-1 bg-accent/30" />
      <span className="text-xl text-accent">✦</span>
      <div className="h-px max-w-xs flex-1 bg-accent/30" />
    </motion.div>
  );
}
