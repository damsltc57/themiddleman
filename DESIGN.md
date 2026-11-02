---
name: themiddleman21 — galerie centrale
description: Une présence photographique noire et champagne pour des bijoux personnels.
colors:
  bg: "#090807"
  surface: "#11100e"
  ivory: "#eee8db"
  gold: "#bda680"
  muted: "#bbb3a5"
  line: "#433a2c"
  studio: "#090807"
  action-ink: "#17130e"
  action-text: "#eee8db"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(58px, 6.5vw, 96px)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-.025em"
  headline:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(54px, 5.5vw, 84px)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-.015em"
  body:
    fontFamily: "Libre Caslon Text, Georgia, serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Libre Caslon Text, Georgia, serif"
    fontSize: "10px"
    fontWeight: 500
    lineHeight: 1.8
    letterSpacing: ".13em"
rounded:
  square: "0"
  circle: "50%"
spacing:
  page-desktop: "56px"
  page-tablet: "36px"
  page-mobile: "22px"
  story-gap: "28px"
components:
  button-primary:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.action-ink}"
    rounded: "{rounded.square}"
    padding: "15px 22px"
  button-primary-hover:
    backgroundColor: "#d0bc98"
  text-link:
    padding: "11px 0"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.ivory}"
    padding: "12px 0 15px"
  budget-option:
    backgroundColor: "transparent"
    textColor: "{colors.ivory}"
    padding: "8px 12px"
    rounded: "{rounded.square}"
  budget-option-selected:
    backgroundColor: "{colors.ivory}"
    textColor: "{colors.action-ink}"
  process-step:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    padding: "25px 0"
  material-panel:
    backgroundColor: "transparent"
    textColor: "{colors.ivory}"
    padding: "0"
---

# Design System: themiddleman21 — galerie centrale

## Overview

**Creative North Star: "Galerie centrale"**

Une présence photographique ample et sombre, une lumière champagne et de grands caractères littéraires donnent à la pièce une place personnelle. Le rythme associe collier central détouré, observation du volume et respirations éditoriales sur des noirs chauds. La direction reprend l’image 3 approuvée (`../hero-proposals/03-galerie-centrale.png`).

Le mouvement spectaculaire organise la découverte : traversée de galerie, décomposition du volume, ouverture du cadre et révélation de la signature. Les commandes restent explicites et accessibles ; les légendes distinguent photographie originale, mises en scène et interprétation 3D.

**Key Characteristics:**
- Noir chaud et champagne assourdi.
- Instrument Serif expressif, Libre Caslon Text discret.
- Grands cadres droits, filets fins et séquences animées amples.
- Commandes utilisables au clavier et mouvement réduit respecté.

Source actuelle : cascade CSS jusqu’à `typography.css`, puis `motion-edition.css` et enfin `central-hero.css` ; structure et comportements dans `index.html`, `app.js`, `jewel.js` et `motion-edition.js`. `REFERENCES-MOTION.md` décrit les séquences après le hero ; la direction centrale approuvée remplace les anciennes consignes de film et de sections papier. Ce document actualise la direction approuvée sans modifier les données produit de `PRODUCT.md`.

## Colors

Le champagne ponctue les noirs chauds ; l’atelier et la lettre de projet utilisent désormais la surface sombre avec texte ivoire.

### Primary
- **Champagne assourdi** (`gold`) : accents, sélection et focus.

### Neutral
- **Noir cinéma** (`bg`) et **Noir matière** (`surface`) : fond et surfaces sombres héritées.
- **Noir studio** (`studio`) : profondeur du volume et fermeture.
- **Ivoire** (`ivory`) et **Gris pierre** (`muted`) : lecture principale et secondaire.
- **Filet brun** (`line`) : séparation discrète.
- **Encre d’action** (`action-ink`) : texte des boutons ivoire et budgets sélectionnés ; **Ivoire d’action** (`action-text`) : lecture claire.

**The Light Rule.** Le champagne accompagne la pièce et les états interactifs ; les grandes surfaces restent neutres.

## Typography

Instrument Serif porte titres, signature et italiques ; Libre Caslon Text porte lecture et commandes, avec Georgia en repli. Les deux familles sont auto-hébergées sous licence SIL OFL. L’inspiration typographique Jacob & Co ne change pas ces fontes.

Les tokens fixent les rôles, avec des dimensions propres à chaque section. Le hero utilise la casse naturelle et un espacement légèrement resserré. Les titres éditoriaux utilisent un espacement légèrement resserré. Les paragraphes principaux de l’atelier, des matières et du projet utilisent 15px avec une interligne de 1.85 ; ils passent à 14px sur mobile. Les petites capitales situent la lecture sans remplacer un paragraphe.

**The Italic Rule.** L’italique souligne une expression au sein du titre ; il garde le même poids léger et ne devient pas un second style de corps.

## Layout

Le hero place le collier transparent au centre, puis le titre, la description et le lien d’action. Sur mobile, le collier commence sous l’en-tête de 80px.

La composition après le hero alterne rail photographique, studio noir, atelier sombre, exploration de matière noire, lettre sombre, FAQ indépendante et signature. Les marges de référence sont celles du frontmatter ; les adaptations de section à 1100px et 767px restent celles de la cascade finale.

La galerie est épinglée au défilement à partir de 768px, hors mouvement réduit. Ses trois panneaux de 48vw avancent horizontalement ; la perspective se redresse pendant la traversée. Sous 768px, le rail utilise le défilement tactile natif et l’alignement scroll-snap, avec des panneaux de 82vw. En mouvement réduit, la galerie reste parcourable sans épinglage.

Le studio occupe 210svh avec un minimum de 1600px ; sur mobile, 190svh et 1450px minimum. Le texte, le modèle et les commandes en pied ont leurs zones distinctes. Le mode réduit rend la section naturelle et supprime le sticky.

L’atelier présente le grand visuel à droite du texte, puis trois étapes sur une ligne. Sur mobile : introduction, image de 360px, étapes empilées. Les matières placent une macro à gauche et un panneau transparent sur fond noir à droite ; sur mobile, le titre, l’image de 380px et les onglets se suivent dans le flux.

La lettre de projet juxtapose introduction et formulaire sur fond sombre, puis devient une colonne sur mobile. La FAQ est une section noire séparée. Le pied de page conserve une action de contact au-dessus de la signature révélée.

## Elevation & Depth

Les surfaces restent plates, sans ombres flottantes. Photographie, éclairage du modèle, perspective des panneaux et masques produisent la profondeur. Les modales héritées utilisent un voile et un flou d’arrière-plan.

Le hero utilise `assets/necklace-cutout.webp`, issu du PNG avec canal alpha réel ; sa provenance est consignée dans `assets/necklace-cutout.json`. Après décodage de l’image, GSAP joue une seule entrée du collier : translation verticale de −65px et rotation de −3° vers zéro en 1,8s (`power2.out`), puis révèle le texte. En mouvement réduit, le collier et le texte sont immédiatement visibles sans animation. Le DOM ne contient plus de lecteur vidéo ; `media-config.js` conserve `heroVideo = null`. Les films antérieurs restent archivés sans être chargés.

La galerie suit le scroll avec un lissage de 1 ; le cadre de l’atelier s’ouvre avec un lissage de .8. Le volume tourne, se sépare et se rassemble, avec commandes manuelles. Les onglets matières modifient réellement le cadrage : position de 70% à 30%, échelle de 1.15 à 1.5, transition de 1.5s. La signature se révèle par masque et translation sur 1.3s. Ces effets disparaissent ou deviennent immédiats en mouvement réduit.

## Shapes

Cadres photographiques, boutons, champs et panneaux restent droits. Les filets fins structurent les états. Les nuances du volume sont circulaires. Les étapes ne deviennent pas des cartes flottantes.

## Components

### Buttons

Dans la lettre, le bouton principal est ivoire sur fond sombre, avec texte encre et hauteur minimale de 52px. Son survol passe au champagne sans translation. Les liens d’action conservent filet et flèche. Le focus est visible, champagne sur noir, y compris sur les champs.

### Inputs / Fields

Champs transparents sur fond sombre avec bordure inférieure, texte ivoire et erreurs saumon clair associées aux champs. Le formulaire prépare uniquement un brief local copiable ou téléchargeable ; il ne simule aucun envoi.

### Chips

Budgets rectangulaires bordés sur fond sombre ; sélection ivoire avec texte encre et `aria-pressed`. Les nuances circulaires du volume conservent leurs noms accessibles et leur état sélectionné.

### Cards / Containers

La galerie garde les légendes distinctes des trois images et l’accès à la photo originale. Le panneau des matières n’est plus un rectangle clair superposé : il appartient à la colonne noire voisine de la macro. Aucun système de cartes génériques à ombre n’est établi.

### Atelier interactif

Trois étapes numérotées commandent un accordéon exclusif et le grand média. La sélection met à jour image, texte alternatif et légende. Le filet actif, `aria-expanded` et `aria-controls` exposent l’état. Le changement reste immédiat en mouvement réduit.

### Navigation

L’en-tête minimal place « Création » à gauche, « themiddleman21 » au centre et contact/menu à droite. Sur mobile, le contact est masqué et le menu reste accessible. Le menu fonctionne sur ordinateur et mobile ; il se ferme à Échap et après choix d’ancre. Les onglets matières exposent leur sélection et se parcourent avec flèches, Début et Fin ; ils pilotent contenu et cadrage de la macro.

### Volume interactif

Modèle interprété sous éclairage de studio, nuances champagne, argentée et rosée illustratives. Rotation et séparation restent disponibles par boutons. La photographie originale sert de repli WebGL. La scène n’atteste ni dimensions ni matériaux réels.

### FAQ et signature

La FAQ utilise des éléments de divulgation natifs dans sa propre section. La signature apparaît par masque ; l’action de contact au-dessus reste lisible indépendamment de l’animation.

## Do's and Don'ts

### Do:
- Do conserver les légendes distinguant photographie originale, campagne et interprétation 3D.
- Do garder les commandes lisibles sur des surfaces stables.
- Do préserver les états clavier et la préférence de mouvement réduit.
- Do utiliser la lumière, l’espace et le mouvement pour donner de la présence à la pièce.
- Do conserver le collier détouré sur fond noir et son entrée unique, sans vidéo dans le hero.

### Don't:
- Don't ajouter des cartes arrondies et des ombres flottantes à cette grammaire plane.
- Don't substituer l’ancienne famille Bodoni à Instrument Serif dans la version cinéma.
- Don't rendre le défilement animé indispensable à la découverte du volume.
- Don't présenter les nuances de la scène comme des caractéristiques produit confirmées.
- Don't remplacer le défilement tactile natif de la galerie mobile par une séquence épinglée.

### Fond du hero : correction des bandes
Le halo chaud utilise un dégradé elliptique statique de #110e0c au centre à #0a0807 aux bords. hero-background.js calcule une interpolation cosinus et un arrondi stochastique inférieur à un niveau RGB pour éviter les bandes visibles dans les noirs. Canvas décoratif aria-hidden, sans événements ni animation continue, recalculé au redimensionnement (DPR plafonné à 2). Le gradient CSS reste le repli sans JavaScript. Contrôle visuel effectué à 1440 et 390px.


### Navigation plein écran
Menu sur fond noir chaud, grands liens serif ivoire, survol champagne. Ouverture par dévoilement vertical puis apparition des liens en cascade ; fermeture animée. Arrière-plan inert, focus contenu dans le menu, fermeture par Échap et restitution du focus. Mode mouvement réduit immédiat. Vérifié sur 1440 px et 390 px.

### Modèle Blender 93
Vue interactive remplacée par necklace-93-blender.glb : reconstruction de la photo dans Blender, 1 471 pierres, maillons entrelacés, Draco ~875 Ko. Source et studio dans ../blender-93. Rotation et séparation/réassemblage conservés. Hero d’origine conservé à la demande du client ; poster de la section 3D issu du rendu Blender.

### Passage du hero au texte
Au défilement, le hero reste en place pendant une séquence GSAP. Son groupe titre/description/CTA s’efface et remonte ; le collier s’atténue tandis qu’un texte serif apparaît au premier plan depuis le bas. Texte provisoire : « Une idée. Une histoire. Une pièce qui vous ressemble. ». Animation réversible, inert sur le CTA masqué, section statique lisible sans animation et en mouvement réduit. Vérifié sur 1440 et 390 px.

### Défilement Lenis
Lenis 1.3.27 auto-hébergé, synchronisé au ticker GSAP et à ScrollTrigger selon la documentation officielle : https://github.com/darkroomengineering/lenis. Inertie faible (lerp 0.22), distance de molette native (multiplicateur 1), tactile natif. Arrêt pendant le menu plein écran, reprise à la fermeture et navigation d’ancre synchronisée. Désactivé en mouvement réduit. Test molette/menu/préférence système validé.

Le passage hero sépare désormais les textes : extinction du groupe initial à 0,24, pause jusqu’à 0,36, puis apparition de l’overlay. Le header remonte de 16 px avec fondu sur les 120 premiers pixels de scroll. Séquence réversible.

Fondu du hero allongé après retour utilisateur : interpolation linéaire, états de départ explicites, durée relative 0,44 et arrivée du texte à 0,57. Distance totale 185 vh, scrub 1 s. L’opacité du titre est encore d’environ 50 % après 260 px de défilement sur un viewport de 950 px, au lieu d’être déjà presque nulle.

### Galerie « À leur image. » — direction retenue
Composition de la deuxième proposition générée, reconstruite avec les cinq photographies originales fournies. Fond brun uni #110e0c de la proposition codée. Portrait, détail plus petit et abaissé, grand portrait, rencontre et photo à deux. Titre seul en haut à gauche ; aucune ligne supérieure ni texte à droite. Wordmark géant italique #30251d en arrière-plan, défilant plus lentement que les images via la même timeline ScrollTrigger. Carousel piloté au scroll sur ordinateur et mobile ; défilement horizontal natif en mouvement réduit. Photos agrandissables dans la fenêtre existante. Vérifié en 1440 et 390 px.

Espacement vertical de la galerie affiné avec Impeccable : 64–88 px en haut sur ordinateur, 56 px sur mobile, 48 px en bas. Titre séparé des photos par 40 px (32 px mobile). Signature relevée pour laisser respirer la limite inférieure. Carousel et agrandissement photo vérifiés en 1440 et 390 px.
