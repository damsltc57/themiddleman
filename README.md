# themiddleman21

Site vitrine de bijoux personnalisés, HTML/CSS/JavaScript. Ce dépôt est désormais la source de travail principale.

## Lancer le site

```sh
npm start
```

Ou `python3 -m http.server 8096 --bind 127.0.0.1` depuis la racine. Ouvrir http://127.0.0.1:8096/. Python 3 suffit ; les bibliothèques front-end sont incluses dans `vendor/`, aucune installation npm nécessaire.

## Structure

- `index.html` : page principale.
- `app.js` : navigation, animations GSAP, transition du hero et Lenis.
- `central-hero.css` : styles finaux, dernière feuille de la cascade.
- `motion-edition.js` : carrousel de photos et nom animé au scroll.
- `jewel.js` : modèle Blender chargé dans Three.js, rotation et assemblage.
- `assets/` : photos, polices, rendus et GLB compressé Draco.
- `source/blender/` : scène Blender modifiable et script de reconstruction.
- `gallery-proposals.html` : propositions de galerie conservées pour référence.
- `DESIGN.md`, `PRODUCT.md` : direction visuelle et contexte produit.

Le hero utilise l’image détourée approuvée. La galerie « À leur image. » utilise les photographies réelles fournies. La vue 3D est une interprétation depuis une photo ; dimensions et dos ne sont pas des données de fabrication. Le formulaire prépare un brief local, sans envoi serveur.

L’ancien dossier `outputs/sur-mesure-cinema` est une archive et ne doit plus recevoir les modifications.
