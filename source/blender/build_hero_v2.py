import bpy, math, random
from mathutils import Vector
from pathlib import Path
OUT=Path(__file__).resolve().parents[2]
random.seed(93)
s=bpy.data.scenes.new('themiddleman21 · 93 · Hero V2')
bpy.context.window.scene=s
s.render.engine='CYCLES';s.cycles.samples=96;s.cycles.use_denoising=True
s.render.resolution_x=1024;s.render.resolution_y=1536;s.render.resolution_percentage=100
s.world=bpy.data.worlds.new('Studio noir');s.world.use_nodes=True
next(n for n in s.world.node_tree.nodes if n.type=='BACKGROUND').inputs[0].default_value=(.18,.12,.06,1)
next(n for n in s.world.node_tree.nodes if n.type=='BACKGROUND').inputs[1].default_value=.35
s.view_settings.view_transform='AgX'
def mat(name,col,metal,rough):
 m=bpy.data.materials.new(name);m.diffuse_color=(*col,1);m.use_nodes=True
 n=next(n for n in m.node_tree.nodes if n.type=='BSDF_PRINCIPLED');n.inputs['Base Color'].default_value=(*col,1);n.inputs['Metallic'].default_value=metal;n.inputs['Roughness'].default_value=rough
 return m
metal=mat('Metal · Or champagne poli',(.83,.55,.19),1,.18)
edge=mat('Metal · Sertissage',(.85,.57,.22),1,.19)
gem=mat('Pierres · Taille brillant',(.95,.85,.68),.97,.085)
n=next(n for n in gem.node_tree.nodes if n.type=='BSDF_PRINCIPLED');n.inputs['IOR'].default_value=2.417;n.inputs['Transmission Weight'].default_value=.06
n.inputs['Coat Weight'].default_value=.12
silver=mat('Platine sous les pierres',(.72,.75,.79),.85,.17)
substrate=mat('Fond microserti champagne',(.50,.31,.12),.82,.3)
nt=substrate.node_tree;n=next(n for n in nt.nodes if n.type=='BSDF_PRINCIPLED')
coord=nt.nodes.new('ShaderNodeTexCoord');noise=nt.nodes.new('ShaderNodeTexNoise');noise.inputs['Scale'].default_value=155;noise.inputs['Detail'].default_value=2
nt.links.new(coord.outputs['Generated'],noise.inputs['Vector'])
ramp=nt.nodes.new('ShaderNodeValToRGB');ramp.color_ramp.elements[0].position=.28;ramp.color_ramp.elements[0].color=(.10,.04,.008,1);ramp.color_ramp.elements[1].position=.68;ramp.color_ramp.elements[1].color=(.72,.52,.28,1)
nt.links.new(noise.outputs['Fac'],ramp.inputs['Fac']);nt.links.new(ramp.outputs['Color'],n.inputs['Base Color'])
bump=nt.nodes.new('ShaderNodeBump');bump.inputs['Strength'].default_value=.5;bump.inputs['Distance'].default_value=.017
nt.links.new(noise.outputs['Fac'],bump.inputs['Height']);nt.links.new(bump.outputs['Normal'],n.inputs['Normal'])
engraved=mat('Metal · Motifs gravés',(.20,.12,.045),1,.26)
def empty(name,parent=None):
 o=bpy.data.objects.new(name,None);s.collection.objects.link(o);o.parent=parent;return o
root=empty('Pendentif_93_Blender');bodies=empty('Corps',root);pave=empty('Pavage',root);bail=empty('Beliere',root);chain=empty('Chaine',root)
root['source']='Reconstruction artistique depuis la photographie fournie. Dos et dimensions interprétés.'
N=[(-1.59,1.04),(-1.43,1.18),(-.18,1.18),(-.04,1.04),(-.04,-.98),(-.21,-1.15),(-1.43,-1.15),(-1.60,-.98),(-1.60,-.42),(-1.08,-.42),(-1.08,-.64),(-.58,-.64),(-.58,-.15),(-1.42,-.15),(-1.59,.03)]
H=[(-.98,.60),(-.64,.60),(-.64,.26),(-.98,.26)]
T=[(.08,1.18),(1.41,1.18),(1.59,1),(1.59,-.97),(1.42,-1.15),(.08,-1.15),(.08,-.64),(.99,-.64),(.99,-.16),(.31,-.16),(.31,.30),(.99,.30),(.99,.67),(.08,.67)]
def mesh(name,vs,fs,material,parent):
 data=bpy.data.meshes.new(name);data.from_pydata(vs,[],fs);data.update();o=bpy.data.objects.new(name,data);s.collection.objects.link(o);o.parent=parent;data.materials.append(material);return o
# Rounded polygonal outlines, including the open counter in the nine.
def rounded(points,r=.065):
 out=[]
 for i,p in enumerate(points):
  p=Vector(p);prev=Vector(points[i-1]);nxt=Vector(points[(i+1)%len(points)])
  a=p+(prev-p).normalized()*min(r,(prev-p).length*.3);b=p+(nxt-p).normalized()*min(r,(nxt-p).length*.3)
  for j in range(6):
   t=j/5;v=(1-t)**2*a+2*t*(1-t)*p+t*t*b;out.append(v)
 return out
for name,poly,holes in [('9',N,[H]),('3',T,[])]:
 c=bpy.data.curves.new('Contour '+name,'CURVE');c.dimensions='2D';c.resolution_u=2;c.fill_mode='BOTH';c.extrude=.105;c.bevel_depth=.026;c.bevel_resolution=3
 for pts in [poly]+holes:
  sp=c.splines.new('POLY');rp=rounded(pts);sp.points.add(len(rp)-1)
  for p,v in zip(sp.points,rp):p.co=(v.x,v.y,0,1)
  sp.use_cyclic_u=True
 o=bpy.data.objects.new('Chiffre_'+name,c);s.collection.objects.link(o);o.parent=bodies;c.materials.append(metal);o.location.z=.105
 bpy.context.view_layer.objects.active=o;o.select_set(True);bpy.ops.object.convert(target='MESH');o.select_set(False)
 o.data.materials.append(substrate)
 for f in o.data.polygons:
  f.use_smooth=True
  if f.normal.z>.8:f.material_index=1
 bevel=o.modifiers.new('Arêtes joaillières','WEIGHTED_NORMAL')

def inside(x,y,pts):
 hit=False
 for a,b in zip(pts,pts[1:]+pts[:1]):
  if (a[1]>y)!=(b[1]>y) and x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0]:hit=not hit
 return hit
def dist(x,y,pts):
 p=Vector((x,y));d=99
 for a,b in zip(pts,pts[1:]+pts[:1]):
  a,b=Vector(a),Vector(b);v=b-a;t=max(0,min(1,(p-a).dot(v)/v.length_squared));d=min(d,(p-a-t*v).length)
 return d
# Individual round-brilliant cuts, batched into two meshes for browser performance.
def stone(vs,fs,x,y,z,r,angle=0):
 start=len(vs);rings=[(.46,.020),(1,.003),(.98,-.006),(.08,-.036)]
 for rr,h in rings:
  for i in range(8):
   a=i*math.tau/8+angle;vs.append((x+r*rr*math.cos(a),y+r*rr*math.sin(a),z+h*r/.03))
 # Slightly varied setting angles give each cut a distinct reflection.
 tilt=random.uniform(-.42,.42)
 for k in range(start,len(vs)):
  vx,vy,vz=vs[k];dz=vz-z;dy=vy-y
  vs[k]=(vx,y+dy*math.cos(tilt)-dz*math.sin(tilt),z+dy*math.sin(tilt)+dz*math.cos(tilt))
 fs.append(tuple(start+i for i in range(8)))
 for k in range(3):
  for i in range(8):
   j=(i+1)%8;a=start+k*8+i;b=start+k*8+j;c=start+(k+1)*8+j;d=start+(k+1)*8+i
   fs.extend([(c,b,a),(d,c,a)])
 fs.append(tuple(start+24+i for i in reversed(range(8))))
def bead(vs,fs,x,y,z,r):
 start=len(vs);vs.extend([(x+r,y,z),(x,y+r,z),(x-r,y,z),(x,y-r,z),(x,y,z+r),(x,y,z-r)])
 for i in range(4):fs.extend([(start+i,start+(i+1)%4,start+4),(start+(i+1)%4,start+i,start+5)])
# Larger inset princess cuts are reserved before laying the varied round pavé.
accents=[(-1.15,.88,0),(-.25,.89,math.pi/4),(-1.28,.48,0),(-1.24,.05,math.pi/4),(-.24,.05,math.pi/4),(-1.23,-.88,math.pi/4),(-.26,-.90,0),(.40,.91,math.pi/4),(1.26,.88,0),(1.25,-.05,math.pi/4),(.40,-.90,math.pi/4),(1.26,-.88,0)]
count=0
for name,poly,holes in [('9',N,[H]),('3',T,[])]:
 vs=[];fs=[];pv=[];pf=[];placed=[];cells={}
 def place(x,y,r):
  global count
  if not inside(x,y,poly) or dist(x,y,poly)<r+.025 or any(inside(x,y,h) or dist(x,y,h)<r+.025 for h in holes):return
  if any(math.hypot(x-ax,y-ay)<r+.11 for ax,ay,_ in accents):return
  ix=int((x+2)/.12);iy=int((y+2)/.12)
  for gx in range(ix-1,ix+2):
   for gy in range(iy-1,iy+2):
    for xx,yy,rr in cells.get((gx,gy),[]):
     if (x-xx)**2+(y-yy)**2<(r+rr+.004)**2:return
  cells.setdefault((ix,iy),[]).append((x,y,r));placed.append((x,y,r))
  stone(vs,fs,x,y,.259,r*1.13,random.random()*math.tau);count+=1
  for a in [0,math.pi/2,math.pi,3*math.pi/2]:bead(pv,pf,x+(r+.003)*math.cos(a),y+(r+.003)*math.sin(a),.270,.009)
 # Larger gems form a continuous rim, then progressively smaller infill.
 for a,b in zip(poly,poly[1:]+poly[:1]):
  va,vb=Vector(a),Vector(b);delta=vb-va
  for k in range(max(1,int(delta.length/.087))):
   v=va+delta*(k+.5)/max(1,int(delta.length/.087));normal=Vector((-delta.y,delta.x)).normalized()
   for sign in [-1,1]:
    q=v+sign*normal*.073;place(q.x,q.y,.036)
 for lo,hi,attempts in [(.025,.041,5000),(.015,.023,7500),(.009,.014,10000)]:
  for _ in range(attempts):place(random.uniform(-1.58,1.58),random.uniform(-1.13,1.16),random.uniform(lo,hi))
 mesh('Pierres_'+name,vs,fs,gem,pave);mesh('Griffes_'+name,pv,pf,edge,pave)
# Closed tubes for the rope links, bail and incised motifs.
def tube(vs,fs,pts,r,sides=8):
 start=len(vs);n=len(pts)
 for i,p in enumerate(pts):
  p=Vector(p);t=(Vector(pts[(i+1)%n])-Vector(pts[i-1])).normalized();u=t.cross(Vector((0,0,1)))
  if u.length<.01:u=t.cross(Vector((0,1,0)))
  u.normalize();v=t.cross(u).normalized()
  for j in range(sides):vs.append(tuple(p+r*(u*math.cos(j*math.tau/sides)+v*math.sin(j*math.tau/sides))))
 for i in range(n):
  for j in range(sides):fs.append((start+i*sides+j,start+i*sides+(j+1)%sides,start+((i+1)%n)*sides+(j+1)%sides,start+((i+1)%n)*sides+j))
# Individual interlocked oval links: each link is a separate closed gold mesh.
# Sample the U by arc length so the links keep the same spacing at the bottom.
path=[Vector((1.80*(-1+i/2000),1.98+4.5*(-1+i/2000)**2,0)) for i in range(4001)]
lengths=[0]
for i in range(1,len(path)):lengths.append(lengths[-1]+(path[i]-path[i-1]).length)
import bisect
spacing=.19
number=int(lengths[-1]/spacing)+1
sv=[];sf=[];prv=[];prf=[]
for link in range(number):
 distance=link*lengths[-1]/(number-1)
 idx=max(1,min(len(path)-2,bisect.bisect_left(lengths,distance)))
 center=path[idx];axis=(path[idx+1]-path[idx-1]).normalized()
 side=Vector((axis.y,-axis.x,0))
 # Consecutive links turn in the same direction around the chain axis.
 # Each closed ring is also gently twisted, producing a rope-chain construction.
 phase=link*math.pi*.60
 radial=side*math.cos(phase)+Vector((0,0,math.sin(phase)))
 cross=axis.cross(radial).normalized()
 center=center+radial*.075
 pts=[]
 for j in range(96):
  a=j*math.tau/96
  pts.append(center+axis*(.255*math.cos(a))+radial*(.17*math.sin(a))+cross*(.060*math.sin(2*a)))
 vs=[];fs=[];tube(vs,fs,pts,.072,12)
 o=mesh('Maillon torsade %02d'%link,vs,fs,metal,chain)
 for face in o.data.polygons:face.use_smooth=True
 # Pavé sits on the curved upper surface of each link, leaving polished gold sides.
 for j in range(0,96,3):
  pt=pts[j];tangent=(pts[(j+1)%96]-pts[(j-1)%96]).normalized()
  up=(Vector((0,0,1))-tangent*tangent.z).normalized()
  lateral=tangent.cross(up).normalized()
  for offset in [-.025,.025]:
   normal=(up*.93+lateral*(offset/.065)).normalized()
   q=pt+normal*.072
   start=len(sv);stone(sv,sf,0,0,0,.022,random.random()*6)
   for k in range(start,len(sv)):
    x,y,z=sv[k];sv[k]=tuple(q+lateral*x+tangent*y+normal*z)
   bead(prv,prf,*(q+lateral*.022+normal*.004),.006)
mesh('Diamants des maillons',sv,sf,gem,chain);mesh('Griffes des maillons',prv,prf,edge,chain)
root['chaine']='Maillons ovales fermes individuels entrelaces, alternance de plans, pavage sur la face superieure.'
# Wide hinged pavé strap. Pivot is the top of the bail.
bail.location=(0,2.28,.12)
vs=[];fs=[]
# Flattened oval hoop in depth, broad front face.
for i in range(96):
 a=i*math.tau/96
 for x in [-.195,.195]:vs.append((x,-.525+.525*math.cos(a),.17*math.sin(a)))
for i in range(96):
 j=(i+1)%96;fs.append((2*i,2*j,2*j+1,2*i+1))
back=empty('Dos fixe de la beliere',chain);back.location=bail.location
rear=mesh('Dos du ruban',vs,fs[48:],metal,back)
solid=rear.modifiers.new('Epaisseur','SOLIDIFY');solid.thickness=.055
o=mesh('Beliere ruban',vs,fs[:48],metal,bail)
sol=o.modifiers.new('Epaisseur','SOLIDIFY');sol.thickness=.055
bev=o.modifiers.new('Bords polis','BEVEL');bev.width=.025;bev.segments=3
vs=[];fs=[]
for row in range(18):
 y=-.06-row*.055
 z=.17*math.sqrt(max(0,1-((y+.525)/.525)**2))+.035
 for x in [-.14,-.07,0,.07,.14]:stone(vs,fs,x,y,z,.030,random.random()*6)
mesh('Pavage de la beliere',vs,fs,gem,bail)
vs=[];fs=[];tube(vs,fs,[(0,1.20+.11*math.cos(i*math.tau/48),.08+.11*math.sin(i*math.tau/48)) for i in range(48)],.033,12);mesh('Jonction',vs,fs,edge,bodies)
# Raised gold princess-cut bezels rather than dark engraved outlines.
vs=[];fs=[];av=[];af=[]
for x,y,angle in accents:
 pts=[(x+.09*math.cos(angle+math.pi/4+i*math.tau/4),y+.09*math.sin(angle+math.pi/4+i*math.tau/4),.30) for i in range(4)]
 tube(vs,fs,pts,.025,10)
 start=len(av)
 for rr,zz in [(.036,.332),(.067,.302),(.052,.278)]:
  for i in range(4):
   a=angle+math.pi/4+i*math.tau/4;av.append((x+rr*math.cos(a),y+rr*math.sin(a),zz))
 af.append(tuple(start+i for i in range(4)))
 for k in range(2):
  for i in range(4):
   j=(i+1)%4;af.append((start+k*4+j,start+k*4+i,start+(k+1)*4+i,start+(k+1)*4+j))
mesh('Montures princess or',vs,fs,edge,pave);mesh('Diamants princess',av,af,gem,pave)
# Camera and softboxes are separate from the exported model.
def aim(o,p):o.rotation_euler=(Vector(p)-o.location).to_track_quat('-Z','Y').to_euler()
camdata=bpy.data.cameras.new('Portrait 85mm');cam=bpy.data.objects.new('Portrait 85mm',camdata);s.collection.objects.link(cam);cam.location=(0,1.88,18);cam.rotation_euler=(0,0,0);camdata.type='ORTHO';camdata.ortho_scale=7.3;s.camera=cam
for name,pos,power,size,color in [('Key',(-4,4,7),1900,4,(1,.84,.61)),('Strip',(4,2,4),1600,3,(1,.91,.75)),('Top',(0,7,1),2100,3,(1,.82,.52)),('Front',(0,1.5,8),100,4,(1,.96,.87))]:
 d=bpy.data.lights.new(name,'AREA');d.energy=power;d.shape='RECTANGLE';d.size=size;d.size_y=size*.12;d.color=color;o=bpy.data.objects.new(name,d);s.collection.objects.link(o);o.location=pos;aim(o,(0,1,0))
s.render.film_transparent=True
s.render.image_settings.file_format='PNG';s.render.filepath=str(OUT/'source/blender/necklace-studio.png')

# Reversible opening / suspended pendant motion, baked for a web sequence.
s.frame_start=1;s.frame_end=40
for frame,opening,drop in [(1,0,0),(10,.18,.025),(32,1,.42),(40,1,.42)]:
 bail.rotation_euler.x=-opening*.95;bail.keyframe_insert(data_path='rotation_euler',frame=frame)
 for group in [bodies,pave]:
  group.location.y=-drop;group.rotation_euler.z=-opening*.025
  group.keyframe_insert(data_path='location',frame=frame);group.keyframe_insert(data_path='rotation_euler',frame=frame)
s.frame_set(1)
s.render.filepath=str(OUT/'source/blender/hero-v2-still.png')
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'source/blender/themiddleman21-93-hero-v2.blend'))
result={'scene':s.name,'frames':40,'blend':str(OUT/'source/blender/themiddleman21-93-hero-v2.blend')}
