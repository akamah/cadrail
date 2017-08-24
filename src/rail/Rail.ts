import { PValue } from '../core/PValue'
import { Point } from '../core/Point'
import { Dir } from '../core/Dir'
import { End } from '../core/End'

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
            End.minus(Point.of(PValue.of(4), PValue.zero()), Dir.North)
        ];
    }
}

