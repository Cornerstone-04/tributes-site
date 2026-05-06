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

      <article className="relative mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
        <div className="pointer-events-none absolute inset-x-0 top-8 mx-auto h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative z-10 mb-10 border border-accent/15 bg-[#f8f0dc]/35 p-5 shadow-[0_14px_35px_rgba(28,20,16,0.07)] md:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-accent">
                Admin Controls
              </p>

              <p className="mt-2 font-sans text-sm leading-6 text-foreground/50">
                Review and manage this tribute submission.
              </p>
            </div>

            <AdminActions tribute={tribute} />
          </div>
        </div>

        <div className="relative z-10 border border-accent/15 bg-[#f8f0dc]/35 p-6 shadow-[0_18px_45px_rgba(28,20,16,0.08)] md:p-10">
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

          {images.length > 0 ? <TributeGallery images={images} /> : null}

          <div className="mt-12 border-t border-accent/20 pt-8">
            <AdminActions tribute={tribute} />
          </div>
        </div>
      </article>
    </main>
  );
}
