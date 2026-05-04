import { Tribute } from "@/types";
import { AdminTributeRow } from "./admin-tribute-row";

type AdminTributeSectionProps = {
  title: string;
  muted?: boolean;
  tributes: Tribute[];
};

export function AdminTributeSection({
  title,
  muted,
  tributes,
}: AdminTributeSectionProps) {
  if (tributes.length === 0) return null;

  return (
    <section className="mb-16" aria-label={`${title} tributes`}>
      <h2
        className={`mb-6 font-sans text-xs uppercase tracking-[0.3em] ${
          muted ? "text-foreground/40" : "text-accent"
        }`}
      >
        {title}
        <span className="ml-2 text-foreground/50" aria-label={`${tributes.length} items`}>
          ({tributes.length})
        </span>
      </h2>

      <div
        className="space-y-4"
        role="list"
        aria-label={title}
      >
        {tributes.map((tribute) => (
          <div key={tribute.id} role="listitem">
            <AdminTributeRow tribute={tribute} />
          </div>
        ))}
      </div>
    </section>
  );
}
