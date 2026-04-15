type AdminStatCardProps = {
  label: string;
  value: number;
  highlight?: boolean;
};

export function AdminStatCard({ label, value, highlight }: AdminStatCardProps) {
  return (
    <div
      className={`border p-6 ${
        highlight ? "border-accent/40 bg-accent/5" : "border-border bg-card/50"
      }`}
    >
      <p className="mb-1 font-heading text-3xl text-primary">{value}</p>
      <p className="font-sans text-xs uppercase tracking-[0.2em] text-foreground/40">
        {label}
      </p>
    </div>
  );
}
