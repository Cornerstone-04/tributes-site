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
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <label className="font-sans text-xs uppercase tracking-[0.2em] text-foreground/60">
          {label}
          {required ? <span className="ml-1 text-accent">*</span> : null}
        </label>

        {hint ? (
          <span className="font-sans text-xs text-foreground/30">{hint}</span>
        ) : null}
      </div>

      {children}
    </div>
  );
}
