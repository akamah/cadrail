export class PValue {
    constructor(private a: number, private b = 0, private c = 0, private d = 0) {

    }

    public toNumber(): number {
        return 54 * (this.a + Math.SQRT1_2 * this.b) +
               60 * (this.c + Math.SQRT1_2 * this.d);
    }
}