(function () {
    const arrOfPictures =[
        {name: 'apple', matrix: PICTURES_MAP.apple, pixelSize: 1, isFood: true},
        {name: 'banana', matrix: PICTURES_MAP.banana, pixelSize: 1, isFood: true},
        {name: 'mouse', matrix: PICTURES_MAP.mouse, pixelSize: 1, isFood: true},
        {name: 'turnUpRight', matrix: PICTURES_MAP.turnUpRight,  pixelSize: 1},
        {name: 'turnUpLeft', matrix: PICTURES_MAP.turnUpLeft,  pixelSize: 1},
        {name: 'turnDownRight', matrix: PICTURES_MAP.turnDownRight,  pixelSize: 1},
        {name: 'turnDownLeft', matrix: PICTURES_MAP.turnDownLeft,  pixelSize: 1},
        {name: 'bodyHz', matrix: PICTURES_MAP.bodyHz,  pixelSize: 1},
        {name: 'head', matrix: PICTURES_MAP.head,  pixelSize: 1},
        {name: 'bodyVt', matrix: PICTURES_MAP.bodyVt,  pixelSize: 1},
        {name: 'tailL', matrix: PICTURES_MAP.tailL,  pixelSize: 1},
        {name: 'tailR', matrix: PICTURES_MAP.tailR,  pixelSize: 1},
        {name: 'tailHz', matrix: PICTURES_MAP.tailHz,  pixelSize: 1},
        {name: 'tailVt', matrix: PICTURES_MAP.tailVt,  pixelSize: 1},
        {name: 'poop', matrix: PICTURES_MAP.poop,  pixelSize: 1},
    ];

    const game = new Game(30, 30);
    const platform = new Platform();

    function startWithCounter() {
        if (game.state === STATE.PENDING) {
            return;
        }
        game.state = STATE.PENDING;
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

    platform.ui.painter.createPictures(arrOfPictures, game.settings.color); //
    platform.ui.viewCanvas.draw(PICTURES_MAP.initial, game.settings.color, 10);

    platform.ui.settingsButton.onClick= (e) => {
        const id = e.target.id;
        if (game.state === STATE.START || game.state === STATE.PAUSE) {
            platform.ui.dialog.show(id);
        }
    };
    platform.ui.dialog.onClick= (e) => {
        const id = e.target.id;
        if (id === 'accept') {
            const checkBoxValue = platform.ui.dialog.returnCheckedValue();
            if (checkBoxValue in MODE) {
                game.mode = MODE[platform.ui.dialog.returnCheckedValue()];
            } else if (checkBoxValue in FOOD) {
                game.food = FOOD[platform.ui.dialog.returnCheckedValue()];
            } else if (checkBoxValue in SPEED) {
                game.speed = SPEED[platform.ui.dialog.returnCheckedValue()];
            }
            platform.ui.dialog.hide();
        }
    };
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
                platform.ui.viewCanvas.draw(PICTURES_MAP.lose, game.settings.color, game.settings.pixelSize);
            }
            val = v;
        },
    });
    let foodGame = FOOD.APPLE;
    Object.defineProperty(game, 'food', {
        get: function () {
            return foodGame;
        },
        set: function(v) {
            console.log(v);
            foodPicture = pictures[v.description]
            foodGame = v;
        },
    });
    Object.defineProperty(game, 'render', {
        set: function(v) {
            if (v && game.state !== STATE.END) {
                platform.ui.viewCanvas.draw(game.matrix, game.settings.color, game.settings.pixelSize);
            }
        },
    });

})();
