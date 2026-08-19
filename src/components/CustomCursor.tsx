import React, { useEffect, useRef } from 'react';
import { usePortfolioStore } from '../store';

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const { isMagnetic, cursorLabel } = usePortfolioStore();
  const pos   = useRef({ x: -200, y: -200 });
  const ring  = useRef({ x: -200, y: -200 });
  const raf   = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove, { passive: true });

    const tick = () => {
      const { x, y } = pos.current;
      if (dotRef.current) dotRef.current.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`;

      ring.current.x += (x - ring.current.x) * 0.11;
      ring.current.y += (y - ring.current.y) * 0.11;
      const rx = ring.current.x, ry = ring.current.y;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      if (labelRef.current) labelRef.current.style.transform = `translate(${x}px,${y}px) translate(1rem,-50%)`;

      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf.current); };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" style={{ position: 'fixed', top: 0, left: 0 }} />
      <div ref={ringRef} className={`cursor-ring${isMagnetic ? ' mag' : ''}`} aria-hidden="true" style={{ position: 'fixed', top: 0, left: 0 }} />
      {cursorLabel && (
        <div ref={labelRef} className="cursor-label-pill" aria-hidden="true" style={{ position: 'fixed', top: 0, left: 0 }}>
          {cursorLabel}
        </div>
      )}
    </>
  );
}
