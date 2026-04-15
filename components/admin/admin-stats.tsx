import { AdminStatCard } from "./admin-stat-card";

type AdminStatsProps = {
  total: number;
  pending: number;
  approved: number;
};

export function AdminStats({ total, pending, approved }: AdminStatsProps) {
  return (
    <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-3">
      <AdminStatCard label="Total" value={total} />
      <AdminStatCard label="Pending" value={pending} highlight />
      <AdminStatCard label="Approved" value={approved} />
    </div>
  );
}
