import { PageNavProps } from "@/types";
import Link from "next/link";

export function PageNav({
  backHref,
  backLabel,
  actionHref,
  actionLabel,
}: PageNavProps) {
  return (
    <nav className="flex items-center justify-between border-b border-border px-8 py-5">
      <Link
        href={backHref}
        className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-accent"
      >
        {backLabel}
      </Link>

      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="bg-accent px-4 py-1.5 font-sans text-sm tracking-wide text-background transition-colors hover:bg-primary"
        >
          {actionLabel}
        </Link>
      ) : null}
    </nav>
  );
}
