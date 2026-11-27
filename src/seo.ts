// One place for titles, descriptions and structured data. The build prerenders these into each
// page's HTML, and useMeta applies the same values during client-side navigation.
import { CAPABILITIES, FLAGSHIPS, PROFILE } from './content';
import { FAQ } from './faq';

/** Every deployment (including *.vercel.app) points search engines at this host. */
export const SITE = 'https://www.prabhusiddarth.dev';

type Page = { title: string; description: string; image: string; theme: string };

const flag = (slug: string, title: string, description: string): Page => ({
  title, description, image: `/og/${slug}.jpg`, theme: FLAGSHIPS.find((f) => f.slug === slug)!.bg,
});

export const PAGES: Record<string, Page> = {
  '/': {
    title: 'Prabhu Siddarth A V | AI Backend Engineer, Coimbatore',
    description: 'AI backend student in Coimbatore. Built sidd-ai (600+ Maven Central downloads), NexusCloud (7 clouds, one disk), Coedit and Swara.',
    image: '/og/home.jpg',
    theme: '#EEEAE2',
  },
  '/nexuscloud': flag('nexuscloud', 'NexusCloud: 7 cloud free tiers, one disk | Prabhu Siddarth',
    '70GB+ of free tiers across 7 clouds as one disk. A FastAPI router picks the bucket; files upload direct, 0 bytes proxied.'),
  '/sidd-ai': flag('sidd-ai', 'sidd-ai: Java LLM SDK, 600+ downloads | Prabhu Siddarth',
    '600+ Maven Central downloads. One Java call for 8 AI providers: OpenAI, Claude, Gemini, Ollama and more. Apache 2.0.'),
  '/coedit': flag('coedit', 'Coedit: realtime docs, sheets + AI council | Prabhu Siddarth',
    'Self-hosted realtime docs, sheets and canvases. An AI council turns a rough idea into a 3-file engineering handoff pack.'),
  '/swara': flag('swara', 'Swara: offline karaoke music player | Prabhu Siddarth',
    'Offline Android music player with live on-device vocal removal (~23ms added latency). No account, no internet permission.'),
};

const url = (p: string) => SITE + p;

export function jsonLdFor(path: string) {
  const person = {
    '@type': 'Person',
    '@id': `${SITE}/#person`,
    name: PROFILE.name,
    alternateName: ['Prabhu Siddarth', 'psthetech'],
    url: `${SITE}/`,
    image: `${SITE}/portrait-cutout.webp`,
    jobTitle: PROFILE.role,
    affiliation: { '@type': 'CollegeOrUniversity', name: PROFILE.college },
    address: { '@type': 'PostalAddress', addressLocality: 'Coimbatore', addressCountry: 'IN' },
    knowsAbout: CAPABILITIES.flatMap((c) => c.items),
    sameAs: [PROFILE.github, PROFILE.linkedin, PROFILE.youtube, PROFILE.leetcode],
  };
  const f = FLAGSHIPS.find((x) => x.path === path);
  const graph: any[] = f
    ? [
        person,
        {
          '@type': 'SoftwareSourceCode',
          name: f.name,
          description: PAGES[path].description,
          url: url(path),
          codeRepository: f.repo,
          programmingLanguage: f.stack,
          author: { '@id': person['@id'] },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Prabhu Siddarth', item: `${SITE}/` },
            { '@type': 'ListItem', position: 2, name: f.name, item: url(path) },
          ],
        },
      ]
    : [
        person,
        { '@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}/`, name: 'Prabhu Siddarth', publisher: { '@id': person['@id'] } },
        { '@type': 'ProfilePage', url: `${SITE}/`, name: PAGES['/'].title, mainEntity: { '@id': person['@id'] } },
        { '@type': 'FAQPage', mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
      ];
  return { '@context': 'https://schema.org', '@graph': graph };
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** The <head> block the prerender writes for a route. */
export function headFor(path: string) {
  const p = PAGES[path];
  // Bump when the images change: LinkedIn, X and WhatsApp cache previews by URL.
  const img = `${SITE}${p.image}?v=2`;
  const meta = (attr: string, key: string, value: string) => `<meta ${attr}="${key}" content="${esc(value)}" />`;
  return [
    `<title>${esc(p.title)}</title>`,
    meta('name', 'description', p.description),
    meta('name', 'author', PROFILE.name),
    meta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1'),
    meta('name', 'theme-color', p.theme),
    `<link rel="canonical" href="${url(path)}" />`,
    meta('property', 'og:type', path === '/' ? 'profile' : 'website'),
    meta('property', 'og:site_name', 'Prabhu Siddarth'),
    meta('property', 'og:locale', 'en_IN'),
    meta('property', 'og:title', p.title),
    meta('property', 'og:description', p.description),
    meta('property', 'og:url', url(path)),
    meta('property', 'og:image', img),
    meta('property', 'og:image:width', '1200'),
    meta('property', 'og:image:height', '630'),
    meta('property', 'og:image:alt', p.title),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', p.title),
    meta('name', 'twitter:description', p.description),
    meta('name', 'twitter:image', img),
    `<script type="application/ld+json">${JSON.stringify(jsonLdFor(path)).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ');
}
