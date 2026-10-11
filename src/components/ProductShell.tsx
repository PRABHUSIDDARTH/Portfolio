import React, { useRef } from 'react';
import { Flagship } from '../content';
import { nextFlagship, useHeroIntro, useMeta, useReveals } from '../lib/motion';
import { Link } from '../lib/router';
import { Footer } from './Chrome';
import Field from './Field';

type Props = {
  f: Flagship;
  links: { label: string; href: string }[];
  heroExtra?: React.ReactNode;
  children: React.ReactNode;
  lightField?: boolean;
};

/** Shared scaffold for flagship pages: themed hero, sections, next-product handoff, contact. */
export default function ProductShell({ f, links, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  useReveals(ref);
  useHeroIntro(heroRef);
  useMeta(`${f.name} | ${f.tagline} | Prabhu Siddarth`, `${f.summary}`, f.bg);
  const next = nextFlagship(f.slug);
  const line = f.slug === 'nexuscloud' ? 'rgba(10,22,38,0.14)' : 'rgba(255,255,255,0.13)';
  const muted = f.slug === 'nexuscloud' ? '#4D5B6E' : 'rgba(236,234,246,0.6)';

  return (
    <main
      ref={ref}
      id="main"
      className="page product"
      style={{ ['--p-bg' as any]: f.bg, ['--p-fg' as any]: f.fg, ['--p-accent' as any]: f.accent, ['--page-line' as any]: line, ['--page-muted' as any]: muted }}
    >
      <section ref={heroRef} className="p-hero" aria-labelledby="p-title">
        <Field ink={f.fg} accent={f.accent} density={f.slug === 'swara' ? 9 : 12} />
        <div className="p-hero-top mono">
          <span data-hero-fade>Flagship {f.index} / 03</span>
          <span data-hero-fade className="muted">{f.kicker}</span>
        </div>
        <h1 id="p-title" className="display p-title">
          <span data-hero-line><span>{f.name}</span></span>
        </h1>
        <p data-hero-fade className="display h-sm italic" style={{ marginTop: '0.6rem' }}>{f.tagline}</p>
        <div className="p-hero-grid">
          <p data-hero-fade className="body" style={{ color: f.fg, opacity: 0.85 }}>{f.summary}</p>
          <div data-hero-fade className="p-metrics">
            {f.metrics.map((m) => (
              <div key={m.label}>
                <b>{m.value}</b>
                <span className="mono muted">{m.label}</span>
              </div>
            ))}
          </div>
          <div data-hero-fade style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', alignItems: 'flex-start' }}>
            {links.map((l, i) => (
              <Link key={l.href} to={l.href} className={i === 0 ? 'pill solid' : 'pill'}>
                {i === 0 && <span className="dot" />} {l.label} <span className="arrow">&#8599;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 'clamp(3rem,6vw,5rem)' }}>
        <div className="grid-12 mono" style={{ borderTop: `1px solid ${line}`, paddingTop: '1.2rem' }}>
          <span style={{ gridColumn: 'span 3' }} className="muted">Role</span>
          <span style={{ gridColumn: 'span 9' }}>{f.role}</span>
        </div>
        <div className="p-stack" style={{ marginTop: '1.2rem' }}>
          {f.stack.map((s) => <span key={s}>{s}</span>)}
        </div>
      </section>

      {children}

      <Link to={next.path} className="next" data-cursor="Next" style={{ ['--next-accent' as any]: next.accent }}>
        <span className="mono muted">Next flagship / {next.index}</span>
        <div className="display h-xl" style={{ marginTop: '1rem' }}>{next.name} <span className="arrow italic">&rarr;</span></div>
        <p className="lede" style={{ marginTop: '1rem' }}>{next.tagline}</p>
      </Link>
      <Footer />
    </main>
  );
}

export function SectionHead({ n, label, right }: { n: string; label: string; right?: string }) {
  return (
    <div className="sec-head mono">
      <span>({n}) {label}</span>
      {right && <span className="muted">{right}</span>}
    </div>
  );
}
