import { notFound } from "next/navigation";
import { getTributeById } from "@/lib/tributes";
import { AdminPageNav } from "@/components/admin/admin-page-nav";
import { TributeForm } from "@/components/tribute/tribute-form";

export default async function AdminEditTributePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const tribute = await getTributeById(id);
  if (!tribute) notFound();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AdminPageNav />

      <section className="mx-auto max-w-2xl px-6 py-16">
        <div className="mb-14 text-center">
          <p className="mb-4 font-sans text-xs uppercase tracking-[0.35em] text-accent">
            Editing Tribute
          </p>

          <h1 className="mb-4 font-heading text-4xl text-primary">
            Update Tribute
          </h1>

          <p className="mx-auto max-w-md font-sans text-sm text-foreground/50">
            Make changes to the tribute, then save to update the record.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-accent/40" />
            <span className="text-accent">✦</span>
            <div className="h-px w-16 bg-accent/40" />
          </div>
        </div>

        <TributeForm mode="edit" tribute={tribute} />
      </section>
    </main>
  );
}
