import { PValue } from '../core/PValue'
import { Point } from '../core/Point'
import { Dir } from '../core/Dir'
import { End } from '../core/End'

// レールはどんどん継承して作っていくことにした
export abstract class Rail {
    abstract ends(): End[];
}

export class StraightRail extends Rail {
    public ends(): End[] {
        return [End.minus(Point.zero(), Dir.South),
                End.minus(Point.of(PValue.of(4), PValue.zero()), Dir.North)];
    }
}

