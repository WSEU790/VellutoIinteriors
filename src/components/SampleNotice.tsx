export function SampleNotice({ className = '' }: { className?: string }) {
  return (
    <p className={`text-xs leading-relaxed text-ivory-dim ${className}`}>
      Imagery and portfolio entries shown are <strong className="font-normal text-ivory-muted">sample design concepts</strong> rendered for illustration. They are not photographs of completed Velluto Interiors projects and will be replaced with project photography.
    </p>
  );
}
