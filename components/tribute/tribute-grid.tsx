"use client";

import { useState } from "react";
import { Tribute, TributeImage } from "@/types";
import { TributeCard } from "./tribute-card";
import { TributeModal } from "./tribute-modal";

type TributeWithImages = Tribute & {
  images?: TributeImage[];
};

type TributeGridProps = {
  tributes: TributeWithImages[];
};

export function TributeGrid({ tributes }: TributeGridProps) {
  const [selectedTribute, setSelectedTribute] =
    useState<TributeWithImages | null>(null);
  const [open, setOpen] = useState(false);

  function handleOpenTribute(tribute: TributeWithImages) {
    setSelectedTribute(tribute);
    setOpen(true);
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) setSelectedTribute(null);
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {tributes.map((tribute, index) => (
          <TributeCard
            key={tribute.id}
            tribute={tribute}
            index={index}
            onClick={() => handleOpenTribute(tribute)}
          />
        ))}
      </div>

      <TributeModal
        tribute={selectedTribute}
        images={selectedTribute?.images ?? []}
        open={open}
        modalOpenAction={handleOpenChange}
      />
    </>
  );
}
