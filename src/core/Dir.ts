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

    export function negate(a: Dir): Dir {
        return (8 - a) % 8;
    }

    export function rotate(target: Dir, by: Dir): Dir {
        return (target + by) % 8;
    }

    export function translateBy(target: Dir, by: Dir): Dir {
        return rotate(target, by);
    }
}