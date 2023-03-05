class NewGameButton extends ViewControl {
    constructor() {
        super('newGameButton', getElements('newGameButton'));
        this.el.addEventListener('click', this.clickHandler.bind(this));
    }
}
