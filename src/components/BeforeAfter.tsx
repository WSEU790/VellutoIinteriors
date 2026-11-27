import { useCallback, useRef, useState } from 'react';

interface Props {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
}

/** Accessible before/after comparison slider (pointer + keyboard). */
export function BeforeAfter({ before, after, beforeAlt, afterAlt }: Props) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <div>
      <div
        ref={ref}
        className="relative aspect-[16/10] select-none overflow-hidden bg-onyx-700 touch-none"
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as Element).setPointerCapture?.(e.pointerId);
          update(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && update(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <img src={after} alt={afterAlt} className="absolute inset-0 h-full w-full object-cover" draggable={false} loading="lazy" />
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img src={before} alt={beforeAlt} className="absolute inset-0 h-full w-full object-cover" draggable={false} loading="lazy" />
        </div>
        <span className="sample-badge absolute left-4 top-4">Before</span>
        <span className="sample-badge absolute right-4 top-4">After</span>
        <div className="pointer-events-none absolute inset-y-0 w-px bg-gold" style={{ left: `${pos}%` }}>
          <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold bg-onyx/80 text-gold">⇆</div>
        </div>
      </div>
      <label className="mt-4 flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.24em] text-ivory-dim">
        <span>Before</span>
        <input type="range" min={0} max={100} value={Math.round(pos)} onChange={(e) => setPos(Number(e.target.value))} className="w-full accent-[#b89a64]" aria-label="Before and after comparison position" />
        <span>After</span>
      </label>
    </div>
  );
}
