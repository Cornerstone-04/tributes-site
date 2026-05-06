import { Tribute } from "@/types";

type TributeCardProps = {
  tribute: Tribute & {
    images?: { id: string }[];
  };
  onClick: () => void;
  index?: number;
};

const rotations = [
  "md:-rotate-[1.2deg]",
  "md:rotate-[0.8deg]",
  "md:-rotate-[0.6deg]",
  "md:rotate-[1deg]",
  "md:-rotate-[0.8deg]",
  "md:rotate-[0.5deg]",
];

export function TributeCard({ tribute, onClick, index = 0 }: TributeCardProps) {
  const preview =
    tribute.message.length > 170
      ? `${tribute.message.slice(0, 170).trimEnd()}…`
      : tribute.message;

  const rotation = rotations[index % rotations.length];

  const hasImages =
    Boolean(tribute.cover_image_url) || (tribute.images?.length ?? 0) > 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group block w-full text-left transition-transform duration-300 hover:-translate-y-1 hover:rotate-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 ${rotation}`}
    >
      <article className="relative flex min-h-88 flex-col overflow-hidden border border-[#d8c39a] bg-[#fff8e8] p-6 shadow-[0_12px_34px_rgba(28,20,16,0.10)] transition-all duration-300 group-hover:shadow-[0_20px_50px_rgba(28,20,16,0.16)]">
        <div className="absolute right-0 top-0 h-16 w-16 overflow-hidden">
          <div className="clip-curl absolute right-0 top-0 h-16 w-16 origin-top-right bg-[linear-gradient(135deg,#f8e8bd_0%,#ead29a_48%,#d4ac5f_100%)] shadow-[-3px_3px_10px_rgba(28,20,16,0.12)]" />
        </div>

        <div className="pointer-events-none absolute inset-0 opacity-[0.055] bg-[linear-gradient(to_bottom,transparent_0%,transparent_96%,#1c1410_100%)] bg-size-[100%_34px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.75),transparent_42%)]" />

        <div className="relative z-10 flex h-full flex-1 flex-col">
          <div className="mb-5 flex min-h-6 flex-wrap items-center gap-2 pr-10">
            {tribute.featured ? (
              <span className="bg-[#8b6914]/10 px-2.5 py-1 font-sans text-[10px] uppercase tracking-[0.2em] text-[#8b6914]">
                Featured
              </span>
            ) : null}

            {hasImages ? (
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1c1410]/45">
                ◫ Photos
              </span>
            ) : null}

            {tribute.voice_note_url ? (
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1c1410]/45">
                ♪ Voice Note
              </span>
            ) : null}
          </div>

          {tribute.title ? (
            <h2 className="mb-4 font-heading text-2xl leading-snug text-[#2c2218] transition-colors duration-300 group-hover:text-[#8b6914]">
              {tribute.title}
            </h2>
          ) : null}

          <p className="flex-1 font-sans text-sm leading-7 text-[#1c1410]/70">
            {preview}
          </p>

          <div className="mt-6 border-t border-[#c9a96e]/25 pt-5">
            <p className="font-heading text-base text-[#2c2218]/90">
              {tribute.full_name}
            </p>

            {tribute.relationship ? (
              <p className="mt-1 font-sans text-xs uppercase tracking-[0.18em] text-[#1c1410]/40">
                {tribute.relationship}
              </p>
            ) : null}
          </div>
        </div>
      </article>
    </button>
  );
}
