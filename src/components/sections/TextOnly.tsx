import React from 'react';
import { PORTFOLIO_META, PROJECTS, TECH_NODES, TIMELINE } from '../../data';

/**
 * TextOnly — fully accessible fallback and SEO layer.
 * Visually hidden by default (absolute offscreen), but:
 * - Readable by screen readers
 * - Shown when prefers-reduced-motion: reduce is set
 * - Accessible via the "Skip to text version" link
 */
export default function TextOnly() {
  return (
    <div
      id="text-only-content"
      aria-label="Text version of portfolio — full content without 3D effects"
    >
      {/* Screen-reader accessible main content */}
      <h1>{PORTFOLIO_META.name}</h1>
      <p>{PORTFOLIO_META.role} — {PORTFOLIO_META.degree}</p>
      <p>{PORTFOLIO_META.bio}</p>
      <p>CGPA: {PORTFOLIO_META.cgpa} · LeetCode: {PORTFOLIO_META.leetcode} · Projects: {PORTFOLIO_META.projectCount}</p>

      <section aria-label="Career timeline">
        <h2>Career & Education</h2>
        {TIMELINE.map((item, i) => (
          <div key={i}>
            <h3>{item.title} — {item.year}</h3>
            <p>{item.sub}</p>
            <p>{item.detail}</p>
          </div>
        ))}
      </section>

      <section aria-label="Projects">
        <h2>Projects</h2>
        {PROJECTS.map(p => (
          <div key={p.id}>
            <h3><a href={p.github} target="_blank" rel="noopener noreferrer">{p.title}</a></h3>
            <p>{p.longDesc}</p>
            <p>Technologies: {p.techs.join(', ')}</p>
            <p>Category: {p.category}</p>
          </div>
        ))}
      </section>

      <section aria-label="Technical skills">
        <h2>Tech Stack</h2>
        <ul>
          {TECH_NODES.map(n => <li key={n.id}>{n.label}</li>)}
        </ul>
      </section>

      <section aria-label="Contact">
        <h2>Contact</h2>
        <p>Email: <a href={`mailto:${PORTFOLIO_META.email}`}>{PORTFOLIO_META.email}</a></p>
        <p>GitHub: <a href={PORTFOLIO_META.github}>{PORTFOLIO_META.github}</a></p>
        <p>LinkedIn: <a href={PORTFOLIO_META.linkedin}>{PORTFOLIO_META.linkedin}</a></p>
        <p>LeetCode: <a href={PORTFOLIO_META.leetcodeUrl}>{PORTFOLIO_META.leetcodeUrl}</a></p>
        <p>Location: {PORTFOLIO_META.location}</p>
      </section>
    </div>
  );
}
