import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { experience, years, stats } from '../data/profile';

// Read by the profile README's "experience" badge (shields.io dynamic JSON), so the number counts up by itself.
export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({ experience, years, since: Number(site.careerStart.slice(0, 4)), stars: stats.stars }),
    { headers: { 'Content-Type': 'application/json; charset=utf-8' } },
  );
