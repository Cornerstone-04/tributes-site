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
    <div className="mb-16">
      <h2
        className={`mb-6 font-sans text-xs uppercase tracking-[0.3em] ${
          muted ? "text-foreground/40" : "text-accent"
        }`}
      >
        {title}
      </h2>

      <div className="space-y-4">
        {tributes.map((tribute) => (
          <AdminTributeRow key={tribute.id} tribute={tribute} />
        ))}
      </div>
    </div>
  );
}
