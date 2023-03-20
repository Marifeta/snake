(function () {
    const arrOfPictures =[
        {name: 'apple', matrix: PICTURES_MAP.apple, pixelSize: 15.5, isFood: true},
        {name: 'banana', matrix: PICTURES_MAP.banana, pixelSize: 1, isFood: true},
        {name: 'mouse', matrix: PICTURES_MAP.mouse, pixelSize: 15.5, isFood: true},
        {name: 'turnUpRight', matrix: PICTURES_MAP.turnUpRight,  pixelSize: 15.5},
        {name: 'turnUpLeft', matrix: PICTURES_MAP.turnUpLeft,  pixelSize: 15.5},
        {name: 'turnDownRight', matrix: PICTURES_MAP.turnDownRight,  pixelSize: 15.5},
        {name: 'turnDownLeft', matrix: PICTURES_MAP.turnDownLeft,  pixelSize: 15.5},
        {name: 'bodyHz', matrix: PICTURES_MAP.bodyHz,  pixelSize: 15.5},
        {name: 'head', matrix: PICTURES_MAP.head,  pixelSize: 15.5},
        {name: 'bodyVt', matrix: PICTURES_MAP.bodyVt,  pixelSize: 15.5},
        {name: 'tailL', matrix: PICTURES_MAP.tailL,  pixelSize: 15.5},
        {name: 'tailR', matrix: PICTURES_MAP.tailR,  pixelSize: 15.5},
        {name: 'tailHz', matrix: PICTURES_MAP.tailHz,  pixelSize: 15.5},
        {name: 'tailVt', matrix: PICTURES_MAP.tailVt,  pixelSize: 15.5},
        {name: 'poop', matrix: PICTURES_MAP.poop,  pixelSize: 15.25},
    ];

    const game = new Game(24, 24);
    const platform = new Platform();
    const SETTINGS_BUTTONS = document.getElementsByClassName('button');


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
                console.log(SETTINGS_BUTTONS);
                for (let el of SETTINGS_BUTTONS) {
                    if (el.id !== 'newGameButton') {
                        el.setAttribute("disabled", "disabled");
                    }
                }
            }
            --x;
        }, 500);
    }

    platform.ui.painter.createPictures(arrOfPictures, game.settings.color); //
    platform.ui.viewCanvas.draw(PICTURES_MAP.initial, game.settings.color, 9.6);

    platform.ui.settingsButton.onClick = (e, buttonId) => {
        const id = buttonId || e.target.id;
        if (game.state === STATE.START || game.state === STATE.PAUSE) {
            platform.ui.dialog.show(id, game.mode, game.speed, game.food);
        }
    };
    platform.ui.dialog.onClick = (e, buttonId) => {
        const id = buttonId || e.target.id;
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
        for (let el of SETTINGS_BUTTONS) {
            el.removeAttribute("disabled");
        }
    };
    platform.ui.controllers.onClick = (e, buttonId) => {
        const id = buttonId || e.target.id;
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
                platform.ui.viewCanvas.draw(PICTURES_MAP.lose, game.settings.color, 9.6);
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
    window.addEventListener(
        "keydown",
        (event) => {
            if (game.state === STATE.START || game.state === STATE.PAUSE) {
                if (event.keyCode === 70) {
                    platform.ui.settingsButton.onClick(null,'food');
                } else if (event.keyCode === 78) {
                    document.getElementById('newGameButton').click();
                } else if(event.keyCode === 77) {
                    platform.ui.settingsButton.onClick(null,'mode');
                } else if(event.keyCode === 83) {
                    platform.ui.settingsButton.onClick(null,'speed');
                } else if(event.keyCode === 13) {
                    platform.ui.dialog.onClick(null, 'accept');
                }
            }
            if (event.keyCode === 32) {
                if (game.state === STATE.START || game.state === STATE.PAUSE) {
                    startWithCounter();
                } else if (game.state === STATE.CONTINUE) {
                    platform.ui.viewCanvas.onClick();
                }
            }
            if (game.state !== STATE.CONTINUE) {
                return;
            }
            if (event.keyCode === 37) {
                game.changeSnakeDirection('LEFT');
            } else if (event.keyCode === 38) {
                game.changeSnakeDirection('TOP');
            } else if (event.keyCode === 39) {
                game.changeSnakeDirection('RIGHT');
            } else if (event.keyCode === 40) {
                game.changeSnakeDirection('BOTTOM');
            }
        },
        true
    );
})();
