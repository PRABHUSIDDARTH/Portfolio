import React, { useState, useEffect, AnimationEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PORTFOLIO_META } from '../../data';
import { usePortfolioStore } from '../../store';

const ROLES = [
  'Backend Engineer',
  'Android Developer',
  'Distributed Systems',
  'AI Systems Builder',
  'Open Source Dev',
];

export default function HeroSection({ visible }: { visible: boolean }) {
  const { setCursorLabel, setMagnetic } = usePortfolioStore();
  const [ri, setRi] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRi(i => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(id);
  }, []);

  const V = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  return (
    <motion.div
      className={`section-overlay${visible ? ' visible' : ' hidden'}`}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      style={{ alignItems: 'flex-end', paddingBottom: '10vh' }}
    >
      <div style={{ maxWidth: '60rem' }}>
        {/* Label */}
        <motion.div
          className="label-mono"
          style={{ marginBottom: '1.25rem' }}
          variants={V} initial="hidden" animate={visible ? 'show' : 'hidden'}
          transition={{ delay: 0.05, duration: 0.5 }}
        >
          Software Development Engineer
        </motion.div>

        {/* Name — two lines with word-mask reveal */}
        <div className="display-xl" style={{ marginBottom: '0.75rem', overflow: 'hidden' }}>
          {['PRABHU', 'SIDDARTH A V'].map((w, i) => (
            <motion.div
              key={w}
              initial={{ y: '110%' }}
              animate={{ y: visible ? '0%' : '110%' }}
              transition={{ delay: 0.1 + i * 0.09, duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
              style={{ display: 'block', lineHeight: 0.93 }}
            >
              {w}
            </motion.div>
          ))}
        </div>

        {/* Rotating role */}
        <div style={{ height: '2rem', overflow: 'hidden', marginBottom: '2.5rem' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={ri}
              className="display-lg"
              style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', color: 'var(--key)', fontWeight: 600 }}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.38 }}
            >
              {ROLES[ri]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stats row */}
        <motion.div
          style={{ display: 'flex', gap: '2.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}
          variants={V} initial="hidden" animate={visible ? 'show' : 'hidden'}
          transition={{ delay: 0.38, duration: 0.5 }}
        >
          {[
            { v: '350+', l: 'LeetCode' },
            { v: '8.26', l: 'CGPA' },
            { v: '15+',  l: 'Projects' }
          ].map(s => (
            <div key={s.l}>
              <div className="stat-value">{s.v}</div>
              <div className="stat-label">{s.l}</div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}
          variants={V} initial="hidden" animate={visible ? 'show' : 'hidden'}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <a
            href={`mailto:${PORTFOLIO_META.email}?subject=Let's%20Connect%20-%20Saw%20your%20Portfolio&body=Hi%20Prabhu%2C%0A%0A`}
            className="btn-warm"
            onMouseEnter={() => { setCursorLabel('Email'); setMagnetic(true); }}
            onMouseLeave={() => { setCursorLabel(''); setMagnetic(false); }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            Hire Me
          </a>
          <a
            href={PORTFOLIO_META.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-key"
            onMouseEnter={() => { setCursorLabel('GitHub'); setMagnetic(true); }}
            onMouseLeave={() => { setCursorLabel(''); setMagnetic(false); }}
          >
            GitHub ↗
          </a>
        </motion.div>

        <motion.div
          className="scroll-cue"
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 0.55 : 0 }}
          transition={{ delay: 1.0 }}
          aria-hidden="true"
        >
          <span>↓</span><span>scroll to explore</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
