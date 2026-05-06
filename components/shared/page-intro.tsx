type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="relative mx-auto max-w-4xl px-4 pb-10 pt-24 text-center md:px-6 md:pb-14 md:pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto h-64 w-64 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative z-10">
        <p className="mb-5 font-sans text-xs font-medium uppercase tracking-[0.35em] text-accent">
          {eyebrow}
        </p>

        <h1 className="mx-auto mb-5 max-w-3xl font-heading text-5xl leading-tight text-primary md:text-7xl">
          {title}
        </h1>

        <p className="mx-auto max-w-lg font-sans text-base leading-7 text-foreground/55 md:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
