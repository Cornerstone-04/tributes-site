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
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={(e) => onImagesChange(Array.from(e.target.files ?? []))}
          className={fileInputClass}
        />
        {images.length > 0 ? (
          <p className="mt-1.5 font-sans text-xs text-accent">
            {images.length} file{images.length > 1 ? "s" : ""} selected
          </p>
        ) : null}
      </TributeFormField>

      <TributeFormField
        label="Voice Note"
        hint="Optional · Record up to 3 minutes"
      >
        <VoiceRecorder
          value={voiceNote}
          changeAction={onVoiceNoteChange}
          maxDurationSeconds={180}
        />
      </TributeFormField>
    </>
  );
}

const fileInputClass =
  "w-full font-sans text-sm text-foreground/50 file:mr-4 file:cursor-pointer file:border-0 file:bg-accent/10 file:px-4 file:py-2 file:font-sans file:text-xs file:uppercase file:tracking-wide file:text-accent hover:file:bg-accent/20";
