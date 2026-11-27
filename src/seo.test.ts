import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { PAGES, SITE, headFor, jsonLdFor } from './seo';

const paths = ['/', '/nexuscloud', '/sidd-ai', '/coedit', '/swara'];

describe('seo', () => {
  it('names one canonical host for every deployment', () => {
    expect(SITE).toBe('https://www.prabhusiddarth.dev');
    expect(headFor('/coedit')).toContain('<link rel="canonical" href="https://www.prabhusiddarth.dev/coedit" />');
    for (const p of paths) expect(headFor(p), p).not.toContain('vercel.app');
  });
  it('gives each page a unique title and description of a usable length', () => {
    expect(Object.keys(PAGES)).toEqual(paths);
    for (const key of ['title', 'description'] as const) expect(new Set(paths.map((p) => PAGES[p][key])).size).toBe(5);
    for (const p of paths) {
      expect(PAGES[p].title.length, p).toBeLessThanOrEqual(65);
      expect(PAGES[p].description.length, p).toBeGreaterThanOrEqual(70);
      expect(PAGES[p].description.length, p).toBeLessThanOrEqual(160);
    }
  });
  it('ships a share image for each page and a sitemap that lists them all', () => {
    const map = readFileSync('public/sitemap.xml', 'utf8');
    for (const p of paths) {
      expect(existsSync(`public${PAGES[p].image}`), p).toBe(true);
      expect(map).toContain(`<loc>${SITE}${p}</loc>`);
    }
    expect(readFileSync('public/robots.txt', 'utf8')).toContain(`Sitemap: ${SITE}/sitemap.xml`);
  });
  it('describes the person and each project as structured data', () => {
    const types = (p: string) => jsonLdFor(p)['@graph'].map((n: any) => n['@type']);
    expect(types('/')).toEqual(['Person', 'WebSite', 'ProfilePage', 'FAQPage']);
    expect(types('/swara')).toEqual(['Person', 'SoftwareSourceCode', 'BreadcrumbList']);
  });
});
