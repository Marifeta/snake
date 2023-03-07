class ModeBtn extends ViewControl {
    constructor() {
        super('modeBtn', getElements('modeBtn'));
        this.el.addEventListener('click', this.clickHandler.bind(this));

    }
}
