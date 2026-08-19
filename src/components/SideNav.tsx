import React from 'react';
import { usePortfolioStore } from '../store';

const DOTS = [
  { label: 'Hero', idx: 0 },
  { label: 'About', idx: 1 },
  { label: 'Work', idx: 2 },
  { label: 'Stack', idx: 3 },
  { label: 'Contact', idx: 4 },
];

const THRESHOLDS = [0, 0.22, 0.44, 0.66, 0.88];

export default function SideNav() {
  const { activeSection } = usePortfolioStore();

  const go = (i: number) => {
    const driver = document.getElementById('scroll-driver');
    if (!driver) return;
    const max = driver.scrollHeight - window.innerHeight;
    window.scrollTo({ top: THRESHOLDS[i] * max, behavior: 'smooth' });
  };

  return (
    <nav id="side-nav" aria-label="Section quick-nav">
      {DOTS.map(d => (
        <button
          key={d.label}
          className={`side-dot${activeSection === d.idx ? ' active' : ''}`}
          onClick={() => go(d.idx)}
          aria-label={`Go to ${d.label}`}
          aria-current={activeSection === d.idx ? 'true' : undefined}
        >
          <div className="side-dot-pip" />
          <span className="side-dot-label">{d.label}</span>
        </button>
      ))}
    </nav>
  );
}
