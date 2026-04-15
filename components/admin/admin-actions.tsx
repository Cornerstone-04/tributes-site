"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tribute } from "@/types";
import { supabase } from "@/lib/supabase";

export function AdminActions({ tribute }: { tribute: Tribute }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function update(fields: Partial<Tribute>) {
    setLoading(true);

    const { error } = await supabase
      .from("tributes")
      .update(fields)
      .eq("id", tribute.id);

    setLoading(false);

    if (error) {
      console.error("Update tribute error:", error);
      alert(error.message);
      return;
    }

    router.refresh();
  }

  async function deleteTribute() {
    if (!confirm("Delete this tribute? This cannot be undone.")) return;

    setLoading(true);

    const { error } = await supabase
      .from("tributes")
      .delete()
      .eq("id", tribute.id);

    setLoading(false);

    if (error) {
      console.error("Delete tribute error:", error);
      alert(error.message);
      return;
    }

    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      {tribute.status === "pending" ? (
        <button
          onClick={() => update({ status: "approved" })}
          disabled={loading}
          className="text-xs font-sans text-green-700 border border-green-200 bg-green-50 px-3 py-1 hover:bg-green-100 transition-colors disabled:opacity-50"
        >
          Approve
        </button>
      ) : (
        <button
          onClick={() => update({ status: "pending" })}
          disabled={loading}
          className="text-xs font-sans text-[#1C1410]/40 border border-[#C9A96E]/20 px-3 py-1 hover:border-[#C9A96E]/50 transition-colors disabled:opacity-50"
        >
          Unpublish
        </button>
      )}

      <button
        onClick={() => update({ featured: !tribute.featured })}
        disabled={loading}
        className={`text-xs font-sans px-3 py-1 border transition-colors disabled:opacity-50 ${
          tribute.featured
            ? "text-[#8B6914] border-[#8B6914]/30 bg-[#8B6914]/5 hover:bg-[#8B6914]/10"
            : "text-[#1C1410]/30 border-[#C9A96E]/20 hover:border-[#C9A96E]/50"
        }`}
      >
        {tribute.featured ? "★ Featured" : "☆ Feature"}
      </button>

      <button
        onClick={deleteTribute}
        disabled={loading}
        className="text-xs font-sans text-red-400 hover:text-red-600 transition-colors disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}
