'use client';

import { useEffect, useRef } from 'react';

// Aperture geometry adapted from Subframe Scroll Window (MIT).
// See personal-piece.LICENSE. Uses the page scroll, never an inner scroll area.
export default function PersonalPiece(){
 const root=useRef(null);
 useEffect(()=>{
  const section=root.current,stage=section.querySelector('.inspiration-stage');
  const windows=[...section.querySelectorAll('.inspiration-window')];
  const intro=section.querySelector('.inspiration-intro');
  const message=section.querySelector('.inspiration-message');
  const veil=section.querySelector('.inspiration-veil');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0;
  const clamp=n=>Math.max(0,Math.min(1,n));
  const smooth=n=>n*n*(3-2*n);
  const draw=()=>{
   frame=0;
   const mobile=innerWidth<768;
   section.classList.toggle('is-scroll-story',!reduced.matches);
   const p=reduced.matches?1:clamp(-section.getBoundingClientRect().top/Math.max(1,section.offsetHeight-stage.offsetHeight));
   const opening=clamp(p/.66), reveal=smooth(clamp((p-.69)/.16));
   const w=stage.clientWidth,h=stage.clientHeight;
   windows.forEach((band,i)=>{
    const e=smooth(clamp(opening*1.24-Math.abs(i-2)*.12));
    const width=[.15,.22,.30,.22,.15][i]*w;
    const center=mobile?.65:.73;
    const left=(w*center-width/2)*(1-e),right=(w*(1-center)-width/2)*(1-e);
    const top=h*(.15+i*.135)*(1-e)+(h*i/5)*e;
    const bottom=h*(1-.15-(i+1)*.135)*(1-e)+(h*(4-i)/5)*e;
    band.style.clipPath=`inset(${Math.max(0,top-.5)}px ${Math.max(0,right)}px ${Math.max(0,bottom-.5)}px ${Math.max(0,left)}px)`;
    band.firstElementChild.style.transform=`scale(${1.08-.08*opening})`;
   });
   const introAlpha=reduced.matches?0:1-smooth(clamp(p/.32));
   intro.style.opacity=String(introAlpha);intro.style.transform=`translateY(${-p*38}px)`;
   intro.style.visibility=introAlpha===0?'hidden':'visible';
   message.style.opacity=String(reveal);message.style.transform=`translateY(${(1-reveal)*28}px)`;
   message.style.visibility=reveal===0?'hidden':'visible';message.inert=reveal<.8;
   veil.style.opacity=String(reveal);
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(draw);};
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);reduced.addEventListener('change',schedule);
  const resize=new ResizeObserver(schedule);resize.observe(section);resize.observe(stage);
  draw();
  return()=>{cancelAnimationFrame(frame);resize.disconnect();window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);reduced.removeEventListener('change',schedule);section.classList.remove('is-scroll-story');};
 },[]);
 return <section className="inspiration-story" id="volume" ref={root} aria-labelledby="inspiration-title">
  <div className="inspiration-stage">
   <div className="inspiration-photo" role="img" aria-label="Mise en scène illustrative du pendentif 93 et de sa chaîne sur du cuir brun.">
    {[0,1,2,3,4].map(i=><div className="inspiration-window" key={i} aria-hidden="true"><img src="/assets/inspirations/93-campaign.webp" alt="" width="1672" height="941" loading="lazy"/></div>)}
   </div>
   <div className="inspiration-intro" aria-hidden="true"><p>Tout commence<br/>par ce qui compte<br/><em>pour vous.</em></p><span>Faites défiler pour découvrir</span></div>
   <div className="inspiration-veil" aria-hidden="true" />
   <div className="inspiration-message">
    <h2 id="inspiration-title">Un chiffre.<br/>Des initiales.<br/><em>Un symbole.</em></h2>
    <p>Votre idée donne le point de départ. Nous précisons ensemble le dessin, les matériaux et le budget.</p>
    <a href="#projet" className="inspiration-cta">Imaginer ma pièce <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></a>
   </div>
   <span className="inspiration-credit">Mise en scène illustrative · Le 93</span>
  </div>
 </section>;
}
