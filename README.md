# Prabhu Siddarth A V | Portfolio

[![GitHub](https://img.shields.io/badge/GitHub-PRABHUSIDDARTH-111?style=for-the-badge&logo=github)](https://github.com/PRABHUSIDDARTH)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Prabhu_Siddarth-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/prabhu-siddarth-av/)

An editorial, motion-led portfolio with a dedicated product page for each flagship.

## Routes

| Route | What it is |
| --- | --- |
| `/` | Hero shader, statement, pinned horizontal flagship reel, filterable index of all work, capabilities, path, contact |
| `/nexuscloud` | NexusCloud: multi-cloud BYOC orchestration, with a live Smart Router simulator |
| `/swara` | Swara: offline Java music player, with an interactive phone and the 8 WCAG AAA themes |
| `/sidd-ai` | sidd-ai: Java AI SDK, with a playground that runs a TypeScript port of the real `ModelRouter` |

## Design system

- Type: Instrument Serif (display), Geist (text), Geist Mono (metadata)
- Motion: Lenis smooth scroll driven by the GSAP ticker, ScrollTrigger reveals, a pinned horizontal reel, and a clip-path curtain between routes
- WebGL: one fullscreen contour shader (three.js). Scroll velocity bends it, the cursor lenses it, and it pauses when off-screen or when the tab is hidden
- Accessibility: skip link, keyboard-operable demos, `prefers-reduced-motion` respected throughout

## Structure

```
src/content.ts            all copy, flagships, works, capabilities
src/lib/router.tsx        history router + curtain transitions
src/lib/smooth.ts         Lenis + GSAP wiring, scroll velocity
src/lib/motion.tsx        reveal / split-text hooks, page meta
src/components/           Field (shader), Chrome (nav, cursor, preloader, footer), ProductShell
src/pages/                Home, NexusCloud, Swara, SiddAi
```

Edit `src/content.ts` to add or change work. Flagships with a `route` link to their page.

## Contact form (SMTP)

`POST /api/contact` sends mail through Nodemailer. It's in `api/contact.ts`, which runs as a Vercel function and is also mounted on the Express dev server. Set these env vars (Vercel project settings, or `.env` locally):

| Var | Example |
| --- | --- |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | your Gmail address |
| `SMTP_PASS` | a Gmail App Password (not your login password) |
| `CONTACT_TO` | inbox to deliver to (defaults to `SMTP_USER`) |

It validates input, strips newlines from headers, sets Reply-To to the sender, rate-limits each IP to 3 messages per 10 minutes, and drops bot submissions with a honeypot field.

## Resume

Put your PDF at `public/resume.pdf`. Every Resume button links to `/resume.pdf`.

## Run

```bash
npm install
npm run dev      # Express + Vite on http://localhost:3000
npm run build    # static bundle in dist/ + dist/server.cjs
npm run lint     # tsc --noEmit
```

Deployed on Vercel. `vercel.json` rewrites every non-asset path to the SPA.

---

## About Me

Hi! I'm **Prabhu Siddarth A V**, a Software Development Engineer and third-year Information Technology student at **Sri Shakthi Institute of Engineering & Technology** (CGPA: **8.26**).

- **Systems & Backend Builder** — Building multi-cloud orchestrators, distributed rate limiters, and framework-agnostic Java SDKs.
- **Android Developer** — Crafting native Android applications implementing Clean Architecture, MVVM, and offline-first persistence.
- **AI Systems Developer** — Building computer vision focus trackers and LLM integrations.

---

## Featured Projects

| Project | Description | Tech Stack | Repository |
|---|---|---|---|
|  **[Sidd-AI](https://github.com/PRABHUSIDDARTH/sidd-ai)** | Framework-agnostic Java SDK — call any AI model through a single line (`AiClient.chatQuick`). Apache 2.0. | Java, SDK, OpenAI, Gemini, Claude, Grok, NIM, Ollama | [GitHub ↗](https://github.com/PRABHUSIDDARTH/sidd-ai) |
|  **[NexusCloud](https://github.com/PRABHUSIDDARTH/NexusCloud)** | BYOC multi-cloud storage orchestration engine abstracting AWS S3, GCS, and Azure Blob behind one API. | Python, Docker, Kubernetes, FastAPI | [GitHub ↗](https://github.com/PRABHUSIDDARTH/NexusCloud) |
|  **[Swara App](https://github.com/PRABHUSIDDARTH/SwaraApp)** | Offline native Android music player with Clean Architecture, ExoPlayer playback, and Room DB playlists. | Java, Android, ExoPlayer, Room DB | [GitHub ↗](https://github.com/PRABHUSIDDARTH/SwaraApp) |
|  **[Distraction Monitor](https://github.com/PRABHUSIDDARTH/distraction-monitor-v1)** | Computer vision AI tracking Eye Aspect Ratio (EAR) and Mouth Aspect Ratio (MAR) in real time. | Python, OpenCV, MediaPipe, TensorFlow | [GitHub ↗](https://github.com/PRABHUSIDDARTH/distraction-monitor-v1) |
|  **[AlgoMentor](https://github.com/PRABHUSIDDARTH/AlgoMentor)** | AI DSA coach using Gemini API — Socratic evaluation without spoiling direct answers. | HTML, JavaScript, Gemini API | [GitHub ↗](https://github.com/PRABHUSIDDARTH/AlgoMentor) |
|  **[ElectED](https://github.com/PRABHUSIDDARTH/ElectED)** | Civic literacy portal with voting tutorials, election map simulations, and interactive quizzes. | HTML, CSS, JavaScript | [GitHub ↗](https://github.com/PRABHUSIDDARTH/ElectED) |

---

##  Contact & Connect

- **Email**: [prabhusiddarth37@gmail.com](mailto:prabhusiddarth37@gmail.com)
- **LinkedIn**: [linkedin.com/in/prabhu-siddarth-av](https://www.linkedin.com/in/prabhu-siddarth-av/)
- **GitHub**: [github.com/PRABHUSIDDARTH](https://github.com/PRABHUSIDDARTH)
- **Location**: Coimbatore, Tamil Nadu, India

---

<p align="center">
  <i>Designed & Built by Prabhu Siddarth A V</i>
</p>
