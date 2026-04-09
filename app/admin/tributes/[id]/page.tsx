import { notFound } from "next/navigation";
import { getApprovedTributeById, getTributeImages } from "@/lib/tributes";
import { TributeDetailHeader } from "@/components/tribute/tribute-detail-header";
import { TributeCoverImage } from "@/components/tribute/tribute-cover-image";
import { TributeMessage } from "@/components/tribute/tribute-message";
import { TributeVoiceNoteSection } from "@/components/tribute/tribute-voice-note-section";
import { TributeGallery } from "@/components/tribute/tribute-gallery";
import { TributeDetailFooter } from "@/components/tribute/tribute-detail-footer";
import { PageNav } from "@/components/layout/page-navbar";

export default async function TributeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tribute = await getApprovedTributeById(id);
  if (!tribute) notFound();

  const images = await getTributeImages(tribute.id);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <PageNav backHref="/tributes" backLabel="← All Tributes" />

      <article className="mx-auto max-w-2xl px-6 py-20">
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

        <TributeDetailFooter />
      </article>
    </main>
  );
}
