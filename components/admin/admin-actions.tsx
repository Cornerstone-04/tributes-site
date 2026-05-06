"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tribute } from "@/types";

type AdminActionState = {
  loading: boolean;
  error: string | null;
};

const INITIAL_STATE: AdminActionState = {
  loading: false,
  error: null,
};

export function AdminActions({ tribute }: { tribute: Tribute }) {
  const router = useRouter();
  const [state, setState] = useState<AdminActionState>(INITIAL_STATE);

  async function updateTribute(
    fields: Partial<Pick<Tribute, "status" | "featured">>,
  ) {
    setState({ loading: true, error: null });

    try {
      const response = await fetch(`/api/admin/tributes/${tribute.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      });

      const result = await response.json();

      if (!response.ok) {
        setState({
          loading: false,
          error: result.error || "Failed to update tribute. Please try again.",
        });
        return;
      }

      router.refresh();
      setState(INITIAL_STATE);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";

      console.error("[admin-actions] Update error:", message);

      setState({
        loading: false,
        error: "Failed to update tribute. Please try again.",
      });
    }
  }

  async function deleteTribute() {
    const confirmDelete = window.confirm(
      "Delete this tribute? This action cannot be undone.",
    );

    if (!confirmDelete) return;

    setState({ loading: true, error: null });

    try {
      const response = await fetch(`/api/admin/tributes/${tribute.id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        setState({
          loading: false,
          error: result.error || "Failed to delete tribute. Please try again.",
        });
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";

      console.error("[admin-actions] Delete error:", message);

      setState({
        loading: false,
        error: "Failed to delete tribute. Please try again.",
      });
    }
  }

  async function toggleFeatured() {
    await updateTribute({ featured: !tribute.featured });
  }

  async function toggleApprovalStatus() {
    const newStatus: Tribute["status"] =
      tribute.status === "pending" ? "approved" : "pending";

    await updateTribute({ status: newStatus });
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={toggleApprovalStatus}
          disabled={state.loading}
          className={`border px-3 py-1 font-sans text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
            tribute.status === "pending"
              ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
              : "border-foreground/20 text-foreground/60 hover:border-foreground/40"
          }`}
        >
          {tribute.status === "pending" ? "✓ Approve" : "↻ Unpublish"}
        </button>

        <button
          onClick={toggleFeatured}
          disabled={state.loading}
          aria-pressed={tribute.featured}
          className={`border px-3 py-1 font-sans text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
            tribute.featured
              ? "border-accent/30 bg-accent/5 text-accent hover:bg-accent/10"
              : "border-foreground/20 text-foreground/40 hover:border-foreground/40"
          }`}
        >
          {tribute.featured ? "★ Featured" : "☆ Feature"}
        </button>

        <button
          onClick={deleteTribute}
          disabled={state.loading}
          className="font-sans text-xs text-red-600 transition-colors hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Delete
        </button>
      </div>

      {state.error ? (
        <div
          className="border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700"
          role="alert"
        >
          {state.error}
        </div>
      ) : null}
    </div>
  );
}
