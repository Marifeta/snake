(function (Game) {

    const game = new Game(20, 20);
    const platform = new Platform();

    function startWithCounter() {
        let x = 3
        let intervalId = setInterval(() => {
            platform.ui.playButton.el.textContent = `${x}`;
            if (x === 0) {
                clearInterval(intervalId);
                platform.ui.canvasButtonsArea.hide();
                game.start();
                platform.ui.viewCanvas.draw(game.matrix, game.settings.color, game.settings.pixelSize);
            }
            --x;
        }, 500);
    }

    platform.ui.viewCanvas.draw(picture.initial, game.settings.color, game.settings.pixelSize);
    platform.ui.playButton.onClick = () => {
        startWithCounter();
    };
    platform.ui.viewCanvas.onClick = () => {
        game.pause();
        platform.ui.playButton.el.textContent = 'II';
        platform.ui.canvasButtonsArea.show();
    };
    platform.ui.controllers.onClick = (e) => {
        const id = e.target.id;
        if (game.state === STATE.CONTINUE && id.length > 0) {
            game.changeSnakeDirection(id.toUpperCase());
        }
    };
    let val = STATE.START;
    Object.defineProperty(game, 'state', {
        get: function () {
            return val;
        },
        set: function(v) {
            if (v === STATE.END) {
                console.log('end game!!!');
                platform.ui.viewCanvas.draw(picture.lose, game.settings.color, game.settings.pixelSize);
            }
            val = v;
        },
    });

    Object.defineProperty(game, 'render', {
        set: function(v) {
            if (v && game.state !== STATE.END) {
                platform.ui.viewCanvas.draw(game.matrix, game.settings.color, game.settings.pixelSize);
            }
        },
    });

})(Game);
