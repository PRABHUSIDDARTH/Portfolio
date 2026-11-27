import { describe, expect, it } from 'vitest';
import { WORKS } from './content';
import { WORK_IMAGES } from './workImages';

describe('work grid art', () => {
  it('gives every project a picture and its own animation', () => {
    const missing = WORKS.filter((w) => {
      const art = WORK_IMAGES[w.name];
      const moves = art?.hoverSrc ?? art?.overlay?.match(/class="a-/) ?? art?.svg?.match(/class="a-/);
      return !(art && (art.src || art.svg) && moves);
    }).map((w) => w.name);
    expect(missing).toEqual([]);
  });
});
