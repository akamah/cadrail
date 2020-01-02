set -e

#### first, extract objects from .blender files

mkdir -p "./build/assets"

for file in blender/*.blend
do
	blender $file --background --python tools/save_object.py
done
