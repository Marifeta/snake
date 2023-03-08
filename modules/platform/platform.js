class Platform {
    constructor() {
        this.ui = {
            playButton: new PlayButton(),
            reloadButton: new NewGameButton(),
            canvasButtonsArea: new CanvasButtonsArea(),
            settingsButton: new SettingsButton(),
            viewCanvas: new ViewCanvas(),
            controllers: new Controllers(),
            painter: new Painter(),
            dialog: new Dialog(),
        };
    }
    removeListeners() {
        console.log('remove listeners!');
    }
}
