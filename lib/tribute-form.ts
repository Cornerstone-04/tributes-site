import { supabase } from "@/lib/supabase";

// ===== FORM VALIDATION CONSTRAINTS =====
export const FORM_CONSTRAINTS = {
  MESSAGE_MIN: 20,
  MESSAGE_MAX: 2000,
  VOICE_NOTE_MAX_DURATION_SECONDS: 180,
  VOICE_NOTE_MAX_SIZE_BYTES: 15 * 1024 * 1024,
} as const;

// ===== TYPE DEFINITIONS =====
export type TributeFormValues = {
  full_name: string;
  relationship: string;
  title: string;
  message: string;
};

export type ValidationError = string | null;

// ===== FORM VALIDATION =====
export function validateTributeForm(values: TributeFormValues): ValidationError {
  if (!values.full_name.trim()) {
    return "Full name is required.";
  }

  const messageLength = values.message.trim().length;
  
  if (messageLength < FORM_CONSTRAINTS.MESSAGE_MIN) {
    return `Tribute message must be at least ${FORM_CONSTRAINTS.MESSAGE_MIN} characters.`;
  }

  if (messageLength > FORM_CONSTRAINTS.MESSAGE_MAX) {
    return `Tribute message must not exceed ${FORM_CONSTRAINTS.MESSAGE_MAX} characters.`;
  }

  return null;
}

export function validateVoiceNoteFile(file: File | null): ValidationError {
  if (!file) return null;

  if (file.size > FORM_CONSTRAINTS.VOICE_NOTE_MAX_SIZE_BYTES) {
    const maxSizeMB = Math.round(
      FORM_CONSTRAINTS.VOICE_NOTE_MAX_SIZE_BYTES / (1024 * 1024)
    );
    return `Voice note file exceeds maximum size of ${maxSizeMB}MB.`;
  }

  return null;
}

// ===== AUDIO UTILITIES =====
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
      reject(new Error("Unable to read audio metadata from the provided file."));
    };
  });
}

// ===== FILE UPLOAD =====
export async function uploadPublicFile(
  bucket: string,
  file: File,
  path: string,
): Promise<string | null> {
  const { error } = await supabase.storage.from(bucket).upload(path, file);

  if (error) {
    console.error(
      `[tribute-form] Upload failed for ${bucket}/${path}:`,
      error.message
    );
    return null;
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

// ===== DEPRECATED CONSTANTS (use FORM_CONSTRAINTS instead) =====
export const MAX_MESSAGE = FORM_CONSTRAINTS.MESSAGE_MAX;
export const MIN_MESSAGE = FORM_CONSTRAINTS.MESSAGE_MIN;
export const MAX_VOICE_NOTE_DURATION = FORM_CONSTRAINTS.VOICE_NOTE_MAX_DURATION_SECONDS;
export const MAX_VOICE_NOTE_SIZE_BYTES = FORM_CONSTRAINTS.VOICE_NOTE_MAX_SIZE_BYTES;
