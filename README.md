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

The project inquiry form uses the dedicated Formspree endpoint configured in the page. `PUBLIC_FORMSPREE_ENDPOINT` can override it for local or alternate deployments; if no endpoint is available, the form falls back to a prepared email.
