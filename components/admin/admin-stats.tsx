import { AdminStatCard } from "./admin-stat-card";

type AdminStatsProps = {
  total: number;
  pending: number;
  approved: number;
};

export function AdminStats({ total, pending, approved }: AdminStatsProps) {
  return (
    <section className="mb-16" aria-label="Tribute statistics">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <AdminStatCard
          label="Total Tributes"
          value={total}
          aria-label={`Total tributes: ${total}`}
        />
        <AdminStatCard
          label="Pending Review"
          value={pending}
          highlight
          aria-label={`Tributes pending review: ${pending}`}
        />
        <AdminStatCard
          label="Approved"
          value={approved}
          aria-label={`Approved tributes: ${approved}`}
        />
      </div>
    </section>
  );
}
