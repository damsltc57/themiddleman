import bpy, os
from pathlib import Path
s=bpy.context.scene
out=Path(os.environ.get('HERO_RENDER_DIR',str(Path(__file__).resolve().parents[2]/'public/assets/hero-blender-v2')));out.mkdir(parents=True,exist_ok=True)
s.render.resolution_x=896;s.render.resolution_y=1344;s.cycles.samples=96
s.render.image_settings.file_format='WEBP';s.render.image_settings.color_mode='RGBA';s.render.image_settings.quality=93
for i in range(32):
 s.frame_set(1+round(i*39/31));s.render.filepath=str(out/f'{i:03d}.webp');bpy.ops.render.render(write_still=True)
