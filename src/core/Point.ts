import { Vector3 } from 'three';
import { PValue } from './PValue';
import { Dir } from './Dir';


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

    public add(other: Point): Point {
        return new Point(
            this.front.add(other.front),
            this.right.add(other.right),
            this.up + other.up);
    }

    public negate(): Point {
        return new Point(
            this.front.negate(),
            this.right.negate(),
            -this.up
        )
    }

    public transformBy(offset: Point): Point {
        return this.add(offset);
    }
}

