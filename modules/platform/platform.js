class Platform {
    constructor() {
        this.ui = {
            playButton: new PlayButton(),
            reloadButton: new NewGameButton(),
            canvasButtonsArea: new CanvasButtonsArea(),
            infoText: new InfoText(),
            viewCanvas: new ViewCanvas(),
            controllers: new Controllers(),

        };
    }
    removeListeners() {
        console.log('remove listeners!');
    }
}
