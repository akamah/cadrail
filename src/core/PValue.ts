// expresses a point which can be a control point of the layout system
export class PValue {
    constructor(public readonly a: number, public readonly b = 0, 
        public readonly c = 0, public readonly d = 0) {

    }

    public static zero(): PValue {
        return new this(0, 0, 0, 0);
    }

    public static of(a: number, b = 0, c = 0, d = 0): PValue {
        return new this(a, b, c, d);
    }

    // mm
    public toNumber(): number {
        return 54 * (this.a + Math.SQRT1_2 * this.b) +
               60 * (this.c + Math.SQRT1_2 * this.d);
    }

    public add(that: PValue): PValue {
        return new PValue(
            this.a + that.a, this.b + that.b,
            this.c + that.c, this.d + that.d);
    }

    public sub(that: PValue): PValue {
        return this.add(that.negate());
    }

    public negate(): PValue {
        return new PValue(-this.a, -this.b, -this.c, -this.d);
    }
}
