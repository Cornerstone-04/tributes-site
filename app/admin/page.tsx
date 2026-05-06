import { AdminHeader } from "@/components/admin/admin-header";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { AdminStats } from "@/components/admin/admin-stats";
import { AdminTabs } from "@/components/admin/admin-tabs";
import { AdminPagination } from "@/components/admin/admin-pagination";
import { AdminTributeSection } from "@/components/admin/admin-tribute-section";
import { getAllTributes, getAdminTributesByStatus } from "@/lib/tributes";
import { TributeStatus } from "@/types";
import { cookies } from "next/headers";

type AdminPageProps = {
  searchParams?: Promise<{
    tab?: string;
    page?: string;
  }>;
};

const PAGE_SIZE = 10;

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const cookieStore = await cookies();
  const isAuthorized = cookieStore.get("admin_session")?.value === "authorized";

  if (!isAuthorized) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12 text-foreground md:px-6">
        <div className="pointer-events-none absolute inset-x-0 top-20 mx-auto h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <AdminLoginForm />
      </main>
    );
  }

  const params = await searchParams;

  const activeTab: TributeStatus =
    params?.tab === "approved" ? "approved" : "pending";

  const rawPage = Number(params?.page ?? "1");
  const currentPage = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;

  const allTributes = await getAllTributes();

  const pendingCount = allTributes.filter(
    (tribute) => tribute.status === "pending",
  ).length;

  const approvedCount = allTributes.filter(
    (tribute) => tribute.status === "approved",
  ).length;

  const { tributes, totalPages, totalCount } = await getAdminTributesByStatus({
    status: activeTab,
    page: currentPage,
    pageSize: PAGE_SIZE,
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AdminHeader />

      <section className="relative mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="pointer-events-none absolute inset-x-0 top-8 mx-auto h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative z-10 mb-10">
          <p className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.35em] text-accent">
            Dashboard
          </p>

          <h1 className="font-heading text-4xl leading-tight text-primary md:text-5xl">
            Tribute Moderation
          </h1>

          <p className="mt-4 max-w-xl font-sans text-sm leading-7 text-foreground/50 md:text-base">
            Review, approve, edit, feature, or unpublish submitted tributes.
          </p>
        </div>

        <AdminStats
          total={allTributes.length}
          pending={pendingCount}
          approved={approvedCount}
        />

        <div className="mt-12">
          <AdminTabs
            activeTab={activeTab}
            pendingCount={pendingCount}
            approvedCount={approvedCount}
          />

          <p className="mb-6 font-sans text-xs uppercase tracking-[0.2em] text-foreground/40">
            Showing {tributes.length} of {totalCount} {activeTab} tributes
          </p>

          <AdminTributeSection
            title={activeTab === "pending" ? "Pending Review" : "Approved"}
            tributes={tributes}
            muted={activeTab === "approved"}
          />

          <AdminPagination
            currentPage={currentPage}
            totalPages={totalPages}
            tab={activeTab}
          />
        </div>
      </section>
    </main>
  );
}
