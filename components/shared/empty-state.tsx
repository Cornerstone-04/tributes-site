import Link from "next/link";

type EmptyStateProps = {
  icon?: string;
  title: string;
  description: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export function EmptyState({
  icon = "✦",
  title,
  description,
  ctaHref,
  ctaLabel,
}: EmptyStateProps) {
  return (
    <div className="mx-auto max-w-xl border border-accent/20 bg-[#f8f0dc]/45 px-6 py-16 text-center shadow-[0_16px_45px_rgba(28,20,16,0.08)] md:px-10 md:py-24">
      <p className="mb-5 text-4xl text-accent md:text-5xl">{icon}</p>

      <h2 className="mb-3 font-heading text-2xl text-primary md:text-3xl">
        {title}
      </h2>

      <p className="mx-auto mb-8 max-w-sm font-sans text-sm leading-7 text-foreground/50 md:text-base">
        {description}
      </p>

      {ctaHref && ctaLabel ? (
        <Link
          href={ctaHref}
          className="inline-flex items-center justify-center border border-accent/70 bg-background/40 px-8 py-4 font-sans text-sm font-medium uppercase tracking-[0.16em] text-accent transition-colors hover:bg-accent/10"
        >
          {ctaLabel}
        </Link>
      ) : null}
    </div>
  );
}
