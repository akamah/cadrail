import os
import sys
import json
import glob



paths = sys.argv[1:]

models = {}

for name in paths:
    with open(name, mode='r') as f:
        m = json.load(f)
        key, _ = os.path.splitext(os.path.basename(name))
        models[key] = m


print(json.dumps(models))        

