import { VoiceNotePlayer } from "@/components/tribute/voice-note-player";

type TributeVoiceNoteSectionProps = {
  url: string;
  duration?: number | null;
};

export function TributeVoiceNoteSection({
  url,
  duration,
}: TributeVoiceNoteSectionProps) {
  return (
    <div className="mb-16 border border-accent/25 bg-card/60 p-6">
      <p className="mb-4 font-sans text-xs uppercase tracking-[0.25em] text-accent">
        Voice Note
      </p>

      <VoiceNotePlayer url={url} duration={duration} />
    </div>
  );
}
