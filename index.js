(function (Game) {
    const arrOfPictures =[
        {name: 'apple', matrix: picture.apple, pixelSize: 1},
        {name: 'turnUpRight', matrix: picture.turnUpRight,  pixelSize: 1},
        {name: 'turnUpLeft', matrix: picture.turnUpLeft,  pixelSize: 1},
        {name: 'turnDownRight', matrix: picture.turnDownRight,  pixelSize: 1},
        {name: 'turnDownLeft', matrix: picture.turnDownLeft,  pixelSize: 1},
        {name: 'bodyHz', matrix: picture.bodyHz,  pixelSize: 1},
        {name: 'head', matrix: picture.head,  pixelSize: 1},
        {name: 'bodyVt', matrix: picture.bodyVt,  pixelSize: 1},
        {name: 'tailL', matrix: picture.tailL,  pixelSize: 1},
        {name: 'tailR', matrix: picture.tailR,  pixelSize: 1},
        {name: 'tailHz', matrix: picture.tailHz,  pixelSize: 1},
        {name: 'tailVt', matrix: picture.tailVt,  pixelSize: 1},
    ]
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
    platform.ui.painter.createPictures(arrOfPictures, game.settings.color);

    platform.ui.viewCanvas.draw(picture.initial, game.settings.color, 10);
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
