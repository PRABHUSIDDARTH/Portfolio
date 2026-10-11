import { useMemo, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import Field from '../components/Field';
import FlagVisual from '../components/FlagVisual';
import { Footer } from '../components/Chrome';
import { CAPABILITIES, FLAGSHIPS, PATH, PROFILE, STATS, WORKS, WorkKind } from '../content';
import { Split, useHeroIntro, useMeta, useReveals } from '../lib/motion';
import { Link } from '../lib/router';
import { gsap, prefersReducedMotion } from '../lib/smooth';

const KINDS: ('All' | WorkKind)[] = ['All', 'Systems', 'AI', 'Mobile', 'Java', 'Web'];

function Hero() {
  const ref = useRef<HTMLElement>(null);
  useHeroIntro(ref);
  return (
    <section ref={ref} className="hero" aria-labelledby="hero-title">
      <Field />
      <div className="hero-meta mono">
        <span data-hero-fade>{PROFILE.role}</span>
        <span data-hero-fade className="muted">Backend / Distributed systems</span>
        <span data-hero-fade className="muted">Android / Applied AI</span>
        <span data-hero-fade className="muted" style={{ justifySelf: 'end' }}>{PROFILE.location}</span>
      </div>
      <h1 id="hero-title" className="display h-xl hero-name">
        <span data-hero-line><span>Prabhu</span></span>
        <span data-hero-line><span className="italic">Siddarth</span></span>
      </h1>
      <div className="hero-foot">
        <p className="lede" data-hero-fade>
          I build backend systems and then the product around them. Right now that means a multi-cloud storage router, an open-source Java SDK for LLMs, and an offline music player.
        </p>
        <div data-hero-fade style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <Link to="/#flagships" className="pill solid"><span className="dot" /> See the flagships</Link>
          <a href={PROFILE.resume} download className="pill">Resume <span className="arrow">&darr;</span></a>
          <Link to={PROFILE.linkedin} className="pill">LinkedIn <span className="arrow">&#8599;</span></Link>
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
        <span id="about-title">(01) About</span>
        <span className="muted">{PROFILE.college}</span>
      </div>
      <p className="statement">
        {PROFILE.statement.split(' ').map((w, i) => (
          <span key={i} className="sw">{w} </span>
        ))}
      </p>
      <div className="stats">
        {STATS.map((s) => (
          <div key={s.label} className="stat" data-reveal>
            <b>{s.value}</b>
            <span className="mono muted">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Flagships() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1001px) and (prefers-reduced-motion: no-preference)', () => {
        const track = ref.current!.querySelector<HTMLElement>('.flag-track')!;
        const distance = () => track.scrollWidth - window.innerWidth;
        // Vertical scroll is translated into a horizontal camera pan across the cards.
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        gsap.to('.flag-progress i', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: () => `+=${distance()}`, scrub: true } });
        gsap.utils.toArray<HTMLElement>('.flag-card .visual > *').forEach((v) => {
          gsap.fromTo(v, { xPercent: -12, scale: 1.12 }, { xPercent: 12, scale: 1.12, ease: 'none', scrollTrigger: { trigger: v.closest('.flag-card'), containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="flagships" className="flag-pin" aria-labelledby="flag-title">
      <div className="flag-track">
        <div className="flag-intro">
          <span className="mono">(02) Flagship products</span>
          <div>
            <h2 id="flag-title" className="display h-lg">The ones I&rsquo;d <span className="italic">demo first.</span></h2>
            <p className="body" style={{ marginTop: '1.5rem' }}>
              Each has its own page with something you can poke at: the router, the player, the SDK. Keep scrolling to pan; click one to open it.
            </p>
          </div>
          <span className="mono muted">Scroll &rarr;</span>
        </div>
        {FLAGSHIPS.map((f) => (
          <Link
            key={f.slug}
            to={f.path}
            className="flag-card"
            data-cursor="Enter"
            style={{ ['--card-bg' as any]: f.bg, ['--card-fg' as any]: f.fg }}
            aria-label={`${f.name}: ${f.tagline}`}
          >
            <div className="copy">
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                <span className="mono">{f.index} / {f.kicker}</span>
                <span className="mono" style={{ opacity: 0.6 }}>{f.path}</span>
              </div>
              <div>
                <div className="name">{f.name}</div>
                <p style={{ fontSize: '1.15rem', lineHeight: 1.35, marginTop: '1rem', maxWidth: '26ch' }}>{f.tagline}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
                <div className="metrics">
                  {f.metrics.map((m) => (
                    <div key={m.label}>
                      <b>{m.value}</b>
                      <span className="mono" style={{ opacity: 0.6 }}>{m.label}</span>
                    </div>
                  ))}
                </div>
                <span className="cta">Explore {f.name} <span className="arrow">&#8599;</span></span>
              </div>
            </div>
            <div className="visual">
              <FlagVisual slug={f.slug} accent={f.accent} />
            </div>
          </Link>
        ))}
        <div style={{ width: '1px', flex: 'none' }} />
      </div>
      <div className="flag-progress"><i /></div>
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
        <span>(03) Index</span>
        <span className="muted">{WORKS.length} projects, picked from 39 repos</span>
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
        <span>(04) Capabilities</span>
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
      <ol className="path" style={{ marginTop: 'clamp(5rem, 10vw, 8rem)' }} aria-label="Path">
        {PATH.map((p) => (
          <li key={p.title} data-reveal>
            <span className="mono muted">{p.year}</span>
            <span className="h-sm serif">{p.title}</span>
            <span className="body">{p.detail}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function Home() {
  const ref = useRef<HTMLElement>(null);
  useReveals(ref);
  useMeta(
    'Prabhu Siddarth A V | Software Development Engineer',
    'Prabhu Siddarth A V, software engineer in Coimbatore. Builder of NexusCloud (multi-cloud storage), Swara (offline Android music player) and sidd-ai (open-source Java SDK for LLMs).',
  );
  return (
    <main ref={ref} id="main" className="page">
      <Hero />
      <Statement />
      <Flagships />
      <WorksIndex />
      <Capabilities />
      <Footer />
    </main>
  );
}
