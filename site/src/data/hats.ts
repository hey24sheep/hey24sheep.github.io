// Design data for the pixel sheep, hats and Sheep Run perks. Safe to import in client scripts.

// 16×13 sheep; hats overlay rows 0–4. '.' is transparent.
export const BASE_ROWS = [
  '................',
  '................',
  '................',
  '................',
  '..gwwwwwwg.fff..',
  '.gwwwwwwwwwffff.',
  'gwwwwwwwwwwfeff.',
  'wwwwwwwwwwwffff.',
  'wwwwwwwwwwwwfff.',
  'gwwwwwwwwwwg....',
  '.gwwwwwwwwg.....',
  '..k.k...k.k.....',
  '..k.k...k.k.....',
];
export const LEGS_ALT = '...k.k...k.k....';
export const PALETTE: Record<string, string> = { w: '#F3EEFF', g: '#C9BFEA', f: '#0B0618', e: '#FFFFFF', k: '#0B0618' };

export interface Perk {
  label: string;
  lives?: number;
  starPts?: number;
  bugPts?: number;
  doubleJump?: boolean;
  gravityMul?: number;
  speedMul?: number;
}
export interface HatStyle { item: string; h: string; H: string; art: string[]; perk: Perk }

// Keyed by the hat name used in the README ("### Name · Class"), lower-cased.
export const HAT_STYLES: Record<string, HatStyle> = {
  architect: { item: 'Hard hat', h: '#F2C14E', H: '#C98F12', art: ['', '', '...........hhh..', '..........hhhhh.', '.........HHHHHHH'], perk: { label: 'Hard hat: survive one bug', lives: 2 } },
  founder: { item: 'Top hat', h: '#0B0618', H: '#F2C14E', art: ['..........hhhh..', '..........hhhh..', '..........hhhh..', '..........HHHH..', '.........hhhhhh.'], perk: { label: "Founder's eye: stars worth 10", starPts: 10 } },
  'flutter dev': { item: 'Beanie', h: '#FF9F45', H: '#D9731A', art: ['', '............h...', '...........hhh..', '..........hhhhh.', '..........HHHHH.'], perk: { label: 'Hot reload: double jump', doubleJump: true } },
  'white hat': { item: 'White hat', h: '#FFFFFF', H: '#FF7AA2', art: ['', '', '...........hhh..', '...........HHH..', '.........hhhhhhh'], perk: { label: 'Bug bounty: 2 pts per bug', bugPts: 2 } },
  maker: { item: 'Propeller cap', h: '#1CBDF5', H: '#FF7AA2', art: ['..........HHhHH.', '............h...', '...........hhh..', '..........hhhhh.', '..........HHHHH.'], perk: { label: 'Propeller: floaty jumps', gravityMul: 0.78 } },
  creative: { item: 'Beret', h: '#FF7AA2', H: '#C93D6B', art: ['', '', '............h...', '..........hhhhh.', '.........hhhhhhh'], perk: { label: 'Slow-mo: bugs move slower', speedMul: 0.85 } },
};
// Used for any hat name not listed above.
export const DEFAULT_HAT: HatStyle = { item: 'Cap', h: '#7EE2A8', H: '#3FA772', art: ['', '', '', '..........hhhh..', '..........hhhhHH'], perk: { label: 'Fresh hat: no perk yet' } };

export type Rarity = 'Legendary' | 'Rare' | 'Common' | 'Unique' | 'Guild';
export const rarityColor: Record<Rarity, string> = {
  Legendary: '#F2C14E', Rare: '#1CBDF5', Common: '#BDB3E0', Unique: '#FF7AA2', Guild: '#1CBDF5',
};

// Merge horizontal runs of same-colour pixels into one rect each.
export function pixelRuns(rows: string[], colors: Record<string, string>, x0 = 0) {
  const out: { x: number; y: number; w: number; fill: string }[] = [];
  rows.forEach((row, y) => {
    let x = x0;
    while (x < row.length) {
      const fill = colors[row[x]];
      if (!fill) { x++; continue; }
      let w = 1;
      while (x + w < row.length && row[x + w] === row[x]) w++;
      out.push({ x: x - x0, y, w, fill });
      x += w;
    }
  });
  return out;
}
