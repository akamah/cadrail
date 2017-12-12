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
    private openEnds_ = [new End(Point.zero(), Dir.West, Pole.Minus)];

    get observer(): LayoutObserver {
        return this.observer_;
    }

    set observer(ob: LayoutObserver) {
        this.observer_ = ob;
    }

    get rails(): Set<Rail> {
        return this.rails_;
    }

    get openEnds(): Array<End> {
        return this.openEnds_;
    }

    public topOpenEnd(): End {
        return this.openEnds[0];
    }

    public rotateOpenEnd() {
        let e = this.topOpenEnd();
        this.openEnds_.splice(0, 1);
        this.openEnds_.push(e);
    }

    private toggleOpenEnd(end: End) {
        let i = this.openEnds_.findIndex(e => end.match(e));
        if (i >= 0) {
            this.openEnds_.splice(i, 1);
        } else {
            this.openEnds_.push(end);
        }
    }

    private addPierForEndIfNeed(end: End) {

    }



    private notifyAddRail(rail: Rail) {
//        this.openEnds_.forEach((e, i) => console.log("%d, %s", i, this.openEnds_[i].toString()), this)
        this.observer.railAdded(this, rail);
    }

    public add(rail: Rail) {
        this.rails.add(rail);
        rail.ends().forEach(e => this.toggleOpenEnd(e), this);
        this.notifyAddRail(rail);
    }

    private notifyRemoveRail(rail: Rail) {
        this.observer.railRemoved(this, rail);
    }

    public remove(rail: Rail) {
        this.notifyRemoveRail(rail);
        rail.ends().forEach(e => this.toggleOpenEnd(e), this);
        this.rails.delete(rail);
    }
}
