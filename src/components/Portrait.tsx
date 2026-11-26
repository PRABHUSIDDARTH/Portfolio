import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/smooth';

const TAGS = ['FastAPI', 'Java', 'LLM apps'];

/** Engraved portrait in depth layers: rays, figure and captions shift with the pointer. */
export default function Portrait() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;
    // --px / --py run from -1 to 1 across the window.
    const move = (e: PointerEvent) => {
      el.style.setProperty('--px', ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3));
      el.style.setProperty('--py', ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3));
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return (
    <div ref={ref} className="portrait">
      <div className="portrait-stage">
        <div className="portrait-frame">
          <span className="p-rays" aria-hidden="true" />
          <span className="p-dots" aria-hidden="true" />
          <img src="/portrait-cutout.webp" alt="Portrait of Prabhu Siddarth" width={720} height={960} />
          <span className="p-sweep" aria-hidden="true" />
        </div>
        {TAGS.map((t, i) => (
          <span key={t} className={`p-tag p-tag-${i} caption mono`} aria-hidden="true">{t}</span>
        ))}
      </div>
    </div>
  );
}
