import { LANDING_CHAPTERS } from "@/lib/constants";
import { TimelineChapter } from "./timeline-chapter";

export function TimelineSection() {
  return (
    <section className="relative mx-auto max-w-5xl px-6 py-24">
      <div className="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-accent/20 md:block" />

      <div className="space-y-32">
        {LANDING_CHAPTERS.map((chapter, index) => (
          <TimelineChapter
            key={`${chapter.year}-${chapter.label}`}
            chapter={chapter}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
