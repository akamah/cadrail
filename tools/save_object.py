# usage: `blender $file --background --python tools/save_object.py`
# do not execute it directly

import os
import bpy

SAVE_DIR = "./build/assets"

name = bpy.data.objects[0].name
dst_path = os.path.join(SAVE_DIR, name + ".obj")

bpy.ops.export_scene.obj(
    filepath=dst_path,
    filter_glob="*.obj",
    check_existing=False,
    use_selection=False,
    use_mesh_modifiers=True,
    use_normals=True,
    use_uvs=False,
    use_materials=False,
    use_triangles=True,
    axis_forward='-Z',
    axis_up='Y'
)

