import { Rot } from './Rot';


export enum Dir {
    North = 0,
    NorthWest,
    West,
    SouthWest,
    South,
    SouthEast,
    East,
    NorthEast
}

export namespace Dir {
    export function match(a: Dir, b: Dir): Boolean {
        return opposite(a) == b;
    }

    export function opposite(a: Dir): Dir {
        return (a + 4) % 8;
    }

    export function neg(a: Dir): Dir {
        return (8 - a) % 8;
    }

    export function rotate(target: Dir, by: Dir): Dir {
        return (target + by) % 8;
    }

    export function translateBy(target: Dir, by: Dir): Dir {
        return rotate(target, by);
    }

    export function toRot(target: Dir): Rot {
        const tab = [
            new Rot(1, 0, 0, 0),
            new Rot(0, 1, 0, 0),
            new Rot(0, 0, 1, 0),
            new Rot(0, 0, 0, 1),
            new Rot(-1,0, 0, 0),
            new Rot(0, -1,0, 0),
            new Rot(0, 0, -1,0),
            new Rot(0, 0, 0, -1)
        ]

        return tab[target % 8];
    }
}