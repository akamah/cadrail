import { Vector3 } from 'three';
import { Rot } from './Rot';
import { Dir } from './Dir';


export class Point {
    // single: 単線, double: 複線
    constructor(public single: Rot, public double: Rot, public up = 0) {
    }

    public static zero() {
        return new Point(Rot.zero(), Rot.zero(), 0);
    }

    public static of(f: Rot, r: Rot, u = 0) {
        return new Point(f, r, u);
    }

    // blenderの世界からthree.jsの世界のベクトルに移す
    // なので回転している
    public toVector3(): Vector3 {
        const SINGLE = 54;
        const DOUBLE = 60;
        const HEIGHT = 66 / 4;

        const [sx, sy] = this.single.toReal();
        const [dx, dy] = this.double.toReal();

        return new Vector3(
            SINGLE * sx + DOUBLE * dx,
            HEIGHT * this.up,
            -(SINGLE * sy + DOUBLE * dy)
        )
    }

    public add(other: Point): Point {
        return new Point(
            this.single.add(other.single),
            this.double.add(other.double),
            this.up + other.up);
    }

    public negate(): Point {
        return new Point(
            this.single.negate(),
            this.double.negate(),
            -this.up
        )
    }

    public transformBy(offset: Point): Point {
        return this.add(offset);
    }
}

