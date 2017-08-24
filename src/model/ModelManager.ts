import * as THREE from 'three';

const rawModel = require('../../build/models.json');

export class ModelManager {
    private geometries: THREE.Geometry[] = [];
    private static instance_;

    private constructor() {
        var loader = new THREE.JSONLoader();

        for (let name in rawModel) {
            const geometry = loader.parse(rawModel[name]).geometry;
            this.geometries[name] = geometry;
        }
    }

    public static instance(): ModelManager {
        if (this.instance_) {
            return this.instance_
        }
        this.instance_ = new ModelManager();
        return this.instance_;
    }

    public static get(name: string): THREE.Mesh {
        const geom = this.instance().geometries[name];

        if (!geom) {
            console.error("geometry ", name, " not found");
        }

        const mat = new THREE.MeshLambertMaterial( { color: 0x5588FF });

        return new THREE.Mesh(geom, mat);
    }
}
