"use client";

export function AdminSignOutButton() {
  async function handleSignOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="font-sans text-xs uppercase tracking-[0.2em] text-foreground/45 transition-colors hover:text-accent"
    >
      Sign out
    </button>
  );
}
