"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Tribute } from "@/types";
import {
  TributeFormValues,
  MAX_MESSAGE,
  MAX_VOICE_NOTE_DURATION,
  getAudioDuration,
  uploadPublicFile,
  validateTributeForm,
  validateVoiceNoteFile,
} from "@/lib/tribute-form";
import { TributeFormField } from "./tribute-form-field";
import { TributeFormSuccess } from "./tribute-form-success";
import { TributeMediaInputs } from "./tribute-media-inputs";

type Props =
  | { mode: "create"; tribute?: undefined }
  | { mode: "edit"; tribute: Tribute };

export function TributeForm({ mode, tribute }: Props) {
  const router = useRouter();

  const [form, setForm] = useState<TributeFormValues>({
    full_name: tribute?.full_name ?? "",
    relationship: tribute?.relationship ?? "",
    title: tribute?.title ?? "",
    message: tribute?.message ?? "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [voiceNote, setVoiceNote] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function setField(field: keyof TributeFormValues, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleCreate() {
    let voiceNoteUrl: string | null = null;
    let voiceNoteDuration: number | null = null;
    let coverImageUrl: string | null = null;

    if (voiceNote) {
      voiceNoteDuration = await getAudioDuration(voiceNote);

      if (voiceNoteDuration > MAX_VOICE_NOTE_DURATION) {
        throw new Error("Voice note exceeds 3 minutes.");
      }

      const voicePath = `${Date.now()}-${voiceNote.name}`;
      voiceNoteUrl = await uploadPublicFile(
        "voice-notes",
        voiceNote,
        voicePath,
      );
    }

    if (images.length > 0) {
      const coverPath = `${Date.now()}-${images[0].name}`;
      coverImageUrl = await uploadPublicFile(
        "tribute-images",
        images[0],
        coverPath,
      );
    }

    const res = await fetch("/api/tributes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: form.full_name.trim(),
        relationship: form.relationship.trim() || null,
        title: form.title.trim() || null,
        message: form.message.trim(),
        voice_note_url: voiceNoteUrl,
        voice_note_duration: voiceNoteDuration,
        cover_image_url: coverImageUrl,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Submission failed.");
    }

    const { id: tributeId } = await res.json(); // get the ID back

    if (images.length > 1 && tributeId) {
      for (let i = 1; i < images.length; i++) {
        const path = `${tributeId}/${Date.now()}-${images[i].name}`;
        const imageUrl = await uploadPublicFile(
          "tribute-images",
          images[i],
          path,
        );

        if (imageUrl) {
          await supabase.from("tribute_images").insert({
            tribute_id: tributeId,
            image_url: imageUrl,
            order: i,
          });
        }
      }
    }

    setSuccess(true);
  }

  async function handleEdit(currentTribute: Tribute) {
    let voiceNoteUrl: string | null = currentTribute.voice_note_url ?? null;
    let voiceNoteDuration: number | null =
      currentTribute.voice_note_duration ?? null;
    let coverImageUrl: string | null = currentTribute.cover_image_url ?? null;

    if (voiceNote) {
      voiceNoteDuration = await getAudioDuration(voiceNote);

      if (voiceNoteDuration > MAX_VOICE_NOTE_DURATION) {
        throw new Error("Voice note exceeds 3 minutes.");
      }

      const voicePath = `${Date.now()}-${voiceNote.name}`;
      voiceNoteUrl = await uploadPublicFile(
        "voice-notes",
        voiceNote,
        voicePath,
      );
    }

    if (images.length > 0) {
      const coverPath = `${Date.now()}-${images[0].name}`;
      coverImageUrl = await uploadPublicFile(
        "tribute-images",
        images[0],
        coverPath,
      );
    }

    const { error: updateError } = await supabase
      .from("tributes")
      .update({
        full_name: form.full_name.trim(),
        relationship: form.relationship.trim() || null,
        title: form.title.trim() || null,
        message: form.message.trim(),
        voice_note_url: voiceNoteUrl,
        voice_note_duration: voiceNoteDuration,
        cover_image_url: coverImageUrl,
      })
      .eq("id", currentTribute.id);

    if (updateError) throw updateError;

    router.push(`/admin/tributes/${currentTribute.id}`);
    router.refresh();
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const validationError = validateTributeForm(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    const voiceFileError = validateVoiceNoteFile(voiceNote);
    if (voiceFileError) {
      setError(voiceFileError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (mode === "create") {
        await handleCreate();
      } else {
        await handleEdit(tribute);
      }
    } catch (err) {
      console.error(err);

      if (err instanceof Error) {
        setError(err.message || "Something went wrong. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return <TributeFormSuccess fullName={form.full_name} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <TributeFormField label="Full Name" required>
        <input
          type="text"
          value={form.full_name}
          onChange={(e) => setField("full_name", e.target.value)}
          placeholder="Your full name"
          className={inputClass}
        />
      </TributeFormField>

      <TributeFormField label="Relationship to Olusola">
        <input
          type="text"
          value={form.relationship}
          onChange={(e) => setField("relationship", e.target.value)}
          placeholder="e.g. Granddaughter, Friend, Colleague"
          className={inputClass}
        />
      </TributeFormField>

      <TributeFormField label="Title">
        <input
          type="text"
          value={form.title}
          onChange={(e) => setField("title", e.target.value)}
          placeholder="A short title for your tribute (optional)"
          className={inputClass}
        />
      </TributeFormField>

      <TributeFormField label="Your Tribute" required>
        <textarea
          value={form.message}
          onChange={(e) => setField("message", e.target.value)}
          rows={8}
          placeholder="Share your memory, message, or story…"
          className={`${inputClass} resize-none`}
        />
        <p className="mt-1.5 text-right font-sans text-xs text-foreground/30">
          {form.message.length} / {MAX_MESSAGE}
        </p>
      </TributeFormField>

      <TributeMediaInputs
        images={images}
        voiceNote={voiceNote}
        onImagesChange={setImages}
        onVoiceNoteChange={setVoiceNote}
      />

      {error ? (
        <p className="border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm text-red-600/80">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-accent py-4 font-sans text-sm uppercase tracking-[0.15em] text-background transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Submitting…"
          : mode === "create"
            ? "Submit Tribute"
            : "Save Changes"}
      </button>
    </form>
  );
}

const inputClass =
  "w-full border border-border bg-card/80 px-4 py-3 font-sans text-sm text-foreground placeholder:text-foreground/30 transition-colors focus:border-accent/60 focus:outline-none";
