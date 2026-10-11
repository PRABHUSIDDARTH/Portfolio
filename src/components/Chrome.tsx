import React, { useEffect, useRef, useState } from 'react';
import { FLAGSHIPS, PROFILE } from '../content';
import { Link, useRouter } from '../lib/router';
import { gsap, intro, prefersReducedMotion, startScroll, stopScroll } from '../lib/smooth';

/** Counter preloader. Real readiness = fonts loaded; capped so it never blocks for long. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) { onDone(); return; }
    intro.delay = 0.35;
    stopScroll();
    const state = { v: 0 };
    const tl = gsap.timeline({ paused: true });
    tl.to(state, {
      v: 100, duration: 1.5, ease: 'power3.inOut',
      onUpdate: () => {
        if (count.current) count.current.textContent = String(Math.round(state.v)).padStart(3, '0');
        if (bar.current) bar.current.style.transform = `scaleX(${state.v / 100})`;
      },
    })
      .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.0, ease: 'expo.inOut' }, '+=0.1')
      .add(() => { startScroll(); onDone(); }, '-=0.6');
    const fonts = (document as any).fonts?.ready ?? Promise.resolve();
    Promise.race([fonts, new Promise((r) => setTimeout(r, 1200))]).then(() => tl.play());
    return () => { tl.kill(); startScroll(); };
  }, []);

  return (
    <div ref={root} className="preloader" style={{ clipPath: 'inset(0% 0% 0% 0%)' }} aria-hidden="true">
      <div className="mono" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Prabhu Siddarth A V</span>
        <span>Portfolio, 2026</span>
      </div>
      <div>
        <span ref={count} className="preloader-count" style={{ display: 'block', textAlign: 'right' }}>000</span>
        <div className="preloader-bar"><i ref={bar} /></div>
      </div>
    </div>
  );
}

export function Nav() {
  const { path } = useRouter();
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const el = menu.current;
    if (!el) return;
    if (open) {
      stopScroll();
      gsap.timeline()
        .set(el, { visibility: 'visible' })
        .to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'expo.inOut' })
        .from(el.querySelectorAll('.big'), { yPercent: 100, autoAlpha: 0, stagger: 0.05, duration: 0.8, ease: 'expo.out' }, '-=0.35');
    } else {
      startScroll();
      gsap.to(el, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.6, ease: 'expo.inOut', onComplete: () => { gsap.set(el, { visibility: 'hidden' }); } });
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header className="nav">
        <Link to="/" className="nav-brand" aria-label="Home">
          <span className="serif">Prabhu Siddarth</span>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {FLAGSHIPS.map((f) => (
            <Link key={f.slug} to={f.path} className="ulink" aria-current={path === f.path ? 'page' : undefined}>
              {f.name}
            </Link>
          ))}
          <Link to="/#work" className="ulink">Index</Link>
          <Link to="/#contact" className="ulink">Contact</Link>
          <a href={PROFILE.resume} download className="nav-cta">Resume &darr;</a>
        </nav>
        <button className="nav-menu-btn" aria-expanded={open} aria-controls="menu" onClick={() => setOpen((o) => !o)}>
          {open ? 'Close' : 'Menu'}
        </button>
      </header>
      <div id="menu" ref={menu} className="menu" aria-hidden={!open}>
        <span className="mono" style={{ marginBottom: '1.5rem' }}>Flagships</span>
        {FLAGSHIPS.map((f) => (
          <Link key={f.slug} to={f.path} className="big">{f.name}</Link>
        ))}
        <span className="mono" style={{ margin: '2rem 0 1rem' }}>More</span>
        <Link to="/#work" className="big" onClick={() => setOpen(false)}>Index</Link>
        <Link to="/#contact" className="big" onClick={() => setOpen(false)}>Contact</Link>
        <div className="mono" style={{ marginTop: '2.5rem', display: 'flex', gap: '1.5rem' }}>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={PROFILE.resume} download>Resume</a>
        </div>
      </div>
    </>
  );
}

/** Lerped dot cursor that expands into a label over [data-cursor] targets. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion || window.matchMedia('(pointer: coarse)').matches) return;
    const el = dot.current!;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3' });
    const move = (e: PointerEvent) => {
      if (!el.classList.contains('on')) { gsap.set(el, { x: e.clientX, y: e.clientY }); el.classList.add('on'); }
      xTo(e.clientX);
      yTo(e.clientY);
      const t = (e.target as HTMLElement)?.closest?.('[data-cursor]') as HTMLElement | null;
      if (t) { text.current!.textContent = t.dataset.cursor!; el.classList.add('is-label'); }
      else el.classList.remove('is-label');
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return (
    <div ref={dot} className="cursor" aria-hidden="true">
      <span ref={text} />
    </div>
  );
}

type Status = { kind: 'idle' | 'sending' | 'sent' | 'error'; msg?: string };

function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus({ kind: 'sending' });
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || 'Something went wrong.');
      form.reset();
      setStatus({ kind: 'sent' });
    } catch (err: any) {
      setStatus({ kind: 'error', msg: err.message });
    }
  };

  if (status.kind === 'sent') {
    return (
      <div className="cform sent" role="status">
        <span className="display h-md">Got it. <span className="italic">Thanks.</span></span>
        <p className="body">It&rsquo;s in my inbox now. I usually reply within a day or two.</p>
        <button className="pill" onClick={() => setStatus({ kind: 'idle' })}>Send another</button>
      </div>
    );
  }

  return (
    <form className="cform" onSubmit={submit} noValidate={false}>
      <div className="cform-row">
        <label><span className="mono">Your name</span><input name="name" required maxLength={80} autoComplete="name" /></label>
        <label><span className="mono">Email</span><input name="email" type="email" required maxLength={120} autoComplete="email" /></label>
      </div>
      <label><span className="mono">Company or team (optional)</span><input name="company" maxLength={120} autoComplete="organization" /></label>
      <label><span className="mono">What are you working on?</span><textarea name="message" required minLength={10} maxLength={4000} rows={4} /></label>
      {/* Honeypot for bots; hidden from people and assistive tech. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
        <button type="submit" className="pill solid light" disabled={status.kind === 'sending'}>
          <span className="dot" /> {status.kind === 'sending' ? 'Sending...' : 'Send message'}
        </button>
        <span className="mono muted" role="status" aria-live="polite" style={{ color: status.kind === 'error' ? '#ff8a6b' : undefined }}>
          {status.kind === 'error' ? status.msg : 'Goes straight to my inbox.'}
        </span>
      </div>
    </form>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="contact">
      <p className="mono muted" style={{ marginBottom: '2rem' }}>Hiring, collaborating, or just curious about one of the builds</p>
      <h2 className="contact-mail">
        Say <span className="italic">hello.</span>
      </h2>
      <div className="contact-grid">
        <ContactForm />
        <div className="contact-side">
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="li-card" data-cursor="Connect">
            <span className="mono muted">LinkedIn</span>
            <span className="h-sm serif">Connect with me on LinkedIn</span>
            <span className="mono">/in/prabhu-siddarth-av <span className="arrow">&#8599;</span></span>
          </a>
          <a href={PROFILE.resume} download className="pill solid light"><span className="dot" /> Download resume (PDF)</a>
          <a href={`mailto:${PROFILE.email}`} className="pill light">{PROFILE.email}</a>
        </div>
      </div>
      <div className="foot">
        <span className="mono muted">&copy; 2026 {PROFILE.name}. Built in {PROFILE.location}.</span>
        <nav aria-label="Social">
          <a className="ulink" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="ulink" href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="ulink" href={PROFILE.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
        </nav>
      </div>
    </footer>
  );
}
