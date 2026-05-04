"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tribute } from "@/types";
import { supabase } from "@/lib/supabase";

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

  // ===== UPDATE TRIBUTE =====
  async function updateTribute(fields: Partial<Tribute>) {
    setState({ loading: true, error: null });

    try {
      const { error } = await supabase
        .from("tributes")
        .update(fields)
        .eq("id", tribute.id);

      if (error) {
        console.error("[admin-actions] Update error:", error.message);
        setState({
          loading: false,
          error: "Failed to update tribute. Please try again.",
        });
        return;
      }

      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      console.error("[admin-actions] Update error:", message);
      setState({ loading: false, error: message });
    }
  }

  // ===== DELETE TRIBUTE =====
  async function deleteTribute() {
    const confirmDelete = window.confirm(
      "Delete this tribute? This action cannot be undone."
    );
    if (!confirmDelete) return;

    setState({ loading: true, error: null });

    try {
      const { error } = await supabase
        .from("tributes")
        .delete()
        .eq("id", tribute.id);

      if (error) {
        console.error("[admin-actions] Delete error:", error.message);
        setState({
          loading: false,
          error: "Failed to delete tribute. Please try again.",
        });
        return;
      }

      router.refresh();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      console.error("[admin-actions] Delete error:", message);
      setState({ loading: false, error: message });
    }
  }

  // ===== TOGGLE FEATURED STATUS =====
  async function toggleFeatured() {
    await updateTribute({ featured: !tribute.featured });
  }

  // ===== TOGGLE APPROVAL STATUS =====
  async function toggleApprovalStatus() {
    const newStatus = tribute.status === "pending" ? "approved" : "pending";
    await updateTribute({ status: newStatus as any });
  }

  return (
    <div className="space-y-3">
      {/* Action Buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Approval Toggle */}
        <button
          onClick={toggleApprovalStatus}
          disabled={state.loading}
          aria-label={
            tribute.status === "pending"
              ? "Approve this tribute"
              : "Unpublish this tribute"
          }
          className="text-xs font-sans px-3 py-1 border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {tribute.status === "pending" ? (
            <span className="text-green-700 border-green-200 bg-green-50 hover:bg-green-100">
              ✓ Approve
            </span>
          ) : (
            <span className="text-foreground/60 border-foreground/20 hover:border-foreground/40">
              ↻ Unpublish
            </span>
          )}
        </button>

        {/* Featured Toggle */}
        <button
          onClick={toggleFeatured}
          disabled={state.loading}
          aria-label={
            tribute.featured
              ? "Remove featured status"
              : "Mark as featured"
          }
          aria-pressed={tribute.featured}
          className={`text-xs font-sans px-3 py-1 border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            tribute.featured
              ? "text-accent border-accent/30 bg-accent/5 hover:bg-accent/10"
              : "text-foreground/40 border-foreground/20 hover:border-foreground/40"
          }`}
        >
          {tribute.featured ? "★ Featured" : "☆ Feature"}
        </button>

        {/* Delete Button */}
        <button
          onClick={deleteTribute}
          disabled={state.loading}
          aria-label="Delete this tribute"
          className="text-xs font-sans text-red-600 hover:text-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Delete
        </button>
      </div>

      {/* Error Message */}
      {state.error ? (
        <div
          className="border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 rounded"
          role="alert"
        >
          {state.error}
        </div>
      ) : null}
    </div>
  );
}
