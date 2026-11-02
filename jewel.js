import * as THREE from 'three';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export async function initJewel({gsap,ScrollTrigger,reduced,runtime}){
  const mount=document.querySelector('#jewel-canvas'),stage=document.querySelector('#jewel-stage'),status=document.querySelector('#jewel-status'),explodeButton=document.querySelector('#toggle-explode');
  const finishes={champagne:{color:0xd2bd94,label:'Champagne'},silver:{color:0xc8c9c6,label:'Argenté'},rose:{color:0xbb8b76,label:'Rosé'}};
  const state={explode:0,turn:-.18,intro:0};
  let renderer,controls,environment,scene,camera,model,scrollMotion,entryMotion,observer,resizeObserver,disposed=false,visible=true,manual=false;
  let pave,bodies,bail,chain;
  try{
    renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});
    renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<=767?1.5:1.75));renderer.setClearColor(0x11100e,0);renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.78;
    mount.appendChild(renderer.domElement);
    scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(31,1,.1,70);camera.position.set(0,.65,10);
    controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,.65,0);controls.enableDamping=true;controls.enablePan=false;controls.enableZoom=false;controls.minPolarAngle=.7;controls.maxPolarAngle=2.3;controls.touches.ONE=THREE.TOUCH.PAN;controls.touches.TWO=THREE.TOUCH.ROTATE;controls.update();

    // De larges panneaux de studio produisent des réflexions de forme lisible.
    const room=new THREE.Scene();room.background=new THREE.Color(0x55534f);
    const panelMaterial=new THREE.MeshBasicMaterial({color:new THREE.Color(3,2.8,2.5),side:THREE.DoubleSide});
    for(const [position,scale] of [[[-4,3,3],[2,7,1]],[[5,1,1],[1,6,1]],[[0,5,-2],[6,1,1]],[[1,-2,5],[3,.5,1]],[[0,2,6],[3,4,1]]]){const panel=new THREE.Mesh(new THREE.PlaneGeometry(scale[0],scale[1]),panelMaterial);panel.position.set(...position);panel.lookAt(0,0,0);room.add(panel);}const pmrem=new THREE.PMREMGenerator(renderer);environment=pmrem.fromScene(room,.035);scene.environment=environment.texture;scene.environmentIntensity=.9;room.traverse(o=>o.geometry?.dispose());panelMaterial.dispose();pmrem.dispose();
    const lights=[[0xffe3b9,1.7,[-3,4,5]],[0xdce7ef,.65,[4,1,2]],[0xf3c87d,2.4,[2,4,-3]]];
    lights.forEach(([color,power,position])=>{const light=new THREE.DirectionalLight(color,power);light.position.set(...position);scene.add(light);});

    const draco=new DRACOLoader().setDecoderPath('./vendor/draco/');
    let gltf;
    try { gltf=await new GLTFLoader().setDRACOLoader(draco).loadAsync('./assets/necklace-93-blender.glb'); } finally { draco.dispose(); }
    model=gltf.scene.getObjectByName('Pendentif_93_Blender') || gltf.scene;
    runtime.modelSource='Blender · necklace-93-blender.glb';
    if(disposed){model.traverse(o=>{o.geometry?.dispose();});return;}
    scene.add(model);model.rotation.set(-.04,-.18,-.045);
    pave=model.getObjectByName('Pavage');bodies=model.getObjectByName('Corps');bail=model.getObjectByName('Beliere');chain=model.getObjectByName('Chaine');
    if(!pave||!bodies||!bail||!chain)throw new Error('Les groupes du modèle sont incomplets');
    const initialBail=bail.position.clone(),initialChain=chain.position.clone();
    const metalMaterials=new Set(),allMaterials=new Set();
    model.traverse(o=>{if(o.isMesh){
      for(const mat of Array.isArray(o.material)?o.material:[o.material]){
        allMaterials.add(mat);
        if(mat.name.includes('Metal')){metalMaterials.add(mat);mat.color.setHex(finishes.champagne.color);mat.roughness=.2;mat.metalness=1;mat.envMapIntensity=1.2;}
        if(mat.name.includes('Pierres')){mat.color.setHex(0xbfc4cb);mat.roughness=.085;mat.flatShading=true;mat.metalness=.16;mat.transmission=.12;mat.ior=2.417;mat.thickness=.06;mat.clearcoat=0;mat.envMapIntensity=1.35;mat.dispersion=.035;}
      }
    }});
    const basePaveX=new Map(pave.children.map(o=>[o,o.position.x]));
    let lastChapter='';
    function apply(){
      if(disposed)return;
      const e=state.explode;
      pave.position.z=e*.95;
      for(const item of pave.children){item.position.x=basePaveX.get(item)+(item.name.endsWith('_9')?-1:item.name.endsWith('_3')?1:0)*e*.12;}
      for(const item of bodies.children){if(item.name.startsWith('Chiffre_'))item.position.x=(item.name.endsWith('_9')?-1:1)*e*.12;}
      bail.position.copy(initialBail);bail.position.y+=e*.32;bail.position.z+=e*.35;
      chain.position.copy(initialChain);chain.position.y+=e*.65;
      model.rotation.y=state.turn+state.intro;
      const chapter=e>.35?'Chaque détail trouve sa place.':'Une pièce, sous tous les angles.';
      if(chapter!==lastChapter){document.querySelector('#chapter-text').textContent=chapter;lastChapter=chapter;}
      explodeButton.setAttribute('aria-pressed',String(e>.5));explodeButton.firstChild.textContent=e>.5?'Rassembler la pièce ':'Séparer les éléments ';
      runtime.explode=e;runtime.turn=state.turn;
    }
    function frame(){if(disposed||!visible)return;controls.update();renderer.render(scene,camera);}
    function resize(){
      const w=mount.clientWidth,h=mount.clientHeight;if(!w||!h)return;
      renderer.setSize(w,h);camera.aspect=w/h;
      const horizontal=3.95/(2*Math.tan(THREE.MathUtils.degToRad(camera.fov/2))*camera.aspect);
      camera.position.z=Math.max(innerWidth<=767?9:11.9,horizontal);camera.position.y=1.15;controls.target.y=1.15;camera.updateProjectionMatrix();controls.update();
    }
    function buildMotion(){
      scrollMotion?.scrollTrigger?.kill();scrollMotion?.kill();entryMotion?.scrollTrigger?.kill();entryMotion?.kill();gsap.killTweensOf(state);
      state.explode=0;state.turn=-.18;state.intro=0;manual=false;
      if(!reduced.matches){
        entryMotion=gsap.fromTo(state,{intro:-.40},{intro:0,duration:1.4,ease:'power3.out',onUpdate:apply,scrollTrigger:{trigger:'#volume',start:'top 65%',once:true}});
        scrollMotion=gsap.timeline({onUpdate:apply,scrollTrigger:{trigger:'#volume',start:'top top',end:'bottom bottom',scrub:.65,invalidateOnRefresh:true}})
          .to(state,{explode:0,turn:.06,duration:.18,ease:'none'})
          .to(state,{explode:1,turn:.38,duration:.35,ease:'power1.inOut'})
          .to(state,{explode:1,turn:.51,duration:.18,ease:'none'})
          .to(state,{explode:0,turn:-.14,duration:.29,ease:'power2.inOut'});
      }
      apply();resize();ScrollTrigger.refresh();
    }
    function takeControl(){if(!manual){manual=true;scrollMotion?.scrollTrigger.disable(false);entryMotion?.kill();state.intro=0;}gsap.killTweensOf(state);}
    function rotate(amount){takeControl();if(reduced.matches){state.turn+=amount;apply();}else gsap.to(state,{turn:state.turn+amount,duration:.6,ease:'power2.out',onUpdate:apply});}
    document.querySelector('#rotate-left').addEventListener('click',()=>rotate(-.35));document.querySelector('#rotate-right').addEventListener('click',()=>rotate(.35));
    explodeButton.addEventListener('click',()=>{takeControl();const target=state.explode>.5?0:1;if(reduced.matches){state.explode=target;apply();}else gsap.to(state,{explode:target,duration:1.05,ease:'power3.inOut',onUpdate:apply});});
    // Revenir au scroll lors d’un geste de défilement, sans empêcher le geste natif.
    const resumeScroll=()=>{if(manual&&scrollMotion&&!reduced.matches){manual=false;gsap.killTweensOf(state);scrollMotion.scrollTrigger.enable();ScrollTrigger.update();}};
    window.addEventListener('wheel',resumeScroll,{passive:true});window.addEventListener('touchmove',resumeScroll,{passive:true});
    document.querySelectorAll('[data-finish]').forEach(button=>button.addEventListener('click',()=>{
      const finish=finishes[button.dataset.finish];
      metalMaterials.forEach(mat=>{const color=new THREE.Color(finish.color);if(reduced.matches)mat.color.copy(color);else gsap.to(mat.color,{r:color.r,g:color.g,b:color.b,duration:.7});});
      document.querySelectorAll('[data-finish]').forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',String(b===button));});document.querySelector('.finish-label').textContent=finish.label;
    }));
    resizeObserver=new ResizeObserver(resize);resizeObserver.observe(mount);
    observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)frame();},{rootMargin:'150px'});observer.observe(stage);
    renderer.setAnimationLoop(frame);reduced.addEventListener('change',buildMotion);buildMotion();
    stage.classList.add('ready');status.textContent='Volume interactif';runtime.jewelLoaded=true;
    runtime.jewel={model,camera,scene,renderer,state,apply,controls,scrollMotion};
    const contextLost=e=>{e.preventDefault();stage.classList.remove('ready');status.textContent='Vue photographique';runtime.jewelError='Contexte WebGL interrompu';};
    renderer.domElement.addEventListener('webglcontextlost',contextLost);
    runtime.disposeJewel=()=>{
      if(disposed)return;disposed=true;scrollMotion?.scrollTrigger?.kill();scrollMotion?.kill();entryMotion?.scrollTrigger?.kill();entryMotion?.kill();gsap.killTweensOf(state);allMaterials.forEach(m=>gsap.killTweensOf(m.color));reduced.removeEventListener('change',buildMotion);window.removeEventListener('wheel',resumeScroll);window.removeEventListener('touchmove',resumeScroll);resizeObserver.disconnect();observer.disconnect();renderer.setAnimationLoop(null);controls.dispose();model.traverse(o=>o.geometry?.dispose());allMaterials.forEach(m=>m.dispose());environment.dispose();renderer.dispose();runtime.jewelLoaded=false;
    };
  }catch(error){
    runtime.jewelError=error.message;status.textContent='Vue photographique';stage.classList.remove('ready');renderer?.dispose();renderer?.domElement.remove();environment?.dispose();
    document.querySelectorAll('.volume-controls button').forEach(b=>{b.disabled=true;});
  }
}
