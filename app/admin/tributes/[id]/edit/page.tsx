import { notFound } from "next/navigation";
import { TributeForm } from "@/components/tribute/tribute-form";
import { getTributeById } from "@/lib/tributes";
import { PageNav } from "@/components/layout/page-navbar";

export default async function EditTributePage({
  params,
}: {
  params: { id: string };
}) {
  const tribute = await getTributeById(params.id);
  if (!tribute) notFound();

  return (
    <main className="bg-[#FAF7F2] text-[#1C1410] min-h-screen font-serif">
      <PageNav backHref="/tributes" backLabel="← Back to Tribute" />

      <section className="max-w-2xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.35em] uppercase text-[#8B6914] font-sans mb-4">
            Editing
          </p>
          <h1 className="text-4xl font-serif text-[#1C1410] mb-4">
            Update Tribute
          </h1>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-16 bg-[#C9A96E]/40" />
            <span className="text-[#C9A96E]">✦</span>
            <div className="h-px w-16 bg-[#C9A96E]/40" />
          </div>
        </div>

        <TributeForm mode="edit" tribute={tribute} />
      </section>
    </main>
  );
}
