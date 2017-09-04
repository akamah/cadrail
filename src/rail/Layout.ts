
import { Dir, End, Point, Pole, Rot } from '../core';
import { Rail } from './Rail';


export interface LayoutObserver {
    railAdded(Layout, Rail);
    railRemoved(Layout, Rail);
}


export class Layout {
    private observer_: LayoutObserver = null;
    private rails_: Set<Rail> = new Set<Rail>();
    private openEnds_ : Set<End>;

    constructor() {
        this.openEnds_ = new Set<End>([
            new End(Point.zero(), Dir.North, Pole.Plus),
            new End(Point.zero(), Dir.South, Pole.Minus)
        ])
    }

    get observer(): LayoutObserver {
        return this.observer_;
    }

    set observer(ob: LayoutObserver) {
        this.observer_ = ob;
    }

    get rails(): Set<Rail> {
        return this.rails_;
    }

    get openEnds(): Set<End> {
        return this.openEnds_;
    }

    private notifyAdd(rail: Rail) {
        this.observer.railAdded(this, rail);
    }

    public add(rail: Rail) {
        this.rails.add(rail);
        this.notifyAdd(rail);
    }

    private notifyRemove(rail: Rail) {
        this.notifyRemove(rail);
        this.observer.railRemoved(this, rail);
    }

    public remove(rail: Rail) {
        this.rails.delete(rail);
    }
}
