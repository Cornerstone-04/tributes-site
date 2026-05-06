import { TributeFormField } from "./tribute-form-field";
import { VoiceRecorder } from "./voice-recorder";

type TributeMediaInputsProps = {
  images: File[];
  voiceNote: File | null;
  onImagesChange: (files: File[]) => void;
  onVoiceNoteChange: (file: File | null) => void;
};

export function TributeMediaInputs({
  images,
  voiceNote,
  onImagesChange,
  onVoiceNoteChange,
}: TributeMediaInputsProps) {
  return (
    <>
      <TributeFormField
        label="Photos"
        hint="Optional · JPEG, PNG, or WebP · Max 5MB each"
      >
        <div className="border border-dashed border-accent/30 bg-[#f8f0dc]/35 p-5 transition-colors hover:border-accent/50">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={(e) => onImagesChange(Array.from(e.target.files ?? []))}
            className={fileInputClass}
          />

          <p className="mt-3 font-sans text-xs leading-6 text-foreground/40">
            Share family photographs, celebration moments, or memories you would
            like included alongside your tribute.
          </p>

          {images.length > 0 ? (
            <p className="mt-4 font-sans text-xs uppercase tracking-[0.18em] text-accent">
              {images.length} file
              {images.length > 1 ? "s" : ""} selected
            </p>
          ) : null}
        </div>
      </TributeFormField>

      <TributeFormField
        label="Voice Note"
        hint="Optional · Record up to 3 minutes"
      >
        <div className="border border-accent/15 bg-[#f8f0dc]/30 p-5">
          <VoiceRecorder
            value={voiceNote}
            changeAction={onVoiceNoteChange}
            maxDurationSeconds={180}
          />
        </div>
      </TributeFormField>
    </>
  );
}

const fileInputClass =
  "w-full font-sans text-sm text-foreground/55 \
  file:mr-4 \
  file:cursor-pointer \
  file:border-0 \
  file:bg-accent/10 \
  file:px-5 \
  file:py-3 \
  file:font-sans \
  file:text-[11px] \
  file:font-medium \
  file:uppercase \
  file:tracking-[0.18em] \
  file:text-accent \
  file:transition-colors \
  hover:file:bg-accent/20";
