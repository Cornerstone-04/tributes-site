type TributeMessageProps = {
  message: string;
};

export function TributeMessage({ message }: TributeMessageProps) {
  return (
    <div className="prose prose-lg mb-16 max-w-none">
      <p className="whitespace-pre-wrap font-sans text-lg leading-[1.9] text-foreground/75">
        {message}
      </p>
    </div>
  );
}
