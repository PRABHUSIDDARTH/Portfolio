import { Flagship } from '../content';

/** Lightweight, code-native hero visual for each flagship card (no image payload). */
export default function FlagVisual({ slug, accent }: { slug: Flagship['slug']; accent: string }) {
  if (slug === 'nexuscloud') {
    const clouds = ['R2', 'OCI', 'B2', 'GCP', 'IBM', 'AWS', 'AZ'];
    return (
      <svg viewBox="0 0 400 400" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <radialGradient id="nc-g" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="400" fill="#0A1626" />
        <circle cx="200" cy="200" r="190" fill="url(#nc-g)" />
        {[70, 120, 165].map((r) => (
          <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="#E6EBF1" strokeOpacity="0.12" />
        ))}
        <g className="nc-orbit">
          {clouds.map((c, i) => {
            const a = (i / clouds.length) * Math.PI * 2 - Math.PI / 2;
            const x = 200 + Math.cos(a) * 140;
            const y = 200 + Math.sin(a) * 140;
            const win = i === 0;
            return (
              <g key={c}>
                <line x1="200" y1="200" x2={x} y2={y} stroke={win ? accent : '#E6EBF1'} strokeOpacity={win ? 0.9 : 0.15} strokeDasharray={win ? '0' : '3 5'} strokeWidth={win ? 2 : 1} />
                <circle cx={x} cy={y} r={win ? 24 : 19} fill={win ? accent : '#13243B'} stroke="#E6EBF1" strokeOpacity="0.25" />
                <text x={x} y={y + 4} textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="11" fill="#E6EBF1">{c}</text>
              </g>
            );
          })}
        </g>
        <circle cx="200" cy="200" r="34" fill="#E6EBF1" />
        <text x="200" y="197" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#0A1626">SMART</text>
        <text x="200" y="209" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#0A1626">ROUTER</text>
      </svg>
    );
  }
  if (slug === 'swara') {
    return (
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'radial-gradient(circle at 60% 40%, #2a1f3d 0%, #0d0b14 65%)' }}>
        <div style={{ ['--sw-accent' as any]: accent, ['--sw-dark' as any]: '#0D0B14', width: '62%', maxWidth: 300 }}>
          <div className="disc" style={{ width: '100%', margin: 0 }} />
        </div>
        <div className="mono" style={{ position: 'absolute', left: 24, bottom: 22, color: '#F3ECDD', opacity: 0.7 }}>Now playing / Liquid Glass</div>
      </div>
    );
  }
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#111018', display: 'flex', alignItems: 'center', padding: '8%' }}>
      <pre className="code" style={{ width: '100%', background: 'transparent', border: '1px solid rgba(236,234,246,0.12)', color: '#ECEAF6', fontSize: 'clamp(10px, 1.05vw, 13px)', ['--page-accent' as any]: accent }}>
        <span className="c">{'// One line. Any model.'}</span>{'\n'}
        <span className="k">String</span>{' r = AiClient.chatQuick(\n    '}<span className="s">"gpt-6.1-sol"</span>{', prompt);\n\n'}
        {'AiClient.chatQuick('}<span className="s">"claude-haiku-5.5"</span>{', p);\n'}
        {'AiClient.chatQuick('}<span className="s">"gemini-3.8-flash"</span>{', p);\n'}
        {'AiClient.chatQuick('}<span className="s">"kimi-k3"</span>{', p);\n'}
        {'AiClient.chatQuick('}<span className="s">"llama3.2"</span>{', p); '}<span className="c">{'// local'}</span>
      </pre>
    </div>
  );
}
