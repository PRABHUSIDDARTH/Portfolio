import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Live scroll state shared with the WebGL layer (velocity drives displacement). */
export const scrollState = { velocity: 0, scroll: 0 };

/** Seconds before a page's intro choreography starts: covers the preloader or route curtain. */
export const intro = { delay: 0 };

let lenis: Lenis | null = null;
const raf = (time: number) => lenis?.raf(time * 1000);

export function initSmoothScroll() {
  if (lenis || prefersReducedMotion) return;
  // Lerp-based inertia: position += (target - position) * 0.085 every frame.
  lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
  lenis.on('scroll', (l: Lenis) => {
    scrollState.velocity = l.velocity;
    scrollState.scroll = l.scroll;
    ScrollTrigger.update();
  });
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo(0, 0);
}

export function scrollToTarget(target: string | HTMLElement) {
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
  else el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
}

export const stopScroll = () => lenis?.stop();
export const startScroll = () => lenis?.start();

export { gsap, ScrollTrigger };
