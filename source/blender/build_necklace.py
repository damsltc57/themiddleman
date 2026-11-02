import bpy, math, random
from mathutils import Vector
from pathlib import Path
OUT=Path(__file__).resolve().parents[2]
random.seed(93)
s=bpy.data.scenes.new('themiddleman21 · 93 · Studio')
bpy.context.window.scene=s
s.render.engine='CYCLES';s.cycles.samples=64
s.render.resolution_x=1024;s.render.resolution_y=1536;s.render.resolution_percentage=100
s.world=bpy.data.worlds.new('Studio noir');s.world.use_nodes=True
next(n for n in s.world.node_tree.nodes if n.type=='BACKGROUND').inputs[0].default_value=(.12,.10,.08,1)
next(n for n in s.world.node_tree.nodes if n.type=='BACKGROUND').inputs[1].default_value=.35
s.view_settings.view_transform='AgX'
def mat(name,col,metal,rough):
 m=bpy.data.materials.new(name);m.diffuse_color=(*col,1);m.use_nodes=True
 n=next(n for n in m.node_tree.nodes if n.type=='BSDF_PRINCIPLED');n.inputs['Base Color'].default_value=(*col,1);n.inputs['Metallic'].default_value=metal;n.inputs['Roughness'].default_value=rough
 return m
metal=mat('Metal · Or champagne poli',(.72,.53,.28),1,.19)
edge=mat('Metal · Sertissage',(.85,.72,.48),1,.16)
gem=mat('Pierres · Taille brillant',(.8,.86,.94),.12,.075)
n=next(n for n in gem.node_tree.nodes if n.type=='BSDF_PRINCIPLED');n.inputs['IOR'].default_value=2.417;n.inputs['Transmission Weight'].default_value=.72
n.inputs['Coat Weight'].default_value=.35
engraved=mat('Metal · Motifs gravés',(.20,.12,.045),1,.26)
def empty(name,parent=None):
 o=bpy.data.objects.new(name,None);s.collection.objects.link(o);o.parent=parent;return o
root=empty('Pendentif_93_Blender');bodies=empty('Corps',root);pave=empty('Pavage',root);bail=empty('Beliere',root);chain=empty('Chaine',root)
root['source']='Reconstruction artistique depuis la photographie fournie. Dos et dimensions interprétés.'
N=[(-1.59,1.04),(-1.43,1.18),(-.18,1.18),(-.04,1.04),(-.04,-.98),(-.21,-1.15),(-1.43,-1.15),(-1.60,-.98),(-1.60,-.42),(-1.08,-.42),(-1.08,-.64),(-.58,-.64),(-.58,-.15),(-1.42,-.15),(-1.59,.03)]
H=[(-1.08,.66),(-.60,.66),(-.60,.23),(-1.08,.23)]
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
 for f in o.data.polygons:f.use_smooth=True
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
   a=i*math.tau/8+angle;vs.append((x+r*rr*math.cos(a),y+r*rr*math.sin(a),z+h))
 fs.append(tuple(start+i for i in reversed(range(8))))
 for k in range(3):
  for i in range(8):
   j=(i+1)%8;a=start+k*8+i;b=start+k*8+j;c=start+(k+1)*8+j;d=start+(k+1)*8+i
   fs.extend([(a,b,c),(a,c,d)])
 fs.append(tuple(start+24+i for i in range(8)))
def bead(vs,fs,x,y,z,r):
 start=len(vs);vs.extend([(x+r,y,z),(x,y+r,z),(x-r,y,z),(x,y-r,z),(x,y,z+r),(x,y,z-r)])
 for i in range(4):fs.extend([(start+i,start+(i+1)%4,start+4),(start+(i+1)%4,start+i,start+5)])
count=0
for name,poly,holes in [('9',N,[H]),('3',T,[])]:
 vs=[];fs=[];pv=[];pf=[]
 for row in range(40):
  y=-1.10+row*.057
  for col in range(56):
   x=-1.57+col*.058+(row%2)*.029
   if not inside(x,y,poly) or dist(x,y,poly)<.039 or any(inside(x,y,h) or dist(x,y,h)<.038 for h in holes):continue
   stone(vs,fs,x,y,.252,.0255,random.random()*math.tau);count+=1
   for dx,dy in [(-.023,-.017),(.023,.017)]:bead(pv,pf,x+dx,y+dy,.263,.008)
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
# Real interlocked oval links follow the V, with alternating twist.
for side in [-1,1]:
 vs=[];fs=[]
 for i in range(53):
  t=i/52;cx=side*(.13+1.29*t);cy=1.85+4.5*t;cz=-.07*t
  tangent=Vector((side*1.29,4.5,-.07)).normalized();across=Vector((tangent.y,-tangent.x,0)).normalized()
  angle=i*math.pi*.67;u=across*math.cos(angle)+Vector((0,0,1))*math.sin(angle)
  pts=[Vector((cx,cy,cz))+tangent*(.128*math.cos(j*math.tau/28))+u*(.078*math.sin(j*math.tau/28)) for j in range(28)]
  tube(vs,fs,pts,.030,8)
 o=mesh('Chaine_'+('gauche' if side<0 else 'droite'),vs,fs,metal,chain)
 for f in o.data.polygons:f.use_smooth=True
vs=[];fs=[]
bail.location=(0,1.51,.055)
pts=[(.16*math.cos(i*math.tau/64),.31*math.sin(i*math.tau/64),0) for i in range(64)]
tube(vs,fs,pts,.065,12);mesh('Beliere_metal',vs,fs,metal,bail)
vs=[];fs=[]
for i in range(30):
 a=i*math.tau/30;stone(vs,fs,.16*math.cos(a),.31*math.sin(a),.061,.027,a)
mesh('Beliere_pierres',vs,fs,gem,bail)
vs=[];fs=[];tube(vs,fs,[(0,1.20+.09*math.cos(i*math.tau/32),.08+.09*math.sin(i*math.tau/32)) for i in range(32)],.025,8);mesh('Jonction',vs,fs,edge,bodies)
# Dark inset motifs seen among the pavé on the source photograph.
vs=[];fs=[]
for x,y,kind in [(-1.28,.92,4),(-.37,.87,28),(-1.31,.08,4),(-.37,-.86,28),(-1.26,-.88,4),(.35,.91,4),(1.27,.86,4),(1.29,.09,28),(.40,-.91,4),(1.20,-.87,28)]:
 tube(vs,fs,[(x+.06*math.cos(i*math.tau/kind),y+(.085 if kind==28 else .06)*math.sin(i*math.tau/kind),.283) for i in range(kind)],.009,6)
mesh('Motifs_sertis',vs,fs,engraved,pave)
# Camera and softboxes are separate from the exported model.
def aim(o,p):o.rotation_euler=(Vector(p)-o.location).to_track_quat('-Z','Y').to_euler()
camdata=bpy.data.cameras.new('Portrait 85mm');cam=bpy.data.objects.new('Portrait 85mm',camdata);s.collection.objects.link(cam);cam.location=(1,2.45,18);cam.rotation_euler=(0,.055,0);camdata.type='ORTHO';camdata.ortho_scale=8.8;s.camera=cam
for name,pos,power,size,color in [('Key',(-4,4,7),1800,5,(1,.88,.68)),('Strip',(4,2,4),1400,3,(.82,.9,1)),('Top',(0,7,1),2100,3,(1,.82,.52))]:
 d=bpy.data.lights.new(name,'AREA');d.energy=power;d.shape='RECTANGLE';d.size=size;d.size_y=size*.3;d.color=color;o=bpy.data.objects.new(name,d);s.collection.objects.link(o);o.location=pos;aim(o,(0,1,0))
s.render.film_transparent=True
s.render.image_settings.file_format='PNG';s.render.filepath=str(OUT/'source/blender/necklace-studio.png')
bpy.ops.object.select_all(action='DESELECT')
for o in s.objects:
 if o==root or o.parent in [root,bodies,pave,bail,chain]:o.select_set(True)
bpy.context.view_layer.objects.active=root
bpy.ops.export_scene.gltf(filepath=str(OUT/'public/assets/necklace-93-blender.glb'),export_format='GLB',use_selection=True,use_active_scene=True,export_yup=False,export_apply=True,export_draco_mesh_compression_enable=True,export_draco_mesh_compression_level=6)
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'source/blender/themiddleman21-93.blend'))
result={'stones':count+30,'objects':len(s.objects),'blend':str(OUT/'source/blender/themiddleman21-93.blend'),'glb':str(OUT/'public/assets/necklace-93-blender.glb')}
