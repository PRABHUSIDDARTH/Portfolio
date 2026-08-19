import React, { useEffect, useRef } from 'react';
import { usePortfolioStore } from '../store';

const LINES = [
  { text: '> booting portfolio runtime...', type: 'key' },
  { text: '> loading scene geometry...', type: 'mist' },
  { text: '> compiling icosahedral shards...', type: 'mist' },
  { text: '> binding scroll choreography...', type: 'mist' },
  { text: '> mounting post-fx stack...', type: 'mist' },
  { text: '> [ok] all systems online', type: 'ok' },
];

export default function Preloader() {
  const { loadingProgress, isLoaded } = usePortfolioStore();
  const ref = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lines = linesRef.current?.querySelectorAll('.tl') as NodeListOf<HTMLElement>;
    if (!lines) return;
    lines.forEach((el, i) => {
      const threshold = (i / lines.length) * 90;
      if (loadingProgress >= threshold) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }
    });
  }, [loadingProgress]);

  useEffect(() => {
    if (isLoaded && ref.current) ref.current.classList.add('out');
  }, [isLoaded]);

  return (
    <div id="preloader" ref={ref}>
      <div className="pre-title" aria-hidden="true">PS</div>

      <div className="pre-terminal" ref={linesRef} role="status" aria-live="polite" aria-label="Loading portfolio">
        {LINES.map((l, i) => (
          <div key={i} className={`tl t-${l.type}`}
            style={{ opacity: 0, transform: 'translateY(4px)', transition: 'opacity 0.3s ease, transform 0.3s ease' }}>
            {l.text}
          </div>
        ))}
      </div>

      <div className="pre-bar-wrap" role="progressbar" aria-valuenow={loadingProgress} aria-valuemin={0} aria-valuemax={100} aria-label="Loading progress">
        <div className="pre-bar-fill" style={{ width: `${loadingProgress}%` }} />
      </div>
      <div className="pre-bar-label">COMPILING… {Math.round(loadingProgress)}%</div>
    </div>
  );
}
