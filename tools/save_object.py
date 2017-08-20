import os

import bpy

import io_three
from io_three import constants
from io_three import exporter


SAVE_DIR = "./build/assets"

# load default options
options = constants.EXPORT_OPTIONS

# only export specific object
options[constants.GEOMETRY_TYPE] = constants.GEOMETRY

for object in bpy.data.objects:
    exporter.export_geometry(
        os.path.join(SAVE_DIR, object.name + constants.EXTENSION),
        options, object
    )
    print(">>> {}".format(object.name))
