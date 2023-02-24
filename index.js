(function (FieldClass, SnakeClass, SnakeFoodClass) {
    let isNewGame = true;
    let isPaused = false;

    const fieldWidth = 200;
    const fieldHeight = 200;
    const canvas = document.querySelector('.field-canvas');
    const ctx = canvas.getContext('2d');
    const field = new FieldClass(ctx, fieldWidth,fieldHeight);
    const snakeFood = new SnakeFoodClass(field, genRandXY(fieldWidth/10-1), genRandXY(fieldHeight/10-1));
    const snake = new SnakeClass(field, genRandXY(fieldWidth/10-3), genRandXY(fieldHeight/10-3), snakeFood);
    field.setSplashScreen();

    const start = document.getElementById('start');
    const top = document.getElementById('top');
    const bottom = document.getElementById('bottom');
    const left = document.getElementById('left');
    const right = document.getElementById('right');
    const refresh = document.getElementById('refresh');
    const continueBtn = document.getElementById('continue');
    const count = document.getElementById('count');
    const btns = document.getElementById('btns');
    const pause = document.getElementById('pause');

    pause.addEventListener('click', (e) => {
        console.log(isPaused, 'isPaused')
        if (!isPaused) {
            pauseGame();
        }
    });

    canvas.addEventListener('dblclick', (e) => {
        console.log(isPaused, 'isPaused')
        if (!isPaused) {
            pauseGame();
        }
    });
    top.addEventListener('click', () => {
        if (snake.isMoving) {
            snake.changeDirection('top')
        }
    });
    bottom.addEventListener('click', () => {
        if (snake.isMoving) {
            snake.changeDirection('bottom')
        }
    });
    left.addEventListener('click', () => {
        if (snake.isMoving) {
            snake.changeDirection('left')
        }
    });
    right.addEventListener('click', () => {
        if (snake.isMoving) {
            snake.changeDirection('right')
        }
    });
    start.addEventListener('click', () => {
        if (isNewGame) {
            startGame();
            isNewGame = false;
        } else {
            continueGame();
        }
    });


    function startGame() {
        btns.classList.add("controls-btn--hidden");
        field.draw();
        snake.move();
    }
    function pauseGame () {
        start.textContent = 'II';
        snake.setPause();
        isPaused = true;
        btns.classList.add("paused-btn");
        btns.classList.remove("controls-btn--hidden");
    }
    function continueGame() {
        if (snake.isMoving) {
            return;
        }
        isPaused = false;
        let x = 3
        console.log(x, 'x');
        let g = setInterval(() => {
            start.textContent = `${x}`;
            if (x === 0) {
                snake.move();
                clearInterval(g);
                btns.classList.remove("paused-btn");
                btns.classList.add("controls-btn--hidden");
            }
            --x;
        }, 500);
    }











})(Field, Snake, SnakeFood);
