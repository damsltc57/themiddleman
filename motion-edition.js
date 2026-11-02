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
 mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)',()=>{
  gsap.fromTo('.atelier-media',{clipPath:'inset(10% 8% 10% 8%)'},{clipPath:'inset(0% 0% 0% 0%)',ease:'none',scrollTrigger:{trigger:'.atelier',start:'top 85%',end:'top 10%',scrub:.8}});
 });
 mm.add('(prefers-reduced-motion: no-preference)',()=>{
  gsap.fromTo('.footer-signature',{clipPath:'inset(0 0 65% 0)',y:30},{clipPath:'inset(0 0 0% 0)',y:0,duration:1.3,ease:'expo.out',scrollTrigger:{trigger:'.footer-signature',start:'top 92%',once:true}});
 });
 runtime.editorialMotion=mm;
 document.fonts.ready.then(()=>ScrollTrigger.refresh());
 window.addEventListener('pagehide',e=>{if(!e.persisted)mm.revert();},{once:true});
}
