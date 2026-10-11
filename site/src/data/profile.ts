// Build-time only: turns the profile README (profile/README.md) into the site's content,
// adding live GitHub star counts. See the comment at the top of the README for its format.
import { marked, type Token, type Tokens } from 'marked';
import readme from '../../profile/README.md?raw';
import { site } from './site';
import { DEFAULT_HAT, HAT_STYLES, rarityColor, type HatStyle, type Rarity } from './hats';

export interface Link { label: string; url: string }
export interface Loot extends Link { tag: string; tagColor: string }
export interface Hat extends HatStyle { name: string; cls: string; desc: string; abilities: string[]; loot: Loot[] }
export interface Item { rarity: Rarity; name: string; role?: string; status?: string; desc: string; meta: string; stars: number; links: Link[] }
export interface Group { id: string; label: string; hint: string; items: Item[] }

const decode = (s: string) =>
  s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');

function text(tokens: Token[] = []): string {
  return tokens
    .map((t) => {
      if ('tokens' in t && t.tokens) return text(t.tokens);
      if (t.type === 'br') return ' ';
      return 'text' in t ? decode(t.text) : '';
    })
    .join('');
}

function links(tokens: Token[] = []): Link[] {
  const out: Link[] = [];
  const walk = (ts: Token[]) =>
    ts.forEach((t) => {
      if (t.type === 'link') out.push({ label: text((t as Tokens.Link).tokens).trim(), url: (t as Tokens.Link).href });
      else if ('tokens' in t && t.tokens) walk(t.tokens);
    });
  walk(tokens);
  return out;
}

// Split the README into its intro (before the first "##") and "##" sections.
let handle = 'Hey24sheep';
const intro: Token[] = [];
const sections: { title: string; tokens: Token[] }[] = [];
for (const t of marked.lexer(readme)) {
  if (t.type === 'heading' && (t as Tokens.Heading).depth === 1) handle = text((t as Tokens.Heading).tokens).trim();
  else if (t.type === 'heading' && (t as Tokens.Heading).depth === 2) sections.push({ title: text((t as Tokens.Heading).tokens), tokens: [] });
  else (sections.at(-1)?.tokens ?? intro).push(t);
}
const section = (re: RegExp) => sections.find((s) => re.test(s.title))?.tokens ?? [];
const paragraphs = (ts: Token[]) => ts.filter((t): t is Tokens.Paragraph => t.type === 'paragraph');
const fail = (msg: string): never => { throw new Error(`[profile README] ${msg}`); };

const introParas = paragraphs(intro);
const taglinePara = introParas.find((p) => p.tokens.length === 1 && p.tokens[0].type === 'strong') ?? fail('missing the bold tagline under the title');
export const tagline = text(taglinePara.tokens).split('|').map((s) => s.trim()).filter(Boolean);
export const bio = text(introParas.find((p) => p !== taglinePara)?.tokens).trim();
export { handle };

type Row = Record<string, { text: string; links: Link[] }>;
function table(re: RegExp): Row[] {
  const t = section(re).find((x): x is Tokens.Table => x.type === 'table');
  if (!t) return [];
  const keys = t.header.map((h) => text(h.tokens).trim().toLowerCase());
  return t.rows.map((row) => Object.fromEntries(row.map((cell, i) => [keys[i], { text: text(cell.tokens).trim(), links: links(cell.tokens) }])));
}

// Live GitHub stats (needs network at build time; CI passes GITHUB_TOKEN).
type Repo = { name: string; stargazers_count: number; forks_count: number; language: string | null; fork: boolean };
async function fetchRepos(): Promise<Map<string, Repo> | null> {
  try {
    const headers: Record<string, string> = { Accept: 'application/vnd.github+json', 'User-Agent': 'hey24sheep.com-build' };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const res = await fetch(`https://api.github.com/users/${site.githubUser}/repos?per_page=100&type=owner`, { headers, signal: AbortSignal.timeout(10_000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const list = (await res.json()) as Repo[];
    return new Map(list.map((r) => [r.name.toLowerCase(), r]));
  } catch (e) {
    console.warn(`[profile] GitHub stats unavailable (${(e as Error).message}); building without live star counts.`);
    return null;
  }
}
const repos = await fetchRepos();
const repoFor = (url: string) => {
  try {
    const u = new URL(url);
    const parts = u.pathname.split('/').filter(Boolean);
    const name = u.hostname === 'github.com' && parts[0]?.toLowerCase() === site.githubUser ? parts[1]
      : u.hostname === `${site.githubUser}.github.io` ? parts[0] : undefined;
    return name ? repos?.get(name.toLowerCase()) : undefined;
  } catch { return undefined; }
};
const host = (url: string) => {
  try {
    const h = new URL(url).hostname.replace(/^www\./, '');
    return h.includes('linkedin.') ? 'LinkedIn' : h;
  } catch { return 'Visit'; }
};

// Inventory
const oss: Item[] = table(/open source/i).map((r) => {
  const main = r.project?.links[0];
  const repo = main ? repoFor(main.url) : undefined;
  const stars = repo?.stargazers_count ?? -1;
  const forks = repo?.forks_count ?? 0;
  return {
    rarity: stars >= 100 ? 'Legendary' : stars >= 10 ? 'Rare' : 'Common',
    name: r.project?.text ?? '',
    desc: r.about?.text ?? '',
    meta: [stars >= 0 && `★ ${stars}`, forks > 1 && `${forks} forks`, repo?.language].filter(Boolean).join(' · '),
    stars,
    links: [...(main ? [{ label: main.url.includes('github.com') ? 'GitHub' : 'Visit', url: main.url }] : []), ...(r.links?.links ?? [])],
  };
});
const projectRow = (r: Row, rarity: (role: string) => Rarity): Item => {
  const role = r.role?.text ?? '';
  const name = r.project ?? r.company;
  return {
    rarity: rarity(role),
    name: name?.text ?? '',
    role: role || undefined,
    status: r.status?.text || undefined,
    desc: r.about?.text ?? '',
    meta: '',
    stars: -1,
    links: (name?.links ?? []).map((l) => ({ label: host(l.url), url: l.url })),
  };
};
const mine = table(/my projects|ventures/i).map((r) => projectRow(r, (role) => (/founder/i.test(role) ? 'Unique' : 'Common')));
const corp = table(/corporate|work|experience/i).map((r) => projectRow(r, () => 'Guild'));
if (!oss.length && !mine.length && !corp.length) fail('no Open source / My projects / Corporate tables found');

export const inventory: Group[] = [
  { id: 'oss', label: 'Open source', hint: 'Rarity = GitHub stars: Legendary 100+ · Rare 10+', items: oss },
  { id: 'mine', label: 'My projects', hint: 'Things I founded and built', items: mine },
  { id: 'corp', label: 'Corporate', hint: 'Where I work and have worked', items: corp },
].filter((g) => g.items.length);

// Hats: "### Name · Class", a description paragraph, a paragraph of `abilities`, a list of loot links.
const ventureByUrl = new Map(mine.flatMap((m) => m.links.map((l) => [l.url, m] as const)));
const hatDrafts: { name: string; cls: string; desc: string; abilities: string[]; loot: Loot[] }[] = [];
for (const t of section(/hats/i)) {
  const cur = hatDrafts.at(-1);
  if (t.type === 'heading' && (t as Tokens.Heading).depth === 3) {
    const [name, cls] = text((t as Tokens.Heading).tokens).split(/\s+[·|—–]\s+/).map((s) => s.trim());
    hatDrafts.push({ name, cls: cls || name, desc: '', abilities: [], loot: [] });
  } else if (cur && t.type === 'paragraph') {
    const ts = (t as Tokens.Paragraph).tokens;
    const codes = ts.filter((x): x is Tokens.Codespan => x.type === 'codespan');
    if (codes.length && !text(ts.filter((x) => x.type !== 'codespan')).trim()) cur.abilities = codes.map((c) => decode(c.text));
    else cur.desc = [cur.desc, text(ts).trim()].filter(Boolean).join(' ');
  } else if (cur && t.type === 'list') {
    for (const li of (t as Tokens.List).items) {
      const l = links(li.tokens)[0];
      if (!l) continue;
      const note = text(li.tokens).replace(l.label, '').replace(/^[\s—–:-]+/, '').trim();
      const repo = repoFor(l.url);
      const venture = ventureByUrl.get(l.url);
      const tag = repo ? { tag: `★ ${repo.stargazers_count}`, tagColor: '#F2C14E' }
        : venture?.role ? { tag: venture.role, tagColor: '#FF7AA2' }
        : { tag: note, tagColor: '#BDB3E0' };
      cur.loot.push({ ...l, ...tag });
    }
  }
}
if (!hatDrafts.length) fail('missing the "## … hats" section with "### Name · Class" hats');
export const hats: Hat[] = hatDrafts.map((h) => ({ ...(HAT_STYLES[h.name.toLowerCase()] ?? DEFAULT_HAT), ...h }));

// Links ("Reach me") and contact.
export const allLinks = section(/reach|contact|links/i).flatMap((t) => (t.type === 'paragraph' ? links((t as Tokens.Paragraph).tokens) : []));
const byLabel = (re: RegExp) => allLinks.find((l) => re.test(l.label));
const mail = allLinks.find((l) => l.url.startsWith('mailto:'));
export const contactHref = mail?.url ?? (site.email ? `mailto:${site.email}` : byLabel(/linkedin/i)?.url ?? site.url);
export const partyLinks = [/linkedin/i, /github/i, /discord/i, /twitch/i].map(byLabel).filter((l): l is Link => !!l);
const isExternal = (url: string) => { try { return /^https?:$/.test(new URL(url).protocol) && new URL(url).hostname !== new URL(site.url).hostname; } catch { return false; } };
export const footerLinks = allLinks.filter((l) => !partyLinks.includes(l) && isExternal(l.url));
export const sameAs = allLinks.filter((l) => isExternal(l.url)).map((l) => l.url);
export const signoff = text(paragraphs(sections.at(-1)?.tokens ?? []).find((p) => p.tokens.length === 1 && p.tokens[0].type === 'em')?.tokens) || 'Stay smart, stay creative';

// Player card and ticker.
const ventures = mine.filter((m) => m.rarity === 'Unique');
const totalStars = repos ? [...repos.values()].filter((r) => !r.fork).reduce((n, r) => n + r.stargazers_count, 0) : site.fallbackStars;
export const stats = { stars: totalStars, commits: site.commits, ventures: ventures.length, base: site.base };
export const role = [corp.find((c) => !c.status)?.role, ventures[0]?.role].filter(Boolean).join(' · ');
const short = (s: string) => s.split(/\s[—–]\s|\. /)[0].replace(/\.$/, '');
const topOss = [...oss].filter((o) => o.stars >= 0).sort((a, b) => b.stars - a.stars);
export const ticker = [
  ...ventures.map((v) => `${v.name} — ${short(v.desc)}`),
  ...topOss.slice(0, 2).map((o) => `${o.name} — ${o.stars} stars on GitHub`),
  ...(byLabel(/twitch/i) || byLabel(/youtube/i) ? ['Streams on Twitch & YouTube'] : []),
  signoff.replace(/!$/, ''),
];

// Sheep Run loot: top open source by stars (rarest last), then ventures, at rising scores.
const thresholds = [5, 12, 20, 30, 45, 60, 80, 100, 125, 150];
const ossPick = (topOss.length ? topOss : oss).slice(0, 5).reverse();
export const gameLoot = [...ossPick, ...[...ventures].reverse()].slice(0, thresholds.length).map((it, i) => ({
  id: it.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  name: it.stars >= 0 ? `${it.name} ★${it.stars}` : it.name,
  at: thresholds[i],
  color: rarityColor[it.rarity],
  url: it.links[0]?.url ?? site.url,
}));

export const title = `${handle} — ${site.name} · ${tagline.join(', ')}`;
export const description = `${site.name} (${handle}): ${bio}`.slice(0, 160);
