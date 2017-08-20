set -e

for file in $*
do
	blender $file --background --python tools/save_object.py
done
