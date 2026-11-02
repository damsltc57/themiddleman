import SiteScripts from "./site-scripts";

export default function Home(){
 return <>
<a className={"skip-link"} href={"#contenu"}>{"Aller au contenu"}</a>
<header className={"header"}><a className={"header-creation"} href={"#piece"}>{"Créations"}</a>
<a className={"wordmark"} href={"#accueil"}>{"themiddleman21"}</a>
<div className={"header-actions"}><a className={"header-contact"} href={"#projet"}>{"Contact"}</a>
<button aria-controls={"navigation"} aria-expanded={"false"} aria-label={"Ouvrir le menu"} className={"menu-button"}><span></span>
<span></span>
</button>
</div>
<nav aria-label={"Navigation principale"} className={"nav"} id={"navigation"} inert={true}><div className={"menu-links"}><a href={"#piece"}>{"Les créations"}</a>
<a href={"#volume"}>{"Le détail"}</a>
<a href={"#sur-mesure"}>{"Le sur-mesure"}</a>
<a href={"#projet"}>{"Votre projet"}</a>
</div>
<div className={"menu-bottom"}><span>{"Un bijou. Votre signature."}</span>
<span>{"themiddleman21"}</span>
</div>
</nav>
</header>
<main id={"contenu"}><div className={"hero-passage"}><section aria-labelledby={"hero-title"} className={"hero central-hero"} id={"accueil"}><div className={"hero-art"}><img alt={"Interprétation de campagne du pendentif 93 pavé et de sa chaîne torsadée."} className={"hero-necklace"} decoding={"async"} fetchPriority={"high"} height={"1536"} src={"/assets/necklace-cutout.webp"} width={"1024"} /></div>
<div className={"hero-copy"}><h1 id={"hero-title"}>{"Ce qui vous appartient."}</h1>
<p className={"hero-description"}>{"Bijoux personnalisés, pensés autour de vous."}</p>
<a className={"text-link"} href={"#projet"}>{"Imaginer ma pièce "}<svg aria-hidden={"true"} viewBox={"0 0 24 24"}><path d={"M4 12h15m-6-6 6 6-6 6"}></path>
</svg>
</a>
</div>
</section>
<section className={"hero-statement"} aria-labelledby={"statement-title"}><h2 id={"statement-title"}>{"On dessine des bijoux."}<br />{"On façonne du caractère."}<br />{"Vous leur donnez "}<em>{"du sens."}</em>
</h2>
</section>
</div>
<section aria-labelledby={"piece-title"} className={"story motion-gallery network-gallery"} id={"piece"}><div className={"story-title page-width"}><h2 id={"piece-title"}>{"À leur image."}</h2>
</div>
<div className={"network-brand"} aria-hidden={"true"}>{"themiddleman21"}</div>
<div className={"gallery-window"} tabIndex={"0"} aria-label={"Photographies réelles : faites défiler pour parcourir la galerie"}><div className={"story-spread gallery-track"}><figure className={"network-photo"}><button type={"button"} className={"network-open"} aria-label={"Agrandir : Une signature"}><img src={"/assets/reseaux/photo-5.webp"} alt={"Portrait avec le pendentif 93."} width={"1066"} height={"1400"} loading={"lazy"} /></button>
<figcaption>{"Une signature"}</figcaption>
</figure>
<figure className={"network-photo"}><button type={"button"} className={"network-open"} aria-label={"Agrandir : Le détail"}><img src={"/assets/reseaux/photo-1.webp"} alt={"Gros plan du pendentif 93 et de sa chaîne sur un pantalon noir."} width={"1066"} height={"1400"} loading={"lazy"} /></button>
<figcaption>{"Le détail"}</figcaption>
</figure>
<figure className={"network-photo"}><button type={"button"} className={"network-open"} aria-label={"Agrandir : La présence"}><img src={"/assets/reseaux/photo-4.webp"} alt={"Portrait avec le collier 93 porté sur un maillot."} width={"1066"} height={"1400"} loading={"lazy"} /></button>
<figcaption>{"La présence"}</figcaption>
</figure>
<figure className={"network-photo"}><button type={"button"} className={"network-open"} aria-label={"Agrandir : La rencontre"}><img src={"/assets/reseaux/photo-3.webp"} alt={"Deux personnes se serrent la main, avec le collier 93 porté."} width={"1066"} height={"1400"} loading={"lazy"} /></button>
<figcaption>{"La rencontre"}</figcaption>
</figure>
<figure className={"network-photo"}><button type={"button"} className={"network-open"} aria-label={"Agrandir : Le moment"}><img src={"/assets/reseaux/photo-2.webp"} alt={"Deux personnes posent ensemble sur un terrain de basket."} width={"1066"} height={"1400"} loading={"lazy"} /></button>
<figcaption>{"Le moment"}</figcaption>
</figure>
</div>
</div>
</section>
<section className={"creation-journey"} id={"sur-mesure"} aria-labelledby={"journey-title"}><header className={"journey-heading"}><span>{"LE SUR-MESURE"}</span>
<h2 id={"journey-title"}>{"De l’idée"}<br />{"à "}<em>{"la pièce."}</em>
</h2>
</header>
<div className={"journey-layout"}><div className={"journey-visual"}><figure className={"journey-frame is-active"}><img src={"/assets/esquisse.jpg"} alt={"Esquisse illustrative du pendentif 93."} loading={"lazy"} /><figcaption>{"Étude illustrative · Le dessin"}</figcaption>
</figure>
<figure className={"journey-frame "}><img src={"/assets/reseaux/photo-1.webp"} alt={"Détail réel du pendentif 93 et de sa chaîne."} loading={"lazy"} /><figcaption>{"Photographie originale · Le détail"}</figcaption>
</figure>
<figure className={"journey-frame "}><img src={"/assets/reseaux/photo-4.webp"} alt={"Le collier 93 porté."} loading={"lazy"} /><figcaption>{"Photographie originale · La pièce portée"}</figcaption>
</figure>
</div>
<div className={"journey-steps"}><article className={"journey-step"}><span className={"journey-number"}>{"01"}</span>
<h3>{"Votre idée."}</h3>
<p>{"Un chiffre, une initiale, un symbole. Tout commence par ce que vous souhaitez raconter."}</p>
<figure className={"journey-mobile"}><img src={"/assets/esquisse.jpg"} alt={"Esquisse illustrative du pendentif 93."} loading={"lazy"} /><figcaption>{"Étude illustrative · Le dessin"}</figcaption>
</figure>
</article>
<article className={"journey-step"}><span className={"journey-number"}>{"02"}</span>
<h3>{"Vos choix."}</h3>
<p>{"Nous précisons ensemble les formes, les matériaux et le budget."}</p>
<figure className={"journey-mobile"}><img src={"/assets/reseaux/photo-1.webp"} alt={"Détail réel du pendentif 93 et de sa chaîne."} loading={"lazy"} /><figcaption>{"Photographie originale · Le détail"}</figcaption>
</figure>
</article>
<article className={"journey-step"}><span className={"journey-number"}>{"03"}</span>
<h3>{"Votre pièce."}</h3>
<p>{"Votre projet prend forme, jusque dans les détails."}</p>
<figure className={"journey-mobile"}><img src={"/assets/reseaux/photo-4.webp"} alt={"Le collier 93 porté."} loading={"lazy"} /><figcaption>{"Photographie originale · La pièce portée"}</figcaption>
</figure>
</article>
<a className={"text-link"} href={"#projet"}>{"Imaginer ma pièce ↗"}</a>
</div>
</div>
</section>
<section className={"founder-option founder-signature founder-mobile"} id={"portrait-1"} aria-labelledby={"founder-title-1"}><h2 id={"founder-title-1"}>{"Derrière"}<br /><em>{"la pièce."}</em>
</h2>
<figure className={"signature-photo"}><img src={"/assets/reseaux/photo-2.webp"} alt={"Photographie de rencontre sur un terrain de basket, cadrage provisoire pour le portrait."} loading={"lazy"} /></figure>
<div className={"signature-note founder-copy"}><span>{"THEMIDDLEMAN21"}</span>
<h3>{"Une personne."}<br />{"Un univers."}</h3>
<p>{"Découvrez la personne derrière les pièces, son parcours et ce qui l’anime."}</p>
<small>{"Présentation provisoire · biographie à compléter."}</small>
<a href={"https://www.instagram.com/bouncy_j/"} target={"_blank"} rel={"noopener noreferrer"}>{"Son univers sur Instagram ↗"}</a>
</div>
<span className={"signature-foot"}>{"LE VISAGE DERRIÈRE LE PROJET"}</span>
</section>
<section className={"founder-option founder-duo founder-desktop"} id={"portrait-2"} aria-labelledby={"founder-title-2"}><div className={"duo-heading"}><span>{"LE TERRAIN. LE QUOTIDIEN."}</span>
<h2 id={"founder-title-2"}>{"La même personne."}<br /><em>{"Deux regards."}</em>
</h2>
</div>
<div className={"duo-grid"}><figure className={"duo-tall"}><img src={"/assets/reseaux/photo-2.webp"} alt={"Rencontre sur le terrain de basket."} loading={"lazy"} /><figcaption>{"01 — Sur le terrain"}</figcaption>
</figure>
<div className={"duo-right"}><figure><img src={"/assets/reseaux/photo-3.webp"} alt={"Un moment partagé autour du collier 93."} loading={"lazy"} /><figcaption>{"02 — Les rencontres"}</figcaption>
</figure>
<div className={"founder-copy"}><h3>{"Au-delà du bijou."}</h3>
<p>{"Le parcours, les rencontres, l’envie de créer : un espace pour raconter ce qui a donné naissance à themiddleman21."}</p>
<small>{"Texte d’intention · histoire personnelle à confirmer."}</small>
<a href={"https://www.instagram.com/bouncy_j/"} target={"_blank"} rel={"noopener noreferrer"}>{"Découvrir son quotidien ↗"}</a>
</div>
</div>
</div>
</section>
<section aria-labelledby={"volume-title"} className={"volume-section"} id={"volume"}><div className={"volume-sticky"}><div className={"volume-copy"}><h2 id={"volume-title"}>{"Sous tous"}<br /><em>{"les angles."}</em>
</h2>
<p>{"Le dessin devient volume."}<br />{"La lumière révèle le relief."}</p>
<div aria-live={"polite"} className={"volume-chapter"}><span className={"chapter-line"}></span>
<p id={"chapter-text"}>{"Une pièce, sous tous les angles."}</p>
</div>
<p className={"volume-hint"}>{"Faites défiler pour révéler les détails."}</p>
</div>
<div aria-label={"Vue 3D interactive du pendentif 93. Les commandes sous le bijou permettent de le tourner et de séparer ses éléments."} className={"jewel-stage"} id={"jewel-stage"} role={"img"}><img alt={""} className={"jewel-poster"} height={"1536"} loading={"lazy"} src={"/assets/necklace-93-studio.webp"} width={"1024"} /><div className={"jewel-canvas"} id={"jewel-canvas"}></div>
</div>
<div className={"volume-controls"}><div aria-label={"Couleur de l’aperçu 3D"} className={"finish-control"} role={"group"}><button aria-label={"Aperçu champagne"} aria-pressed={"true"} className={"finish selected"} data-finish={"champagne"}><span></span>
</button>
<button aria-label={"Aperçu argenté"} aria-pressed={"false"} className={"finish silver"} data-finish={"silver"}><span></span>
</button>
<button aria-label={"Aperçu rosé"} aria-pressed={"false"} className={"finish rose"} data-finish={"rose"}><span></span>
</button>
<span className={"finish-label"}>{"Champagne"}</span>
</div>
<div className={"rotation-control"}><button aria-label={"Tourner le bijou vers la gauche"} id={"rotate-left"}><svg aria-hidden={"true"} viewBox={"0 0 24 24"}><path d={"m14 6-6 6 6 6"}></path>
</svg>
</button>
<button aria-label={"Tourner le bijou vers la droite"} id={"rotate-right"}><svg aria-hidden={"true"} viewBox={"0 0 24 24"}><path d={"m10 6 6 6-6 6"}></path>
</svg>
</button>
</div>
<button aria-pressed={"false"} className={"text-button"} id={"toggle-explode"}>{"Séparer les éléments "}<svg aria-hidden={"true"} viewBox={"0 0 24 24"}><path d={"M8 4H4v4m12-4h4v4M4 16v4h4m12-4v4h-4"}></path>
</svg>
</button>
</div>
<div className={"volume-note"}><span>{"Interprétation 3D d’après la photographie."}</span>
<span>{"Finitions illustratives · "}<span id={"jewel-status"} role={"status"}>{"Chargement de la pièce"}</span>
</span>
</div>
</div>
</section>
<section aria-labelledby={"materials-title"} className={"material-scene"} data-material={"metaux"} id={"matieres"}><div className={"material-photo"}><img alt={"Étude illustrative de pierres facettées et de nuances de métal sur velours sombre."} height={"1024"} loading={"lazy"} src={"/assets/matieres-macro.jpg"} width={"1536"} /></div>
<div className={"material-scene-heading"}><h2 id={"materials-title"}>{"Le caractère"}<br />{"de "}<em>{"la matière."}</em>
</h2>
<p>{"Une couleur. Un éclat. Un contraste."}<br />{"Le choix change toute la présence d’une pièce."}</p>
</div>
<div className={"material-panel"}><div aria-label={"Explorer les matières"} className={"material-tabs"} role={"tablist"}><button aria-controls={"panel-metaux"} aria-selected={"true"} id={"tab-metaux"} role={"tab"} tabIndex={"0"}>{"Les métaux"}</button>
<button aria-controls={"panel-pierres"} aria-selected={"false"} id={"tab-pierres"} role={"tab"} tabIndex={"-1"}>{"Les pierres"}</button>
</div>
<div aria-labelledby={"tab-metaux"} id={"panel-metaux"} role={"tabpanel"}><h3>{"Chaud. Clair. Rosé."}</h3>
<p>{"Or, or rose, or blanc, argent 925 et finitions plaquées : des possibilités à explorer selon votre projet."}</p>
<p className={"material-note"}>{"Métal massif et placage sont distincts. Composition et disponibilité à confirmer ensemble."}</p>
</div>
<div aria-labelledby={"tab-pierres"} hidden={true} id={"panel-pierres"} role={"tabpanel"}><h3>{"La lumière, autrement."}</h3>
<p>{"Diamant naturel ou de laboratoire, moissanite ou zircon : chaque option possède ses propres caractéristiques."}</p>
<p className={"material-note"}>{"Nature, caractéristiques et disponibilité des pierres à préciser pour votre projet."}</p>
</div>
<a className={"text-link"} href={"#projet"}>{"Trouvons votre combinaison "}<svg aria-hidden={"true"} viewBox={"0 0 24 24"}><path d={"M4 12h15m-6-6 6 6-6 6"}></path>
</svg>
</a>
</div>
<span className={"material-credit"}>{"Étude de matières · Image illustrative"}</span>
</section>
<section aria-labelledby={"project-title"} className={"concierge"} id={"projet"}><div className={"project-intro"}><h2 id={"project-title"}>{"Parlons"}<br /><em>{"de vous."}</em>
</h2>
<p>{"Une première idée. Quelques détails."}<br />{"Préparez votre brief pour ouvrir la conversation."}</p>
</div>
<div className={"concierge-copy"}><form id={"project-form"}><div className={"form-pair"}><div className={"field"}><label htmlFor={"name"}>{"Votre prénom"}</label>
<input aria-describedby={"name-error"} autoComplete={"given-name"} id={"name"} maxLength={"80"} name={"name"} placeholder={"Prénom"} required={true} /><span className={"field-error"} id={"name-error"}></span>
</div>
<div className={"field"}><label htmlFor={"jewel-type"}>{"Votre pièce"}</label>
<select id={"jewel-type"} name={"piece"}><option>{"Pendentif"}</option>
<option>{"Bague"}</option>
<option>{"Bracelet"}</option>
<option>{"Autre idée"}</option>
</select>
</div>
</div>
<fieldset className={"budget-field"}><legend>{"Votre budget "}<span>{"— facultatif"}</span>
</legend>
<div className={"budget-options"}><button aria-pressed={"true"} className={"active"} data-budget={"À définir ensemble"} type={"button"}>{"À définir"}</button>
<button aria-pressed={"false"} data-budget={"Moins de 500 €"} type={"button"}>{"− de 500 €"}</button>
<button aria-pressed={"false"} data-budget={"500 à 1 500 €"} type={"button"}>{"500–1 500 €"}</button>
<button aria-pressed={"false"} data-budget={"Plus de 1 500 €"} type={"button"}>{"1 500 € et +"}</button>
</div>
<p className={"budget-note"}>{"Ces fourchettes servent à exprimer votre budget, sans constituer des prix de vente."}</p>
</fieldset>
<div className={"field"}><label htmlFor={"idea"}>{"Ce que vous imaginez"}</label>
<textarea aria-describedby={"idea-error"} id={"idea"} maxLength={"3000"} minLength={"10"} name={"idea"} placeholder={"Un chiffre qui compte, des initiales, une inspiration…"} required={true} rows={"3"}></textarea>
<span className={"field-error"} id={"idea-error"}></span>
</div>
<button className={"button button-light prepare-button"} type={"submit"}>{"Préparer mon projet "}<svg aria-hidden={"true"} viewBox={"0 0 24 24"}><path d={"M4 12h15m-6-6 6 6-6 6"}></path>
</svg>
</button>
<p className={"privacy-note"}>{"Le brief est créé dans votre navigateur. Aucune donnée n’est envoyée."}</p>
<div className={"brief-result"} hidden={true} id={"brief-result"}><h3>{"Votre projet est prêt."}</h3>
<pre aria-label={"Votre brief de projet"} id={"brief-text"} tabIndex={"0"}></pre>
<div className={"brief-actions"}><button id={"copy-brief"} type={"button"}>{"Copier le brief"}</button>
<button id={"save-brief"} type={"button"}>{"Enregistrer en .txt"}</button>
</div>
<p id={"brief-status"} role={"status"}></p>
</div>
</form>
</div>
</section>
<div className={"concierge-questions"} id={"questions"}><h3>{"Avant de commencer."}</h3>
<div className={"question-list"}><details><summary>{"Et si mon idée n’est pas encore précise ?"}<svg aria-hidden={"true"} viewBox={"0 0 24 24"}><path d={"M5 12h14M12 5v14"}></path>
</svg>
</summary>
<p>{"Une inspiration, un symbole ou une photo peuvent servir de point de départ. Vous pouvez aussi expliquer simplement ce que vous aimeriez porter."}</p>
</details>
<details><summary>{"Peut-on adapter le projet à mon budget ?"}<svg aria-hidden={"true"} viewBox={"0 0 24 24"}><path d={"M5 12h14M12 5v14"}></path>
</svg>
</summary>
<p>{"Le budget fait partie de l’échange initial. Les choix de forme, de métal et de pierres sont à discuter selon les possibilités de votre projet."}</p>
</details>
<details><summary>{"Comment choisir les matières ?"}<svg aria-hidden={"true"} viewBox={"0 0 24 24"}><path d={"M5 12h14M12 5v14"}></path>
</svg>
</summary>
<p>{"Précisez le rendu que vous aimez et vos préférences. La nature du métal, sa finition et les caractéristiques des pierres doivent être définies pour votre pièce."}</p>
</details>
</div>
</div>
</main>
<footer className={"campaign-footer"} id={"footer"}><div className={"campaign-stage"}><div className={"campaign-top"}><div><a className={"campaign-logo"} href={"#accueil"}>{"themiddleman21"}</a>
<p className={"campaign-invitation"}>{"Une pièce à vous."}<br />{"Une histoire à porter."}</p>
</div>
<p className={"campaign-description"}>{"Un chiffre, une initiale, un symbole."}<br />{"Des bijoux personnalisés autour de votre idée, de vos envies et de ce qui compte pour vous."}</p>
</div>
<div className={"campaign-navigation"}><div className={"campaign-nav-pair"}><nav aria-label={"Découvrir"}><h3>{"Découvrir"}</h3>
<a href={"#piece"}>{"Les créations"}</a>
<a href={"#sur-mesure"}>{"Le sur-mesure"}</a>
<a href={"#matieres"}>{"Les matières"}</a>
</nav>
<nav aria-label={"Votre projet"}><h3>{"Votre projet"}</h3>
<a href={"#projet"}>{"Imaginer ma pièce"}</a>
<a href={"#questions"}>{"Vos questions"}</a>
</nav>
</div>
<div className={"campaign-nav-pair"}><nav aria-label={"Réseaux sociaux"}><h3>{"Social"}</h3>
<a href={"https://www.instagram.com/themiddleman.21/"} target={"_blank"} rel={"noopener noreferrer"}>{"Instagram ↗"}</a>
</nav>
<nav aria-label={"Contact"}><h3>{"Un premier échange"}</h3>
<a href={"#projet"}>{"Parlons de votre idée ↗"}</a>
<button id={"open-privacy"} type={"button"}>{"Confidentialité"}</button>
</nav>
</div>
</div>
<div className={"campaign-wordmark"} aria-hidden={"true"}>{"themiddleman21"}</div>
<img className={"campaign-jewel"} src={"/assets/footer-bench-wide.webp"} width={"2172"} height={"724"} loading={"lazy"} decoding={"async"} alt={"Mise en scène de campagne : le collier 93 pavé sur un maillot et un banc en bois, accompagné d’un ballon de basket."} /></div>
</footer>
<dialog aria-label={"Photographie originale du pendentif"} id={"photo-dialog"}><button aria-label={"Fermer la photographie"} className={"dialog-close"}><svg aria-hidden={"true"} viewBox={"0 0 24 24"}><path d={"m6 6 12 12M18 6 6 18"}></path>
</svg>
</button>
<img alt={"Photo originale fournie du pendentif 93 et de sa chaîne."} src={"/assets/piece-originale.png"} /><p>{"La photographie originale du pendentif « 93 »."}</p>
</dialog>
<dialog aria-labelledby={"privacy-title"} id={"privacy-dialog"}><button aria-label={"Fermer les informations"} className={"dialog-close"}><svg aria-hidden={"true"} viewBox={"0 0 24 24"}><path d={"m6 6 12 12M18 6 6 18"}></path>
</svg>
</button>
<h2 id={"privacy-title"}>{"Votre projet"}<br />{"reste chez vous."}</h2>
<p>{"Les informations du formulaire restent dans cette page. Elles ne sont ni enregistrées sur un serveur ni envoyées à un destinataire. Vous choisissez de copier ou de télécharger votre brief."}</p>
<p>{"Cette version n’utilise aucun outil de mesure d’audience ni cookie publicitaire."}</p>
</dialog>

<SiteScripts />
</>;
}
