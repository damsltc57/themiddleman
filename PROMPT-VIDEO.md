# Film du hero à générer

Entrée : utiliser assets/hero-cinema.jpg comme image de départ en mode image-vers-vidéo. Le pendentif doit rester strictement identique ; la photo originale peut servir de seconde référence de produit.

Format : 16:9, 1920×1080 minimum, idéalement 4K, 8 à 10 secondes, 24 ou 25 fps, sans audio. Export MP4. Générer aussi une variante 9:16 si possible, avec le pendentif entier dans la moitié inférieure et le haut sombre pour le texte.

## Prompt à copier

Create a photorealistic luxury jewelry campaign film from the supplied reference image. Preserve the exact identity and geometry of the pavé 93 pendant, its two digits, bail, gemstone settings and twisted rope chain throughout every frame. The pendant rests on matte black silk. The jewelry remains solid and stationary; no bending, morphing, melting or changing stones.

One continuous 8–10 second shot. A physical camera performs a very slow lateral dolly of only a few centimeters, creating subtle real parallax between the pendant, chain and silk folds. A large studio strip light slowly moves overhead, producing a restrained sweep of champagne reflections across the gold edges and tiny natural flashes from the gemstone facets. The silk moves almost imperceptibly at its outer edges. Motion must be clearly visible in the lighting and parallax, not a digital zoom or a moving flat photograph.

Composition: the entire pendant stays readable in the right half of the 16:9 frame, at roughly 65–75 percent of the frame width. Keep the left 40 percent dark, calm and uncluttered for website typography. Maintain stable exposure, deep blacks, pale champagne metal and realistic white gemstones. The pendant remains sharply focused; background softly out of focus. Elegant, slow, tactile high-jewelry cinematography, 85mm macro lens, physically plausible reflections, no excessive glitter.

Start and finish with very similar camera positions and lighting for a seamless loop. No cuts, no transitions, no fade to black. No text, no logo, no watermark, no hands, no extra jewelry, no duplication, no camera shake, no fast rotation, no floating pendant, no geometry changes, no exaggerated lens flares, no artificial star-shaped sparkles.

## Intégration

Le faux film par zoom a été retiré. Le hero affiche actuellement une image fixe stable. À réception, déposer le vrai film sous assets/hero-film.mp4 et définir `heroVideo = './assets/hero-film.mp4'` dans media-config.js. Le lecteur gère déjà le poster, la pause, le mouvement réduit, les erreurs et l’arrêt hors écran. Vérifier la conservation du « 93 », le cadrage desktop/mobile et la continuité de boucle avant activation.
