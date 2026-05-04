import { motion } from "motion/react";
import Link from "next/link";

type TributeFormSuccessProps = {
  fullName: string;
};

export function TributeFormSuccess({ fullName }: TributeFormSuccessProps) {
  return (
    <motion.div className="py-16 text-center">
      <p className="mb-4 text-4xl">✦</p>

      <h2 className="mb-3 font-heading text-2xl text-primary">
        Thank you, {fullName.split(" ")[0]}.
      </h2>

      <p className="mx-auto max-w-xs font-sans text-sm text-foreground/50 mb-6">
        Your tribute has been submitted and will appear once reviewed. We look forward to celebrating with you on July 24th!
      </p>
      
      <div className="flex flex-col gap-3 justify-center">
        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="https://www.greetingsisland.com/rsvp/kr9qbm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent px-8 py-4 font-sans text-sm tracking-[0.15em] uppercase text-background transition-colors hover:bg-primary"
          >
            RSVP for the Celebration
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
      </div>
    </motion.div>
  );
}
