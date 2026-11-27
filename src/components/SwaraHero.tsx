import { useState } from 'react';

// Forest is a real screen capture; the other two are recoloured from it, and the caption says so.
// Track names and artwork in all three are placeholders.
const THEMES = [
  { id: 'swara', name: 'Swara', c: '#D4AF5A', captured: false },
  { id: 'forest', name: 'Forest', c: '#30D158', captured: true },
  { id: 'rose', name: 'Rose', c: '#FF375F', captured: false },
];

/** Three themes fanned out; pick one to bring it forward. */
export default function SwaraHero() {
  const [front, setFront] = useState(0);
  const th = THEMES[front];
  return (
    <div className="sh">
      <div className="sh-fan">
        {THEMES.map((t, i) => (
          <img
            key={t.id}
            src={`/media/swara-hero/${t.id}.webp`}
            alt={i === front ? `Swara Deck player in the ${t.name} theme, with placeholder track details` : ''}
            width={1050}
            height={2240}
            data-pos={(i - front + THEMES.length) % THEMES.length}
            onClick={() => setFront(i)}
          />
        ))}
      </div>
      <div className="sh-row" role="group" aria-label="Theme">
        {THEMES.map((t, i) => (
          <button key={t.id} type="button" className="sh-sw" style={{ background: t.c }} aria-label={`${t.name} theme`} aria-pressed={i === front} onClick={() => setFront(i)} />
        ))}
        <span className="mono muted" aria-live="polite">
          {th.name} theme{th.captured ? '' : ', recoloured preview'}
        </span>
      </div>
    </div>
  );
}
