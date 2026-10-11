import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hey24sheep.com',
  redirects: {
    '/projects': '/#inventory',
  },
});
