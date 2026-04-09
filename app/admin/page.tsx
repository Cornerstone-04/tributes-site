import Link from "next/link";
import { getAllTributes } from "@/lib/tributes";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminStats } from "@/components/admin/admin-stats";
import { AdminTributeSection } from "@/components/admin/admin-tribute-section";

export default async function AdminPage() {
  const tributes = await getAllTributes();

  const pending = tributes.filter((t) => t.status === "pending");
  const approved = tributes.filter((t) => t.status === "approved");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <nav className="flex items-center justify-between border-b border-border px-8 py-5">
        <Link
          href="/"
          className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-accent"
        >
          ← Olusola · 100
        </Link>

        <span className="font-sans text-xs uppercase tracking-[0.2em] text-foreground/30">
          Admin
        </span>
      </nav>

      <div className="mx-auto max-w-5xl px-6 py-16">
        <AdminHeader />

        <AdminStats
          total={tributes.length}
          pending={pending.length}
          approved={approved.length}
        />

        <AdminTributeSection title="Pending Review" tributes={pending} />

        <AdminTributeSection title="Approved" tributes={approved} muted />

        {tributes.length === 0 ? (
          <div className="py-28 text-center font-sans text-foreground/30">
            No tributes yet.
          </div>
        ) : null}
      </div>
    </main>
  );
}
