# Projet themiddleman21

Travailler dans ce dépôt, source principale. Ne plus modifier l’ancien dossier outputs/sur-mesure-cinema.

Next.js App Router : `npm run dev` lance le site sur 8096. `npm run build` puis `npm start` pour la production. Page React dans app/page.jsx, layout et métadonnées dans app/layout.jsx. Les scripts DOM historiques sont chargés après hydratation via app/site-scripts.jsx. Bibliothèques locales dans public/vendor/. Styles finaux dans public/central-hero.css ; préserver l’ordre des feuilles dans le layout. Lire DESIGN.md et PRODUCT.md avant un changement visuel. Conserver les photos originales et les animations GSAP/Lenis, avec le mode mouvement réduit. source/legacy/index.html est une archive, pas la page active.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
