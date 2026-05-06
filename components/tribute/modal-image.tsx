"use client";

import { useState } from "react";

type ModalImageProps = {
  src: string;
  alt?: string;
  className?: string;
};

export function ModalImage({ src, alt = "", className = "" }: ModalImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden bg-[#eadbb8]/45">
      {!loaded ? (
        <div className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,rgba(248,240,220,0.55),rgba(255,255,255,0.75),rgba(248,240,220,0.55))]" />
      ) : null}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
      />
    </div>
  );
}
