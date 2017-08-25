import { Point } from './Point';
import { Dir } from './Dir';
import { Pole } from './Pole';

export class End {
    public constructor(
        public readonly point: Point,
        public readonly dir: Dir,
        public readonly pole: Pole
    ) {}

    public static of(point: Point, dir: Dir, pole: Pole) {
        return new this(point, dir, pole);
    }

    public static plus(point: Point, dir: Dir) {
        return new this(point, dir, Pole.Plus);
    }

    public static minus(point: Point, dir: Dir) {
        return new this(point, dir, Pole.Minus);
    }

    public match(other: End): Boolean {
        return this.point == other.point &&
            Dir.match(this.dir, other.dir) &&
            Pole.match(this.pole, other.pole);
    }

    // public translateBy(other: End): End {

    // }
}