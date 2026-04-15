import { notFound } from "next/navigation";
import { getTributeById, getTributeImages } from "@/lib/tributes";
import { AdminActions } from "@/components/admin/admin-actions";
import { TributeDetailHeader } from "@/components/tribute/tribute-detail-header";
import { TributeCoverImage } from "@/components/tribute/tribute-cover-image";
import { TributeMessage } from "@/components/tribute/tribute-message";
import { TributeVoiceNoteSection } from "@/components/tribute/tribute-voice-note-section";
import { TributeGallery } from "@/components/tribute/tribute-gallery";
import { AdminPageNav } from "@/components/admin/admin-page-nav";

export default async function AdminTributeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const tribute = await getTributeById(id);
  if (!tribute) notFound();

  const images = await getTributeImages(tribute.id);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AdminPageNav />

      <article className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-10 flex flex-col gap-4 border border-border bg-card/50 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-accent">
              Admin Controls
            </p>
            <p className="mt-2 font-sans text-sm text-foreground/50">
              Review and manage this tribute.
            </p>
          </div>

          <AdminActions tribute={tribute} />
        </div>

        <TributeDetailHeader
          featured={tribute.featured}
          title={tribute.title}
          fullName={tribute.full_name}
          relationship={tribute.relationship}
        />

        {tribute.cover_image_url ? (
          <TributeCoverImage src={tribute.cover_image_url} />
        ) : null}

        <TributeMessage message={tribute.message} />

        {tribute.voice_note_url ? (
          <TributeVoiceNoteSection
            url={tribute.voice_note_url}
            duration={tribute.voice_note_duration}
          />
        ) : null}

        <TributeGallery images={images} />

        <div className="mt-12 border-t border-border pt-8">
          <AdminActions tribute={tribute} />
        </div>
      </article>
    </main>
  );
}
