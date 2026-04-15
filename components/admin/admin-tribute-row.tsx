import Link from "next/link";
import { Tribute } from "@/types";
import { AdminActions } from "@/components/admin/admin-actions";

type AdminTributeRowProps = {
  tribute: Tribute;
};

export function AdminTributeRow({ tribute }: AdminTributeRowProps) {
  const preview =
    tribute.message.length > 100
      ? `${tribute.message.slice(0, 100)}…`
      : tribute.message;

  return (
    <div className="flex flex-col gap-4 border border-border bg-card/60 p-5 md:flex-row md:items-center">
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-3">
          <p className="font-heading text-primary">{tribute.full_name}</p>

          {tribute.relationship ? (
            <span className="font-sans text-xs text-foreground/35">
              · {tribute.relationship}
            </span>
          ) : null}

          {tribute.featured ? (
            <span className="bg-accent/10 px-2 py-0.5 font-sans text-[10px] uppercase tracking-[0.15em] text-accent">
              Featured
            </span>
          ) : null}
        </div>

        {tribute.title ? (
          <p className="mb-1 font-heading text-sm text-primary/60">
            {tribute.title}
          </p>
        ) : null}

        <p className="truncate font-sans text-sm text-foreground/40">
          {preview}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <Link
          href={`/admin/tributes/${tribute.id}`}
          className="font-sans text-xs tracking-wide text-accent hover:underline"
        >
          View
        </Link>

        <Link
          href={`/admin/tributes/${tribute.id}/edit`}
          className="font-sans text-xs tracking-wide text-foreground/40 hover:text-accent"
        >
          Edit
        </Link>

        <AdminActions tribute={tribute} />
      </div>
    </div>
  );
}
