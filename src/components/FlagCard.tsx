import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { Flagship } from '../content';
import { Link } from '../lib/router';
import { gsap, prefersReducedMotion } from '../lib/smooth';
import FlagVisual from './FlagVisual';
import DemoVideo from './DemoVideo';

/** One flagship: a "before" sheet wipes off once to show what was built. */
export default function FlagCard({ f }: { f: Flagship }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      gsap.to('.flag-before', {
        clipPath: 'inset(0% 0% 0% 100%)',
        duration: 1.1,
        delay: 0.35,
        ease: 'expo.inOut',
        scrollTrigger: { trigger: ref.current, start: 'top 65%', once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref}>
      <Link to={f.path} className="flag-card" data-cursor="Enter" style={{ ['--card-bg' as any]: f.bg, ['--card-fg' as any]: f.fg }}>
        <div className="copy">
          <span className="mono">{f.index} / {f.kicker}</span>
          <div className="name"><img className="flag-logo" src={f.logo} alt="" width={64} height={64} loading="lazy" />{f.name}</div>
          <div className="story">
            <p><span className="mono">Before</span>{f.before}</p>
            <p><span className="mono">What I built</span>{f.after}</p>
          </div>
          <div className="metrics">
            {f.metrics.map((m) => (
              <div key={m.label}><b>{m.value}</b><span className="mono">{m.label}</span></div>
            ))}
          </div>
          <span className="cta">Explore {f.name} <span className="arrow">&#8599;</span></span>
        </div>
        <div className="visual">
          {f.video ? <DemoVideo {...f.video} name={f.name} ambient /> : <FlagVisual slug={f.slug} accent={f.accent} />}
        </div>
        {!prefersReducedMotion && (
          <div className="flag-before" style={{ clipPath: 'inset(0% 0% 0% 0%)' }} aria-hidden="true">
            <span className="mono">Before {f.name}</span>
            <p>{f.before}</p>
          </div>
        )}
      </Link>
    </div>
  );
}
