class SettingsButton extends ViewControl {
    constructor() {
        super('settingsButton', getElements('settingsButton'));
        this.el.addEventListener('click', this.clickHandler.bind(this));

    }
}
