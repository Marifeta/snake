class PlayButton extends ViewControl {
    constructor() {
        super('playButton', getElements('playButton'));
        this.el.addEventListener('click', this.clickHandler.bind(this));
    }
}
