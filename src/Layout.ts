import { Rail } from './Rail';

export interface LayoutObserver {
    railAdded(Layout, Rail);
    railRemoved(Layout, Rail);
}


export class Layout {
    private observer_: LayoutObserver;
    private rails: Rail[];

    constructor() {
        this.observer_ = null;
        this.rails = [];
    }

    get observer(): LayoutObserver {
        return this.observer_
    }

    set observer(ob: LayoutObserver) {
        this.observer_ = ob
    }
}