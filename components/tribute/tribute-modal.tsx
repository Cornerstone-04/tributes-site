"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tribute, TributeImage } from "@/types";
import { VoiceNotePlayer } from "@/components/tribute/voice-note-player";

type TributeModalProps = {
  tribute: Tribute | null;
  images: TributeImage[];
  open: boolean;
  modalOpenAction: (open: boolean) => void;
};

export function TributeModal({
  tribute,
  images,
  open,
  modalOpenAction,
}: TributeModalProps) {
  if (!tribute) return null;

  const hasImages = Boolean(tribute.cover_image_url) || images.length > 0;

  return (
    <Dialog open={open} onOpenChange={modalOpenAction}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto border-[#d8c39a] bg-[#f8f0dc] p-0 text-[#1c1410] shadow-[0_20px_60px_rgba(28,20,16,0.18)]">
        <DialogClose
          onClick={() => modalOpenAction(false)}
          className="absolute right-4 top-3 text-[#1c1410] hover:text-[#1c1410] z-50"
        >
          ✕
        </DialogClose>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_bottom,transparent_0%,transparent_96%,#1c1410_100%)] bg-size-[100%_38px]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.7),transparent_35%)]" />

          <div className="relative z-10 p-8 md:p-10">
            <DialogHeader className="text-center">
              {tribute.featured ? (
                <span className="mx-auto mb-5 inline-block bg-[#8b6914]/10 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.25em] text-[#8b6914]">
                  Featured
                </span>
              ) : null}

              <DialogTitle className="font-heading text-3xl leading-snug text-[#2c2218] md:text-4xl">
                {tribute.title || "Tribute"}
              </DialogTitle>

              <p className="mt-5 font-heading text-lg text-[#2c2218]/85">
                {tribute.full_name}
              </p>

              {tribute.relationship ? (
                <p className="mt-1 font-sans text-sm text-[#1c1410]/45">
                  {tribute.relationship}
                </p>
              ) : null}

              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="h-px w-16 bg-[#c9a96e]/40" />
                <span className="text-sm text-[#8b6914]">✦</span>
                <div className="h-px w-16 bg-[#c9a96e]/40" />
              </div>
            </DialogHeader>

            <div className="mt-10 space-y-10">
              {tribute.cover_image_url ? (
                <div className="overflow-hidden rounded-sm border border-[#d8c39a] bg-white/40 p-2 shadow-[0_8px_24px_rgba(28,20,16,0.08)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={tribute.cover_image_url}
                    alt=""
                    className="h-auto max-h-112 w-full object-cover"
                  />
                </div>
              ) : null}

              <div className="mx-auto max-w-2xl">
                <p className="whitespace-pre-wrap font-sans text-base leading-loose text-[#1c1410]/78 md:text-lg">
                  {tribute.message}
                </p>
              </div>

              {tribute.voice_note_url ? (
                <div className="border border-[#c9a96e]/30 bg-white/45 p-6 shadow-[0_8px_24px_rgba(28,20,16,0.06)]">
                  <p className="mb-4 font-sans text-xs uppercase tracking-[0.25em] text-[#8b6914]">
                    Voice Note
                  </p>
                  <VoiceNotePlayer
                    url={tribute.voice_note_url}
                    duration={tribute.voice_note_duration}
                  />
                </div>
              ) : null}

              {hasImages ? (
                <div>
                  <p className="mb-5 font-sans text-xs uppercase tracking-[0.25em] text-[#8b6914]">
                    Photos
                  </p>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {images.map((img) => (
                      <div
                        key={img.id}
                        className="overflow-hidden rounded-sm border border-[#d8c39a] bg-white/40 p-2 shadow-[0_8px_24px_rgba(28,20,16,0.06)]"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.image_url}
                          alt={img.caption ?? ""}
                          className="h-60 w-full object-cover"
                        />
                        {img.caption ? (
                          <p className="mt-2 font-sans text-xs italic text-[#1c1410]/45">
                            {img.caption}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
