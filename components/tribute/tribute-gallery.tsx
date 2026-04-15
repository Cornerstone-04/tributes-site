import { TributeImage } from "@/types";

type TributeGalleryProps = {
  images: TributeImage[];
};

export function TributeGallery({ images }: TributeGalleryProps) {
  if (images.length === 0) return null;

  return (
    <div className="mb-16">
      <p className="mb-6 font-sans text-xs uppercase tracking-[0.25em] text-accent">
        Photos
      </p>

      <div className="grid grid-cols-2 gap-3">
        {images.map((img) => (
          <div key={img.id} className="overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.image_url}
              alt={img.caption ?? ""}
              className="h-52 w-full object-cover transition-transform duration-500 hover:scale-105"
            />

            {img.caption ? (
              <p className="mt-1 font-sans text-xs italic text-foreground/40">
                {img.caption}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
