/** Swara "Deck" skin concept: a tape deck drawn in SVG. Not a screenshot of the app. */
const DIGITS: Record<string, string> = {
  '0': '111101101101111', '1': '010110010010111', '2': '111001111100111', '4': '101101111001001', ':': '000010000010000',
};
const BARS = [5, 8, 11, 7, 4, 9, 12, 10, 6, 3, 7, 9, 5, 4];

export default function DeckArt({ accent }: { accent: string }) {
  return (
    <svg className="deck" viewBox="0 0 400 400" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect x="22" y="70" width="356" height="244" rx="22" fill="#17171a" stroke="#34343a" strokeWidth="2" />
      {[[40, 88], [360, 88], [40, 296], [360, 296]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="#4a4a52" />)}
      <circle cx="122" cy="182" r="78" fill="#0b0b0d" stroke="#3b3b42" strokeWidth="3" />
      <g className="deck-reel">
        {[64, 52, 40].map((r) => <circle key={r} cx="122" cy="182" r={r} fill="none" stroke="#2a2a30" />)}
        {[0, 120, 240].map((a) => <rect key={a} x="117" y="122" width="10" height="42" rx="5" fill="#34343c" transform={`rotate(${a} 122 182)`} />)}
        <circle cx="122" cy="126" r="7" fill={accent} />
        <circle cx="122" cy="182" r="17" fill={accent} />
        <circle cx="122" cy="182" r="5" fill="#0b0b0d" />
      </g>
      <rect x="218" y="106" width="142" height="152" rx="10" fill="#050506" stroke="#2a2a30" />
      {'01:24'.split('').map((ch, i) => (
        <g key={i} className={ch === ':' ? 'deck-colon' : undefined}>
          {DIGITS[ch].split('').map((on, p) => (
            <circle key={p} cx={233 + i * 26 + (p % 3) * 5} cy={124 + Math.floor(p / 3) * 7} r="2.1" fill={on === '1' ? accent : '#1d1d20'} />
          ))}
        </g>
      ))}
      {BARS.map((n, i) => (
        <g key={i} className="deck-bar" style={{ animationDelay: `${-i * 0.17}s`, animationDuration: `${0.7 + (i % 4) * 0.18}s` }}>
          {Array.from({ length: n }, (_, j) => (
            <rect key={j} x={231 + i * 8.6} y={242 - j * 6} width="6" height="4" fill={j > 9 ? '#ff6a3d' : accent} />
          ))}
        </g>
      ))}
      <line x1="48" y1="286" x2="352" y2="286" stroke="#050506" strokeWidth="7" strokeLinecap="round" />
      <line x1="48" y1="286" x2="190" y2="286" stroke={accent} strokeWidth="3" strokeLinecap="round" />
      <rect x="182" y="272" width="16" height="28" rx="3" fill="#d9d9de" />
      <text x="48" y="342" fill="#F3ECDD" opacity="0.7" fontFamily="Geist Mono, monospace" fontSize="13">Deck skin: concept, not in the app yet</text>
    </svg>
  );
}
