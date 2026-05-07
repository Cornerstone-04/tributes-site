import { motion } from "motion/react";
import Link from "next/link";

type TributeFormSuccessProps = {
  fullName: string;
};

export function TributeFormSuccess({ fullName }: TributeFormSuccessProps) {
  const firstName = fullName.trim().split(" ")[0] || "there";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative overflow-hidden border border-accent/20 bg-[#f8f0dc]/55 px-6 py-14 text-center shadow-[0_20px_55px_rgba(28,20,16,0.12)] md:px-10 md:py-18"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(196,151,72,0.14),transparent_55%)]" />
      <div className="pointer-events-none absolute left-1/2 top-8 h-32 w-32 -translate-x-1/2 rounded-full border border-accent/10" />

      <div className="relative z-10">
        <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full border border-accent/25 bg-background/60 shadow-[0_12px_30px_rgba(196,151,72,0.16)]">
          <span className="text-3xl text-accent">✦</span>
        </div>

        <p className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.32em] text-accent">
          Tribute Submitted
        </p>

        <h2 className="mx-auto mb-5 max-w-lg font-heading text-3xl leading-tight text-primary md:text-4xl">
          Thank you, {firstName}.
        </h2>

        <p className="mx-auto max-w-md font-sans text-base leading-8 text-foreground/60">
          Your tribute will be reviewed and added to the collection soon.
        </p>

        <div className="my-8 flex items-center justify-center gap-4">
          <div className="h-px w-14 bg-accent/35" />
          <span className="text-sm text-accent">✦</span>
          <div className="h-px w-14 bg-accent/35" />
        </div>

        <div className="mx-auto max-w-md border border-accent/20 bg-background/45 p-4 text-left shadow-[0_12px_30px_rgba(28,20,16,0.06)]">
          <p className="mb-1 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-accent">
            Next Step
          </p>

          <p className="font-sans text-sm leading-6 text-foreground/55">
            Kindly confirm your attendance, we&apos;d love to have you.
          </p>

          <motion.div
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="mt-5"
          >
            <Link
              href="https://rsvp.online/pajoloat100"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center justify-center gap-3 bg-accent px-6 py-4 font-sans text-sm font-semibold uppercase tracking-[0.16em] text-background shadow-[0_14px_35px_rgba(196,151,72,0.28)] transition-colors hover:bg-primary"
            >
              RSVP for the Celebration
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="mt-5"
        >
          <Link
            href="/tributes"
            className="inline-flex items-center justify-center border border-accent/50 bg-background/30 px-6 py-3 font-sans text-xs font-medium uppercase tracking-[0.16em] text-accent transition-colors hover:bg-accent/10"
          >
            View Tributes
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
