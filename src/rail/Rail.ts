import { Point, Dir, End, Rot } from 'librail'


// # レールの種類ごとに共通した特徴
// * 端点の(位置)と(凹凸)と(方向)
// * 状態数
// * 状態に対応してオンになるモデルの名前
// * 端点から端点に移動した時の状態遷移関数
// * 端点から端点に移動する時のベクトル関数、導関数
// * 

// レールはどんどん継承して作っていくことにした
export abstract class Rail {
    constructor() {
    }

    protected abstract localEnds(): End[];
}

export class StraightRail extends Rail {
    constructor(
        public readonly position: Point,
        public readonly dir: Dir,
        public readonly inverse: Boolean,
        public readonly converse: Boolean
    ) {
        super();
    }

    protected localEnds(): End[] {
        return [
            End.minus(Point.zero(), Dir.South),
            End.plus(Point.of(Rot.of(4)), Dir.North)
        ];
    }
}
