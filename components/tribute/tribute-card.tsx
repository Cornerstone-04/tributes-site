import { Tribute } from "@/types";

type TributeCardProps = {
  tribute: Tribute & {
    images?: { id: string }[];
  };
  onClick: () => void;
  index?: number;
};

const rotations = [
  "rotate-[-1.2deg]",
  "rotate-[0.8deg]",
  "rotate-[-0.6deg]",
  "rotate-[1deg]",
  "rotate-[-0.8deg]",
  "rotate-[0.5deg]",
];

export function TributeCard({ tribute, onClick, index = 0 }: TributeCardProps) {
  const preview =
    tribute.message.length > 160
      ? `${tribute.message.slice(0, 160).trimEnd()}…`
      : tribute.message;

  const rotation = rotations[index % rotations.length];
  const hasImages =
    Boolean(tribute.cover_image_url) || (tribute.images?.length ?? 0) > 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative block w-full text-left transition-transform duration-300 hover:-translate-y-1 ${rotation}`}
    >
      <article className="relative min-h-80 overflow-hidden rounded-xs border border-[#d8c39a] bg-[#fff8e8] p-6 shadow-[0_10px_30px_rgba(28,20,16,0.10)] transition-all duration-300 group-hover:shadow-[0_18px_40px_rgba(28,20,16,0.16)]">
        <div className="absolute top-0 right-0 h-16 w-16 overflow-hidden">
          <div className="clip-curl absolute top-0 right-0 h-16 w-16 origin-top-right bg-[linear-gradient(135deg,#f3dfb3_0%,#ead29a_48%,#dcbc73_100%)] shadow-[-2px_2px_8px_rgba(28,20,16,0.10)]" />
        </div>

        <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_bottom,transparent_0%,transparent_96%,#1c1410_100%)] bg-size-[100%_36px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.65),transparent_40%)]" />

        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-4 flex flex-wrap items-center gap-2 pr-10">
            {tribute.featured ? (
              <span className="bg-[#8b6914]/10 px-2 py-0.5 font-sans text-[10px] uppercase tracking-[0.2em] text-[#8b6914]">
                Featured
              </span>
            ) : null}

            {hasImages ? (
              <span className="flex items-center gap-1 font-sans text-[10px] uppercase tracking-[0.2em] text-[#1c1410]/45">
                <span>◫</span> Photos
              </span>
            ) : null}

            {tribute.voice_note_url ? (
              <span className="flex items-center gap-1 font-sans text-[10px] uppercase tracking-[0.2em] text-[#1c1410]/45">
                <span>♪</span> Voice note
              </span>
            ) : null}
          </div>

          {tribute.title ? (
            <h2 className="mb-3 font-heading text-xl leading-snug text-[#2c2218] transition-colors duration-300 group-hover:text-[#8b6914]">
              {tribute.title}
            </h2>
          ) : null}

          <p className="flex-1 font-sans text-sm leading-7 text-[#1c1410]/70">
            {preview}
          </p>

          <div className="mt-5 border-t border-[#c9a96e]/25 pt-4">
            <p className="font-heading text-sm text-[#2c2218]/90">
              {tribute.full_name}
            </p>

            {tribute.relationship ? (
              <p className="mt-1 font-sans text-xs text-[#1c1410]/45">
                {tribute.relationship}
              </p>
            ) : null}
          </div>
        </div>
      </article>
    </button>
  );
}
