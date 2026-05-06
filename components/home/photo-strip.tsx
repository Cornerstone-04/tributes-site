"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "motion/react";

export function PhotoStrip() {
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    async function loadPhotos() {
      const { data, error } = await supabase.storage
        .from("site-gallery")
        .list("", {
          limit: 24,
          sortBy: { column: "name", order: "asc" },
        });

      if (error || !data) return;

      const publicUrls = data
        .filter((file) => file.name && !file.name.startsWith("."))
        .map((file) => {
          const { data } = supabase.storage
            .from("site-gallery")
            .getPublicUrl(file.name);

          return data.publicUrl;
        });

      setUrls(publicUrls);
    }

    loadPhotos();
  }, []);

  if (urls.length === 0) return null;

  const doubled = [...urls, ...urls];

  return (
    <section className="relative overflow-hidden border-y border-accent/15 bg-muted/40 py-14 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.7),transparent_55%)]" />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 mb-9 text-center font-sans text-xs font-medium uppercase tracking-[0.35em] text-accent md:mb-12"
      >
        A Life in Photographs
      </motion.p>

      <div className="relative z-10 w-full overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-20 bg-linear-to-r from-muted/90 to-transparent md:w-36" />
        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-20 bg-linear-to-l from-muted/90 to-transparent md:w-36" />

        <div className="flex w-max gap-4 animate-scroll md:gap-5">
          {doubled.map((url, i) => (
            <motion.figure
              key={`${url}-${i}`}
              whileHover={{ y: -8, scale: 1.03, rotate: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`shrink-0 overflow-hidden border border-accent/25 bg-[#f8f0dc] p-2 shadow-[0_12px_30px_rgba(28,20,16,0.12)] ${
                i % 2 === 0 ? "-rotate-1" : "rotate-1"
              }`}
            >
              <div className="overflow-hidden bg-background">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt=""
                  loading="lazy"
                  className="h-44 w-34 object-cover transition-transform duration-500 hover:scale-105 md:h-60 md:w-48"
                />
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
