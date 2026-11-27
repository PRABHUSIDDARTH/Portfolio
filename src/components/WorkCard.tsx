import { useEffect, useRef, useState } from 'react';
import { Link } from '../lib/router';
import type { Work } from '../content';
import { prefersReducedMotion } from '../lib/smooth';
import { WORK_IMAGES } from '../workImages';

export default function WorkCard({ work: w }: { work: Work }) {
  const art = WORK_IMAGES[w.name];
  const [active, setActive] = useState(false);
  const cover = useRef<HTMLSpanElement>(null);

  // No cursor on phones: play while the picture is mostly on screen instead.
  useEffect(() => {
    if (prefersReducedMotion || !cover.current || !window.matchMedia('(hover: none)').matches) return;
    const io = new IntersectionObserver(([e]) => setActive(e.intersectionRatio >= 0.75), { threshold: [0, 0.75] });
    io.observe(cover.current);
    return () => io.disconnect();
  }, []);

  const on = () => { if (!prefersReducedMotion) setActive(true); };
  const off = () => setActive(false);

  return (
    <Link to={w.route ?? w.href} className={active ? 'wcard play' : 'wcard'} data-cursor={w.route ? 'Open' : 'GitHub'}
      onMouseEnter={on} onMouseLeave={off} onFocus={on} onBlur={off}>
      <span ref={cover} className="wcover" style={{ background: art?.bg }} aria-hidden="true">
        {art?.svg && <span className={`wimg wsvg ${art.fit}`} dangerouslySetInnerHTML={{ __html: art.svg }} />}
        {art?.src && <img className={`wimg ${art.fit}`} src={art.src} alt="" loading="lazy" />}
        {art?.hoverSrc && active && <img className={`wimg ${art.fit}`} src={art.hoverSrc} alt="" />}
        {art?.overlay && <span className="wimg wfx" dangerouslySetInnerHTML={{ __html: art.overlay }} />}
        <span className="wstack mono">{w.stack.join(' / ')}</span>
      </span>
      <span className="wbody">
        <span className="wname">{w.name} <span className="arrow">&#8599;</span></span>
        <span className="mono wkind">{w.kind}{w.route ? ' · Flagship' : ''}</span>
        {w.org && <span className="mono muted">{w.org}</span>}
        <span className="wblurb muted">{w.blurb}</span>
      </span>
    </Link>
  );
}
