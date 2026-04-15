import { AdminSignOutButton } from "./admin-signout-button";

export function AdminHeader() {
  return (
    <div className="flex items-center justify-between border-b border-border px-8 py-5">
      <div>
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-accent">
          Admin
        </p>
      </div>

      <AdminSignOutButton />
    </div>
  );
}
