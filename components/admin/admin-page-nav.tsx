import Link from "next/link";

type AdminPageNavProps = {
  label?: string;
  href?: string;
  rightSlot?: React.ReactNode;
};

export function AdminPageNav({
  label = "← Back to Admin",
  href = "/admin",
  rightSlot,
}: AdminPageNavProps) {
  return (
    <nav className="flex items-center justify-between border-b border-border px-8 py-5">
      <Link 
        href={href}
        className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-accent"
      >
        {label}
      </Link>

      {rightSlot ? rightSlot : <span />}
    </nav>
  );
}
