import { useState } from 'react';
import ProductShell, { SectionHead } from '../components/ProductShell';
import SwaraHero from '../components/SwaraHero';
import { flagshipBySlug } from '../content';
import { Split } from '../lib/motion';

// Dark-mode accents from DesignTokens.java in SwaraApp.
const THEMES = [
  { name: 'Swara', accent: '#D4AF5A', dark: '#000000' },
  { name: 'Midnight', accent: '#0A84FF', dark: '#000000' },
  { name: 'Lavender', accent: '#BF5AF2', dark: '#000000' },
  { name: 'Champagne', accent: '#FF9F0A', dark: '#000000' },
  { name: 'Rose', accent: '#FF375F', dark: '#000000' },
  { name: 'Ocean', accent: '#40C8E0', dark: '#000000' },
  { name: 'Forest', accent: '#30D158', dark: '#000000' },
  { name: 'Off White', accent: '#E8C97A', dark: '#000000' },
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
        <h3 className="display h-md" style={{ margin: '0.8rem 0 1.2rem' }}>Eight themes, light and dark.</h3>
        <p className="body" style={{ marginBottom: '1.6rem' }}>
          Each theme has its own accent in both modes. Pick one: the player, the glow and the controls re-tint, as they do in the app.
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
  { name: 'Service', items: ['SwaraPlaybackService', 'Media3 session', 'ExoPlayer', 'Korokae processor'] },
  { name: 'Repository', items: ['MusicRepository', 'Artwork engine'] },
  { name: 'Data', items: ['Room', 'MediaStore', 'SharedPreferences'] },
];

const FEATURES = [
  ['Korokae karaoke', 'A small streaming network removes vocals inside the audio pipeline. No rendered files, about 23 ms of added latency.'],
  ['Voice commands', 'Tap Hey Swara and ask to play a song, artist or album, pause or skip. Speech is transcribed on the phone.'],
  ['Vibe Mode and Autoplay', 'Mood is estimated from the audio on the device, and the queue keeps going with songs that fit.'],
  ['Swara Wrapped', 'Monthly and yearly recaps as story slides you can share or save as a video, counted on the phone.'],
  ['Equalizer and sleep timer', 'An in-app equalizer, plus a sleep timer with presets or end of song.'],
  ['Landscape and widgets', 'A landscape layout with a navigation rail, and horizontal and vertical home-screen widgets.'],
];

export default function Swara() {
  const f = flagshipBySlug('swara');
  return (
    <ProductShell f={f} heroExtra={<SwaraHero />} links={[{ label: 'View on GitHub', href: f.repo }, { label: 'All my work', href: '/#work' }]}>
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
        <SectionHead n="03" label="Features" right="What the app does" />
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
        <SectionHead n="04" label="The model" right="Korokae" />
        <div className="split2">
          <Split text="Trained in PyTorch, run in Java." className="display h-md" />
          <div data-reveal>
            <p className="body">The vocal-removal network is trained and exported in PyTorch, then runs inside a Media3 audio processor. A parity test checks that the Java engine matches PyTorch. The weights carry non-commercial MUSDB18 terms.</p>
            <pre className="code" style={{ marginTop: '1.6rem' }}>
              <span className="c">// Korokae</span>{'\n'}STFT: <span className="s">1024</span> window, <span className="s">512</span> hop{'\n'}Linear 513 to 256, ReLU{'\n'}<span className="k">causal GRU</span>(256) x 2{'\n'}Linear 256 to 513, sigmoid mask
            </pre>
          </div>
        </div>
      </section>
    </ProductShell>
  );
}
