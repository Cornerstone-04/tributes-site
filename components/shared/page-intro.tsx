type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="mx-auto max-w-4xl px-6 pt-25 pb-12 text-center">
      <p className="mb-4 font-sans text-xs uppercase tracking-[0.35em] text-accent">
        {eyebrow}
      </p>

      <h1 className="mb-4 font-heading text-4xl text-primary md:text-5xl">
        {title}
      </h1>

      <p className="mx-auto max-w-md font-sans text-base font-light text-foreground/50">
        {description}
      </p>
    </section>
  );
}
