"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "motion/react";

export function PhotoStrip() {
  const [urls, setUrls] = useState<string[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadPhotos() {
      const { data } = await supabase.storage
        .from("site-gallery")
        .list("", { limit: 20 });

      if (!data) return;

      const signed = await Promise.all(
        data.map((file) =>
          supabase.storage.from("site-gallery").getPublicUrl(file.name),
        ),
      );

      setUrls(signed.map((r) => r.data.publicUrl));
    }

    loadPhotos();
  }, []);

  if (urls.length === 0) return null;

  // Duplicate for seamless loop
  const doubled = [...urls, ...urls];

  return (
    <section className="overflow-hidden py-16 border-y border-accent/15 bg-muted/40">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-10 text-center font-sans text-xs uppercase tracking-[0.35em] text-accent"
      >
        A Life in Photographs
      </motion.p>

      <div className="relative w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-4 animate-scroll"
          style={{ width: "max-content" }}
        >
          {doubled.map((url, i) => (
            <div
              key={i}
              className="h-56 w-44 shrink-0 overflow-hidden border border-[#d8c39a] bg-white/60 p-1.5 shadow-sm rotate-[-0.5deg] odd:rotate-[0.5deg]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
