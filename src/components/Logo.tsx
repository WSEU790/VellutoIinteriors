export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`flex flex-col leading-none ${className}`}>
      <span className="font-serif text-2xl font-normal tracking-[0.42em] text-ivory sm:text-[1.7rem]">VELLUTO</span>
      <span className="mt-1 pl-[0.2em] text-[0.55rem] uppercase tracking-[0.62em] text-gold">Interiors</span>
    </span>
  );
}
