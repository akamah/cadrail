import { RailView } from "./RailView";

export class Main {
    private view;

    constructor() {
        this.view = new RailView();
    }
    setup() {
        this.view.render();
    }
}
