// Writes one HTML file per route into dist/, plus 404.html.
import { readFileSync, rmSync, writeFileSync } from 'node:fs';

const { render, headFor, PAGES } = await import('../dist-ssr/entry-server.js');
const template = readFileSync('dist/index.html', 'utf8');
const HEAD = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
if (!HEAD.test(template) || !template.includes('<div id="root"></div>')) throw new Error('index.html lost its prerender markers');

const page = (head, body) => template.replace(HEAD, () => head).replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);

for (const path of Object.keys(PAGES)) {
  const file = path === '/' ? 'dist/index.html' : `dist${path}.html`;
  writeFileSync(file, page(headFor(path), render(path)));
  console.log('prerendered', file);
}
writeFileSync('dist/404.html', page('<title>Not found | Prabhu Siddarth</title>\n    <meta name="robots" content="noindex" />', render('/404')));
rmSync('dist-ssr', { recursive: true, force: true });
