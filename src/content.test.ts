import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { FLAGSHIPS, PATH, PROFILE, WHOAMI, WORKS } from './content';

describe('content', () => {
  it('lists four flagships in order, each with before and after', () => {
    expect(FLAGSHIPS.map((f) => f.slug)).toEqual(['nexuscloud', 'sidd-ai', 'coedit', 'swara']);
    expect(FLAGSHIPS.map((f) => f.index)).toEqual(['01', '02', '03', '04']);
    expect(FLAGSHIPS.every((f) => f.before && f.after)).toBe(true);
  });
  it('links the two deployed product sites over https', () => {
    expect(FLAGSHIPS.filter((f) => f.site).map((f) => [f.slug, f.site])).toEqual([
      ['coedit', 'https://coedit-website.vercel.app'],
      ['swara', 'https://swaraapp-website.vercel.app'],
    ]);
  });
  it('uses the approved headline and drops the unproven claim', () => {
    expect(PROFILE.headline).toBe('AI Backend Engineer in the making. B.Tech IT, 2028.');
    expect(JSON.stringify({ FLAGSHIPS, WORKS, PATH })).not.toMatch(/organisations/);
  });
  it('has no organisation-count claim on any page', () => {
    for (const f of readdirSync('src/pages')) expect(readFileSync(`src/pages/${f}`, 'utf8'), f).not.toMatch(/organi[sz]ations/);
  });
  it('ships the sidd-ai demo video and poster', () => {
    const v = FLAGSHIPS.find((f) => f.slug === 'sidd-ai')!.video!;
    expect(existsSync(`public${v.src}`)).toBe(true);
    expect(existsSync(`public${v.poster}`)).toBe(true);
  });
  it('keeps four non-flagship works', () => {
    expect(WORKS.filter((w) => !w.route).map((w) => w.name)).toEqual(['Return Risk Scorer', 'PyRAG', 'RetinaFace Inference', 'AlgoMentor']);
  });
  it('serves the same whoami data the home page prints', () => {
    expect(JSON.parse(readFileSync('public/whoami.json', 'utf8'))).toEqual(WHOAMI);
  });
  it('keeps the NexusCloud lead role off the whoami card', () => {
    expect(JSON.stringify(WHOAMI)).not.toMatch(/nexus|lead|team/i);
  });
});
