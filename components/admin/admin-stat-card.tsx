type AdminStatCardProps = {
  label: string;
  value: number;
  highlight?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export function AdminStatCard({
  label,
  value,
  highlight,
  ...props
}: AdminStatCardProps) {
  return (
    <div
      className={`border p-6 rounded transition-colors ${
        highlight ? "border-accent/40 bg-accent/5" : "border-border bg-card/50"
      }`}
      role="article"
      {...props}
    >
      <p className="mb-1 font-heading text-3xl text-primary">{value}</p>
      <p className="font-sans text-xs uppercase tracking-[0.2em] text-foreground/40">
        {label}
      </p>
    </div>
  );
}
