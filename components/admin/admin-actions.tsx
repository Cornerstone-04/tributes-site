"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Star, Trash, XIcon } from "lucide-react";
import { Tribute } from "@/types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [deleteOpen, setDeleteOpen] = useState(false);

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

      setDeleteOpen(false);
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
    <>
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={toggleApprovalStatus}
            disabled={state.loading}
            className={`border px-3 py-2 font-sans text-xs font-medium capitalize tracking-[0.14em] transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
              tribute.status === "pending"
                ? "border-green-500/25 bg-green-500/10 text-green-700 hover:bg-green-500/15"
                : "border-foreground/20 text-foreground/60 hover:border-foreground/40"
            }`}
          >
            {tribute.status === "pending" ? (
              <Check size={16} />
            ) : (
              <XIcon size={16} />
            )}
          </button>

          <button
            type="button"
            onClick={toggleFeatured}
            disabled={state.loading}
            aria-pressed={tribute.featured}
            className={`border px-3 py-2 font-sans text-xs font-medium uppercase tracking-[0.14em] transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
              tribute.featured
                ? "border-accent/30 bg-background text-accent hover:bg-accent/15"
                : "border-foreground/20 text-foreground/45 hover:bg-background hover:border-accent/30"
            }`}
          >
            <Star size={16} />
          </button>

          <button
            type="button"
            onClick={() => {
              setState(INITIAL_STATE);
              setDeleteOpen(true);
            }}
            disabled={state.loading}
            className="border border-red-500/25 px-3 py-2 font-sans text-xs font-medium uppercase tracking-[0.14em] text-red-700 transition-colors hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash size={16} />
          </button>
        </div>

        {state.error ? (
          <div
            className="border border-red-500/20 bg-red-500/10 px-3 py-2 font-sans text-xs leading-6 text-red-700"
            role="alert"
          >
            {state.error}
          </div>
        ) : null}
      </div>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent
          showCloseButton={false}
          className="max-w-md border-red-500/20 bg-[#f8f0dc] p-0 text-[#1c1410] shadow-[0_20px_60px_rgba(28,20,16,0.2)]"
        >
          <DialogClose className="absolute right-3 top-3 text-[#1c1410]/50 transition-colors hover:text-[#1c1410]">
            <XIcon className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogClose>

          <div className="p-6 md:p-8">
            <DialogHeader>
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-full border border-red-500/20 bg-red-500/10 font-sans text-xl font-semibold text-red-700">
                !
              </div>

              <DialogTitle className="font-heading text-2xl text-primary">
                Delete this tribute?
              </DialogTitle>

              <DialogDescription className="pt-3 font-sans text-sm leading-7 text-foreground/55">
                This will permanently remove the tribute from the admin
                dashboard and public site. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 border border-red-500/15 bg-red-500/5 p-4">
              <p className="font-heading text-base text-primary">
                {tribute.title || "Untitled Tribute"}
              </p>

              <p className="mt-1 font-sans text-xs uppercase tracking-[0.18em] text-foreground/45">
                By {tribute.full_name}
              </p>
            </div>

            {state.error ? (
              <p
                className="mt-5 border border-red-500/20 bg-red-500/10 px-4 py-3 font-sans text-sm leading-6 text-red-700"
                role="alert"
              >
                {state.error}
              </p>
            ) : null}

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <DialogClose
                disabled={state.loading}
                className="inline-flex items-center justify-center border border-accent/40 bg-background/40 px-5 py-3 font-sans text-xs font-medium uppercase tracking-[0.16em] text-accent transition-colors hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </DialogClose>

              <button
                type="button"
                onClick={deleteTribute}
                disabled={state.loading}
                className="inline-flex items-center justify-center bg-red-700 px-5 py-3 font-sans text-xs font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {state.loading ? "Deleting..." : "Delete Tribute"}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
