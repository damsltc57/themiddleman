"use client";
import Script from 'next/script';

// Start the existing DOM animations only after React has hydrated the page.
// Next Script deduplicates these modules, including under development Strict Mode.
export default function SiteScripts() {
 return <>
  <Script src="/hero-background.js" type="module" strategy="afterInteractive" />
  <Script src="/app.js" type="module" strategy="afterInteractive" />
 </>;
}
