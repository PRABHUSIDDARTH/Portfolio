import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../../data';
import { usePortfolioStore } from '../../store';

export default function WorkSection({ visible }: { visible: boolean }) {
  const { setCursorLabel, setMagnetic } = usePortfolioStore();
  const [expanded, setExpanded] = useState<string | null>(null);

  // Auto-expand sidd-ai card when landing via /sidd-ai endpoint
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('highlight') === 'sidd-ai') {
      setExpanded('sidd-ai');
      // Clean up the URL without a page reload
      const url = new URL(window.location.href);
      url.searchParams.delete('highlight');
      window.history.replaceState({}, '', url.pathname);
    }
  }, []);


  return (
    <motion.div
      className={`section-overlay${visible ? ' visible' : ' hidden'}`}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      style={{ alignItems: 'flex-start', paddingTop: '8vh', flexDirection: 'column' }}
    >
      <div style={{ width: '100%', maxWidth: '80rem' }}>
        <motion.div className="label-mono" style={{ marginBottom: '0.75rem' }}
          initial={{ opacity: 0, x: -16 }} animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -16 }} transition={{ delay: 0.04 }}>
          Selected Work
        </motion.div>

        <motion.h2 className="display-lg" style={{ marginBottom: '1.25rem' }}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }} transition={{ delay: 0.1, duration: 0.5 }}>
          Things I've<br />actually shipped.
        </motion.h2>

        {/* Grid of all projects */}
        <div className="proj-scroll">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {PROJECTS.map((p, i) => (
              <motion.div
                key={p.id}
                className="glass proj-card"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 18 }}
                transition={{ delay: 0.08 + i * 0.035, duration: 0.4 }}
                onClick={() => setExpanded(expanded === p.id ? null : p.id)}
                onMouseEnter={() => { setCursorLabel('View'); setMagnetic(true); }}
                onMouseLeave={() => { setCursorLabel(''); setMagnetic(false); }}
                style={{ cursor: 'pointer' }}
              >
                <div className="proj-num">
                  {String(i + 1).padStart(2, '0')}
                  {p.id === 'sidd-ai' && <span style={{ marginLeft: '0.5rem', color: 'var(--practical)', fontWeight: 700 }}>★ FEATURED</span>}
                  {p.featured && p.id !== 'sidd-ai' && <span style={{ marginLeft: '0.5rem', color: 'var(--key)', fontWeight: 700 }}>◆</span>}
                </div>
                <div className="proj-title">{p.title}</div>
                <div className="proj-desc">{p.description}</div>

                {expanded === p.id && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: 'var(--mist)', lineHeight: 1.7, marginBottom: '0.85rem' }}
                  >
                    {p.longDesc}
                  </motion.p>
                )}

                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.85rem' }}>
                  {p.techs.map(t => <span key={t} className="tag">{t}</span>)}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  {p.id === 'sidd-ai' && (
                    <a href="/sidd-ai" target="_blank" rel="noopener noreferrer"
                      className="btn-warm" style={{ fontSize: '0.6rem', padding: '0.35rem 0.85rem' }}
                      onClick={e => e.stopPropagation()}>
                      View SDK ↗
                    </a>
                  )}
                  <a href={p.github} target="_blank" rel="noopener noreferrer"
                    className="btn-ghost" style={{ fontSize: '0.68rem', padding: '0.35rem 0.85rem' }}
                    onClick={e => e.stopPropagation()}>
                    GitHub ↗
                  </a>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--mist)' }}>{p.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div style={{ marginTop: '1rem' }}
          initial={{ opacity: 0 }} animate={{ opacity: visible ? 1 : 0 }} transition={{ delay: 0.55 }}>
          <a href="https://github.com/PRABHUSIDDARTH" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ fontSize: '0.58rem' }}>
            All repositories on GitHub ↗
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
