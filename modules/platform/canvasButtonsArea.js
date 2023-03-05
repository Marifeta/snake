class CanvasButtonsArea extends ViewControl {
    constructor() {
        super('canvasButtonsArea', getElements('canvas__controls'));
    }
    hide() {
        this.el.classList.remove("paused-btn");
        this.el.classList.add("hidden");
    }
    show() {
        this.el.classList.add("paused-btn");
        this.el.classList.remove("hidden");
    }
}
