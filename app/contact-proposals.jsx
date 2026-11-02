'use client';

import { useEffect, useRef, useState } from 'react';
import './contact-proposals.css';

function ContactAction({ id }) {
  const [preview, setPreview] = useState(false);
  return <div className="contact-action">
    <button type="button" className="contact-whatsapp" aria-describedby={`${id}-status`} onClick={() => setPreview(true)}>
      <span>Écrire sur WhatsApp</span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 19 19 5M5 5h14v14" /></svg>
    </button>
    <p className="contact-status" id={`${id}-status`} role="status">{preview ? 'Aperçu : le numéro WhatsApp reste à renseigner.' : '\u00a0'}</p>
  </div>;
}

export default function ContactProposals() {
  const root = useRef(null);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animations = [];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        if (preference.matches) return;
        entry.target.querySelectorAll('[data-contact-reveal]').forEach((element, index) => {
          animations.push(element.animate([
            { opacity: 0, transform: 'translateY(20px)', clipPath: 'inset(0 0 14% 0)' },
            { opacity: 1, transform: 'translateY(0)', clipPath: 'inset(0)' }
          ], { duration: 1000, delay: index * 110, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' }));
        });
      });
    }, { threshold: .2 });
    root.current.querySelectorAll('.contact-study').forEach(section => observer.observe(section));
    const cancel = () => { if (preference.matches) animations.forEach(a => a.cancel()); };
    preference.addEventListener('change', cancel);
    return () => { observer.disconnect(); animations.forEach(a => a.cancel()); preference.removeEventListener('change', cancel); };
  }, []);
  return <div className="contact-proposals" id="projet" ref={root}>
    <section className="contact-study contact-invitation" id="contact-invitation" aria-labelledby="invitation-title">
      <h2 id="invitation-title" data-contact-reveal>Votre histoire.<br /><em>Une pièce à part.</em></h2>
      <p className="contact-description" data-contact-reveal>Une idée, une envie, un symbole.<br />Parlons de la pièce que vous avez en tête.</p>
      <div data-contact-reveal><ContactAction id="invitation" /></div>
    </section>
  </div>;
}
