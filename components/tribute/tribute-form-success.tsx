import { motion } from "motion/react";
import Link from "next/link";

type TributeFormSuccessProps = {
  fullName: string;
};

export function TributeFormSuccess({ fullName }: TributeFormSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative overflow-hidden border border-accent/20 bg-[#f8f0dc]/45 px-6 py-16 text-center shadow-[0_18px_45px_rgba(28,20,16,0.08)] md:px-10 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(196,151,72,0.08),transparent_55%)]" />

      <div className="relative z-10">
        <p className="mb-5 text-5xl text-accent">✦</p>

        <h2 className="mb-4 font-heading text-3xl leading-tight text-primary md:text-4xl">
          Thank you, {fullName.split(" ")[0]}.
        </h2>

        <p className="mx-auto max-w-md font-sans text-base leading-8 text-foreground/55">
          Your tribute has been submitted and will appear once reviewed. We look
          forward to celebrating with you on July 24th.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="https://rsvp.online/pajoloat100"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-60 items-center justify-center bg-accent px-8 py-4 font-sans text-sm font-medium uppercase tracking-[0.16em] text-background shadow-[0_14px_35px_rgba(196,151,72,0.22)] transition-colors hover:bg-primary"
            >
              RSVP for the Celebration
            </Link>
          </motion.div>

          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/tributes"
              className="inline-flex min-w-60 items-center justify-center border border-accent/70 bg-background/40 px-8 py-4 font-sans text-sm font-medium uppercase tracking-[0.16em] text-accent backdrop-blur-sm transition-colors hover:bg-accent/10"
            >
              View Tributes
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
