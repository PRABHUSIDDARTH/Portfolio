import React, { RefObject, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, intro, prefersReducedMotion } from './smooth';
import { FLAGSHIPS } from '../content';

gsap.registerPlugin(useGSAP);

/** Scroll-triggered reveals for [data-reveal] blocks and [data-split] word-masked headings in scope. */
export function useReveals(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 44,
          autoAlpha: 0,
          duration: 1.2,
          ease: 'expo.out',
          delay: parseFloat(el.dataset.delay || '0'),
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
        gsap.from(el.querySelectorAll('.w > span'), {
          yPercent: 118,
          duration: 1.15,
          ease: 'expo.out',
          stagger: 0.045,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
      });
    },
    { scope },
  );
}

/** Hero intro: masked lines rise in once the preloader/curtain has cleared. */
export function useHeroIntro(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      const tl = gsap.timeline({ delay: intro.delay });
      tl.from('[data-hero-line] > span', { yPercent: 120, duration: 1.4, ease: 'expo.out', stagger: 0.08 })
        .from('[data-hero-fade]', { autoAlpha: 0, y: 24, duration: 1.1, ease: 'expo.out', stagger: 0.06 }, '-=1.0');
      intro.delay = 0.1;
    },
    { scope },
  );
}

type SplitProps = { text: string; as?: 'h1' | 'h2' | 'h3' | 'p'; className?: string; id?: string };

/** Word-masked text; each word slides up out of its own clipping box. */
export function Split({ text, as = 'h2', className, id }: SplitProps) {
  const Tag = as;
  const words = text.split(' ');
  return (
    <Tag className={className} id={id} data-split="" aria-label={text}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className="w" aria-hidden="true">
            <span>{w}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </Tag>
  );
}

/** Per-route title, description, canonical and theme colour. */
export function useMeta(title: string, description: string, theme = '#EEEAE2') {
  useEffect(() => {
    document.title = title;
    const url = window.location.origin + window.location.pathname;
    const set = (sel: string, attr: string, value: string) =>
      document.head.querySelector(sel)?.setAttribute(attr, value);
    set('meta[name="description"]', 'content', description);
    set('meta[property="og:title"]', 'content', title);
    set('meta[property="og:description"]', 'content', description);
    set('meta[property="og:url"]', 'content', url);
    set('meta[name="twitter:title"]', 'content', title);
    set('meta[name="twitter:description"]', 'content', description);
    set('meta[name="theme-color"]', 'content', theme);
    set('link[rel="canonical"]', 'href', url);
  }, [title, description, theme]);
}

export const nextFlagship = (slug: string) => {
  const i = FLAGSHIPS.findIndex((f) => f.slug === slug);
  return FLAGSHIPS[(i + 1) % FLAGSHIPS.length];
};
