import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { FLAGSHIPS } from '../content';
import { gsap, intro, prefersReducedMotion, scrollToTarget, scrollToTop, ScrollTrigger } from './smooth';

type RouterValue = { path: string; navigate: (to: string) => void };
const RouterContext = createContext<RouterValue>({ path: '/', navigate: () => {} });
export const useRouter = () => useContext(RouterContext);

export const normalizePath = (p: string) => {
  const s = p.replace(/\/+$/, '').toLowerCase();
  return s === '' ? '/' : s;
};

function curtainFor(path: string) {
  const f = FLAGSHIPS.find((x) => x.path === path);
  if (f) return { label: f.name, bg: f.accent, fg: '#0B0B0A' };
  return { label: 'Prabhu Siddarth', bg: '#141412', fg: '#EEEAE2' };
}

/**
 * History router with a cinematic curtain between states. The outgoing page stays mounted
 * until the curtain fully covers it; only then is the incoming page swapped in underneath.
 */
export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));
  const curtain = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const busy = useRef(false);
  const pendingHash = useRef<string | null>(window.location.hash || null);

  useEffect(() => {
    const onPop = () => {
      setPath(normalizePath(window.location.pathname));
      requestAnimationFrame(scrollToTop);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    if (pendingHash.current) {
      const h = pendingHash.current;
      pendingHash.current = null;
      setTimeout(() => scrollToTarget(h), 200);
    }
    return () => cancelAnimationFrame(id);
  }, [path]);

  const navigate = useCallback(
    (to: string) => {
      const [rawPath, hash] = to.split('#');
      const target = normalizePath(rawPath || path);
      if (target === path) {
        if (hash) scrollToTarget(`#${hash}`);
        else scrollToTarget(document.body);
        return;
      }
      if (busy.current) return;
      busy.current = true;

      const swap = () => {
        window.history.pushState(null, '', target + (hash ? `#${hash}` : ''));
        if (hash) pendingHash.current = `#${hash}`;
        intro.delay = prefersReducedMotion ? 0 : 0.5;
        scrollToTop();
        setPath(target);
      };

      const el = curtain.current;
      if (prefersReducedMotion || !el || !label.current) {
        swap();
        busy.current = false;
        return;
      }
      const c = curtainFor(target);
      label.current.textContent = c.label;
      el.style.background = c.bg;
      el.style.color = c.fg;

      gsap
        .timeline({
          onComplete: () => {
            busy.current = false;
            gsap.set(el, { visibility: 'hidden' });
          },
        })
        .set(el, { visibility: 'visible', clipPath: 'inset(100% 0% 0% 0%)' })
        .to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'expo.inOut' })
        .fromTo(label.current, { yPercent: 110 }, { yPercent: 0, duration: 0.7, ease: 'expo.out' }, '-=0.35')
        .add(swap)
        .to(label.current, { yPercent: -110, duration: 0.5, ease: 'expo.in' }, '+=0.15')
        .to(el, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.85, ease: 'expo.inOut' }, '-=0.2');
    },
    [path],
  );

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
      <div ref={curtain} className="curtain" aria-hidden="true">
        <span className="curtain-mask">
          <span ref={label} className="curtain-label" />
        </span>
      </div>
    </RouterContext.Provider>
  );
}

type LinkProps = { to: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

export function Link({ to, children, onClick, ...rest }: LinkProps) {
  const { navigate } = useRouter();
  if (/^(https?:|mailto:)/.test(to)) {
    return (
      <a href={to} target={to.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <a
      href={to}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
