import { useMemo, useState } from 'react';
import ProductShell, { SectionHead } from '../components/ProductShell';
import { flagshipBySlug } from '../content';
import { Split } from '../lib/motion';

// Free-tier pool and egress figures from the NexusCloud-Orchestra README.
type Cloud = { id: string; name: string; freeGB: number; egress: number; permanent: boolean };
const CLOUDS: Cloud[] = [
  { id: 'r2', name: 'Cloudflare R2', freeGB: 10, egress: 0, permanent: true },
  { id: 'oci', name: 'Oracle Cloud', freeGB: 20, egress: 0, permanent: true },
  { id: 'b2', name: 'Backblaze B2', freeGB: 10, egress: 0, permanent: true },
  { id: 'gcp', name: 'GCP Storage', freeGB: 5, egress: 0.12, permanent: true },
  { id: 'ibm', name: 'IBM Cloud', freeGB: 25, egress: 0.05, permanent: true },
  { id: 'aws', name: 'AWS S3', freeGB: 5, egress: 0.09, permanent: false },
  { id: 'az', name: 'Azure Blob', freeGB: 5, egress: 0.087, permanent: false },
];
const MAX_EGRESS = 0.12;

/**
 * Illustrative re-implementation of the Smart Router's weighted score:
 * free quota left 40%, egress cost 30%, tier permanence 20%, file-to-quota fit 10%.
 */
function score(c: Cloud, used: number, fileGB: number) {
  const left = Math.max(c.freeGB - used, 0);
  if (left < fileGB) return 0;
  const quota = left / 25;
  const egress = 1 - c.egress / MAX_EGRESS;
  const perm = c.permanent ? 1 : 0;
  const fit = 1 - Math.min(Math.abs(left - fileGB) / left, 1) * 0.5;
  return Math.round((quota * 0.4 + egress * 0.3 + perm * 0.2 + fit * 0.1) * 100);
}

function Router() {
  const [fileGB, setFileGB] = useState(4.2);
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() => Object.fromEntries(CLOUDS.map((c) => [c.id, true])));
  const [usage] = useState<Record<string, number>>({ r2: 0.2, oci: 9, b2: 3, gcp: 1, ibm: 17, aws: 0.5, az: 2 });

  const ranked = useMemo(
    () => CLOUDS.map((c) => ({ c, s: enabled[c.id] ? score(c, usage[c.id], fileGB) : 0 })).sort((a, b) => b.s - a.s),
    [fileGB, enabled, usage],
  );
  const winner = ranked[0].s > 0 ? ranked[0] : null;
  const pool = CLOUDS.filter((c) => enabled[c.id]).reduce((a, c) => a + Math.max(c.freeGB - usage[c.id], 0), 0);

  return (
    <div className="router-grid">
      <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
        <div>
          <span className="mono muted">POST /api/v1/files/upload</span>
          <div className="display h-md" style={{ marginTop: '0.8rem' }}>video.mp4</div>
        </div>
        <label>
          <span className="mono" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>File size</span><span>{fileGB.toFixed(1)} GB</span>
          </span>
          <input className="range" type="range" min={0.1} max={16} step={0.1} value={fileGB} onChange={(e) => setFileGB(parseFloat(e.target.value))} style={{ marginTop: '0.8rem' }} />
        </label>
        <div>
          <span className="mono muted">Weights</span>
          <table className="table" style={{ marginTop: '0.6rem' }}>
            <tbody>
              <tr><td>Free quota left</td><td style={{ textAlign: 'right' }} className="mono">40%</td></tr>
              <tr><td>Egress cost</td><td style={{ textAlign: 'right' }} className="mono">30%</td></tr>
              <tr><td>Tier permanence</td><td style={{ textAlign: 'right' }} className="mono">20%</td></tr>
              <tr><td>File-to-quota fit</td><td style={{ textAlign: 'right' }} className="mono">10%</td></tr>
            </tbody>
          </table>
        </div>
        <div className="mono muted">Connected free pool: <span style={{ color: 'var(--page-fg)' }}>{pool.toFixed(1)} GB</span></div>
      </div>
      <div className="panel" aria-live="polite">
        <div className="winner" style={{ marginBottom: '1.4rem' }}>
          <span className="mono muted">Routed to</span>
          <span className="display h-md" style={{ color: winner ? 'var(--page-accent)' : undefined }}>
            {winner ? winner.c.name : 'No cloud fits'}
          </span>
          {winner && <span className="mono muted">score {winner.s} / ${winner.c.egress.toFixed(2)} per GB egress</span>}
        </div>
        {ranked.map(({ c, s }) => {
          const on = enabled[c.id];
          return (
            <div
              key={c.id}
              className={`prov ${on ? '' : 'off'} ${winner && winner.c.id === c.id ? 'win' : ''}`}
              role="checkbox"
              aria-checked={on}
              tabIndex={0}
              onClick={() => setEnabled((e) => ({ ...e, [c.id]: !e[c.id] }))}
              onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && (e.preventDefault(), setEnabled((x) => ({ ...x, [c.id]: !x[c.id] })))}
            >
              <span style={{ fontSize: 14 }}><span className={`check ${on ? 'on' : ''}`} />{c.name}</span>
              <span className="bar"><i style={{ transform: `scaleX(${s / 100})` }} /></span>
              <span className="score">{on ? (s ? s : 'full') : 'off'}</span>
            </div>
          );
        })}
        <p className="mono muted" style={{ marginTop: '1.2rem' }}>Toggle clouds to disconnect them. Scores are an illustrative model of the router&rsquo;s weighting.</p>
      </div>
    </div>
  );
}

const ARCH = [
  { name: 'Presentation', items: ['React 18', 'Vite', 'TanStack Query', 'Cloudflare Pages'] },
  { name: 'Orchestration core', items: ['FastAPI on Cloud Run', 'Auth service', 'Smart Router', 'Quota engine', 'Presigned URL service', 'Metadata service'] },
  { name: 'Persistence', items: ['PostgreSQL 16', 'Redis 7 quota cache', 'Vault, AES-256-GCM'] },
  { name: 'Your clouds', items: ['AWS S3', 'GCS', 'Azure Blob', 'R2', 'B2', 'Oracle', 'IBM'] },
];

const API = [
  ['POST', '/api/v1/auth/login', 'Get JWT tokens'],
  ['POST', '/api/v1/connections', 'Connect a cloud account'],
  ['GET', '/api/v1/connections', 'List accounts with quota'],
  ['POST', '/api/v1/files/upload', 'Smart-routed presigned upload URL'],
  ['POST', '/api/v1/files/{id}/confirm', 'Confirm upload success'],
  ['GET', '/api/v1/files/{id}', 'Presigned download URL'],
  ['GET', '/api/v1/quota/summary', 'Unified free pool across providers'],
];

export default function NexusCloud() {
  const f = flagshipBySlug('nexuscloud');
  return (
    <ProductShell f={f} links={[{ label: 'View on GitHub', href: f.repo }, { label: 'Original prototype', href: 'https://github.com/PRABHUSIDDARTH/NexusCloud' }]}>
      <section className="section wrap">
        <SectionHead n="01" label="The problem" right="5 CLIs, 5 consoles, 5 credential sets" />
        <div className="split2">
          <Split text="You probably have 70GB of free cloud storage sitting unused." className="display h-md" />
          <div data-reveal>
            <p className="body">R2 gives you 10GB, Oracle 20, IBM 25, and so on, but each one has its own CLI, its own keys and its own egress pricing. So most people use one and ignore the rest. NexusCloud puts them behind a single upload endpoint.</p>
            <pre className="code" style={{ marginTop: '1.6rem' }}>
              <span className="c"># before</span>{'\n'}aws s3 cp file s3://bucket{'\n'}gcloud storage cp file gs://b{'\n'}rclone copy file r2:bucket{'\n\n'}<span className="c"># with NexusCloud</span>{'\n'}<span className="k">POST</span> /api/v1/files/upload
            </pre>
          </div>
        </div>
      </section>

      <section className="section wrap" style={{ paddingTop: 0 }}>
        <SectionHead n="02" label="Smart Router, live" right="Interactive" />
        <Split text="Drag the slider and watch where the file goes." className="display h-md" />
        <div style={{ marginTop: 'clamp(2rem, 5vw, 4rem)' }} data-reveal>
          <Router />
        </div>
      </section>

      <section className="section wrap" style={{ paddingTop: 0 }}>
        <SectionHead n="03" label="Architecture" right="Metadata only" />
        <div className="split2">
          <div>
            <Split text="Files never touch our servers." className="display h-md" />
            <p className="body" data-reveal style={{ marginTop: '1.5rem' }}>
              The API hands back a presigned URL and the browser uploads straight to your own bucket. We only keep metadata, which means our bill barely moves whether someone stores 1GB or 60. Cloud keys are scoped IAM credentials, encrypted with AES-256-GCM and kept in Vault.
            </p>
          </div>
          <div className="layers" data-reveal>
            {ARCH.map((l) => (
              <div key={l.name} className="layer">
                <span className="mono">{l.name}</span>
                <span className="chips">{l.items.map((i) => <span key={i}>{i}</span>)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap" style={{ paddingTop: 0 }}>
        <SectionHead n="04" label="API surface" right="OpenAPI at /docs" />
        <table className="table hide-sm" data-reveal>
          <thead><tr><th>Method</th><th>Endpoint</th><th>Purpose</th></tr></thead>
          <tbody>
            {API.map(([m, p, d]) => (
              <tr key={p}><td className="mono" style={{ color: 'var(--page-accent)' }}>{m}</td><td className="mono">{p}</td><td className="muted">{d}</td></tr>
            ))}
          </tbody>
        </table>
        <div className="feature-grid" style={{ marginTop: 'clamp(4rem, 8vw, 6rem)' }}>
          {[
            ['Rate limited', 'Auth endpoints share a Redis-backed fixed window of 10 requests per minute per IP, with a process-local fallback during Redis outages.'],
            ['Background workers', 'Expired-upload cleanup and nightly quota polling keep the unified pool accurate without blocking requests.'],
            ['Team lead', 'There are four of us. I wrote the backend core, the Smart Router and the rate limiter, and I run deployment.'],
          ].map(([t, d], i) => (
            <div key={t} className="feature" data-reveal>
              <span className="num">0{i + 1}</span>
              <h3>{t}</h3>
              <p className="body">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </ProductShell>
  );
}
