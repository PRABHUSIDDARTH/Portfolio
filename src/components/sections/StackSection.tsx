import React from 'react';
import { motion } from 'framer-motion';
import { TECH_NODES } from '../../data';

const CAT_COL: Record<string, string> = {
  language:  '#5EC8D8',
  framework: '#7ee8a2',
  tool:      '#848A99',
  ai:        '#c47af5',
  infra:     '#F2A65A',
};
const CAT_LABEL: Record<string, string> = {
  language: 'Language', framework: 'Framework', tool: 'Tool', ai: 'AI / ML', infra: 'Infrastructure'
};

export default function StackSection({ visible }: { visible: boolean }) {
  return (
    <motion.div
      className={`section-overlay${visible ? ' visible' : ' hidden'}`}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      style={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}
    >
      <div style={{ maxWidth: '52rem', width: '100%' }}>
        <motion.div className="label-mono" style={{ marginBottom: '1rem' }}
          initial={{ opacity: 0, x: -16 }} animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -16 }} transition={{ delay: 0.04 }}>
          Tech Stack
        </motion.div>

        <motion.h2 className="display-lg" style={{ marginBottom: '0.5rem' }}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }} transition={{ delay: 0.1, duration: 0.5 }}>
          Tools I reach<br />for first.
        </motion.h2>

        <motion.p className="body-sm" style={{ marginBottom: '1.75rem', maxWidth: '28rem' }}
          initial={{ opacity: 0 }} animate={{ opacity: visible ? 0.7 : 0 }} transition={{ delay: 0.2 }}>
          Hover the constellation in the 3D scene. Below is the full legend.
        </motion.p>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {TECH_NODES.map((n, i) => (
            <motion.span
              key={n.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
              transition={{ delay: 0.12 + i * 0.04, duration: 0.32 }}
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.82rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '0.45rem 0.9rem',
                border: `1px solid ${CAT_COL[n.category]}38`,
                color: CAT_COL[n.category],
                borderRadius: '5px',
                display: 'inline-block',
                fontWeight: 600,
              }}
            >
              {n.label}
            </motion.span>
          ))}
        </div>

        {/* Legend */}
        <motion.div
          style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}
          initial={{ opacity: 0 }} animate={{ opacity: visible ? 0.75 : 0 }} transition={{ delay: 0.7 }}>
          {Object.entries(CAT_LABEL).map(([cat, label]) => (
            <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: CAT_COL[cat], boxShadow: `0 0 8px ${CAT_COL[cat]}` }} />
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: 'var(--mist)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
