import { FanItem } from './HeroFan';

// Every card repeats something already on its page or captured from the app. Nothing is mocked up as a screenshot.

const shot = (name: string, alt: string, bg: string) => (
  <img className="fan-shot" style={{ background: bg }} src={`/media/coedit-hero/${name}.webp`} alt={alt} />
);

export const COEDIT_FAN: FanItem[] = [
  { label: 'Documents', note: 'Captured from the app running locally', card: shot('doc-light', 'Coedit document editor showing a planting plan', '#ffffff') },
  { label: 'Sheets', note: 'Captured from the app running locally', card: shot('formula', 'Coedit spreadsheet with a SUM formula', '#101113') },
  { label: 'Canvas', note: 'Captured from the app running locally', card: shot('canvas', 'Coedit canvas with four labelled boxes', '#ffffff') },
];

const rows = (data: [string, string][]) => (
  <dl>
    {data.map(([a, b]) => (
      <div key={a}><dt>{a}</dt><dd>{b}</dd></div>
    ))}
  </dl>
);

export const NEXUS_FAN: FanItem[] = [
  {
    label: 'Router',
    note: 'Smart Router weights, from the README',
    card: (<div className="fan-text"><h4>POST /api/v1/files/upload</h4>{rows([['Free quota left', '40%'], ['Egress cost', '30%'], ['Tier permanence', '20%'], ['File-to-quota fit', '10%']])}</div>),
  },
  {
    label: 'Free pool',
    note: 'Free-tier figures, from the README',
    card: (<div className="fan-text"><h4>Your clouds</h4>{rows([['IBM Cloud', '25 GB'], ['Oracle Cloud', '20 GB'], ['Cloudflare R2', '10 GB'], ['Backblaze B2', '10 GB'], ['GCP, AWS, Azure', '5 GB each']])}</div>),
  },
  {
    label: 'API',
    note: 'Routes from the project API',
    card: (<div className="fan-text"><h4>Endpoints</h4>{rows([['POST /connections', 'add a cloud'], ['GET /connections', 'list quota'], ['POST /files/upload', 'presigned URL'], ['GET /files/{id}', 'download'], ['GET /quota/summary', 'free pool']])}</div>),
  },
];

export const SIDD_FAN: FanItem[] = [
  {
    label: 'One call',
    note: 'The same method for any model',
    card: (<pre className="fan-text">{'AiClient.chatQuick(\n  "gpt-6.1-sol", prompt);\n\nAiClient.chatQuick(\n  "claude-sonnet-5.5", prompt);\n\nAiClient.chatQuick(\n  "llama3.2", prompt);'}</pre>),
  },
  {
    label: 'Routing',
    note: 'Some of the prefixes ModelRouter reads',
    card: (<div className="fan-text"><h4>Prefix to provider</h4>{rows([['gpt-', 'OpenAI'], ['gemini-', 'Gemini'], ['claude-', 'Anthropic'], ['grok-', 'Grok'], ['llama-', 'Groq'], ['anything else', 'Ollama']])}</div>),
  },
  {
    label: 'Install',
    note: 'Published on Maven Central',
    card: (<pre className="fan-text">{'<dependency>\n  <groupId>\n    io.github.prabhusiddarth\n  </groupId>\n  <artifactId>sidd-ai</artifactId>\n  <version>1.0.5</version>\n</dependency>'}</pre>),
  },
];
