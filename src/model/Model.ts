import * as THREE from 'three';
import { Rail } from 'librail';
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

    constructor(private rail: Rail) {
        super();

        // SUPER STUB!!
        this.model.position.x = rail.instance.origin.point.single.a * 54;
/* 
        const p = rail.position.toVector3();
        this.model.position.copy(p);
        this.model.rotateX(rail.converse ? 180 : 0);
 */ 
   }

    public addToScene(scene: THREE.Scene) {
        scene.add(this.model);
    }

    public removeFromScene(scene: THREE.Scene) {
        scene.remove(this.model);
    }


}