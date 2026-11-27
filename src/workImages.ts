// Art for each card in the work grid. Files in /logos are the projects' own logos (algomentor.webp is its repo logo);
// src/work-art is drawn for this grid. Classes starting "a-" animate while a card is active (see index.css).
// coedit-glass*.webp are recorded from the Coedit website's three.js glass logo.
import distraction from './work-art/distraction-monitor.svg?raw';
import nexuscloud from './work-art/nexuscloud.svg?raw';
import pyrag from './work-art/pyrag.svg?raw';
import retinaface from './work-art/retinaface.svg?raw';
import returnRisk from './work-art/return-risk.svg?raw';
import siddBot from './work-art/sidd-bot.svg?raw';

export type WorkImage = {
  bg: string;
  fit: 'cover' | 'contain';
  src?: string;
  svg?: string; // inline art, so its parts can animate
  hoverSrc?: string; // animated image, fetched only once the card is active
  overlay?: string; // animation drawn over a raster logo
};

export const WORK_IMAGES: Record<string, WorkImage> = {
  NexusCloud: { svg: nexuscloud, fit: 'contain', bg: '#eeeae2' },
  'sidd-ai': { src: '/logos/sidd-ai.png', fit: 'cover', bg: '#1b1d33', overlay: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192" preserveAspectRatio="xMidYMid slice"><path class="a-steam d0" d="M88 40q-8 -8 0 -16t0 -16" fill="none" stroke="#9fe8ff" stroke-width="2.5" stroke-linecap="round"/><path class="a-steam d2" d="M100 40q-8 -8 0 -16t0 -16" fill="none" stroke="#9fe8ff" stroke-width="2.5" stroke-linecap="round"/><path class="a-steam d4" d="M110 40q-8 -8 0 -16t0 -16" fill="none" stroke="#9fe8ff" stroke-width="2.5" stroke-linecap="round"/><circle class="a-ping d0" cx="68" cy="48" r="6" fill="none" stroke="#7fe0ff" stroke-width="2"/><circle class="a-ping d1" cx="73" cy="32" r="6" fill="none" stroke="#7fe0ff" stroke-width="2"/><circle class="a-ping d3" cx="117" cy="31" r="6" fill="none" stroke="#7fe0ff" stroke-width="2"/><circle class="a-ping d4" cx="135" cy="35" r="6" fill="none" stroke="#7fe0ff" stroke-width="2"/></svg>` },
  Coedit: { src: '/work/coedit-glass.webp', hoverSrc: '/work/coedit-glass-spin.webp', fit: 'cover', bg: '#edeae4' },
  Swara: { src: '/logos/swara.png', fit: 'contain', bg: '#1a0e2e', overlay: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" preserveAspectRatio="xMidYMid slice"><g transform="translate(16 86)"><g class="a-note d0"><ellipse cx="0" cy="12" rx="5" ry="3.8" fill="#c9a54a"/><path d="M5 12V-4q7 1 8 8" fill="none" stroke="#c9a54a" stroke-width="2.2" stroke-linecap="round"/></g></g><g transform="translate(78 70)"><g class="a-note d2"><ellipse cx="0" cy="12" rx="5" ry="3.8" fill="#c9a54a"/><path d="M5 12V-4q7 1 8 8" fill="none" stroke="#c9a54a" stroke-width="2.2" stroke-linecap="round"/></g></g><g transform="translate(70 104)"><g class="a-note d4"><ellipse cx="0" cy="12" rx="5" ry="3.8" fill="#c9a54a"/><path d="M5 12V-4q7 1 8 8" fill="none" stroke="#c9a54a" stroke-width="2.2" stroke-linecap="round"/></g></g></svg>` },
  'Return Risk Scorer': { svg: returnRisk, fit: 'cover', bg: '#f2e8d0' },
  PyRAG: { svg: pyrag, fit: 'cover', bg: '#6f8a4a' },
  'RetinaFace Inference': { svg: retinaface, fit: 'contain', bg: '#121210' },
  AlgoMentor: { src: '/work/algomentor.webp', fit: 'contain', bg: '#f6f3ec', overlay: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" preserveAspectRatio="xMidYMid meet"><g transform="translate(50 30)"><g class="a-ask"><path d="M-15 -14H15Q21 -14 21 -8V8Q21 14 15 14H2L-6 22V14H-15Q-21 14 -21 8V-8Q-21 -14 -15 -14Z" fill="#4f5b3a"/><text y="8" text-anchor="middle" font-family="Georgia,serif" font-size="22" fill="#f6f3ec">?</text></g></g></svg>` },
  'Distraction Monitor': { svg: distraction, fit: 'contain', bg: '#121210' },
  'sidd-bot': { svg: siddBot, fit: 'cover', bg: '#ff4d1c' },
};
