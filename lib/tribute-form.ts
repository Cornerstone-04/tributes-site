import { supabase } from "@/lib/supabase";

export const MAX_MESSAGE = 2000;
export const MIN_MESSAGE = 20;
export const MAX_VOICE_NOTE_DURATION = 180;
export const MAX_VOICE_NOTE_SIZE_BYTES = 15 * 1024 * 1024;

export type TributeFormValues = {
  full_name: string;
  relationship: string;
  title: string;
  message: string;
};

export function validateTributeForm(values: TributeFormValues): string | null {
  if (!values.full_name.trim()) {
    return "Full name is required.";
  }

  if (values.message.trim().length < MIN_MESSAGE) {
    return `Message must be at least ${MIN_MESSAGE} characters.`;
  }

  if (values.message.trim().length > MAX_MESSAGE) {
    return `Message must be under ${MAX_MESSAGE} characters.`;
  }

  return null;
}

export function validateVoiceNoteFile(file: File | null): string | null {
  if (!file) return null;

  if (file.size > MAX_VOICE_NOTE_SIZE_BYTES) {
    return "Voice note file is too large.";
  }

  return null;
}

export async function getAudioDuration(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const audio = document.createElement("audio");
    const objectUrl = URL.createObjectURL(file);

    audio.preload = "metadata";
    audio.src = objectUrl;

    audio.onloadedmetadata = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(Math.ceil(audio.duration || 0));
    };

    audio.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Unable to read audio duration."));
    };
  });
}

export async function uploadPublicFile(
  bucket: string,
  file: File,
  path: string,
): Promise<string | null> {
  const { error } = await supabase.storage.from(bucket).upload(path, file);

  if (error) {
    console.error(`Upload failed for ${bucket}/${path}:`, error);
    return null;
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}
