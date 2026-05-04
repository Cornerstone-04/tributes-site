import { TributeForm } from "@/components/tribute/tribute-form";
import Link from "next/link";

export default function NewTributePage() {
  return (
    <main className="bg-[#FAF7F2] text-[#1C1410] min-h-screen font-serif">
      <nav className="flex items-center justify-between px-4 md:px-8 py-4 md:py-5 border-b border-[#C9A96E]/20">
        <Link
          href="/"
          className="text-xs md:text-sm tracking-[0.2em] uppercase text-[#8B6914] font-sans font-medium whitespace-nowrap"
        >
          ← Olusola · 100
        </Link>
      </nav>

      <section className="max-w-2xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-xs tracking-[0.35em] uppercase text-[#8B6914] font-sans mb-4">
            Share your memory
          </p>
          <h1 className="text-3xl md:text-4xl font-serif text-[#1C1410] mb-4">
            Write a Tribute
          </h1>
          <p className="text-[#1C1410]/50 font-sans font-light text-sm md:text-base max-w-sm mx-auto">
            Your words will become part of a keepsake Baba will carry forever.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6 md:mt-8">
            <div className="h-px w-12 md:w-16 bg-[#C9A96E]/40" />
            <span className="text-[#C9A96E] text-lg md:text-base">✦</span>
            <div className="h-px w-12 md:w-16 bg-[#C9A96E]/40" />
          </div>
        </div>

        <TributeForm mode="create" />
      </section>
    </main>
  );
}
