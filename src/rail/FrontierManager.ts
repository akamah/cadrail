import { Dir, End, Point, Pole, Rot, Rail, Pier, MiniPier } from 'librail';

export interface FrontierManagerObserver {
    selectionChanged?(layout: FrontierManager, selection: End);
}

export class FrontierManager {
    private observer_: FrontierManagerObserver = null;
    private frontiers_ = [new End(Point.zero(), Dir.West, Pole.Minus)];

    get observer(): FrontierManagerObserver {
        return this.observer_;
    }

    set observer(ob: FrontierManagerObserver) {
        this.observer_ = ob;
    }

    public get frontiers(): Array<End> {
        return this.frontiers_;
    }

    public get selection(): End {
        console.log(this.frontiers);
        return this.frontiers[this.frontiers.length - 1];
    }

    private notifySelectionChanged() {
        if (this.observer) {
            if (this.observer.selectionChanged) {
                this.observer.selectionChanged(this, this.selection);
            }
        }
    }

    public selectNext() {
        let e = this.selection;
        this.frontiers_.splice(this.frontiers.length - 1, 1);
        this.frontiers_.splice(0, 0, e);
        
        this.notifySelectionChanged();
    }

    private toggleOpenEnd(end: End) {
        let i = this.frontiers_.findIndex(e => end.match(e));
        if (i >= 0) {
            this.frontiers_.splice(i, 1);
        } else {
            this.frontiers_.push(end);
        }
    }

    public addEnd(end: End) {
        this.toggleOpenEnd(end);
        this.notifySelectionChanged();
    }
    
    public removeEnd(end: End) {
        this.toggleOpenEnd(end);
        this.notifySelectionChanged();
    }
}
