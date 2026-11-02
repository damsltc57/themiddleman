import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// Interprétation de la seule vue de face fournie. Unités arbitraires.
// Les objets sont regroupés pour une animation GSAP et un export GLB.
const NINE = [[-1.59,1.04],[-1.43,1.18],[-.18,1.18],[-.04,1.04],[-.04,-.98],[-.21,-1.15],[-1.43,-1.15],[-1.60,-.98],[-1.60,-.42],[-1.08,-.42],[-1.08,-.64],[-.58,-.64],[-.58,-.15],[-1.42,-.15],[-1.59,.03]];
const HOLE = [[-1.08,.66],[-.60,.66],[-.60,.23],[-1.08,.23]];
const THREE_SHAPE = [[.08,1.18],[1.41,1.18],[1.59,1.00],[1.59,-.97],[1.42,-1.15],[.08,-1.15],[.08,-.64],[.99,-.64],[.99,-.16],[.31,-.16],[.31,.30],[.99,.30],[.99,.67],[.08,.67]];

function rounded(points, radius=.065, hole=false) {
  const p = hole ? new THREE.Path() : new THREE.Shape();
  const corners=points.map((v,i)=>{
    const prev=points[(i+points.length-1)%points.length],next=points[(i+1)%points.length];
    const a=new THREE.Vector2(...v), b=new THREE.Vector2(...prev),c=new THREE.Vector2(...next);
    return {a, enter:a.clone().lerp(b,Math.min(.4,radius/a.distanceTo(b))),exit:a.clone().lerp(c,Math.min(.4,radius/a.distanceTo(c)))};
  });
  p.moveTo(corners[0].enter.x,corners[0].enter.y);
  for(const {a,enter,exit} of corners){p.lineTo(enter.x,enter.y);p.quadraticCurveTo(a.x,a.y,exit.x,exit.y);}
  p.closePath();return p;
}
function inside(x,y,points){let yes=false;for(let i=0,j=points.length-1;i<points.length;j=i++){const a=points[i],b=points[j];if(((a[1]>y)!==(b[1]>y))&&(x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0]))yes=!yes;}return yes;}
function edgeDistance(x,y,points){let d=Infinity;const p=new THREE.Vector2(x,y);for(let i=0;i<points.length;i++){const a=new THREE.Vector2(...points[i]),b=new THREE.Vector2(...points[(i+1)%points.length]);const ab=b.clone().sub(a);const t=THREE.MathUtils.clamp(p.clone().sub(a).dot(ab)/ab.lengthSq(),0,1);d=Math.min(d,p.distanceTo(a.addScaledVector(ab,t)));}return d;}
function diamondGeometry(radius=.026){
  const vertices=[],rings=[{r:.48*radius,z:.025},{r:radius,z:.006},{r:.97*radius,z:-.006}],n=8;
  function point(r,i){const a=2*Math.PI*i/n;return [Math.cos(a)*r.r,Math.sin(a)*r.r,r.z];}
  const tri=(a,b,c)=>vertices.push(...a,...b,...c);
  for(let i=0;i<n;i++){
    const next=(i+1)%n;
    tri([0,0,.025],point(rings[0],i),point(rings[0],next));
    for(let k=0;k<2;k++){tri(point(rings[k],i),point(rings[k+1],i),point(rings[k+1],next));tri(point(rings[k],i),point(rings[k+1],next),point(rings[k],next));}
    tri(point(rings[2],next),point(rings[2],i),[0,0,-.036]);
  }
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geo.computeVertexNormals();return geo;
}
function mesh(geometry,material,name){const m=new THREE.Mesh(geometry,material);m.name=name;return m;}

export function createPendant(){
  const root=new THREE.Group();root.name='Pendentif_93';
  root.userData={source:'Interprétation artistique depuis une photo de face',dimensions:'Unités arbitraires — dimensions réelles inconnues',version:2};
  const metal=new THREE.MeshStandardMaterial({name:'Metal_champagne',color:0xc8b08a,metalness:1,roughness:.24});
  const edgeMetal=new THREE.MeshStandardMaterial({name:'Metal_poli',color:0xddd0b4,metalness:1,roughness:.16});
  const gem=new THREE.MeshPhysicalMaterial({name:'Pierres_claires_interpretation',color:0xe5e1d8,metalness:.35,roughness:.13,clearcoat:1,clearcoatRoughness:.03,ior:2.4,transmission:.25,thickness:.06,envMapIntensity:1.25});
  const bodies=new THREE.Group();bodies.name='Corps';
  const pave=new THREE.Group();pave.name='Pavage';
  root.add(bodies,pave);
  const jewelGeo=diamondGeometry();
  const prongGeo=new THREE.SphereGeometry(.007,5,4);
  let gemCount=0;
  for(const [name,points,holes] of [['9',NINE,[HOLE]],['3',THREE_SHAPE,[]]]){
    const shape=rounded(points);for(const hole of holes)shape.holes.push(rounded(hole,.035,true));
    const body=mesh(new THREE.ExtrudeGeometry(shape,{depth:.22,bevelEnabled:true,bevelSegments:5,steps:1,bevelSize:.037,bevelThickness:.035,curveSegments:12}),metal,'Chiffre_'+name);
    bodies.add(body);
    const stones=[],prongs=[];
    let row=0;
    for(let y=-1.10;y<1.15;y+=.061,row++)for(let x=-1.6+(row%2)*.034;x<1.6;x+=.068){
      if(!inside(x,y,points)||edgeDistance(x,y,points)<.044||holes.some(h=>inside(x,y,h)||edgeDistance(x,y,h)<.044))continue;
      const angle=Math.sin(x*153.7+y*74.3)*.65;
      stones.push(jewelGeo.clone().rotateZ(angle).rotateX(Math.sin(x*41+y*73)*.13).rotateY(Math.cos(x*61-y*37)*.13).translate(x,y,.265));gemCount++;
      for(const [dx,dy] of [[-.023,-.019],[.023,.019]])prongs.push(prongGeo.clone().translate(x+dx,y+dy,.270));
    }
    const stoneMesh=mesh(mergeGeometries(stones),gem,'Pierres_'+name);stoneMesh.userData.explodeDirection=name==='9'?-1:1;pave.add(stoneMesh);
    pave.add(mesh(mergeGeometries(prongs),edgeMetal,'Griffes_'+name));
    for(const g of [...stones,...prongs])g.dispose();
  }
  jewelGeo.dispose();prongGeo.dispose();

  // Bélière ovale indépendante, orientée dans le plan vertical.
  const bail=new THREE.Group();bail.name='Beliere';bail.position.set(0,1.50,.045);
  const bailBody=mesh(new THREE.TorusGeometry(.22,.067,10,40),metal,'Beliere_metal');bailBody.scale.set(.72,1.4,1);bail.add(bailBody);
  const bailStones=[];const dg=diamondGeometry(.026);
  for(let i=0;i<24;i++){const a=i/24*Math.PI*2;bailStones.push(dg.clone().translate(Math.cos(a)*.22*.72,Math.sin(a)*.22*1.4,.064));}
  bail.add(mesh(mergeGeometries(bailStones),gem,'Beliere_pierres'));for(const g of bailStones)g.dispose();dg.dispose();root.add(bail);
  const connector=mesh(new THREE.TorusGeometry(.096,.026,8,20),edgeMetal,'Anneau_jonction');connector.position.set(0,1.18,.07);connector.rotation.y=Math.PI/2;bodies.add(connector);

  // Quatre brins hélicoïdaux par côté : évocation de la chaîne torsadée.
  const chain=new THREE.Group();chain.name='Chaine';root.add(chain);
  for(const side of [-1,1]){
    const center=new THREE.CatmullRomCurve3([new THREE.Vector3(side*.12,1.77,.01),new THREE.Vector3(side*.56,2.60,-.03),new THREE.Vector3(side*.91,4.0,-.10),new THREE.Vector3(side*1.40,6.3,-.24)]);
    for(let strand=0;strand<2;strand++){
      const pts=[];
      for(let i=0;i<=380;i++){
        const t=i/380,p=center.getPoint(t),tangent=center.getTangent(t).normalize(),across=new THREE.Vector3(tangent.y,-tangent.x,0).normalize();
        const a=t*Math.PI*2*19+strand*Math.PI;
        p.addScaledVector(across,Math.cos(a)*.072);p.z+=Math.sin(a)*.072;pts.push(p);
      }
      const path=new THREE.CatmullRomCurve3(pts);
      chain.add(mesh(new THREE.TubeGeometry(path,520,.048,8,false),strand%2?edgeMetal:metal,`Chaine_${side<0?'gauche':'droite'}_${strand+1}`));
    }
  }
  root.userData.stoneCount=gemCount+24;
  return {root,bodies,pave,bail,chain};
}
