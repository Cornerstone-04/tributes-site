import { Navbar } from "@/components/layout/navbar";
import { PageIntro } from "@/components/shared/page-intro";
import { SectionDivider } from "@/components/shared/section-divider";
import { TributeForm } from "@/components/tribute/tribute-form";

export default function NewTributePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Navbar
        fixed={false}
        backHref="/"
        backLabel="← Pa Olusola Ajolore · 100"
        actionHref="/tributes"
        actionLabel="Tributes"
        showDefaultLinks={false}
      />

      <div className="pointer-events-none absolute inset-x-0 top-10 mx-auto h-96 w-96 rounded-full bg-accent/8 blur-3xl" />
      <PageIntro
        eyebrow="Share your memory"
        title="Write a Tribute"
        description="Your words will become part of a keepsake Baba will carry forever."
      />

      <SectionDivider />

      <section className="relative z-10 mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-10">
        <div className="border border-accent/15 bg-[#f8f0dc]/35 p-5 shadow-[0_18px_45px_rgba(28,20,16,0.08)] md:p-8">
          <TributeForm mode="create" />
        </div>
      </section>
    </main>
  );
}
