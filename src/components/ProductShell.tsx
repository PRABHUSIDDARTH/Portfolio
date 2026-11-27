import React, { useEffect, useRef } from 'react';
import { Flagship, FLAGSHIPS } from '../content';
import { nextFlagship, useHeroIntro, useMeta, useReveals } from '../lib/motion';
import { Link } from '../lib/router';
import { PAGES } from '../seo';
import { Footer } from './Chrome';
import DemoVideo from './DemoVideo';

type Props = {
  f: Flagship;
  links: { label: string; href: string }[];
  heroExtra?: React.ReactNode;
  children: React.ReactNode;
  lightField?: boolean;
};

/** Shared scaffold for flagship pages: themed hero, sections, next-product handoff, contact. */
export default function ProductShell({ f, links, heroExtra, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  useReveals(ref);
  useHeroIntro(heroRef);
  useMeta(PAGES[f.path].title, PAGES[f.path].description, f.bg);
  const next = nextFlagship(f.slug);
  // A deployed product site becomes the first, primary button.
  const actions = f.site ? [{ label: 'Visit site', href: f.site }, ...links] : links;
  // The header sits outside <main>, so give it this page's colours.
  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty('--page-bg', f.bg);
    root.setProperty('--page-fg', f.fg);
    return () => {
      root.removeProperty('--page-bg');
      root.removeProperty('--page-fg');
    };
  }, [f.bg, f.fg]);
  const light = f.slug === 'nexuscloud' || f.slug === 'coedit';
  const line = light ? 'rgba(10,22,38,0.14)' : 'rgba(255,255,255,0.13)';
  const muted = light ? '#4D5B6E' : 'rgba(236,234,246,0.6)';

  return (
    <main
      ref={ref}
      id="main"
      className="page product"
      style={{ ['--p-bg' as any]: f.bg, ['--p-fg' as any]: f.fg, ['--p-accent' as any]: f.accent, ['--page-line' as any]: line, ['--page-muted' as any]: muted }}
    >
      <section ref={heroRef} className="p-hero" aria-labelledby="p-title">
        <div className="p-hero-top mono">
          <span data-hero-fade>Flagship {f.index} / {String(FLAGSHIPS.length).padStart(2, '0')}</span>
          <span data-hero-fade className="muted">{f.kicker}</span>
        </div>
        <div className="p-lead">
          <div className="p-title-row">
            <img data-hero-fade className="p-logo" src={f.logo} alt={`${f.name} logo`} width={72} height={72} />
            <h1 id="p-title" className="display p-title">
              <span data-hero-line><span>{f.name}</span></span>
            </h1>
          </div>
          <p data-hero-fade className="display h-sm italic" style={{ marginTop: '0.6rem' }}>{f.tagline}</p>
          {heroExtra}
        </div>
        <dl data-hero-fade className="p-story">
          <div><dt className="mono muted">Before</dt><dd>{f.before}</dd></div>
          <div><dt className="mono muted">What I built</dt><dd>{f.after}</dd></div>
        </dl>
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
            {actions.map((l, i) => (
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

      {f.video && (
        <section className="section wrap" style={{ paddingBottom: 0 }} aria-label={`${f.name} demo`}>
          <SectionHead n="00" label="Demo" right={f.video.silent ? 'Press play' : 'Press play, sound on'} />
          <DemoVideo {...f.video} name={f.name} />
        </section>
      )}

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
