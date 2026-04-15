type TributeFormSuccessProps = {
  fullName: string;
};

export function TributeFormSuccess({ fullName }: TributeFormSuccessProps) {
  return (
    <div className="py-16 text-center">
      <p className="mb-4 text-4xl">✦</p>

      <h2 className="mb-3 font-heading text-2xl text-primary">
        Thank you, {fullName.split(" ")[0]}.
      </h2>

      <p className="mx-auto max-w-xs font-sans text-sm text-foreground/50">
        Your tribute has been submitted and will appear once reviewed.
      </p>
    </div>
  );
}
