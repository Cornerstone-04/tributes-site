import { PageNavProps } from "@/types";
import Link from "next/link";

export function PageNav({
  backHref,
  backLabel,
  actionHref,
  actionLabel,
}: PageNavProps) {
  return (
    <nav className="flex items-center justify-between border-b border-border px-4 md:px-8 py-4 md:py-5 gap-4">
      <Link
        href={backHref}
        className="font-sans text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-accent whitespace-nowrap"
      >
        {backLabel}
      </Link>

      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="bg-accent px-3 md:px-4 py-1.5 font-sans text-xs md:text-sm tracking-wide text-background transition-colors hover:bg-primary rounded-sm whitespace-nowrap"
        >
          {actionLabel}
        </Link>
      ) : null}
    </nav>
  );
}
