type TributeFormFieldProps = {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
};

export function TributeFormField({
  label,
  required,
  hint,
  children,
}: TributeFormFieldProps) {
  const hintId = hint ? `hint-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined;

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-4">
        <label className="font-sans text-xs uppercase tracking-[0.2em] text-foreground/60">
          {label}
          {required ? (
            <>
              <span className="ml-1 text-accent" aria-label="required">
                *
              </span>
            </>
          ) : null}
        </label>

        {hint ? (
          <span
            id={hintId}
            className="font-sans text-xs text-foreground/30 whitespace-nowrap"
          >
            {hint}
          </span>
        ) : null}
      </div>

      <div aria-describedby={hintId}>{children}</div>
    </div>
  );
}
