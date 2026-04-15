import Link from "next/link";

export function TributeDetailFooter() {
  return (
    <div className="flex items-center justify-between border-t border-border pt-8">
      <Link
        href="/tributes"
        className="font-sans text-sm tracking-wide text-accent hover:underline"
      >
        ← Back to Tributes
      </Link>

      <Link
        href="/tributes/new"
        className="font-sans text-sm tracking-wide text-foreground/40 transition-colors hover:text-accent"
      >
        Write your own →
      </Link>
    </div>
  );
}
