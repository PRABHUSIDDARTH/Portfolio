import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/smooth';

type Props = { src: string; poster: string; name: string; ambient?: boolean };

/**
 * Project demo. Nothing downloads until needed: the poster shows first.
 * `ambient` loops muted while on screen (flagship card); otherwise it has controls.
 */
export default function DemoVideo({ src, poster, name, ambient }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || !ambient || prefersReducedMotion) return;
    v.muted = true;
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()),
      { threshold: 0.4 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [ambient]);

  return (
    <video
      ref={ref}
      className={ambient ? 'demo demo-ambient' : 'demo'}
      src={src}
      poster={poster}
      preload="none"
      playsInline
      muted={ambient}
      loop={ambient}
      controls={!ambient}
      aria-label={`${name} demo video`}
      aria-hidden={ambient || undefined}
    />
  );
}
