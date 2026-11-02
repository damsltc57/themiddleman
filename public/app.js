import { initBlenderPreview } from './hero-blender-preview.js';
import Lenis from './vendor/lenis/lenis.mjs';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>[...root.querySelectorAll(s)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const runtime=window.__premium={jewelLoaded:false,jewelError:null,animations:[],brief:null};

const blenderPreview=initBlenderPreview($('.hero-necklace'),reduced);
runtime.blenderPreview=blenderPreview;

// Light inertia: a higher lerp settles quickly, without slowing scroll distance.
const smoothContext=gsap.matchMedia();
smoothContext.add('(prefers-reduced-motion: no-preference)',()=>{
 const lenis=new Lenis({lerp:.22,wheelMultiplier:1,smoothWheel:true,syncTouch:false,autoRaf:false,anchors:{offset:-85},prevent:node=>node.closest?.('dialog, #navigation')});
 runtime.lenis=lenis;
 lenis.on('scroll',ScrollTrigger.update);
 const tick=time=>lenis.raf(time*1000);
 gsap.ticker.add(tick);gsap.ticker.lagSmoothing(0);
 if(document.documentElement.classList.contains('menu-open'))lenis.stop();
 return ()=>{gsap.ticker.remove(tick);lenis.destroy();runtime.lenis=null;};
});

// Full-screen navigation: interruptible motion, focus trap and inert background.
const menu=$('.menu-button'),nav=$('#navigation');
const menuLinks=$$('.menu-links a',nav),menuBottom=$('.menu-bottom',nav);
const outside=[$('main'),$('footer'),$('.header-creation'),$('.header-contact'),$('.wordmark')];
let menuMotion,menuOpen=false;
function setBackgroundInert(value){outside.forEach(el=>{if(el)el.inert=value;});}
function closeMenu(destination=null){
 if(!menuOpen)return;
 menuOpen=false;menuMotion?.kill();nav.inert=true;
 menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Ouvrir le menu');
 menu.focus({preventScroll:true});
 const finish=()=>{
  nav.classList.remove('is-open');document.documentElement.classList.remove('menu-open');setBackgroundInert(false);runtime.lenis?.start();
  gsap.set(nav,{clearProps:'all'});gsap.set([...menuLinks,menuBottom],{clearProps:'all'});
  if(destination){const target=$(destination);if(target){target.setAttribute('tabindex','-1');target.focus({preventScroll:true});if(runtime.lenis)runtime.lenis.scrollTo(target,{offset:-85});else target.scrollIntoView({behavior:reduced.matches?'instant':'smooth'});}}
 };
 if(reduced.matches){finish();return;}
 menuMotion=gsap.timeline({onComplete:finish}).to([...menuLinks,menuBottom],{opacity:0,y:-12,duration:.18,stagger:.025,ease:'power2.in'},0)
 .to(nav,{clipPath:'inset(0 0 100% 0)',duration:.5,ease:'power3.inOut'},.1);
}
function openMenu(){
 showHeader();menuMotion?.kill();menuOpen=true;nav.inert=false;setBackgroundInert(true);
 document.documentElement.classList.add('menu-open');nav.classList.add('is-open');runtime.lenis?.stop();
 menu.setAttribute('aria-expanded','true');menu.setAttribute('aria-label','Fermer le menu');
 gsap.set(nav,{clipPath:'inset(0 0 0% 0)'});
 if(reduced.matches){gsap.set([...menuLinks,menuBottom],{opacity:1,y:0});menuLinks[0].focus({preventScroll:true});return;}
 menuMotion=gsap.timeline().fromTo(nav,{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0% 0)',duration:.75,ease:'power3.inOut'},0)
 .fromTo(menuLinks,{y:55,opacity:0},{y:0,opacity:1,duration:.8,stagger:.1,ease:'power3.out'},.25)
 .fromTo(menuBottom,{y:10,opacity:0},{y:0,opacity:1,duration:.6},.65)
 .call(()=>{if(menuOpen&&document.activeElement===menu)menuLinks[0].focus({preventScroll:true});});
}
menu.addEventListener('click',()=>menuOpen?closeMenu():openMenu());
menuLinks.forEach(link=>link.addEventListener('click',event=>{event.preventDefault();closeMenu(link.getAttribute('href'));}));
document.addEventListener('keydown',event=>{
 if(!menuOpen)return;
 if(event.key==='Escape'){event.preventDefault();closeMenu();}
 if(event.key==='Tab'){
  const controls=[menu,...menuLinks],i=controls.indexOf(document.activeElement);
  event.preventDefault();controls[(i+(event.shiftKey?-1:1)+controls.length)%controls.length].focus();
 }
});
reduced.addEventListener('change',()=>{if(menuOpen)openMenu();});

// Direction-aware header, with a small threshold to ignore trackpad jitter.
const header=$('.header');
let previousHeaderY=Math.max(0,scrollY),headerTravel=0,headerDirection=0;
function showHeader(){header.classList.remove('is-scroll-hidden');}
function updateHeader(){
 const y=Math.max(0,Math.min(scrollY,document.documentElement.scrollHeight-innerHeight));
 const delta=y-previousHeaderY;previousHeaderY=y;
 header.classList.toggle('is-scrolled',y>40);
 if(menuOpen||document.documentElement.classList.contains('menu-open')||y<40){showHeader();headerTravel=0;return;}
 if(Math.abs(delta)<.5)return;
 const direction=Math.sign(delta);
 if(direction!==headerDirection){headerTravel=0;headerDirection=direction;}
 headerTravel+=Math.abs(delta);
 if(headerTravel> (direction<0?10:24)){
  const keyboardFocus=header.contains(document.activeElement)&&document.activeElement.matches(':focus-visible');
  header.classList.toggle('is-scroll-hidden',direction>0&&!keyboardFocus);
 }
}
header.addEventListener('focusin',showHeader);
window.addEventListener('scroll',updateHeader,{passive:true});
window.addEventListener('pageshow',()=>{previousHeaderY=Math.max(0,scrollY);updateHeader();});
updateHeader();

// Les seules fenêtres modales servent à agrandir une photo ou consulter la confidentialité.
function openDialog(id){const d=$(id);d.showModal();}
$$('.network-open').forEach(button=>button.addEventListener('click',()=>{
 const source=$('img',button),dialog=$('#photo-dialog');
 $('img',dialog).src=source.src;$('img',dialog).alt=source.alt;
 $('p',dialog).textContent=button.parentElement.querySelector('figcaption').textContent;
 dialog.setAttribute('aria-label','Photographie de la galerie');openDialog('#photo-dialog');
}));
$('#open-privacy').addEventListener('click',()=>openDialog('#privacy-dialog'));
$$('dialog').forEach(dialog=>{
  $('.dialog-close',dialog).addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
});

const materialTabs=$$('[role=tab]');
function selectTab(tab,focus=false){
  materialTabs.forEach(t=>{const active=t===tab;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;$('#'+t.getAttribute('aria-controls')).hidden=!active;});
  document.querySelector('#matieres').dataset.material=tab.id==='tab-pierres'?'pierres':'metaux';
  if(focus)tab.focus();
}
materialTabs.forEach((tab,i)=>{
  tab.addEventListener('click',()=>selectTab(tab));
  tab.addEventListener('keydown',e=>{let target;if(e.key==='ArrowRight')target=materialTabs[(i+1)%materialTabs.length];if(e.key==='ArrowLeft')target=materialTabs[(i+materialTabs.length-1)%materialTabs.length];if(e.key==='Home')target=materialTabs[0];if(e.key==='End')target=materialTabs.at(-1);if(target){e.preventDefault();selectTab(target,true);}});
});

// Le formulaire prépare un brief local : aucun faux envoi, aucune collecte.
const form=$('#project-form');form.noValidate=true;
let budget='À définir ensemble',brief='';
function invalidateBrief(){$('#brief-result').hidden=true;runtime.brief=null;brief='';}
$$('[data-budget]').forEach(b=>b.addEventListener('click',()=>{budget=b.dataset.budget;invalidateBrief();$$('[data-budget]').forEach(o=>{o.classList.toggle('active',o===b);o.setAttribute('aria-pressed',String(o===b));});}));
$('#jewel-type').addEventListener('change',invalidateBrief);
function fieldError(id,message){const input=$('#'+id);$('#'+id+'-error').textContent=message;input.setAttribute('aria-invalid',String(!!message));}
['name','idea'].forEach(id=>$('#'+id).addEventListener('input',()=>{if($('#'+id).getAttribute('aria-invalid')==='true')fieldError(id,'');invalidateBrief();}));
form.addEventListener('submit',e=>{
  e.preventDefault();const name=$('#name').value.trim(),idea=$('#idea').value.trim();
  fieldError('name',name?'':'Indiquez votre prénom pour personnaliser le brief.');
  fieldError('idea',idea.length>=10?'':'Décrivez votre idée en quelques mots (10 caractères minimum).');
  if(!name||idea.length<10){$('[aria-invalid=true]',form)?.focus();return;}
  brief=`MON PROJET DE BIJOU\n\nPrénom : ${name}\nPièce envisagée : ${$('#jewel-type').value}\nBudget envisagé : ${budget}\n\nMon idée\n${idea}\n\nÀ préciser ensemble\nForme, dimensions, métal, pierres, faisabilité, budget et modalités de réalisation.`;
  runtime.brief=brief;$('#brief-text').textContent=brief;$('#brief-result').hidden=false;$('#brief-status').textContent='Prêt à copier ou à enregistrer. Aucun message n’a été envoyé.';
  $('#brief-result').scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'nearest'});
});
$('#copy-brief').addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(brief);$('#brief-status').textContent='Brief copié. Vous pouvez le coller dans votre message.';}
  catch{$('#brief-status').textContent='La copie automatique est indisponible. Sélectionnez le texte ci-dessus pour le copier.';$('#brief-text').focus();}
});
$('#save-brief').addEventListener('click',()=>{
  const url=URL.createObjectURL(new Blob([brief],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='mon-projet-de-bijou.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$('#brief-status').textContent='Votre brief a été téléchargé.';
});

const processAssets=[['./assets/esquisse.jpg','Étude illustrative : esquisse du pendentif 93.','Étude illustrative · Le dessin'],['./assets/matieres-macro.jpg','Étude illustrative de pierres et nuances de métal.','Étude illustrative · Les matières'],['./assets/hero-cinema.jpg','Mise en scène de campagne du pendentif 93.','Mise en scène · La pièce']];
$$('.process-step').forEach(button=>button.addEventListener('click',()=>{const index=Number(button.dataset.process);$$('.process-step').forEach(b=>{const active=b===button;b.setAttribute('aria-expanded',String(active));$('#'+b.getAttribute('aria-controls')).hidden=!active;$('.process-sign',b).textContent=active?'−':'+';});const im=$('#process-image');im.src=processAssets[index][0];im.alt=processAssets[index][1];$('#process-caption').textContent=processAssets[index][2];if(!reduced.matches)gsap.fromTo(im,{clipPath:'inset(0 100% 0 0)',scale:1.06},{clipPath:'inset(0 0% 0 0)',scale:1,duration:1.1,ease:'expo.out',overwrite:true});}));
const motionContext=gsap.matchMedia();
motionContext.add('(prefers-reduced-motion: no-preference)',()=>{
 let disposed=false;
 const entry=gsap.timeline({paused:true,defaults:{ease:'power3.out'},onComplete:()=>{document.documentElement.classList.remove('hero-entering');clearTimeout(window.heroEntryFallback);}});
 entry.fromTo('.hero-necklace',{y:-65,rotation:-3,opacity:.15},{y:0,rotation:0,opacity:1,duration:1.8,ease:'power2.out'})
 .fromTo('.central-hero h1',{y:22,autoAlpha:0},{y:0,autoAlpha:1,duration:1},1.25)
 .fromTo('.central-hero .hero-description,.central-hero .text-link',{y:14,autoAlpha:0},{y:0,autoAlpha:1,duration:.85,stagger:.2},1.65);
 runtime.animations=[entry];
 Promise.race([$('.hero-necklace').decode().catch(()=>{}),new Promise(resolve=>setTimeout(resolve,3000))]).then(()=>{if(!disposed)entry.play();});
 return ()=>{disposed=true;entry.kill();};
});

// A single scroll passage: the object gives way to the next thought.
motionContext.add('(prefers-reduced-motion: no-preference)',()=>{
 const passage=$('.hero-passage'),copy=$('.hero-copy'),statement=$('.hero-statement');
 passage.classList.add('is-animated');
 const sequence=gsap.timeline({scrollTrigger:{trigger:passage,start:'top top',end:()=>'+='+Math.round(innerHeight*1.85),pin:true,scrub:1,invalidateOnRefresh:true,refreshPriority:10,onUpdate:self=>{copy.inert=self.progress>.18;}}});
 const revealAt=blenderPreview ? .78 : 0;
 if(blenderPreview)sequence.to(blenderPreview,{progress:1,duration:.9,ease:'none',onUpdate:blenderPreview.draw},0);
 sequence.fromTo(copy,{autoAlpha:1,y:0},{autoAlpha:0,y:-12,duration:.44,ease:'none',immediateRender:false},0)
 .to('.hero-art',{opacity:.12,scale:1.045,duration:.65,ease:'power1.inOut'},.08+revealAt)
 .fromTo(statement,{autoAlpha:0,y:90},{autoAlpha:1,y:0,duration:.62,ease:'power2.out'},.57+revealAt)
 .to({}, {duration:.28});
 runtime.heroPassage=sequence;
 return ()=>{passage.classList.remove('is-animated');copy.inert=false;};
});

 import('./motion-edition.js').then(m=>m.initEditorialMotion({gsap,ScrollTrigger,reduced,runtime}));

// La scène 3D n'est chargée qu'à l'approche de la section.
let jewelStarted=false;
const lazy=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)&&!jewelStarted){jewelStarted=true;lazy.disconnect();import('./jewel.js').then(m=>m.initJewel({gsap,ScrollTrigger,reduced,runtime})).catch(e=>{runtime.jewelError=e.message;$('#jewel-status').textContent='Vue photographique';});}},{rootMargin:'600px'});
lazy.observe($('#volume'));
window.addEventListener('pagehide',e=>{if(!e.persisted){smoothContext.revert();motionContext.revert();lazy.disconnect();runtime.disposeJewel?.();blenderPreview?.dispose();}});
