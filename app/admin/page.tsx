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
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <AdminLoginForm />
      </main>
    );
  }

  const tributes = await getAllTributes();
  const pending = tributes.filter((t) => t.status === "pending");
  const approved = tributes.filter((t) => t.status === "approved");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AdminHeader />

      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-12">
          <p className="mb-3 font-sans text-xs uppercase tracking-[0.35em] text-accent">
            Dashboard
          </p>
          <h1 className="font-heading text-3xl text-primary">
            Tribute Moderation
          </h1>
        </div>

        <AdminStats
          total={tributes.length}
          pending={pending.length}
          approved={approved.length}
        />

        <AdminTributeSection title="Pending Review" tributes={pending} />
        <AdminTributeSection title="Approved" tributes={approved} muted />
      </div>
    </main>
  );
}
