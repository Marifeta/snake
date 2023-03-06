class Platform {
    constructor() {
        this.ui = {
            playButton: new PlayButton(),
            reloadButton: new NewGameButton(),
            canvasButtonsArea: new CanvasButtonsArea(),
            infoText: new InfoText(),
            viewCanvas: new ViewCanvas(),
            controllers: new Controllers(),
            painter: new Painter(),
        };
    }
    removeListeners() {
        console.log('remove listeners!');
    }
}
