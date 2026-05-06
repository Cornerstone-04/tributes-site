type TributeFormFieldProps = {
  label: string;
  required?: boolean;
  hint?: string;
  htmlFor?: string;
  children: React.ReactNode;
};

export function TributeFormField({
  label,
  required,
  hint,
  htmlFor,
  children,
}: TributeFormFieldProps) {
  const hintId = hint
    ? `hint-${label.toLowerCase().replace(/\s+/g, "-")}`
    : undefined;

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <label
          htmlFor={htmlFor}
          className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/70"
        >
          {label}

          {required ? (
            <span className="ml-1 text-accent" aria-label="required">
              *
            </span>
          ) : null}
        </label>

        {hint ? (
          <span
            id={hintId}
            className="font-sans text-[11px] leading-relaxed text-foreground/35"
          >
            {hint}
          </span>
        ) : null}
      </div>

      <div aria-describedby={hintId}>{children}</div>
    </div>
  );
}
