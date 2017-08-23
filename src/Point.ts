import { PValue } from './Z2'

export class Point {
    constructor(public front: PValue, public right: PValue, public up = 0) {
    }
}

