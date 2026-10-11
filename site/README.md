# hey24sheep.com

Astro source for [hey24sheep.com](https://hey24sheep.com).

## Content comes from the profile README

`profile/README.md` is a copy of the [hey24sheep/hey24sheep](https://github.com/hey24sheep/hey24sheep)
profile README. Edit the README there: on every push to its `main`, a workflow copies it here,
which triggers a rebuild and deploy. The format rules are in the comment at the top of the README.

The build parses it in `src/data/profile.ts` and adds live GitHub star counts (falls back gracefully
if the GitHub API is unreachable). A daily scheduled build keeps the star counts fresh.

Other files:

- `src/data/site.ts`: settings not in the README (name, commit count, base, contact email fallback).
- `src/data/hats.ts`: pixel art and Sheep Run perk for each hat name.
- `src/components/SheepRun.astro`: the Sheep Run mini-game (canvas).
- `src/styles/global.css`: styles and responsive breakpoints.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

Deploys via `.github/workflows/deploy.yml`
(repository Settings → Pages → Source must be **GitHub Actions**).
