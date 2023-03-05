class Controllers extends ViewControl {
    constructor() {
        super('controllers', getElements('controllers'));
        this.el.addEventListener('click', this.clickHandler.bind(this));
    }
}
