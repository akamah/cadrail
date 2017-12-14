import * as THREE from 'three';
import { Rail, Point, End } from 'librail';
import { ModelManager } from './ModelManager';

// 生のオブジェクトをビューが扱う代わりに
// こいつがシーンとのやりとりを中継する
// また、ポイントの方向などの状態も持たせておく。
// レールとしての意味はRailオブジェクトに考えさせて、
// こいつは糊をやっていく
// * ビューの要求でシーンにオブジェクトを追加・削除する
// * 
export class Model {
    public constructor(private models: THREE.Mesh[], private rail: Rail) {
        models.forEach(m =>
            this.setupMeshWithRail(m, rail)
        );
    }

    // temporary, move to other module
    public static pointToVec3(p: Point): THREE.Vector3 {
        const d = 60;
        const l = 54;
        const h = 66 / 4;

        let [sx, sy] = p.single.toReal();
        let [dx, dy] = p.double.toReal();

        let x = l * sx + d * dx;
        let y = l * sy + d * dy;
        let z = h * p.up;

        // convert coordinate system to three.js style
        return new THREE.Vector3(x, z, -y);
    }

    protected setupMeshWithRail(mesh: THREE.Mesh, rail: Rail) {
        // set position
        mesh.position.copy(Model.pointToVec3(rail.instance.origin.point));

        // rotate along Y-axis 
        let rad = Math.PI / 4 * rail.instance.origin.dir.dir;
        mesh.rotateY(rad);

        // rotate along X-axis if the rail is flipped
        if (rail.instance.flip.isYes()) {
            mesh.rotateX(Math.PI);
        }
    }

    public addToScene(scene: THREE.Scene) {
        let mat = new THREE.MeshBasicMaterial();
        let geo = new THREE.SphereGeometry(10, 8, 8);
        let msh = new THREE.Mesh(geo, mat);
        msh.position.copy(Model.pointToVec3(this.rail.ends()[0].point));
        scene.add(msh);
        this.models.forEach(m =>
            scene.add(m)
        );
    }

    public removeFromScene(scene: THREE.Scene) {
        this.models.forEach(m =>
            scene.remove(m)
        );
    }

}

export class StraightModel extends Model {
    constructor(rail: Rail) {
        super([ModelManager.create('straight_1')], rail);
    }
}

export class CurveModel extends Model {
    constructor(rail: Rail) {
        super([ModelManager.create('curve_8')], rail);
    }
}
export class SlopeModel extends Model {
    constructor(rail: Rail) {
        super([ModelManager.create('slope')], rail);
    }
}
export class TurnoutModel extends Model {
    constructor(rail: Rail) {
        var models = []
        if (rail.instance.origin.pole.isPlus()) {
            models = ['turnout_L_a', 'turnout_L_b', 'turnout_L_ab']
        } else {
            models = ['turnout_R_a', 'turnout_R_b', 'turnout_R_ab']
        }
        super(models.map(name => ModelManager.create(name)), rail);        
    }
}

export class PierModel extends Model {
    constructor(rail: Rail) {
        super([ModelManager.create('slope')], rail);
    }
}
