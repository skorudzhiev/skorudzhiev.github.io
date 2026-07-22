# skorudzhiev.github.io

Personal website for Stoyan Korudzhiev, built with Astro and deployed as a static GitHub Pages site.

## Local development

```sh
npm install
npm run dev
```

Run the production checks and build with:

```sh
npm run build
```

The project inquiry form falls back to a prepared email when `PUBLIC_FORMSPREE_ENDPOINT` is not set. To enable direct submissions, copy `.env.example` to `.env` and provide a Formspree endpoint. Add the same value as a GitHub Actions secret for production.
