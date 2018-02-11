import { Option, some, none } from "ts-option";
import { Dir, End, Point, Pole, Rot, Rail, Pier, MiniPier } from 'librail';


export interface LayoutObserver {
    railAdded(layout: Layout, rail: Rail);
    railRemoved(layout: Layout, rail: Rail);

    pierAdded?(layout: Layout, pier: Pier);
    pierRemoved?(layout: Layout, pier: Pier);
}


export class Layout {
    private observer_: LayoutObserver = null;
    private rails_: Set<Rail> = new Set<Rail>();

    get observer(): LayoutObserver {
        return this.observer_;
    }

    set observer(ob: LayoutObserver) {
        this.observer_ = ob;
    }

    get rails(): Set<Rail> {
        return this.rails_;
    }


    private addPierForEndIfNeed(end: End) {

    }

    private notifyAddRail(rail: Rail) {
        this.observer.railAdded(this, rail);
    }

    public add(rail: Rail) {
        this.rails.add(rail);
        this.notifyAddRail(rail);
    }

    private notifyRemoveRail(rail: Rail) {
        this.observer.railRemoved(this, rail);
    }

    public remove(rail: Rail) {
        this.rails.delete(rail);
        this.notifyRemoveRail(rail);
    }

    public lookupRailForEnd(target: End): Option<Rail> {
        // 現在は非効率だが，線形に探索することにする．
        for (let rail of this.rails_) {
            for (let end of rail.ends()) {
                if (end.equal(target)) {
                    return some(rail);
                }
            }
        }

        return none;
    }
}
