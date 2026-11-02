# Seconde direction — cinéma intime

Brief : nouveau site séparé, noir et doré, bijoux sur mesure, image et mouvement ambitieux. Le client délègue la direction artistique et autorise les images générées. Aucune nouvelle validation intermédiaire nécessaire.

Mode : Persuade. La découverte du pendentif doit conduire à préparer un projet personnel.

Références Subframe consultées :
- https://www.lunetteriegenerale.com/ : référence principale. Campagne en plein écran, présence humaine, élégance typographique. Traduction en noir/champagne selon le brief.
- https://www.ourlegacy.com/ : étude de la galerie et des légendes réduites ; ne pas reprendre son identité.
- https://www.esrbespoke.au/ : étude de la lisibilité d’un hero sombre et de la présentation sobre des services.
- https://www.becaneparis.com/ : étude du rythme entre manifeste et produit.

Systèmes envisagés : campagne de mode, catalogue d’exposition, atelier privé, cinéma intime, livre de collection, vitrine nocturne, carnet de commandes. Le seed bc25d25d assigne l’index 4 : cinéma intime. Contraintes utilisateur prioritaires. Les challengers éloignés (algorave, montage, billet) ne priment pas sur la demande de luxe photographique : retenir leur discipline de synchronisation, rythme et continuité, pas leur costume visuel.

Premier écran : composition photographique sombre couvrant toute la fenêtre, pendentif à droite, Cormorant de très grand corps à gauche, navigation réduite. Une boucle vidéo locale de 12 secondes anime la photographie par un mouvement optique périodique lent.

Parcours : campagne → manifeste → original + détail de campagne → volume interactif → méthode sur fond parchemin → matières + portrait → questions → brief → grande signature.

Interaction signature : le pendentif 3D tourne, se décompose puis se rassemble dans une section sticky pilotée par GSAP ScrollTrigger. Commandes manuelles pour rotation, finition et décomposition. La géométrie est reconstruite côté navigateur à partir de model.js, à pavage plus fin. Pas un scan exact : arrière, dimensions et matière inconnus.

Mouvement : une seule partition GSAP pour ouverture, parallaxe du hero, révélation des titres et images, séquence du volume. Préférence de mouvement réduit respectée ; film interrompu hors écran et lorsque le document est caché.

Risque assumé : cette version montre un objet artistique interprété, pas un jumeau numérique certifié. Les images de campagne sont des mises en scène générées. Le seul témoignage produit authentique reste la photo originale. Aucun faux avis client.

## Refonte demandée après rejet de la seconde version

L’utilisateur trouve le hero instable et les autres sections trop proches de l’ancienne version. Cette preuve utilisateur remplace le verdict visuel précédent. Refonte des compositions : histoire en diptyque bord à bord ; volume au centre d’une scène plus ample ; création via média + étapes interactives ; macro de matières plein cadre ; portrait sticky et formulaire avec questions intégrées ; fermeture éditoriale. Références détaillées dans REFERENCES-REFONTE.md.

Le hero n’anime plus la photographie. Le vrai film sera fourni par l’utilisateur à partir de PROMPT-VIDEO.md. media-config.js garde heroVideo à null tant que le film n’est pas reçu. Aucune commande de lecture trompeuse. La photo stable sert uniquement de poster provisoire.
