// expresses a point which can be a point of the coordinate system.
// we call this Rot45 coordinate.
// the values has no unit.
export class Rot {
    constructor(public readonly a: number, public readonly b = 0, 
        public readonly c = 0, public readonly d = 0) {
    }

    public static zero(): Rot {
        return new this(0, 0, 0, 0);
    }

    public static of(a: number, b = 0, c = 0, d = 0): Rot {
        return new this(a, b, c, d);
    }

    public toReal(): [number, number] {
        return [this.a + Math.SQRT1_2 * (this.b + this.d),
                this.c + Math.SQRT1_2 * (-this.b + this.d)];
    }

    public add(that: Rot): Rot {
        return new Rot(
            this.a + that.a, this.b + that.b,
            this.c + that.c, this.d + that.d);
    }

    public sub(that: Rot): Rot {
        return this.add(that.negate());
    }

    public negate(): Rot {
        return new Rot(-this.a, -this.b, -this.c, -this.d);
    }
}
