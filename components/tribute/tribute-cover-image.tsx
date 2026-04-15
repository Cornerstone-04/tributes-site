type TributeCoverImageProps = {
  src: string;
};

export function TributeCoverImage({ src }: TributeCoverImageProps) {
  return (
    <div className="mb-12 h-auto w-full overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="h-full w-full object-cover" />
    </div>
  );
}
