// Single source of truth for the site's content.

export const site = {
  name: 'Heyramb Narayan Goyal',
  handle: 'Hey24sheep',
  url: 'https://hey24sheep.com',
  // TODO: set the public contact email. While empty, "Hire me" links to LinkedIn.
  email: '',
  title: 'Hey24sheep — Heyramb Narayan Goyal · Architect, Founder & many other hats',
  description:
    'Heyramb Narayan Goyal (Hey24sheep): technical architect, founder & CTO of Cuscato and Neettech, and open-source maintainer based in Delhi, India.',
  stats: { stars: 175, commits: '1.7K', ventures: 2, base: 'Delhi, IN' },
};

export const links = {
  github: 'https://github.com/hey24sheep',
  linkedin: 'https://linkedin.com/in/hey24sheep',
  discord: 'https://discord.com/invite/N4KjawqGs7',
  twitch: 'https://twitch.tv/hey24sheep',
  youtube: 'https://www.youtube.com/user/hey24sheep/videos',
  pubdev: 'https://pub.dev/publishers/hey24sheep.com/packages',
  marketplace: 'https://marketplace.visualstudio.com/publishers/Hey24sheep',
  stackoverflow: 'https://stackoverflow.com/users/5439109/hey24sheep',
  x: 'https://twitter.com/hey24sheep',
};

export const contactHref = site.email ? `mailto:${site.email}` : links.linkedin;

const gh = (repo: string) => `${links.github}/${repo}`;

// Pixel art: 16×13 sheep, hats overlay rows 0–4. '.' is transparent.
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
export interface Loot { name: string; url: string; tag: string; tagColor: string }
export interface Hat {
  name: string;
  item: string;
  cls: string;
  h: string;
  H: string;
  art: string[];
  desc: string;
  abilities: string[];
  loot: Loot[];
  perk: Perk;
}

const star = (n: number) => ({ tag: `★ ${n}`, tagColor: '#F2C14E' });

export const hats: Hat[] = [
  {
    name: 'Architect', item: 'Hard hat', cls: 'Technical Architect', h: '#F2C14E', H: '#C98F12',
    art: ['', '', '...........hhh..', '..........hhhhh.', '.........HHHHHHH'],
    desc: 'Software architecture, database design and cloud solutions on Azure and .NET — plus running the teams and SDLC that ship them. Today at FeliZeek Technologies; before that at Buildsys.',
    abilities: ['Azure', '.NET / C#', 'MS SQL', 'Azure DevOps', 'Node.js', 'Team leadership'],
    loot: [
      { name: 'azure-flutter-tasks', url: gh('azure-flutter-tasks'), ...star(102) },
      { name: 'azure-environment-variables', url: gh('azure-environment-variables'), ...star(2) },
      { name: 'dotnetkiteconnect', url: gh('dotnetkiteconnect'), ...star(1) },
    ],
    perk: { label: 'Hard hat: survive one bug', lives: 2 },
  },
  {
    name: 'Founder', item: 'Top hat', cls: 'Founder & CTO', h: '#0B0618', H: '#F2C14E',
    art: ['..........hhhh..', '..........hhhh..', '..........hhhh..', '..........HHHH..', '.........hhhhhh.'],
    desc: 'Founder & CTO of Cuscato — branded storefronts for orders and bookings, zero commission — and of Neettech, an open, anonymous social world.',
    abilities: ['Product', 'SaaS', 'Architecture', 'Shipping'],
    loot: [
      { name: 'Cuscato', url: 'https://cuscato.com', tag: 'Founder & CTO', tagColor: '#FF7AA2' },
      { name: 'Neettech', url: 'http://neettech.in', tag: 'Founder & CTO', tagColor: '#FF7AA2' },
    ],
    perk: { label: "Founder's eye: stars worth 10", starPts: 10 },
  },
  {
    name: 'Flutter dev', item: 'Beanie', cls: 'Mobile Developer', h: '#FF9F45', H: '#D9731A',
    art: ['', '............h...', '...........hhh..', '..........hhhhh.', '..........HHHHH.'],
    desc: 'Flutter packages on pub.dev that other apps build on, and mobile apps for Android and Windows Phone.',
    abilities: ['Flutter', 'Dart', 'Android'],
    loot: [
      { name: 'uiblock', url: gh('uiblock'), ...star(16) },
      { name: 'backdrop_modal_route', url: gh('backdrop_modal_route'), ...star(12) },
    ],
    perk: { label: 'Hot reload: double jump', doubleJump: true },
  },
  {
    name: 'White hat', item: 'White hat', cls: 'Security Researcher', h: '#FFFFFF', H: '#FF7AA2',
    art: ['', '', '...........hhh..', '...........HHH..', '.........hhhhhhh'],
    desc: 'Finding vulnerabilities and disclosing them responsibly — freelance security research on the side.',
    abilities: ['Vulnerability testing', 'Responsible disclosure'],
    loot: [
      { name: 'Justdial vulnerability write-up', url: 'https://hightechunveil.blogspot.com/2016/04/justdialcom-hacked-by-hey24sheep.html', tag: 'Write-up', tagColor: '#BDB3E0' },
    ],
    perk: { label: 'Bug bounty: 2 pts per bug', bugPts: 2 },
  },
  {
    name: 'Maker', item: 'Propeller cap', cls: 'Hardware Tinkerer', h: '#1CBDF5', H: '#FF7AA2',
    art: ['..........HHhHH.', '............h...', '...........hhh..', '..........hhhhh.', '..........HHHHH.'],
    desc: 'Arduino, Raspberry Pi and microcontrollers — like twitch_sheep, which lets Twitch chat drive lights, OBS and IoT devices. Plus scripts and research for Console Tuner.',
    abilities: ['Arduino', 'Raspberry Pi', 'IoT', 'TypeScript'],
    loot: [
      { name: 'twitch_sheep', url: gh('twitch_sheep'), ...star(1) },
      { name: 'Console Tuner', url: 'https://www.consoletuner.com/', tag: 'Scripts', tagColor: '#BDB3E0' },
    ],
    perk: { label: 'Propeller: floaty jumps', gravityMul: 0.78 },
  },
  {
    name: 'Creative', item: 'Beret', cls: 'Creative Coder & Streamer', h: '#FF7AA2', H: '#C93D6B',
    art: ['', '', '............h...', '..........hhhhh.', '.........hhhhhhh'],
    desc: 'GFX/VFX, procedural L-system trees and a Godot game that never ends — and streaming games on Twitch and YouTube.',
    abilities: ['p5.js', 'Godot', 'GFX / VFX', 'Streaming'],
    loot: [
      { name: 'LSystem_Fractal_Trees_P5', url: 'https://hey24sheep.github.io/LSystem_Fractal_Trees_P5/', ...star(15) },
      { name: 'Never-Ending-Game', url: gh('Never-Ending-Game'), ...star(1) },
    ],
    perk: { label: 'Slow-mo: bugs move slower', speedMul: 0.85 },
  },
];

export type Rarity = 'Legendary' | 'Rare' | 'Common' | 'Unique' | 'Guild';
export const rarityColor: Record<Rarity, string> = {
  Legendary: '#F2C14E', Rare: '#1CBDF5', Common: '#BDB3E0', Unique: '#FF7AA2', Guild: '#1CBDF5',
};
export interface Item {
  rarity: Rarity;
  name: string;
  role?: string;
  status?: 'Previous' | 'Retired';
  desc: string;
  meta: string;
  links?: { label: string; url: string }[];
}

export const inventory: { id: string; label: string; hint: string; items: Item[] }[] = [
  {
    id: 'oss', label: 'Open source', hint: 'Rarity = GitHub stars: Legendary 100+ · Rare 10+',
    items: [
      { rarity: 'Legendary', name: 'azure-flutter-tasks', desc: 'Build and deploy Flutter apps with the latest Flutter build tasks for Azure DevOps Pipelines.', meta: '★ 102 · 23 forks · JavaScript', links: [{ label: 'GitHub', url: gh('azure-flutter-tasks') }, { label: 'Marketplace', url: links.marketplace }] },
      { rarity: 'Rare', name: 'uiblock', desc: 'The easiest way to block and unblock UI in your Flutter apps.', meta: '★ 16 · Dart', links: [{ label: 'GitHub', url: gh('uiblock') }, { label: 'pub.dev', url: links.pubdev }] },
      { rarity: 'Rare', name: 'LSystem_Fractal_Trees_P5', desc: 'Procedural generation of fractal plants using L-systems in p5.js.', meta: '★ 15 · JavaScript', links: [{ label: 'Play', url: 'https://hey24sheep.github.io/LSystem_Fractal_Trees_P5/' }, { label: 'GitHub', url: gh('LSystem_Fractal_Trees_P5') }] },
      { rarity: 'Rare', name: 'backdrop_modal_route', desc: 'Flutter plugin to open a backdrop modal route with minimal code and dynamic content.', meta: '★ 12 · Dart', links: [{ label: 'GitHub', url: gh('backdrop_modal_route') }] },
      { rarity: 'Common', name: 'azure-environment-variables', desc: 'Azure DevOps pipeline task to create environment variables with custom values and paths.', meta: '★ 2 · JavaScript', links: [{ label: 'GitHub', url: gh('azure-environment-variables') }] },
      { rarity: 'Common', name: 'dotnetkiteconnect', desc: '.NET library for the Kite Connect trading API.', meta: '★ 1 · C#', links: [{ label: 'GitHub', url: gh('dotnetkiteconnect') }] },
      { rarity: 'Common', name: 'twitch_sheep', desc: 'Lets Twitch chat control your home, OBS, IoT devices and lights.', meta: '★ 1 · TypeScript', links: [{ label: 'GitHub', url: gh('twitch_sheep') }] },
      { rarity: 'Common', name: 'Never-Ending-Game', desc: 'A Godot 2D game with one twist: it never ends. Neither does its to-do list.', meta: '★ 1 · GDScript', links: [{ label: 'GitHub', url: gh('Never-Ending-Game') }] },
    ],
  },
  {
    id: 'mine', label: 'My projects', hint: 'Things I founded and built',
    items: [
      { rarity: 'Unique', name: 'Cuscato', role: 'Founder & CTO', desc: 'Your own branded storefront for orders and bookings — for retailers, salons and studios, restaurants and cafés, and event venues. One flat monthly price, zero commission.', meta: 'Storefronts · bookings · GST invoices', links: [{ label: 'cuscato.com', url: 'https://cuscato.com' }] },
      { rarity: 'Unique', name: 'Neettech', role: 'Founder & CTO', desc: 'An open, anonymous social world.', meta: 'Social platform', links: [{ label: 'neettech.in', url: 'http://neettech.in' }] },
      { rarity: 'Common', name: 'Text Is Speech', role: 'Creator', status: 'Retired', desc: 'A feature-rich text-to-speech app for Android and Windows Phone 8 / 8.1.', meta: 'Android · Windows Phone' },
      { rarity: 'Common', name: 'Height Predictor', role: 'Creator', status: 'Retired', desc: 'A height-prediction app for Windows Phone 8 / 8.1.', meta: 'Windows Phone' },
    ],
  },
  {
    id: 'corp', label: 'Corporate', hint: 'Where I work and have worked',
    items: [
      { rarity: 'Guild', name: 'FeliZeek Technologies', role: 'Technical Architect', desc: 'Software architecture, database design and cloud solutions across the company’s software and web projects, and the teams that build them.', meta: 'Architecture · Azure · .NET', links: [{ label: 'felizeek.com', url: 'https://www.felizeek.com/' }] },
      { rarity: 'Guild', name: 'Buildsys', role: 'Sr. Software Developer', status: 'Previous', desc: 'Team management and architecture, through the full SDLC to client handling.', meta: 'Teams · SDLC · Clients', links: [{ label: 'LinkedIn', url: 'https://in.linkedin.com/company/buildsysinc' }] },
      { rarity: 'Guild', name: 'Console Tuner', role: 'Moderator · script creator · researcher', desc: 'Scripts, research and moderation for the Console Tuner community.', meta: 'Scripting · research', links: [{ label: 'consoletuner.com', url: 'https://www.consoletuner.com/' }] },
      { rarity: 'Guild', name: 'Freelance', role: 'Security researcher & consultant', desc: 'Vulnerability testing with responsible disclosure, plus software, design and consulting projects.', meta: 'Security · consulting', links: [{ label: 'Freelancer', url: 'https://www.freelancer.com/u/hey24sheep' }] },
    ],
  },
];

// Unlocked in Sheep Run at these scores.
export const gameLoot = [
  { id: 'uiblock', name: 'uiblock ★16', at: 5, color: '#1CBDF5', url: gh('uiblock') },
  { id: 'backdrop', name: 'backdrop_modal_route ★12', at: 12, color: '#1CBDF5', url: gh('backdrop_modal_route') },
  { id: 'lsystem', name: 'L-system trees ★15', at: 20, color: '#1CBDF5', url: 'https://hey24sheep.github.io/LSystem_Fractal_Trees_P5/' },
  { id: 'twitch', name: 'twitch_sheep', at: 30, color: '#BDB3E0', url: gh('twitch_sheep') },
  { id: 'aft', name: 'azure-flutter-tasks ★102', at: 45, color: '#F2C14E', url: gh('azure-flutter-tasks') },
  { id: 'neettech', name: 'Neettech', at: 60, color: '#FF7AA2', url: 'http://neettech.in' },
  { id: 'cuscato', name: 'Cuscato', at: 80, color: '#FF7AA2', url: 'https://cuscato.com' },
];

export const ticker = [
  'Cuscato — storefronts & bookings, zero commission',
  'azure-flutter-tasks — 102 stars on GitHub',
  'uiblock & backdrop_modal_route on pub.dev',
  'Neettech — an open, anonymous social world',
  'Streams on Twitch & YouTube',
  'Stay smart, stay creative',
];

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
