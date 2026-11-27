import ProductShell, { SectionHead } from '../components/ProductShell';
import HeroFan from '../components/HeroFan';
import { COEDIT_FAN } from '../components/heroFans';
import FlagVisual from '../components/FlagVisual';
import { flagshipBySlug } from '../content';
import { Split } from '../lib/motion';

// Every statement on this page comes from the Coedit README.
const WORKS_TODAY = [
  ['Live docs and sheets', 'A CRDT keeps several people typing at once, with shared cursors. Formulas recalculate in every open window.'],
  ['Drawing canvases', 'Excalidraw canvases sit next to docs as files, with PNG and SVG export. Viewers get them read-only.'],
  ['Roles enforced twice', 'The API checks owner, editor and viewer roles, and the sync server re-checks every connection every 30 seconds.'],
  ['AI council', 'Models write drafts, score each other, then one synthesis writes AGENTS.md, ARCHITECTURE.md and PRD.md.'],
  ['Careful with keys and spend', 'Saved keys are encrypted; custom-seat keys are used once and not stored. Runs have token and cost caps and an SSRF guard.'],
  ['Hardened by default', 'Rate limiting, CSP and security headers, conflict-safe canvas saves and secret scanning on pull requests.'],
];

const LAYERS = [
  { name: 'Web', chips: ['Next.js', 'TipTap', 'Excalidraw', 'Yjs'] },
  { name: 'API', chips: ['FastAPI', 'Alembic', 'Auth and roles', 'Council runs'] },
  { name: 'Sync', chips: ['Hocuspocus', 'WebSocket', 'Role re-checks'] },
  { name: 'Data', chips: ['PostgreSQL 16', 'Docker Compose'] },
];

const LIMITS = [
  'Not deployed: it runs locally with Docker Compose.',
  'The council has had one real end-to-end run, on Gemini and Groq. The other adapters have not been run live.',
  'That a council beats a single model has not been measured.',
  'Canvas is single-user: no co-editing, images or version history.',
  'docLM has an evaluation harness and baseline; no model has been trained.',
];

export default function Coedit() {
  const f = flagshipBySlug('coedit');
  return (
    <ProductShell f={f} heroExtra={<HeroFan items={COEDIT_FAN} />} links={[{ label: 'View on GitHub', href: f.repo }]}>
      <section className="section wrap">
        <SectionHead n="01" label="What works" right="From the README" />
        <div className="split2">
          <Split text="One workspace, then a council." className="display h-md" />
          <div style={{ position: 'relative', aspectRatio: '1', maxWidth: 420, border: '2px solid #121210', boxShadow: '8px 8px 0 #121210' }}>
            <FlagVisual slug="coedit" accent={f.accent} />
          </div>
        </div>
        <div className="feature-grid" style={{ marginTop: '3rem' }}>
          {WORKS_TODAY.map(([title, text], i) => (
            <div key={title} className="feature" data-reveal>
              <span className="num">0{i + 1}</span>
              <h3>{title}</h3>
              <p className="body">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <SectionHead n="02" label="Architecture" right="Two services, one database" />
        <div className="layers">
          {LAYERS.map((l) => (
            <div key={l.name} className="layer">
              <span className="h-sm serif">{l.name}</span>
              <div className="chips">{l.chips.map((c) => <span key={c}>{c}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section wrap">
        <SectionHead n="03" label="Honest limits" right="From the README" />
        <ul style={{ display: 'grid', gap: '0.8rem', listStyle: 'none' }}>
          {LIMITS.map((l) => <li key={l} className="caption" style={{ background: '#fff8e6' }}>{l}</li>)}
        </ul>
      </section>
    </ProductShell>
  );
}
