// Single source of truth for portfolio content. Sourced from github.com/PRABHUSIDDARTH
// and the NexusCloud-Orchestra / PS-TECH-Solution / F-A-L-C-O-N organisations.

export const PROFILE = {
  name: 'Prabhu Siddarth A V',
  role: 'Software Development Engineer',
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
  slug: 'nexuscloud' | 'swara' | 'sidd-ai';
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
  accent: string;
  bg: string;
  fg: string;
};

export const FLAGSHIPS: Flagship[] = [
  {
    slug: 'nexuscloud',
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
      { value: '70GB+', label: 'free pool per user' },
      { value: '0', label: 'bytes proxied' },
    ],
    repo: 'https://github.com/NexusCloud-Orchestra/NexusCloud-Orchestra',
    accent: '#2F6BFF',
    bg: '#E6EBF1',
    fg: '#0A1626',
  },
  {
    slug: 'swara',
    path: '/swara',
    index: '02',
    name: 'Swara',
    kicker: 'Offline music player, Android + iOS',
    tagline: 'A music player that never asks for the internet.',
    summary:
      'Swara plays the files already on your phone. It is written in plain Java on Media3 and Room, has eight colour themes that all clear 7:1 contrast, and ships with a widget, a queue, a sleep timer and a SwiftUI port for iOS.',
    role: 'Solo: product design and engineering',
    stack: ['Java 17', 'Media3 / ExoPlayer', 'Room v3', 'MVVM', 'Glide', 'SwiftUI', 'GitHub Actions'],
    metrics: [
      { value: '8', label: 'colour themes' },
      { value: '7:1', label: 'minimum text contrast' },
      { value: '0', label: 'network calls' },
    ],
    repo: 'https://github.com/PRABHUSIDDARTH/SwaraApp',
    accent: '#E6A23C',
    bg: '#0D0B14',
    fg: '#F3ECDD',
  },
  {
    slug: 'sidd-ai',
    path: '/sidd-ai',
    index: '03',
    name: 'sidd-ai',
    kicker: 'Open-source Java SDK',
    tagline: 'Any AI model, one line of Java.',
    summary:
      'An open-source, Apache 2.0 library on Maven Central with 600+ downloads and 35+ organisations using it. Think LiteLLM, but for Java: pass "gpt-6.1-sol", "claude-sonnet-5.5" or "llama3.2" to the same method and it figures out the provider. Works from a plain main(), no Spring and no YAML.',
    role: 'Creator and maintainer, open to contributors',
    stack: ['Java 17', 'Maven Central', 'ModelRouter', 'JUnit 5', 'Fat jar', 'Apache 2.0'],
    metrics: [
      { value: '600+', label: 'Maven Central downloads' },
      { value: '35+', label: 'organisations using it' },
      { value: '8', label: 'AI providers' },
    ],
    repo: 'https://github.com/PRABHUSIDDARTH/sidd-ai',
    accent: '#B69CFF',
    bg: '#08080D',
    fg: '#ECEAF6',
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
  { name: 'Swara', kind: 'Mobile', route: '/swara', year: '2026',
    blurb: 'Offline Android music player in plain Java, with Room migrations, a home-screen widget and a SwiftUI port.',
    stack: ['Java', 'Media3', 'Room', 'SwiftUI'], href: 'https://github.com/PRABHUSIDDARTH/SwaraApp' },
  { name: 'sidd-ai', kind: 'Java', route: '/sidd-ai', year: '2026',
    blurb: 'Open-source Java SDK, 600+ Maven Central downloads, used by 35+ organisations. Change one string and the same call hits OpenAI, Claude, Gemini or a local Ollama.',
    stack: ['Java', 'Maven', 'Apache 2.0'], href: 'https://github.com/PRABHUSIDDARTH/sidd-ai' },
  { name: 'SiddBot', kind: 'AI', year: '2026',
    blurb: 'Chatbot toolkit for Java 17+ with conversation memory, persistence and prompt-injection checks behind a builder.',
    stack: ['Java', 'LLMs', 'Builder API'], href: 'https://github.com/PRABHUSIDDARTH/sidd-bot' },
  { name: 'Return Risk Scorer', kind: 'AI', year: '2026',
    blurb: 'Flags likely return abuse before an e-commerce order ships; Gemini explains each score and every decision lands in an append-only log.',
    stack: ['Python', 'ML', 'Gemini'], href: 'https://github.com/PRABHUSIDDARTH/AI-risk-manager' },
  { name: 'PyRAG', kind: 'AI', year: '2026',
    blurb: 'RAG pipeline that refuses to answer when retrieval scores fall under a threshold, and cites the chunk it used when it does.',
    stack: ['LangChain', 'ChromaDB', 'FAISS', 'Groq'], href: 'https://github.com/PRABHUSIDDARTH/PyRAG' },
  { name: 'RetinaFace Inference', kind: 'AI', org: 'F-A-L-C-O-N', year: '2026',
    blurb: 'Face detection behind a FastAPI endpoint: boxes, five landmarks, an annotated image back, and per-request metrics in SQL.',
    stack: ['FastAPI', 'RetinaFace', 'SQLAlchemy'], href: 'https://github.com/F-A-L-C-O-N/retinaface-inference-service' },
  { name: 'Personal AI Assistant', kind: 'Java', year: '2026',
    blurb: 'Spring Boot chat service talking to a local Ollama model, with every conversation stored through JPA.',
    stack: ['Spring Boot', 'Ollama', 'JPA'], href: 'https://github.com/PRABHUSIDDARTH/personal-ai-assistant' },
  { name: 'NexusCloud v0', kind: 'Systems', year: '2026',
    blurb: 'The first prototype. Rough, single-user, and the reason the team version exists.',
    stack: ['Python', 'Docker', 'Kubernetes'], href: 'https://github.com/PRABHUSIDDARTH/NexusCloud' },
  { name: 'LifeLink', kind: 'Web', org: 'PS-TECH-Solution', year: '2026',
    blurb: 'Emergency-help web app that walks a bystander through first aid with Gemini while help is on the way.',
    stack: ['JavaScript', 'Gemini API'], href: 'https://github.com/PS-TECH-Solution/LifeLink' },
  { name: 'Distraction Monitor', kind: 'AI', year: '2026',
    blurb: 'Watches the screen, recognises Reels and Shorts with a TensorFlow model, and interrupts you.',
    stack: ['Python', 'TensorFlow', 'Docker'], href: 'https://github.com/PRABHUSIDDARTH/distraction-monitor-v1' },
  { name: 'AlgoMentor', kind: 'AI', year: '2026',
    blurb: 'DSA coach that reads your code and asks the next question instead of handing over the answer.',
    stack: ['Python', 'Flask', 'Gemini API'], href: 'https://github.com/PRABHUSIDDARTH/AlgoMentor' },
  { name: 'Phishing Detector', kind: 'Web', year: '2025',
    blurb: 'Chrome extension that checks each page against a FastAPI scoring service and warns before you type a password.',
    stack: ['Python', 'FastAPI', 'Chrome MV3'], href: 'https://github.com/PRABHUSIDDARTH/PHISHINGDETECTOR' },
  { name: 'Inventory Management', kind: 'Java', year: '2026',
    blurb: 'Stock, orders and suppliers over JDBC, with low-stock alerts.',
    stack: ['Java', 'JDBC', 'SQL'], href: 'https://github.com/PRABHUSIDDARTH/InventoryManagement' },
  { name: 'Java Micro Projects', kind: 'Java', year: '2026',
    blurb: 'Small builds I use to learn the JDK properly: a Ludo engine, maze solvers, a multithreaded booking system, socket chat.',
    stack: ['Java', 'Threads', 'Sockets'], href: 'https://github.com/PRABHUSIDDARTH/Java_Micro_Projects' },
];

export const STATS: Metric[] = [
  { value: '15', label: 'projects on this page' },
  { value: '1', label: 'open-source SDK on Maven Central' },
  { value: '4', label: 'engineers on the team I lead' },
  { value: '8.26', label: 'CGPA' },
];

export const CAPABILITIES: { title: string; items: string[] }[] = [
  { title: 'Backend & Systems', items: ['Java 17 / 21', 'Spring Boot', 'FastAPI', 'PostgreSQL', 'Redis', 'REST / OpenAPI'] },
  { title: 'Cloud & DevOps', items: ['Docker', 'Kubernetes', 'GCP Cloud Run', 'S3 / GCS / Azure Blob', 'GitHub Actions', 'Linux'] },
  { title: 'Mobile', items: ['Native Android (Java)', 'Media3 / ExoPlayer', 'Room', 'MVVM', 'SwiftUI'] },
  { title: 'Applied AI', items: ['LLM SDKs', 'RAG pipelines', 'TensorFlow', 'OpenCV / MediaPipe', 'Gemini / OpenAI / Ollama'] },
];

export const PATH: { year: string; title: string; detail: string }[] = [
  { year: '2026', title: 'Leading NexusCloud-Orchestra', detail: 'Four of us. I own the backend core, the Smart Router and deployment.' },
  { year: '2026', title: 'Open-sourced sidd-ai', detail: 'Published to Maven Central under Apache 2.0 and launched on Product Hunt. 600+ downloads and 35+ organisations so far.' },
  { year: '2025', title: 'Microsoft Azure AI internship', detail: 'AICTE virtual programme. Trained vision models and ran them through Azure ML.' },
  { year: '2025', title: 'IBM x Edunet internship', detail: 'Frontend track. The capstone blog went live on Vercel.' },
  { year: '2024', title: 'B.Tech IT, Sri Shakthi', detail: 'CGPA 8.26. Started PS-TECH-Solution and joined F-A-L-C-O-N.' },
];
