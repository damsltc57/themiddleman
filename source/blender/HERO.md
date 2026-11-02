# Hero 93 — reconstruction Blender

Référence visuelle : `assets/necklace-cutout.png`. Il s’agit d’une reconstruction artistique de l’image de campagne, pas d’un relevé technique du bijou original.

L’aperçu reste accessible avec `?hero=blender`. La version image approuvée reste le défaut.

## Construction

`build_hero_v2.py` produit `themiddleman21-93-hero-v2.blend` dans une nouvelle scène. La version précédente `themiddleman21-93.blend` n’est pas modifiée.

La passe dorée comprend :
- des maillons ovales fermés individuels, entrelacés avec une rotation progressive autour de l’axe de la chaîne et une déformation torsadée de chaque anneau, avec côtés en or poli et pavage sur la face supérieure ;
- une courbe en U plus large et des sections de chaîne plus épaisses ;
- des griffes dorées, un pavage de tailles variables et des accents princess en montures d’or ;
- une bélière articulée plus large et plus longue ;
- un fond microserti procédural pour les interstices entre les pierres modélisées ;
- un éclairage de studio à sources rectangulaires fines et des matériaux réglés pour un rendu miel/champagne.

Les pierres emploient une approximation de réflexion pour cette caméra fixe. Leur rendu n’est pas une simulation optique spectrale du diamant. La correspondance avec la référence reste visuelle : maillons, facettes et dessins de sertissage ne sont pas identiques.

## Rendu

Depuis la racine du dépôt :

```sh
/Applications/Blender.app/Contents/MacOS/Blender --background --python source/blender/build_hero_v2.py --python source/blender/render_hero_sequence.py
```

Pour calculer les images dans un dossier de travail avant remplacement de la séquence du site, définir `HERO_RENDER_DIR`.

32 WebP RGBA, 896 × 1344, Cycles 96 échantillons, qualité WebP 93. Le rendu reste transparent : le fond du site est conservé. Les poses couvrent les images 1 à 40 de Blender. Au scroll descendant, le volet avant de la bélière pivote et le 93 descend ; le scroll montant inverse la séquence. Le mode mouvement réduit conserve la pose fermée.
