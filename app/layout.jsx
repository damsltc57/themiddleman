export const metadata = {
 title: 'themiddleman21 — Bijoux personnalisés',
 description: 'Un chiffre, une initiale, un symbole. Découvrez le pendentif 93 et imaginez votre projet de bijou personnalisé.',
 openGraph: { title: 'themiddleman21 — Ce qui vous appartient.', description: 'Des bijoux personnels, pensés autour de ce qui compte pour vous.', type: 'website' },
};
export const viewport = { themeColor: '#0c0c0b' };
export default function RootLayout({children}) {
 return <html lang="fr" suppressHydrationWarning><head>
<link rel="stylesheet" href="/styles-v3.css" />
<link rel="stylesheet" href="/typography.css" />
<link rel="stylesheet" href="/refinement.css" />
<link rel="stylesheet" href="/motion-edition.css" />
<link rel="stylesheet" href="/central-hero.css" />
<link rel="stylesheet" href="/vendor/lenis/lenis.css" />
<script type="importmap" dangerouslySetInnerHTML={{__html:"{\"imports\": {\"three\": \"/vendor/three/three.module.js\", \"three/addons/\": \"/vendor/addons/\", \"gsap\": \"/vendor/gsap/gsap.js\", \"gsap/ScrollTrigger\": \"/vendor/gsap/ScrollTrigger.js\"}}"}} />
<script dangerouslySetInnerHTML={{__html:"\n// Hide before first paint; recover if the animation module cannot load.\nif (!matchMedia('(prefers-reduced-motion: reduce)').matches) {\n document.documentElement.classList.add('hero-entering');\n window.heroEntryFallback = setTimeout(() => {\n  document.documentElement.classList.remove('hero-entering');\n  document.querySelectorAll('.central-hero .hero-copy > *').forEach(el => {\n   el.style.opacity = '1'; el.style.visibility = 'visible'; el.style.transform = 'none';\n  });\n }, 8000);\n}\n"}} />
</head><body>{children}</body></html>;
}
