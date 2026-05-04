import { AdminHeader } from "@/components/admin/admin-header";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { AdminStats } from "@/components/admin/admin-stats";
import { AdminTributeSection } from "@/components/admin/admin-tribute-section";
import { getAllTributes } from "@/lib/tributes";
import { ADMIN_CONFIG, TRIBUTE_STATES } from "@/lib/admin-config";
import { cookies } from "next/headers";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAuthorized =
    cookieStore.get(ADMIN_CONFIG.SESSION_COOKIE_NAME)?.value ===
    ADMIN_CONFIG.SESSION_VALUE;

  // ===== AUTHORIZATION CHECK =====
  if (!isAuthorized) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <AdminLoginForm />
      </main>
    );
  }

  // ===== FETCH & ORGANIZE TRIBUTES =====
  const allTributes = await getAllTributes();
  const pendingTributes = allTributes.filter(
    (t) => t.status === TRIBUTE_STATES.PENDING
  );
  const approvedTributes = allTributes.filter(
    (t) => t.status === TRIBUTE_STATES.APPROVED
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AdminHeader />

      <div className="mx-auto max-w-5xl px-6 py-16">
        {/* ===== PAGE HEADER ===== */}
        <div className="mb-12">
          <p className="mb-3 font-sans text-xs uppercase tracking-[0.35em] text-accent">
            Dashboard
          </p>
          <h1 className="font-heading text-3xl text-primary">
            Tribute Moderation
          </h1>
        </div>

        {/* ===== STATISTICS ===== */}
        <AdminStats
          total={allTributes.length}
          pending={pendingTributes.length}
          approved={approvedTributes.length}
        />

        {/* ===== TRIBUTE SECTIONS ===== */}
        <AdminTributeSection
          title="Pending Review"
          tributes={pendingTributes}
        />
        <AdminTributeSection
          title="Approved"
          tributes={approvedTributes}
          muted
        />
      </div>
    </main>
  );
}
