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
    <div className="py-28 text-center">
      <p className="mb-4 text-4xl">{icon}</p>

      <p className="mb-2 font-heading text-xl text-primary/50">{title}</p>

      <p className="mb-8 font-sans text-sm text-foreground/35">{description}</p>

      {ctaHref && ctaLabel ? (
        <Link
          href={ctaHref}
          className="inline-block border border-accent px-8 py-3 font-sans text-sm uppercase tracking-[0.15em] text-accent transition-colors hover:bg-accent/10"
        >
          {ctaLabel}
        </Link>
      ) : null}
    </div>
  );
}
