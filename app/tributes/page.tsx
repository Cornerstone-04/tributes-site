import { PageNav } from "@/components/layout/page-navbar";
import { PageIntro } from "@/components/shared/page-intro";
import { SectionDivider } from "@/components/shared/section-divider";
import { EmptyState } from "@/components/shared/empty-state";
import { TributeGrid } from "@/components/tribute/tribute-grid";
import { getApprovedTributes, getTributeImages } from "@/lib/tributes";

export default async function TributesPage() {
  const tributes = await getApprovedTributes();

  const tributesWithImages = await Promise.all(
    tributes.map(async (tribute) => {
      const images = await getTributeImages(tribute.id);
      return {
        ...tribute,
        images,
      };
    }),
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <PageNav
        backHref="/"
        backLabel="← Olusola · 100"
        actionHref="/tributes/new"
        actionLabel="Write a Tribute"
      />

      <PageIntro
        eyebrow="From those who love him"
        title="Tributes & Memories"
        description="Words from family and friends celebrating one hundred years of life."
      />

      <div className="px-6 pb-16">
        <SectionDivider />
      </div>

      <section className="mx-auto max-w-6xl px-6 pb-32">
        {tributesWithImages.length === 0 ? (
          <EmptyState
            title="No tributes yet."
            description="Be the first to share a memory."
            ctaHref="/tributes/new"
            ctaLabel="Write a Tribute"
          />
        ) : (
          <TributeGrid tributes={tributesWithImages} />
        )}
      </section>
    </main>
  );
}
