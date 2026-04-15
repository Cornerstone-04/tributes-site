type TributeDetailHeaderProps = {
  featured: boolean;
  title: string | null;
  fullName: string;
  relationship: string | null;
};

export function TributeDetailHeader({
  featured,
  title,
  fullName,
  relationship,
}: TributeDetailHeaderProps) {
  return (
    <header className="mb-14 text-center">
      {featured ? (
        <span className="mb-6 inline-block bg-accent/10 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.25em] text-accent">
          Featured
        </span>
      ) : null}

      {title ? (
        <h1 className="mb-6 font-heading text-3xl leading-snug text-primary md:text-4xl">
          {title}
        </h1>
      ) : null}

      <p className="font-heading text-xl text-primary/80">{fullName}</p>

      {relationship ? (
        <p className="mt-1 font-sans text-sm text-foreground/40">
          {relationship}
        </p>
      ) : null}

      <div className="mt-8 flex items-center justify-center gap-4">
        <div className="h-px w-16 bg-accent/40" />
        <span className="text-sm text-accent">✦</span>
        <div className="h-px w-16 bg-accent/40" />
      </div>
    </header>
  );
}
