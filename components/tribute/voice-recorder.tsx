"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type VoiceRecorderProps = {
  value: File | null;
  changeAction: (file: File | null) => void;
  maxDurationSeconds?: number;
};

export function VoiceRecorder({
  value,
  changeAction,
  maxDurationSeconds = 180,
}: VoiceRecorderProps) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<number | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const previewUrl = useMemo(() => {
    if (!value) return null;
    return URL.createObjectURL(value);
  }, [value]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function cleanupTimer() {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function cleanupStream() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }

  useEffect(() => {
    return () => {
      cleanupStream();
      cleanupTimer();
    };
  }, []);

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  function getSupportedMimeType() {
    const candidates = [
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/mp4",
      "audio/ogg;codecs=opus",
    ];

    for (const type of candidates) {
      if (
        typeof MediaRecorder !== "undefined" &&
        MediaRecorder.isTypeSupported(type)
      ) {
        return type;
      }
    }

    return "";
  }

  async function startRecording() {
    try {
      setError(null);

      if (!navigator.mediaDevices?.getUserMedia) {
        setError("Your browser does not support audio recording.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];
      setElapsed(0);

      const mimeType = getSupportedMimeType();
      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });

        const extension = blob.type.includes("mp4")
          ? "m4a"
          : blob.type.includes("ogg")
            ? "ogg"
            : "webm";

        const file = new File([blob], `voice-note-${Date.now()}.${extension}`, {
          type: blob.type || "audio/webm",
        });

        changeAction(file);
        cleanupStream();
        cleanupTimer();
        setIsRecording(false);
      };

      recorder.start();
      setIsRecording(true);

      timerRef.current = window.setInterval(() => {
        setElapsed((prev) => {
          const next = prev + 1;

          if (next >= maxDurationSeconds) {
            stopRecording();
            return maxDurationSeconds;
          }

          return next;
        });
      }, 1000);
    } catch {
      setError("Microphone access was denied or could not be started.");
      cleanupStream();
      cleanupTimer();
      setIsRecording(false);
    }
  }

  function stopRecording() {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
    } else {
      cleanupStream();
      cleanupTimer();
      setIsRecording(false);
    }
  }

  function clearRecording() {
    if (isRecording) {
      stopRecording();
    }
    changeAction(null);
    setElapsed(0);
    setError(null);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        {!isRecording ? (
          <button
            type="button"
            onClick={startRecording}
            className="inline-flex items-center justify-center border border-accent bg-accent/10 px-4 py-2 font-sans text-xs uppercase tracking-[0.15em] text-accent transition-colors hover:bg-accent/20"
          >
            Start Recording
          </button>
        ) : (
          <button
            type="button"
            onClick={stopRecording}
            className="inline-flex items-center justify-center border border-red-300 bg-red-50 px-4 py-2 font-sans text-xs uppercase tracking-[0.15em] text-red-700 transition-colors hover:bg-red-100"
          >
            Stop Recording
          </button>
        )}

        {value ? (
          <button
            type="button"
            onClick={clearRecording}
            className="inline-flex items-center justify-center border border-border px-4 py-2 font-sans text-xs uppercase tracking-[0.15em] text-foreground/60 transition-colors hover:border-accent/50 hover:text-accent"
          >
            Delete Recording
          </button>
        ) : null}
      </div>

      <div className="flex items-center gap-3">
        <div
          className={`h-2 w-2 rounded-full ${isRecording ? "bg-red-500 animate-pulse" : "bg-accent/40"}`}
        />
        <p className="font-sans text-sm text-foreground/55">
          {isRecording
            ? `Recording… ${formatTime(elapsed)} / ${formatTime(maxDurationSeconds)}`
            : value
              ? `Recorded: ${value.name}`
              : `You can record up to ${formatTime(maxDurationSeconds)}.`}
        </p>
      </div>

      {previewUrl ? (
        <div className="border border-accent/20 bg-card/60 p-4">
          <p className="mb-3 font-sans text-xs uppercase tracking-[0.2em] text-accent">
            Preview
          </p>
          <audio controls src={previewUrl} className="w-full" />
        </div>
      ) : null}

      {error ? (
        <p className="border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
