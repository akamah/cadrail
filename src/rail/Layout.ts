import { Rail } from './Rail';

export interface LayoutObserver {
    railAdded(Layout, Rail);
    railRemoved(Layout, Rail);
}


export class Layout {
    private observer_: LayoutObserver;
    private rails: Set<Rail>;

    constructor() {
        this.observer_ = null;
        this.rails = new Set<Rail>();
    }

    get observer(): LayoutObserver {
        return this.observer_;
    }

    set observer(ob: LayoutObserver) {
        this.observer_ = ob;
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
