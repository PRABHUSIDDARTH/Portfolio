import { useState } from 'react';

export type FanItem = { label: string; note: string; card: React.ReactNode };

/** Three cards fanned out beside the title; pick one to bring it forward. */
export default function HeroFan({ items }: { items: FanItem[] }) {
  const [front, setFront] = useState(0);
  return (
    <div className="fan">
      <div className="fan-stage">
        {items.map((it, i) => (
          <div key={it.label} className="fan-card" data-pos={(i - front + items.length) % items.length} aria-hidden={i !== front} onClick={() => setFront(i)}>
            {it.card}
          </div>
        ))}
      </div>
      <div className="fan-row" role="group" aria-label="Preview">
        {items.map((it, i) => (
          <button key={it.label} type="button" className="chip" aria-pressed={i === front} onClick={() => setFront(i)}>{it.label}</button>
        ))}
      </div>
      <p className="mono muted fan-note" aria-live="polite">{items[front].note}</p>
    </div>
  );
}
