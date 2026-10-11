import { useState } from 'react';
import ProductShell, { SectionHead } from '../components/ProductShell';
import { flagshipBySlug } from '../content';
import { Split } from '../lib/motion';

type Provider = { id: string; name: string; prefixes: string[]; example: string };

// Mirrors io.github.prabhusiddarth.sidd-ai ModelRouter: checked top to bottom, Ollama is the fallback.
const PROVIDERS: Provider[] = [
  { id: 'openai', name: 'OpenAI', prefixes: ['gpt-', 'o1-', 'o3-'], example: 'gpt-6.1-sol' },
  { id: 'gemini', name: 'Gemini', prefixes: ['gemini-'], example: 'gemini-3.8-flash' },
  { id: 'anthropic', name: 'Anthropic', prefixes: ['claude-'], example: 'claude-sonnet-5.5' },
  { id: 'grok', name: 'Grok', prefixes: ['grok-'], example: 'grok-4.7' },
  { id: 'groq', name: 'Groq', prefixes: ['llama-', 'groq/'], example: 'llama-3.3-70b-versatile' },
  { id: 'kimi', name: 'Kimi', prefixes: ['moonshotai/', 'moonshot-', 'kimi-'], example: 'kimi-k3' },
  {
    id: 'nim', name: 'NVIDIA NIM',
    prefixes: ['nvidia/', 'nim-', 'deepseek-ai/', 'z-ai/', 'zhipuai/', 'qwen/', 'minimaxai/', 'meta/', 'mistralai/', 'microsoft/', 'ibm/', 'openai/'],
    example: 'deepseek-ai/deepseek-v4.1-flash',
  },
  { id: 'ollama', name: 'Ollama (local)', prefixes: ['anything else'], example: 'llama3.2' },
];

export function route(model: string): Provider {
  const m = model.trim().toLowerCase();
  for (const p of PROVIDERS.slice(0, -1)) if (p.prefixes.some((x) => m.startsWith(x))) return p;
  return PROVIDERS[PROVIDERS.length - 1];
}

function Playground() {
  const [model, setModel] = useState('gemini-3.8-flash');
  const hit = route(model);
  const safe = model.replace(/["\\]/g, '');
  return (
    <div style={{ display: 'grid', gap: '1.4rem' }}>
      <label className="play-input">
        <span className="muted">model =</span>
        <input value={model} onChange={(e) => setModel(e.target.value)} spellCheck={false} aria-label="Model name" placeholder="type any model id" />
        <span className="mono" style={{ color: 'var(--page-accent)', whiteSpace: 'nowrap' }} aria-live="polite">&rarr; {hit.name}</span>
      </label>
      <div className="providers">
        {PROVIDERS.map((p) => (
          <button key={p.id} className={`provider ${p.id === hit.id ? 'hit' : ''}`} onClick={() => setModel(p.example)} aria-pressed={p.id === hit.id}>
            <span style={{ fontSize: 15 }}>{p.name}</span>
            <span className="px">{p.prefixes.slice(0, 4).join('  ')}{p.prefixes.length > 4 ? '  +' + (p.prefixes.length - 4) : ''}</span>
          </button>
        ))}
      </div>
      <pre className="code">
        <span className="k">String</span> reply = AiClient.<span className="k">chatQuick</span>(<span className="s">"{safe}"</span>, <span className="s">"Explain JVM GC in one line"</span>);{'\n'}
        <span className="c">// ModelRouter resolved "{safe || ' '}" to {hit.name}. No config, no Spring context.</span>
      </pre>
    </div>
  );
}

const INSTALL: Record<string, string> = {
  Maven: `<dependency>
  <groupId>io.github.prabhusiddarth</groupId>
  <artifactId>sidd-ai</artifactId>
  <version>1.0.5</version>
</dependency>`,
  Gradle: `implementation("io.github.prabhusiddarth:sidd-ai:1.0.5")`,
  'Fat jar': `curl -LO https://github.com/PRABHUSIDDARTH/sidd-ai/releases/latest/download/sidd-ai.jar
javac -cp sidd-ai.jar Main.java && java -cp sidd-ai.jar:. Main`,
};

function Install() {
  const [tab, setTab] = useState('Maven');
  return (
    <div>
      <div className="tabs" role="tablist">
        {Object.keys(INSTALL).map((k) => (
          <button key={k} role="tab" className="chip" aria-selected={k === tab} aria-pressed={k === tab} onClick={() => setTab(k)}>{k}</button>
        ))}
      </div>
      <pre className="code" role="tabpanel">{INSTALL[tab]}</pre>
    </div>
  );
}

const ROWS: [string, string, string, string][] = [
  ['Zero framework', 'No', 'Partial', 'Yes'],
  ['Works in plain main()', 'No', 'Yes', 'Yes'],
  ['One-line calls', 'No', 'No', 'Yes'],
  ['Unified exceptions', 'Partial', 'Partial', 'Yes'],
  ['Swap model via a string', 'No', 'No', 'Yes'],
];

export default function SiddAi() {
  const f = flagshipBySlug('sidd-ai');
  return (
    <ProductShell
      f={f}
      links={[
        { label: 'Star it on GitHub', href: f.repo },
        { label: 'Maven Central', href: 'https://central.sonatype.com/artifact/io.github.prabhusiddarth/sidd-ai' },
        { label: 'Product Hunt', href: 'https://www.producthunt.com/products/sidd-ai' },
      ]}
    >
      <section className="section wrap">
        <SectionHead n="01" label="Router playground" right="Type any model id" />
        <div className="split2" style={{ marginBottom: 'clamp(2rem, 5vw, 4rem)', alignItems: 'center' }}>
          <Split text="The model name is the config." className="display h-md" />
          <div data-reveal style={{ display: 'flex', gap: '1.4rem', alignItems: 'center' }}>
            <img src="/sidd-ai-logo.png" alt="sidd-ai logo" width={72} height={72} style={{ borderRadius: 16 }} loading="lazy" />
            <p className="body">ModelRouter looks at the start of the model id and picks the provider from that. If it doesn't recognise the prefix, it assumes you mean a local Ollama model.</p>
          </div>
        </div>
        <div data-reveal><Playground /></div>
      </section>

      <section className="section wrap" style={{ paddingTop: 0 }}>
        <SectionHead n="02" label="Install" right="Java 17+, Apache 2.0" />
        <div className="split2">
          <div data-reveal><Install /></div>
          <div data-reveal>
            <span className="mono muted">Quickstart</span>
            <pre className="code" style={{ marginTop: '0.8rem' }}>
              <span className="c">// builder for full control</span>{'\n'}AiClient client = AiClient.<span className="k">builder</span>(){'\n'}    .apiKey(System.getenv(<span className="s">"OPENAI_API_KEY"</span>)){'\n'}    .model(<span className="s">"gpt-6.1-sol"</span>){'\n'}    .build();{'\n\n'}<span className="c">// or force a provider</span>{'\n'}AiClient.<span className="k">chatWithProvider</span>(<span className="s">"nim"</span>, <span className="s">"z-ai/glm-5.3"</span>, prompt);
            </pre>
          </div>
        </div>
      </section>

      <section className="section wrap" style={{ paddingTop: 0 }}>
        <SectionHead n="03" label="One error model" right="Across every provider" />
        <div className="split2">
          <Split text="Catch three exceptions, not eight SDKs." className="display h-md" />
          <pre className="code" data-reveal>
            <span className="k">try</span> {'{'}{'\n'}  AiClient.chatQuick(model, prompt);{'\n'}{'}'} <span className="k">catch</span> (AiAuthException e) {'{'}      <span className="c">// bad or missing key</span>{'\n'}{'}'} <span className="k">catch</span> (AiRateLimitException e) {'{'} <span className="c">// back off and retry</span>{'\n'}{'}'} <span className="k">catch</span> (AiApiException e) {'{'}       <span className="c">// provider error</span>{'\n'}{'}'}
          </pre>
        </div>
      </section>

      <section className="section wrap" style={{ paddingTop: 0 }}>
        <SectionHead n="04" label="Open source" right="Apache 2.0" />
        <div className="split2">
          <Split text="Free to use, fork and ship." className="display h-md" />
          <div data-reveal>
            <p className="body">
              sidd-ai is open source under the Apache 2.0 licence, so you can drop it into a commercial project without asking. It has passed 600 downloads on Maven Central, and more than 35 organisations pull it into their builds. The code, issues and releases all live on GitHub. If a provider you need is missing, a new route is usually a prefix check and one client class; I review pull requests.
            </p>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '1.6rem' }}>
              <a className="pill solid" href={f.repo} target="_blank" rel="noopener noreferrer"><span className="dot" /> Source on GitHub <span className="arrow">&#8599;</span></a>
              <a className="pill" href={`${f.repo}/issues`} target="_blank" rel="noopener noreferrer">Open an issue <span className="arrow">&#8599;</span></a>
              <a className="pill" href={`${f.repo}/blob/main/LICENSE`} target="_blank" rel="noopener noreferrer">Licence <span className="arrow">&#8599;</span></a>
            </div>
          </div>
        </div>
      </section>

      <section className="section wrap" style={{ paddingTop: 0 }}>
        <SectionHead n="05" label="Why not a framework" right="How it compares" />
        <table className="table compare" data-reveal>
          <thead><tr><th>Capability</th><th>Spring AI</th><th>LangChain4j</th><th>sidd-ai</th></tr></thead>
          <tbody>
            {ROWS.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i} className={i ? 'mono' : ''}>{c}</td>)}</tr>)}
          </tbody>
        </table>
      </section>
    </ProductShell>
  );
}
