import React from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_META, TIMELINE } from '../../data';

export default function AboutSection({ visible }: { visible: boolean }) {
  const V = (d = 0) => ({ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0, transition: { delay: d, duration: 0.5 } } });

  return (
    <motion.div
      className={`section-overlay${visible ? ' visible' : ' hidden'}`}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      style={{ alignItems: 'center', overflowY: 'auto' }}
    >
      <div style={{ maxWidth: '68rem', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>

        {/* Left: Bio */}
        <div>
          <motion.div className="label-mono" style={{ marginBottom: '1rem' }}
            variants={V(0.05)} initial="hidden" animate={visible ? 'show' : 'hidden'}>
            About Me
          </motion.div>

          <motion.h2 className="display-lg" style={{ marginBottom: '1.25rem' }}
            variants={V(0.12)} initial="hidden" animate={visible ? 'show' : 'hidden'}>
            Third-year.<br />Always compiling.
          </motion.h2>

          <motion.p className="body-sm" style={{ marginBottom: '1.5rem', maxWidth: '32rem' }}
            variants={V(0.2)} initial="hidden" animate={visible ? 'show' : 'hidden'}>
            {PORTFOLIO_META.bio}
          </motion.p>

          <motion.div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}
            variants={V(0.28)} initial="hidden" animate={visible ? 'show' : 'hidden'}>
            {['B.Tech IT', 'Sri Shakthi, CBE', '3rd Year', 'CGPA 8.26', '350+ LC'].map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </motion.div>

          <motion.div style={{ display: 'flex', gap: '0.75rem' }}
            variants={V(0.35)} initial="hidden" animate={visible ? 'show' : 'hidden'}>
            <a href={PORTFOLIO_META.github} target="_blank" rel="noopener noreferrer" className="btn-key" style={{ fontSize: '0.6rem', padding: '0.6rem 1.25rem' }}>
              GitHub ↗
            </a>
            <a href={PORTFOLIO_META.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ fontSize: '0.6rem', padding: '0.6rem 1.25rem' }}>
              LinkedIn ↗
            </a>
          </motion.div>
        </div>

        {/* Right: Timeline */}
        <div>
          <motion.div className="label-mono" style={{ marginBottom: '1rem' }}
            variants={V(0.08)} initial="hidden" animate={visible ? 'show' : 'hidden'}>
            Journey
          </motion.div>
          <div>
            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                className="tl-item"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 20 }}
                transition={{ delay: 0.12 + i * 0.07, duration: 0.42 }}
              >
                <div className="tl-line">
                  <div className="tl-dot" />
                  {i < TIMELINE.length - 1 && <div className="tl-track" />}
                </div>
                <div>
                  <div className="tl-year">{item.year}</div>
                  <div className="tl-title">{item.title}</div>
                  <div className="tl-sub">{item.sub}</div>
                  <div className="tl-detail">{item.detail}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
