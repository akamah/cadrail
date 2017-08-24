import { Vector3 } from 'three'
import { PValue } from './PValue'

export class Point {
    constructor(public front: PValue, public right: PValue, public up = 0) {
    }

    public static zero() {
        return new Point(PValue.zero(), PValue.zero(), 0);
    }

    public static of(f: PValue, r: PValue, u = 0) {
        return new Point(f, r, u);
    }

    public toVector3(): Vector3 {
        return new Vector3(
            this.front.toNumber(),
            this.up * 66.0 / 4.0
            -this.right.toNumber(),
        )
    }
}

