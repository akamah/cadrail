set -e

#### first, extract objects from .blender files

for file in blender/*.blend
do
	blender $file --background --python tools/save_object.py
done

#### then, archive the output .json files into one file

python tools/archive_models.py build/assets/*.json >! build/models.json 
