import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hey24sheep.com',
  redirects: {
    '/projects': '/#inventory',
    // Printed as a watermark on every videoforge render.
    '/videoforge': 'https://github.com/hey24sheep/videoforge',
  },
});
