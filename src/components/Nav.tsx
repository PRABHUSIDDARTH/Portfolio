import React from 'react';
import { usePortfolioStore } from '../store';

const SECTIONS = ['Hero', 'About', 'Work', 'Stack', 'Contact'];

export default function Navbar() {
  const { activeSection, audioEnabled, liteMode, sceneEnabled,
    setAudioEnabled, setLiteMode, setSceneEnabled } = usePortfolioStore();

  const scrollTo = (i: number) => {
    const driver = document.getElementById('scroll-driver');
    if (!driver) return;
    const max = driver.scrollHeight - window.innerHeight;
    const THRESHOLDS = [0, 0.22, 0.44, 0.66, 0.88];
    window.scrollTo({ top: THRESHOLDS[i] * max, behavior: 'smooth' });
  };

  return (
    <header id="navbar" role="navigation" aria-label="Main navigation">
      <span className="nav-logo">PS.</span>
      <div className="nav-sep" />

      {SECTIONS.map((s, i) => (
        <button
          key={s}
          className={`nav-link${activeSection === i ? ' active' : ''}`}
          onClick={() => scrollTo(i)}
          aria-label={`Navigate to ${s}`}
          aria-current={activeSection === i ? 'page' : undefined}
        >
          {s}
        </button>
      ))}

      <div className="nav-sep" />

      {/* sidd-ai featured link */}
      <a
        href="/sidd-ai"
        target="_blank"
        rel="noopener noreferrer"
        className="nav-toggle on warm"
        style={{ textDecoration: 'none', fontSize: '0.58rem', letterSpacing: '0.08em' }}
        title="View sidd-ai — Java AI SDK"
      >
        sidd-ai ↗
      </a>

      <div className="nav-sep" />

      {/* Toggles */}
      <button
        className={`nav-toggle${audioEnabled ? ' on warm' : ''}`}
        onClick={() => setAudioEnabled(!audioEnabled)}
        aria-pressed={audioEnabled}
        title="Toggle ambient audio (off by default)"
      >
        {audioEnabled ? '♪ ON' : '♪ OFF'}
      </button>
      <button
        className={`nav-toggle${liteMode ? ' on' : ''}`}
        onClick={() => setLiteMode(!liteMode)}
        aria-pressed={liteMode}
        title="Toggle lite mode (lower GPU usage)"
      >
        {liteMode ? 'LITE' : 'FULL'}
      </button>
      <button
        className={`nav-toggle${!sceneEnabled ? ' on' : ''}`}
        onClick={() => setSceneEnabled(!sceneEnabled)}
        aria-pressed={!sceneEnabled}
        title="Toggle 3D scene"
      >
        3D
      </button>
    </header>
  );
}
