import React, { useEffect, useRef, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import { usePortfolioStore } from './store';
import { PORTFOLIO_META } from './data';

import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Nav';
import SideNav from './components/SideNav';
import TextOnly from './components/sections/TextOnly';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import WorkSection from './components/sections/WorkSection';
import StackSection from './components/sections/StackSection';
import ContactSection from './components/sections/ContactSection';

const Scene = lazy(() => import('./components/scene/Scene'));

// Section visibility thresholds (normalized scroll 0→1)
const THRESHOLDS = [0, 0.22, 0.44, 0.66, 0.88];

export default function App() {
  const {
    isLoaded, reducedMotion, sceneEnabled, liteMode,
    setLoaded, setLoadingProgress, setActiveSection, activeSection,
  } = usePortfolioStore();

  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef   = useRef<number>(0);

  // ── Fake load progress ──────────────────────────────────────────
  useEffect(() => {
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 16 + 5;
      setLoadingProgress(Math.min(p, 95));
      if (p >= 95) clearInterval(iv);
    }, 130);
    const tid = setTimeout(() => setLoaded(), 2200);
    return () => { clearInterval(iv); clearTimeout(tid); };
  }, []);

  // ── Lenis smooth scroll ─────────────────────────────────────────
  useEffect(() => {
    if (reducedMotion) return;
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });

    lenis.on('scroll', ({ scroll, limit }: { scroll: number; limit: number }) => {
      const p = limit > 0 ? scroll / limit : 0;
      scrollRef.current = p;
      let sec = 0;
      THRESHOLDS.forEach((t, i) => { if (p >= t) sec = i; });
      setActiveSection(sec);
    });

    const tick = (time: number) => { lenis.raf(time); rafRef.current = requestAnimationFrame(tick); };
    rafRef.current = requestAnimationFrame(tick);
    return () => { lenis.destroy(); cancelAnimationFrame(rafRef.current); };
  }, [reducedMotion]);

  // ── Mouse ───────────────────────────────────────────────────────
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', fn, { passive: true });
    return () => window.removeEventListener('mousemove', fn);
  }, []);

  // ── Reduced-motion fallback ─────────────────────────────────────
  if (reducedMotion) {
    return (
      <div style={{ minHeight: '100vh', padding: 'clamp(2rem,6vw,5rem)', maxWidth: '52rem', margin: '0 auto' }}>
        <a href="#text-only" className="skip-link">Skip to content</a>
        <div className="label-mono" style={{ marginBottom: '1rem' }}>Software Development Engineer</div>
        <h1 className="display-xl" style={{ marginBottom: '1.25rem' }}>Prabhu Siddarth A V</h1>
        <p className="body-sm" style={{ marginBottom: '2rem' }}>{PORTFOLIO_META.bio}</p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href={`mailto:${PORTFOLIO_META.email}`} className="btn-warm">Hire Me</a>
          <a href={PORTFOLIO_META.github} target="_blank" rel="noopener noreferrer" className="btn-key">GitHub ↗</a>
        </div>
        <TextOnly />
      </div>
    );
  }

  return (
    <>
      <a href="#text-only" className="skip-link">Skip to text version</a>
      <TextOnly />

      <Preloader />
      <CustomCursor />

      {isLoaded && (
        <>
          <Navbar />
          <SideNav />
        </>
      )}

      {/* 3D Canvas — fixed behind everything */}
      {sceneEnabled && !reducedMotion && (
        <div id="canvas-root" aria-hidden="true">
          <Suspense fallback={null}>
            <SceneLive
              getScroll={() => scrollRef.current}
              getMouseX={() => mouseRef.current.x}
              getMouseY={() => mouseRef.current.y}
              liteMode={liteMode}
            />
          </Suspense>
        </div>
      )}

      {/* Scroll driver: creates page height for camera path */}
      <div id="scroll-driver" aria-hidden="true" style={{ height: '500vh' }} />

      {/* DOM section overlays */}
      {isLoaded && (
        <>
          <HeroSection    visible={activeSection === 0} />
          <AboutSection   visible={activeSection === 1} />
          <WorkSection    visible={activeSection === 2} />
          <StackSection   visible={activeSection === 3} />
          <ContactSection visible={activeSection === 4} />
        </>
      )}

      {/* Footer */}
      <footer className="site-footer" role="contentinfo">
        <span className="footer-copy">© 2026 Prabhu Siddarth A V — Always Compiling</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {[
            { l: 'GitHub',    u: PORTFOLIO_META.github },
            { l: 'LinkedIn',  u: PORTFOLIO_META.linkedin },
            { l: 'Email',     u: `mailto:${PORTFOLIO_META.email}` },
          ].map(({ l, u }) => (
            <a key={l} href={u} target={u.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
              className="social-link" style={{ border: 'none', padding: '0', fontSize: '0.55rem' }}>
              {l}
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}

/** Reads live refs every frame to pass current scroll/mouse to the 3D scene */
function SceneLive({ getScroll, getMouseX, getMouseY, liteMode }: {
  getScroll: () => number;
  getMouseX: () => number;
  getMouseY: () => number;
  liteMode: boolean;
}) {
  const [t, setT] = React.useState(0);
  useEffect(() => {
    let id: number;
    const loop = () => { setT(x => x + 1); id = requestAnimationFrame(loop); };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <Scene
      scrollProgress={getScroll()}
      mouseX={getMouseX()}
      mouseY={getMouseY()}
      liteMode={liteMode}
    />
  );
}
