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

  function handleOpenTribute(tribute: TributeWithImages) {
    setSelectedTribute(tribute);
  }

  function handleOpenChange(open: boolean) {
    if (!open) setSelectedTribute(null);
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
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
        open={Boolean(selectedTribute)}
        modalOpenAction={handleOpenChange}
      />
    </>
  );
}
