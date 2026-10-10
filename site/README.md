# hey24sheep.com

Astro source for [hey24sheep.com](https://hey24sheep.com).

- `src/data/content.ts`: all content (hats, inventory, links, stats). Edit this to update the site.
- `src/components/SheepRun.astro`: the Sheep Run mini-game (canvas).
- `src/styles/global.css`: styles and responsive breakpoints.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

Pushes to `main` build and deploy via `.github/workflows/deploy.yml`
(repository Settings → Pages → Source must be **GitHub Actions**).
