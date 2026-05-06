import { AdminHeader } from "@/components/admin/admin-header";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { AdminStats } from "@/components/admin/admin-stats";
import { AdminTributeSection } from "@/components/admin/admin-tribute-section";
import { getAllTributes } from "@/lib/tributes";
import { cookies } from "next/headers";

export default async function AdminPage() {
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

  const tributes = await getAllTributes();

  const pending = tributes.filter((tribute) => tribute.status === "pending");
  const approved = tributes.filter((tribute) => tribute.status === "approved");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AdminHeader />

      <section className="relative mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="pointer-events-none absolute inset-x-0 top-8 mx-auto h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative z-10 mb-12">
          <p className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.35em] text-accent">
            Dashboard
          </p>

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-heading text-4xl leading-tight text-primary md:text-5xl">
                Tribute Moderation
              </h1>

              <p className="mt-4 max-w-xl font-sans text-sm leading-7 text-foreground/50 md:text-base">
                Review, approve, edit, feature, or unpublish submitted tributes.
              </p>
            </div>
          </div>
        </div>

        <AdminStats
          total={tributes.length}
          pending={pending.length}
          approved={approved.length}
        />

        <div className="mt-12 space-y-14">
          <AdminTributeSection title="Pending Review" tributes={pending} />
          <AdminTributeSection title="Approved" tributes={approved} muted />
        </div>
      </section>
    </main>
  );
}
