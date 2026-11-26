import { useMemo, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import FlagCard from '../components/FlagCard';
import Portrait from '../components/Portrait';
import { Footer } from '../components/Chrome';
import { CAPABILITIES, FLAGSHIPS, PATH, PROFILE, STATS, WORKS, WorkKind } from '../content';
import { Split, useHeroIntro, useMeta, useReveals } from '../lib/motion';
import { Link } from '../lib/router';
import { gsap, prefersReducedMotion } from '../lib/smooth';

const KINDS: ('All' | WorkKind)[] = ['All', 'Systems', 'AI', 'Mobile', 'Java', 'Web'];

const PROOF = [
  { value: '600+', label: 'sidd-ai downloads' },
  { value: '7', label: 'clouds in NexusCloud' },
  ...STATS,
];

const TICKER = ['Python', 'FastAPI', 'Java', 'PostgreSQL', 'Redis', 'Docker', 'GCP Cloud Run', 'React', 'LLM apps'];

function Hero() {
  const ref = useRef<HTMLElement>(null);
  useHeroIntro(ref);
  return (
    <section ref={ref} className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <span className="caption mono" data-hero-fade>{PROFILE.location}</span>
        <h1 id="hero-title" className="display hero-name">
          <span data-hero-line><span>Prabhu</span></span>
          <span data-hero-line><span className="italic">Siddarth</span></span>
        </h1>
        <p className="hero-headline serif" data-hero-fade>{PROFILE.headline}</p>
        <div className="hero-actions" data-hero-fade>
          <Link to="/#flagships" className="pill solid"><span className="dot" /> See projects</Link>
          <a href={PROFILE.resume} download className="pill">Resume <span className="arrow">&darr;</span></a>
          <Link to={PROFILE.linkedin} className="pill">LinkedIn <span className="arrow">&#8599;</span></Link>
        </div>
        <dl className="hero-proof" data-hero-fade>
          {PROOF.map((s) => (
            <div key={s.label}>
              <dt className="mono">{s.label}</dt>
              <dd className="serif">{s.value}</dd>
            </div>
          ))}
        </dl>
        <ol className="hero-path" aria-label="Experience" data-hero-fade>
          {PATH.map((p) => (
            <li key={p.title}>
              <span className="mono">{p.year}</span>
              <span className="serif">{p.title}</span>
            </li>
          ))}
        </ol>
      </div>
      <Portrait />
      <div className="ticker mono" aria-hidden="true">
        <div>
          {[0, 1].map((n) => (
            <span key={n}>{TICKER.map((t) => <b key={t}>{t}</b>)}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Statement() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      gsap.to('.statement .sw', {
        opacity: 1,
        stagger: 0.08,
        ease: 'none',
        scrollTrigger: { trigger: '.statement', start: 'top 80%', end: 'bottom 45%', scrub: true },
      });
    },
    { scope: ref },
  );
  return (
    <section ref={ref} className="section wrap" aria-labelledby="about-title">
      <div className="sec-head mono">
        <span id="about-title">(04) About</span>
        <span className="muted">{PROFILE.college}</span>
      </div>
      <p className="statement">
        {PROFILE.statement.split(' ').map((w, i) => (
          <span key={i} className="sw">{w} </span>
        ))}
      </p>
    </section>
  );
}

function Flagships() {
  return (
    <section id="flagships" className="section wrap" aria-labelledby="flag-title">
      <div className="sec-head mono">
        <span>(01) Flagship projects</span>
        <span className="muted">The problem, then what I built</span>
      </div>
      <h2 id="flag-title" className="display h-lg flag-heading">The ones I&rsquo;d <span className="italic">demo first.</span></h2>
      <div className="flag-stack">
        {FLAGSHIPS.map((f) => <FlagCard key={f.slug} f={f} />)}
      </div>
    </section>
  );
}

function WorksIndex() {
  const [kind, setKind] = useState<(typeof KINDS)[number]>('All');
  const list = useMemo(() => (kind === 'All' ? WORKS : WORKS.filter((w) => w.kind === kind)), [kind]);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      gsap.from('.row', { autoAlpha: 0, y: 16, duration: 0.6, stagger: 0.025, ease: 'expo.out' });
    },
    { scope: listRef, dependencies: [kind], revertOnUpdate: true },
  );

  return (
    <section id="work" className="section wrap" aria-labelledby="work-title">
      <div className="sec-head mono">
        <span>(03) More work</span>
        <a className="muted ulink" href={PROFILE.github} target="_blank" rel="noopener noreferrer">All repositories on GitHub &#8599;</a>
      </div>
      <Split text="Selected work." className="display h-lg" id="work-title" />
      <div className="filters" role="group" aria-label="Filter projects" style={{ marginTop: '2.5rem' }}>
        {KINDS.map((k) => (
          <button key={k} className="chip" aria-pressed={kind === k} onClick={() => setKind(k)}>
            {k}
            <sup>{k === 'All' ? WORKS.length : WORKS.filter((w) => w.kind === k).length}</sup>
          </button>
        ))}
      </div>
      <div ref={listRef} role="list">
        {list.map((w, i) => (
          <Link key={w.name} to={w.route ?? w.href} className="row" role="listitem" data-cursor={w.route ? 'Open' : 'GitHub'}>
            <span className="num mono muted">{String(i + 1).padStart(2, '0')}</span>
            <span>
              <span className="rname">{w.name}</span>
              {w.route && <span className="tag">Flagship</span>}
              {w.org && <span className="mono muted" style={{ display: 'block', marginTop: 4 }}>{w.org}</span>}
            </span>
            <span className="rblurb muted" style={{ fontSize: 14.5 }}>{w.blurb}</span>
            <span className="rstack mono muted">{w.stack.join(' / ')}</span>
            <span className="mono" style={{ textAlign: 'right' }}>{w.kind} <span className="arrow">&#8599;</span></span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section className="section wrap" aria-labelledby="cap-title">
      <div className="sec-head mono">
        <span>(02) Skills</span>
        <span className="muted">Tools I ship with</span>
      </div>
      <div className="split2" style={{ marginBottom: 'clamp(3rem, 7vw, 6rem)' }}>
        <Split text="Mostly backend, comfortable further out." className="display h-md" id="cap-title" />
        <p className="body" data-reveal style={{ alignSelf: 'end' }}>
          I usually start with the data model and the failure cases, because that&rsquo;s where most rewrites come from. After that I&rsquo;m happy writing the React dashboard or the Android screen myself.
        </p>
      </div>
      <div className="caps">
        {CAPABILITIES.map((c, i) => (
          <div key={c.title} className="cap" data-reveal data-delay={String(i * 0.08)}>
            <h3>{c.title}</h3>
            <ul>{c.items.map((it) => <li key={it}>{it}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const ref = useRef<HTMLElement>(null);
  useReveals(ref);
  useMeta(
    'Prabhu Siddarth A V | AI Backend Engineer (student)',
    'Prabhu Siddarth A V, B.Tech IT student in Coimbatore, NexusCloud, sidd-ai, Coedit and Swara.',
  );
  return (
    <main ref={ref} id="main" className="page">
      <Hero />
      <Flagships />
      <Capabilities />
      <WorksIndex />
      <Statement />
      <Footer />
    </main>
  );
}
