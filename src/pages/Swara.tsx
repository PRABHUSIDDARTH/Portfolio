import { useState } from 'react';
import ProductShell, { SectionHead } from '../components/ProductShell';
import { flagshipBySlug } from '../content';
import { Split } from '../lib/motion';

// ColorTheme enum from SwaraApp: accent / dark background pairs.
const THEMES = [
  { name: 'Swara', accent: '#E6A23C', dark: '#0D0B14' },
  { name: 'Midnight', accent: '#38BDF8', dark: '#070B12' },
  { name: 'Lavender', accent: '#C084FC', dark: '#0C0714' },
  { name: 'Champagne', accent: '#FBBF24', dark: '#120D06' },
  { name: 'Rose', accent: '#F472B6', dark: '#14070B' },
  { name: 'Ocean', accent: '#2DD4BF', dark: '#051012' },
  { name: 'Forest', accent: '#34D399', dark: '#051209' },
  { name: 'Off White', accent: '#8C733E', dark: '#090807' },
];

const TRACKS = [
  { t: 'Raag Yaman, Alaap', a: 'Local library' },
  { t: 'Monsoon Letters', a: 'Local library' },
  { t: 'Night Drive', a: 'Local library' },
];

const Icon = ({ d, size = 18 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={d} /></svg>
);

function Phone() {
  const [theme, setTheme] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [track, setTrack] = useState(0);
  const th = THEMES[theme];
  const vars = { ['--sw-accent' as any]: th.accent, ['--sw-dark' as any]: th.dark, ['--glow' as any]: th.accent + '88' };

  // Deterministic waveform bars; the played portion takes the accent colour.
  const bars = Array.from({ length: 42 }, (_, i) => 6 + Math.abs(Math.sin(i * 1.7 + track) * 18) + (i % 3) * 2);

  return (
    <div className="split2" style={{ alignItems: 'center' }}>
      <div className="phone" style={vars}>
        <div className="phone-screen" style={{ color: '#F3ECDD' }}>
          <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, opacity: 0.6, position: 'relative' }}>
            <span>NOW PLAYING</span><span>{th.name.toUpperCase()}</span>
          </div>
          <div className={`disc ${playing ? '' : 'paused'}`} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 18, fontWeight: 500 }}>{TRACKS[track].t}</div>
            <div style={{ fontSize: 12, opacity: 0.6 }}>{TRACKS[track].a}</div>
          </div>
          <svg className="wave" viewBox="0 0 168 30" preserveAspectRatio="none" aria-hidden="true">
            {bars.map((h, i) => (
              <rect key={i} x={i * 4} y={(30 - h) / 2} width="2.2" height={h} rx="1" fill={i < 17 ? th.accent : 'rgba(255,255,255,0.25)'} />
            ))}
          </svg>
          <div className="glass ctrl" style={{ padding: '0.7rem 0.4rem', position: 'relative', marginTop: 'auto' }}>
            <button aria-label="Previous track" onClick={() => setTrack((t) => (t + TRACKS.length - 1) % TRACKS.length)}>
              <Icon d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
            </button>
            <button className="play" aria-label={playing ? 'Pause' : 'Play'} onClick={() => setPlaying((p) => !p)}>
              {playing ? <Icon size={22} d="M6 5h4v14H6zm8 0h4v14h-4z" /> : <Icon size={22} d="M8 5v14l11-7z" />}
            </button>
            <button aria-label="Next track" onClick={() => setTrack((t) => (t + 1) % TRACKS.length)}>
              <Icon d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </button>
          </div>
        </div>
      </div>
      <div>
        <span className="mono muted">ColorTheme.java / 8 themes</span>
        <h3 className="display h-md" style={{ margin: '0.8rem 0 1.2rem' }}>Every theme passes WCAG AAA.</h3>
        <p className="body" style={{ marginBottom: '1.6rem' }}>
          Primary text holds at least 7:1 contrast on every background, secondary text at least 4.5:1. Pick one: the player, the glow and the controls re-tint instantly, just like the app.
        </p>
        <div className="themes" role="group" aria-label="Colour themes">
          {THEMES.map((t, i) => (
            <button key={t.name} className="theme-btn" aria-pressed={i === theme} onClick={() => setTheme(i)}>
              <i style={{ background: `linear-gradient(135deg, ${t.accent} 0 45%, ${t.dark} 45%)` }} />
              <span style={{ fontSize: 13 }}>{t.name}</span>
              <span className="mono muted" style={{ display: 'block', fontSize: 10 }}>{t.accent}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const LAYERS = [
  { name: 'UI', items: ['Activities', 'Fragments', 'RecyclerView', 'Liquid Glass views'] },
  { name: 'ViewModel', items: ['MusicViewModel', 'LiveData', 'Playback state'] },
  { name: 'Service', items: ['SwaraPlaybackService', 'Media3 session', 'ExoPlayer'] },
  { name: 'Repository', items: ['MusicRepository', 'Artwork engine'] },
  { name: 'Data', items: ['Room v3', 'MediaStore', 'SharedPreferences'] },
];

const FEATURES = [
  ['Media3 core', 'Playback runs in a foreground MediaSessionService, so lock screen, Bluetooth and notification controls all speak one protocol.'],
  ['Room v3 migration', 'Playlists, favourites and history survive schema upgrades through explicit migrations instead of destructive fallbacks.'],
  ['Artwork engine', 'Embedded art first, then album art, then a generated 2x2 collage for playlists. No grey placeholder squares.'],
  ['Recycling contract', 'Every list cell fully resets state on bind, so a playing indicator never leaks into a recycled row.'],
  ['Accessible indicator', 'TalkBack announces which track is playing; the animated bars are decoration on top of that.'],
  ['Sleep timer', '15, 30, 45 or 60 minutes, or stop at the end of the current song. Plus queue, widget and shuffle.'],
];

export default function Swara() {
  const f = flagshipBySlug('swara');
  return (
    <ProductShell f={f} links={[{ label: 'View on GitHub', href: f.repo }, { label: 'All my work', href: '/#work' }]}>
      <section className="section wrap">
        <SectionHead n="01" label="The player" right="Interactive" />
        <Split text="Tap play. Then try a different theme." className="display h-md" />
        <div style={{ marginTop: 'clamp(2.5rem, 6vw, 5rem)' }} data-reveal>
          <Phone />
        </div>
      </section>

      <section className="section wrap" style={{ paddingTop: 0 }}>
        <SectionHead n="02" label="Architecture" right="MVVM, single source of truth" />
        <div className="split2">
          <div>
            <Split text="Plain Java, on purpose." className="display h-md" />
            <p className="body" data-reveal style={{ marginTop: '1.5rem' }}>
              I skipped Kotlin and Compose because I wanted to learn what the Android framework does underneath. Playback lives in the service, data lives in the repository, and the screens only observe; when something breaks I know which layer to open.
            </p>
          </div>
          <div className="layers" data-reveal>
            {LAYERS.map((l) => (
              <div key={l.name} className="layer">
                <span className="mono">{l.name}</span>
                <span className="chips">{l.items.map((i) => <span key={i}>{i}</span>)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap" style={{ paddingTop: 0 }}>
        <SectionHead n="03" label="Engineering details" right="Small stuff that took the longest" />
        <div className="feature-grid">
          {FEATURES.map(([t, d], i) => (
            <div key={t} className="feature" data-reveal>
              <span className="num">0{i + 1}</span>
              <h3>{t}</h3>
              <p className="body">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section wrap" style={{ paddingTop: 0 }}>
        <SectionHead n="04" label="Beyond Android" right="SwiftUI port" />
        <div className="split2">
          <Split text="Then I rebuilt it in SwiftUI." className="display h-md" />
          <div data-reveal>
            <p className="body">Same eight themes, same glass controls, rewritten natively for iOS. GitHub Actions builds and runs the tests on every push to either app.</p>
            <pre className="code" style={{ marginTop: '1.6rem' }}>
              <span className="c">// ColorTheme.java</span>{'\n'}<span className="k">SWARA</span>(<span className="s">"#E6A23C"</span>, <span className="s">"#0D0B14"</span>),{'\n'}<span className="k">MIDNIGHT</span>(<span className="s">"#38BDF8"</span>, <span className="s">"#070B12"</span>),{'\n'}<span className="k">LAVENDER</span>(<span className="s">"#C084FC"</span>, <span className="s">"#0C0714"</span>),{'\n'}<span className="c">// ... 5 more, all AAA</span>
            </pre>
          </div>
        </div>
      </section>
    </ProductShell>
  );
}
