export function initEditorialMotion({gsap,ScrollTrigger,reduced,runtime}){
 const mm=gsap.matchMedia();
 mm.add('(prefers-reduced-motion: no-preference)',()=>{
  const track=document.querySelector('.gallery-track'),brand=document.querySelector('.network-brand');
  const travel=()=>Math.max(0,track.scrollWidth-innerWidth);
  const gallery=gsap.timeline({scrollTrigger:{trigger:'.motion-gallery',start:'top top',end:()=>'+='+Math.max(900,travel()*1.25),pin:true,scrub:.8,invalidateOnRefresh:true}});
  gallery.to(track,{x:()=>-travel(),ease:'none',duration:1},0)
   .to(brand,{x:()=>-Math.max(120,brand.scrollWidth-innerWidth+100),ease:'none',duration:1},0);
  runtime.galleryMotion=gallery;
 });
 mm.add('(min-width: 768px)',()=>{
  const frames=gsap.utils.toArray('.journey-frame');
  const show=i=>frames.forEach((frame,n)=>frame.classList.toggle('is-active',i===n));
  gsap.utils.toArray('.journey-step').forEach((step,i)=>{
   ScrollTrigger.create({trigger:step,start:'top 55%',end:'bottom 55%',onEnter:()=>show(i),onEnterBack:()=>show(i)});
  });
 });
 mm.add('(prefers-reduced-motion: no-preference)',()=>{
  gsap.utils.toArray('.journey-step').forEach(step=>gsap.fromTo(step,{opacity:0,y:22},{opacity:1,y:0,duration:.8,ease:'power2.out',scrollTrigger:{trigger:step,start:'top 88%',once:true}}));
 });
 mm.add('(prefers-reduced-motion: no-preference)',()=>{
  gsap.fromTo('.campaign-wordmark',{clipPath:'inset(0 0 65% 0)',y:30},{clipPath:'inset(0 0 0% 0)',y:0,duration:1.3,ease:'expo.out',scrollTrigger:{trigger:'.campaign-wordmark',start:'top 92%',once:true}});
 });
 mm.add({desktop:'(min-width: 768px)',mobile:'(max-width: 767px)',motion:'(prefers-reduced-motion: no-preference)'},context=>{
  if(!context.conditions.motion)return;
  const section=document.querySelector(context.conditions.desktop?'.founder-desktop':'.founder-mobile');
  if(!section)return;
  gsap.fromTo(section.querySelector('h2'),{opacity:0,y:26},{opacity:1,y:0,duration:1,ease:'power2.out',scrollTrigger:{trigger:section,start:'top 75%',once:true}});
  if(context.conditions.mobile){
   gsap.fromTo(section.querySelector('.signature-photo'),{opacity:0,y:35},{opacity:.85,y:0,duration:1.3,ease:'power2.out',scrollTrigger:{trigger:section,start:'top 70%',once:true}});
  }else{
   section.querySelectorAll('.duo-grid figure').forEach(fig=>gsap.fromTo(fig,{clipPath:'inset(8% 0 0 0)',opacity:0},{clipPath:'inset(0% 0 0 0)',opacity:1,duration:1.1,ease:'power2.out',scrollTrigger:{trigger:fig,start:'top 85%',once:true}}));
  }
 });
 runtime.editorialMotion=mm;
 document.fonts.ready.then(()=>ScrollTrigger.refresh());
 window.addEventListener('pagehide',e=>{if(!e.persisted)mm.revert();},{once:true});
}
