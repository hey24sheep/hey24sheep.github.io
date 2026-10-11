import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { handle, hats, inventory, allLinks, email, personDescription } from '../data/profile';

// https://llmstxt.org — a plain summary for AI assistants and crawlers, built from the profile README.
export const GET: APIRoute = () => {
  const link = (name: string, url?: string) => (url ? `[${name}](${url})` : name);
  const group = (id: string) => inventory.find((g) => g.id === id)?.items ?? [];
  const lines = [
    `# ${site.name} (${handle})`,
    '',
    `> ${personDescription}`,
    '',
    `- Website: ${site.url}`,
    ...(email ? [`- Email: ${email}`] : []),
    `- Location: ${site.base.replace(', IN', ', India')}`,
    `- Expertise: ${site.expertise.join(', ')}`,
    '',
    '## Roles',
    ...hats.map((h) => `- ${h.name} (${h.cls}): ${h.desc}`),
    '',
    '## Ventures and projects',
    ...group('mine').map((i) => `- ${link(i.name, i.links[0]?.url)}${i.role ? ` — ${i.role}` : ''}${i.status ? ` (${i.status})` : ''}: ${i.desc}`),
    '',
    '## Open source',
    ...group('oss').map((i) => `- ${link(i.name, i.links[0]?.url)}${i.stars >= 0 ? ` (★ ${i.stars})` : ''}: ${i.desc}`),
    '',
    '## Experience',
    ...group('corp').map((i) => `- ${i.role} at ${link(i.name, i.links[0]?.url)}${i.status ? ` (${i.status})` : ''}: ${i.desc}`),
    '',
    '## Profiles',
    ...allLinks.filter((l) => /^https?:/.test(l.url)).map((l) => `- ${link(l.label, l.url)}`),
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
