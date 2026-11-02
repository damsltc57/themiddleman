# themiddleman21

Site vitrine de bijoux personnalisés, migré vers Next.js App Router et React. Node.js 20.9 ou supérieur.

## Développement

```sh
npm ci
npm run dev
```

Ouvrir http://127.0.0.1:8096/ (y compris `?hero=blender` pour l’aperçu Blender).

## Production

```sh
npm run build
npm start
```

## Structure

- `app/page.jsx` : contenu React rendu côté serveur.
- `app/layout.jsx` : langue, métadonnées, ordre des styles et préparation de l’entrée du hero.
- `app/site-scripts.jsx` : chargement des modules d’interaction après hydratation.
- `public/app.js` : navigation, formulaire local, GSAP et Lenis.
- `public/central-hero.css` : dernière feuille de styles du site.
- `public/motion-edition.js` : animations éditoriales et galerie.
- `public/jewel.js` : vue Three.js, chargée à l’approche de la section.
- `public/assets/`, `public/vendor/` : médias et bibliothèques auto-hébergées.
- `source/blender/` : sources Blender.
- `source/legacy/index.html` : sauvegarde HTML avant migration, non servie par Next.js.
- `public/gallery-proposals.html` : anciennes études visuelles accessibles à leur URL.

Les interactions DOM existantes restent dans des modules navigateur afin de conserver les animations. Le contenu est désormais modifié dans les composants React ; ne pas modifier l’archive HTML. Aucune API de formulaire : le brief reste local au navigateur.
