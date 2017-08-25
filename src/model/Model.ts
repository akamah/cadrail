import * as THREE from 'three';
import { StraightRail } from '../rail/Rail';
import { ModelManager } from './ModelManager';

// 生のオブジェクトをビューが扱う代わりに
// こいつがシーンとのやりとりを中継する
// また、ポイントの方向などの状態も持たせておく。
// レールとしての意味はRailオブジェクトに考えさせて、
// こいつは糊をやっていく
// * ビューの要求でシーンにオブジェクトを追加・削除する
// * 
export class Model {

}

export class StraightModel extends Model {
    private model = ModelManager.create('straight_1');

    constructor(private rail: StraightRail) {
        super();

        const p = rail.position.toVector3();
        this.model.position.copy(p);
        this.model.rotateX(rail.converse ? 180 : 0);
    }

    public addToScene(scene: THREE.Scene) {
        scene.add(this.model);
    }

    public removeFromScene(scene: THREE.Scene) {
        scene.remove(this.model);
    }


}