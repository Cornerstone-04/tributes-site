import { Navbar } from "@/components/layout/navbar";
import { PageIntro } from "@/components/shared/page-intro";
import { SectionDivider } from "@/components/shared/section-divider";
import { EmptyState } from "@/components/shared/empty-state";
import { Pagination } from "@/components/shared/pagination";
import { TributeGrid } from "@/components/tribute/tribute-grid";
import { getApprovedTributes } from "@/lib/tributes";

type TributesPageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

export default async function TributesPage({
  searchParams,
}: TributesPageProps) {
  const params = await searchParams;

  const page = Number(params?.page ?? "1");
  const currentPage = Number.isFinite(page) && page > 0 ? page : 1;

  const { tributes, totalCount, totalPages } = await getApprovedTributes({
    page: currentPage,
    pageSize: 12,
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar
        fixed={false}
        backHref="/"
        backLabel="← Pa Olusola Ajolore · 100"
        actionHref="/tributes/new"
        actionLabel="Write a Tribute"
        showDefaultLinks={false}
      />

      <div className="pointer-events-none absolute inset-x-0 top-10 mx-auto h-96 w-96 rounded-full bg-accent/8 blur-3xl" />
      <PageIntro
        eyebrow="From those who love him"
        title="Tributes & Memories"
        description="Words from family and friends celebrating 100 years of God's faithfulness."
      />

      <div className="px-4 pb-12 md:px-6 md:pb-16">
        <SectionDivider />
      </div>

      <section className="mx-auto max-w-6xl px-4 pb-24 md:px-6 md:pb-32">
        {tributes.length === 0 ? (
          <EmptyState
            title="No tributes yet."
            description="Be the first to share a memory."
            ctaHref="/tributes/new"
            ctaLabel="Write a Tribute"
          />
        ) : (
          <>
            <p className="mb-8 text-center font-sans text-xs uppercase tracking-[0.22em] text-foreground/40">
              Showing {tributes.length} of {totalCount} tributes
            </p>

            <TributeGrid tributes={tributes} />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/tributes"
            />
          </>
        )}
      </section>
    </main>
  );
}
