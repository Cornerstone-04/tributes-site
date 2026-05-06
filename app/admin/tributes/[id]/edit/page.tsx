import { notFound } from "next/navigation";
import { getTributeById } from "@/lib/tributes";
import { AdminPageNav } from "@/components/admin/admin-page-nav";
import { TributeForm } from "@/components/tribute/tribute-form";
import { PageIntro } from "@/components/shared/page-intro";
import { SectionDivider } from "@/components/shared/section-divider";

export default async function AdminEditTributePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const tribute = await getTributeById(id);
  if (!tribute) notFound();

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <AdminPageNav />

      <div className="pointer-events-none absolute inset-x-0 top-20 mx-auto h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <PageIntro
        eyebrow="Editing Tribute"
        title="Update Tribute"
        description="Make changes to the tribute, then save to update the record."
      />

      <SectionDivider />

      <section className="relative z-10 mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-10">
        <div className="border border-accent/15 bg-[#f8f0dc]/35 p-5 shadow-[0_18px_45px_rgba(28,20,16,0.08)] md:p-8">
          <TributeForm mode="edit" tribute={tribute} />
        </div>
      </section>
    </main>
  );
}
