import { AdminSignOutButton } from "./admin-signout-button";

export function AdminHeader() {
  return (
    <header className="flex items-center justify-between border-b border-border px-8 py-5 sticky top-0 bg-background z-40">
      <div>
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-accent">
          Admin Dashboard
        </p>
      </div>

      <nav aria-label="Admin navigation">
        <AdminSignOutButton />
      </nav>
    </header>
  );
}
