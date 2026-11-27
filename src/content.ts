// Single source of truth for portfolio content. Sourced from github.com/PRABHUSIDDARTH
// and the NexusCloud-Orchestra / PS-TECH-Solution / F-A-L-C-O-N organisations.

export const PROFILE = {
  name: 'Prabhu Siddarth A V',
  role: 'AI Backend Engineer (student)',
  headline: 'AI Backend Engineer in the making. B.Tech IT, 2028.',
  location: 'Coimbatore, India',
  college: 'Sri Shakthi Institute of Engineering & Technology',
  degree: 'B.Tech Information Technology, 2024 - 2028',
  email: 'prabhusiddarth37@gmail.com',
  github: 'https://github.com/PRABHUSIDDARTH',
  linkedin: 'https://www.linkedin.com/in/prabhu-siddarth-av/',
  leetcode: 'https://leetcode.com/u/psTech/',
  youtube: 'https://www.youtube.com/@psthetech',
  resume: '/resume.pdf',
  statement:
    'I like the part of software nobody screenshots: how a router picks a cloud, why a list cell forgets its old state, what happens when Redis goes down at 2am. Most of what I build starts as a backend problem and ends up as something a person can actually hold.',
};

export type Metric = { value: string; label: string };

export type Flagship = {
  slug: 'nexuscloud' | 'sidd-ai' | 'coedit' | 'swara';
  before: string;
  after: string;
  path: string;
  index: string;
  name: string;
  kicker: string;
  tagline: string;
  summary: string;
  role: string;
  stack: string[];
  metrics: Metric[];
  repo: string;
  /** Standalone product website, if one is deployed. */
  site?: string;
  video?: { src: string; poster: string; silent?: boolean };
  logo: string;
  accent: string;
  bg: string;
  fg: string;
};

export const FLAGSHIPS: Flagship[] = [
  {
    slug: 'nexuscloud',
    logo: '/logos/nexuscloud.svg',
    before: 'Free storage scattered across seven clouds.',
    after: 'One disk with a router that picks the bucket.',
    path: '/nexuscloud',
    index: '01',
    name: 'NexusCloud',
    kicker: 'Multi-cloud orchestration',
    tagline: 'Seven free tiers, one disk.',
    summary:
      'Connect your own AWS, GCP, Azure, R2, Backblaze, Oracle and IBM accounts and NexusCloud treats their free tiers as one disk. Each upload gets scored against every bucket you own; the file then goes straight there, never through our servers.',
    role: 'Project Lead: backend core, Smart Router, DevOps',
    stack: ['FastAPI', 'Python 3.12', 'PostgreSQL 16', 'Redis 7', 'React 18', 'Docker', 'GCP Cloud Run'],
    metrics: [
      { value: '7', label: 'cloud providers' },
      { value: '70GB+', label: 'across provider free tiers' },
      { value: '0', label: 'bytes proxied' },
    ],
    repo: 'https://github.com/NexusCloud-Orchestra/NexusCloud-Orchestra',
    accent: '#2F6BFF',
    bg: '#E6EBF1',
    fg: '#0A1626',
  },
  {
    slug: 'sidd-ai',
    logo: '/logos/sidd-ai.png',
    before: 'A different SDK for every model provider.',
    after: 'One Java call for any of them.',
    path: '/sidd-ai',
    index: '02',
    name: 'sidd-ai',
    kicker: 'Open-source Java SDK',
    tagline: 'Any AI model, one line of Java.',
    summary:
      'An open-source, Apache 2.0 library on Maven Central with 600+ downloads. Think LiteLLM, but for Java: pass "gpt-6.1-sol", "claude-sonnet-5.5" or "llama3.2" to the same method and it figures out the provider. Works from a plain main(), no Spring and no YAML.',
    role: 'Creator and maintainer, open to contributors',
    stack: ['Java 17', 'Maven Central', 'ModelRouter', 'JUnit 5', 'Fat jar', 'Apache 2.0'],
    metrics: [
      { value: '600+', label: 'Maven Central downloads' },
      { value: '8', label: 'AI providers' },
    ],
    repo: 'https://github.com/PRABHUSIDDARTH/sidd-ai',
    video: { src: '/media/sidd-ai.mp4', poster: '/media/sidd-ai.webp' },
    accent: '#B69CFF',
    bg: '#08080D',
    fg: '#ECEAF6',
  },
  {
    slug: 'coedit',
    logo: '/logos/coedit.svg',
    video: { src: '/media/coedit.mp4', poster: '/media/coedit.webp', silent: true },
    before: 'Docs, sheets, drawings and AI drafts in separate tools.',
    after: 'One realtime workspace with a model council.',
    path: '/coedit',
    index: '03',
    name: 'Coedit',
    kicker: 'Realtime workspace + AI council',
    tagline: 'Write together. Let a council of models draft the spec.',
    summary:
      'Co-edit docs and spreadsheets live, draw on canvases beside them, and let an AI council on your own API key turn a rough idea into an engineering handoff pack. It runs locally with Docker Compose. The app itself is not hosted yet.',
    role: 'Solo build',
    stack: ['Next.js', 'TipTap', 'Yjs / Hocuspocus', 'FastAPI', 'PostgreSQL 16', 'Excalidraw', 'HyperFormula', 'Docker Compose'],
    metrics: [
      { value: '3', label: 'files per council run' },
      { value: '3', label: 'workspace roles' },
      { value: '30s', label: 'live role re-check' },
    ],
    repo: 'https://github.com/PRABHUSIDDARTH/coedit',
    site: 'https://coedit-website.vercel.app',
    accent: '#FF4D1C',
    bg: '#F2E8D0',
    fg: '#121210',
  },
  {
    slug: 'swara',
    logo: '/logos/swara.png',
    video: { src: '/media/swara.mp4', poster: '/media/swara.webp', silent: true },
    before: 'Music apps that want an account and a connection.',
    after: 'An offline player with AI that runs on the phone.',
    path: '/swara',
    index: '04',
    name: 'Swara',
    kicker: 'Offline Android music player + on-device AI',
    tagline: 'A music player that never asks for the internet.',
    summary:
      'Swara plays the music already on your phone, with no account. A small neural network strips vocals live for karaoke, voice commands are transcribed on the device, and Vibe Mode, mixes and Wrapped recaps are all computed locally. Plain Java on Media3 and Room.',
    role: 'Solo: product design and engineering',
    stack: ['Java', 'Media3 / ExoPlayer', 'Room', 'MVVM', 'ONNX Runtime', 'PyTorch', 'GitHub Actions'],
    metrics: [
      { value: '~23ms', label: 'karaoke latency added' },
      { value: '8', label: 'colour themes' },
      { value: 'No', label: 'internet permission' },
    ],
    repo: 'https://github.com/PRABHUSIDDARTH/SwaraApp',
    site: 'https://swaraapp-website.vercel.app',
    accent: '#D4AF5A',
    bg: '#000000',
    fg: '#F2F2F7',
  },
];

export const flagshipBySlug = (slug: Flagship['slug']) => FLAGSHIPS.find((f) => f.slug === slug)!;

export type WorkKind = 'Systems' | 'AI' | 'Mobile' | 'Web' | 'Java';

export type Work = {
  name: string;
  kind: WorkKind;
  blurb: string;
  stack: string[];
  year: string;
  href: string;
  org?: string;
  route?: string;
};

export const WORKS: Work[] = [
  { name: 'NexusCloud', kind: 'Systems', route: '/nexuscloud', org: 'NexusCloud-Orchestra', year: '2026',
    blurb: 'Pools the free tiers of seven clouds into one disk. A scoring router picks the bucket; bytes go direct via presigned URLs.',
    stack: ['FastAPI', 'PostgreSQL', 'Redis', 'React'], href: 'https://github.com/NexusCloud-Orchestra/NexusCloud-Orchestra' },
  { name: 'sidd-ai', kind: 'Java', route: '/sidd-ai', year: '2026',
    blurb: 'Open-source Java SDK, 600+ Maven Central downloads. Change one string and the same call hits OpenAI, Claude, Gemini or a local Ollama.',
    stack: ['Java', 'Maven', 'Apache 2.0'], href: 'https://github.com/PRABHUSIDDARTH/sidd-ai' },
  { name: 'Coedit', kind: 'Web', route: '/coedit', year: '2026',
    blurb: 'Live co-edited docs, sheets and drawings, plus an optional AI council that drafts a handoff pack.',
    stack: ['Next.js', 'FastAPI', 'Yjs', 'PostgreSQL'], href: 'https://github.com/PRABHUSIDDARTH/coedit' },
  { name: 'Swara', kind: 'Mobile', route: '/swara', year: '2026',
    blurb: 'Offline Android music player with on-device vocal removal, voice commands, Vibe Mode and Wrapped recaps.',
    stack: ['Java', 'Media3', 'Room', 'ONNX'], href: 'https://github.com/PRABHUSIDDARTH/SwaraApp' },
  { name: 'Return Risk Scorer', kind: 'AI', year: '2026',
    blurb: 'Flags likely return abuse before an e-commerce order ships; Gemini explains each score and every decision lands in an append-only log.',
    stack: ['Python', 'ML', 'Gemini'], href: 'https://github.com/PRABHUSIDDARTH/AI-risk-manager' },
  { name: 'PyRAG', kind: 'AI', year: '2026',
    blurb: 'RAG pipeline that refuses to answer when retrieval scores fall under a threshold, and cites the chunk it used when it does.',
    stack: ['LangChain', 'ChromaDB', 'FAISS', 'Groq'], href: 'https://github.com/PRABHUSIDDARTH/PyRAG' },
  { name: 'RetinaFace Inference', kind: 'AI', org: 'F-A-L-C-O-N', year: '2026',
    blurb: 'Face detection behind a FastAPI endpoint: boxes, five landmarks, an annotated image back, and per-request metrics in SQL.',
    stack: ['FastAPI', 'RetinaFace', 'SQLAlchemy'], href: 'https://github.com/F-A-L-C-O-N/retinaface-inference-service' },
  { name: 'AlgoMentor', kind: 'AI', year: '2026',
    blurb: 'DSA coach that reads your code and asks the next question instead of handing over the answer.',
    stack: ['Python', 'Flask', 'Gemini API'], href: 'https://github.com/PRABHUSIDDARTH/AlgoMentor' },
];

// Printed on the home page and served as /whoami.json; a test keeps the two identical.
export const WHOAMI = {
  built: 'Coedit, docs + AI council',
  shipped: 'sidd-ai, 600+ downloads',
  interned: ['Azure AI', 'IBM'],
  studying: 'B.Tech IT, 2028, CGPA 8.3',
  looking_for: 'AI backend roles',
};

export const CAPABILITIES: { title: string; items: string[] }[] = [
  { title: 'Backend & Systems', items: ['Java 17 / 21', 'Spring Boot', 'FastAPI', 'PostgreSQL', 'Redis', 'REST / OpenAPI'] },
  { title: 'Cloud & DevOps', items: ['Docker', 'Kubernetes', 'GCP Cloud Run', 'S3 / GCS / Azure Blob', 'GitHub Actions', 'Linux'] },
  { title: 'Mobile', items: ['Native Android (Java)', 'Media3 / ExoPlayer', 'Room', 'MVVM', 'SwiftUI'] },
  { title: 'Applied AI', items: ['LLM SDKs', 'RAG pipelines', 'TensorFlow', 'OpenCV / MediaPipe', 'Gemini / OpenAI / Ollama'] },
];

export const PATH: { year: string; title: string; detail: string }[] = [
  { year: '2026', title: 'Leading NexusCloud-Orchestra', detail: 'Four of us. I own the backend core, the Smart Router and deployment.' },
  { year: '2026', title: 'Open-sourced sidd-ai', detail: 'Published to Maven Central under Apache 2.0 and launched on Product Hunt. 600+ downloads so far.' },
  { year: '2025', title: 'Microsoft Azure AI internship', detail: 'AICTE virtual programme. Trained vision models and ran them through Azure ML.' },
  { year: '2025', title: 'IBM x Edunet internship', detail: 'Frontend track. The capstone blog went live on Vercel.' },
  { year: '2024', title: 'B.Tech IT, Sri Shakthi', detail: 'CGPA 8.3. Started PS-TECH-Solution and joined F-A-L-C-O-N.' },
];
