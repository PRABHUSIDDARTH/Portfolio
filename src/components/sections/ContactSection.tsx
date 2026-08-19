import React from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_META } from '../../data';
import { usePortfolioStore } from '../../store';

const SOCIALS = [
  { label: 'Email',     url: `mailto:${PORTFOLIO_META.email}?subject=Let's%20Connect%20-%20Portfolio&body=Hi%20Prabhu%2C%0A%0A`, handle: PORTFOLIO_META.email },
  { label: 'GitHub',    url: PORTFOLIO_META.github,      handle: 'PRABHUSIDDARTH' },
  { label: 'LinkedIn',  url: PORTFOLIO_META.linkedin,    handle: 'prabhu-siddarth-av' },
  { label: 'LeetCode',  url: PORTFOLIO_META.leetcodeUrl, handle: 'psTech · 300+ solved' },
  { label: 'YouTube',   url: PORTFOLIO_META.youtube,     handle: '@psthetech' },
  { label: 'Instagram', url: PORTFOLIO_META.instagram,   handle: 'they_callme_ps' },
];

export default function ContactSection({ visible }: { visible: boolean }) {
  const { setCursorLabel, setMagnetic } = usePortfolioStore();

  return (
    <motion.div
      className={`section-overlay${visible ? ' visible' : ' hidden'}`}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.6 }}
      style={{ alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}
    >
      {/* Left: big headline */}
      <div style={{ flex: '1 1 280px' }}>
        <motion.div className="label-mono"
          style={{ color: 'var(--practical)', marginBottom: '1.25rem' }}
          initial={{ opacity: 0, x: -16 }} animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -16 }} transition={{ delay: 0.05 }}>
          <span style={{ color: 'var(--practical)' }}>Contact</span>
        </motion.div>

        <motion.div
          style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 0.95, letterSpacing: '-0.04em', color: 'var(--ink)', marginBottom: '2rem' }}
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 24 }} transition={{ delay: 0.1, duration: 0.6 }}>
          Let's build<br />something<br /><span style={{ color: 'var(--practical)' }}>beyond.</span>
        </motion.div>

        {/* Primary mailto CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }} transition={{ delay: 0.28, duration: 0.5 }}>
          <a
            href={`mailto:${PORTFOLIO_META.email}?subject=Let's%20Connect%20-%20Portfolio&body=Hi%20Prabhu%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20wanted%20to%20reach%20out.`}
            className="btn-warm"
            style={{ fontSize: '0.7rem', padding: '1rem 2rem' }}
            onMouseEnter={() => { setCursorLabel('Send Email'); setMagnetic(true); }}
            onMouseLeave={() => { setCursorLabel(''); setMagnetic(false); }}
            aria-label={`Send email to ${PORTFOLIO_META.email}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            {PORTFOLIO_META.email}
          </a>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: 'var(--mist)', marginTop: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Open to work · 2026 · Coimbatore, India
          </p>
        </motion.div>
      </div>

      {/* Right: social links */}
      <div style={{ flex: '1 1 240px' }}>
        <motion.div className="label-mono" style={{ marginBottom: '1.25rem' }}
          initial={{ opacity: 0, x: 16 }} animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 16 }} transition={{ delay: 0.08 }}>
          Find me at
        </motion.div>

        <div className="social-row">
          {SOCIALS.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.url}
              target={s.url.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="social-link"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 20 }}
              transition={{ delay: 0.12 + i * 0.07 }}
              onMouseEnter={() => { setCursorLabel(s.label); setMagnetic(true); }}
              onMouseLeave={() => { setCursorLabel(''); setMagnetic(false); }}
            >
              <span className="social-link-name">{s.label}</span>
              <span style={{ color: 'var(--border-sm)' }}>—</span>
              <span className="social-link-handle">{s.handle}</span>
              <span style={{ marginLeft: 'auto', opacity: 0.5 }}>↗</span>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
