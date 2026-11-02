// The Blender study is opt-in until its photographic finish is approved.
export function initBlenderPreview(image, reduced) {
 if(new URLSearchParams(location.search).get('hero')!=='blender')return null;
 const original=image.src, frames=Array(32), state={progress:0,ready:false,frame:0};
 const url=i=>new URL(`./assets/hero-blender-v2/${String(i).padStart(3,'0')}.webp?v=rope-links-20261102`,import.meta.url).href;
 image.src=url(0);
 image.alt='Étude Blender du collier 93 : chaîne torsadée et pendentif pavé.';
 let disposed=false, next=0;
 function draw(){
  if(disposed)return;
  const target=reduced.matches?0:Math.round(Math.max(0,Math.min(1,state.progress))*31);
  if(frames[target]){image.src=frames[target].src;state.frame=target;}
 }
 async function worker(){
  while(next<32&&!disposed){
   const i=next++, frame=new Image();frame.src=url(i);
   try{await frame.decode();frames[i]=frame;if(i===0||i===Math.round(state.progress*31))draw();}
   catch{state.error=`Frame ${i} unavailable`;}
  }
 }
 state.readyPromise=Promise.all(Array.from({length:4},worker)).then(()=>{state.ready=frames.filter(Boolean).length===32;draw();});
 reduced.addEventListener('change',draw);
 state.draw=draw;
 state.dispose=()=>{disposed=true;reduced.removeEventListener('change',draw);image.src=original;};
 return state;
}
