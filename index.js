(function (FieldClass, SnakeClass, SnakeFoodClass) {
    let isNewGame = true;
    let isPaused = false;
    let isLose = false;

    const fieldWidth = 200;
    const fieldHeight = 200;
    const canvas = document.querySelector('.field-canvas');
    const ctx = canvas.getContext('2d');
    const field = new FieldClass(ctx, fieldWidth,fieldHeight);
    const snakeFood = new SnakeFoodClass(field, genRandXY(fieldWidth/10-1), genRandXY(fieldHeight/10-1));
    const snake = new SnakeClass(field, genRandXY(fieldWidth/10-3), genRandXY(fieldHeight/10-3), snakeFood);
    field.setSplashScreen();

    const start = document.getElementById('start');
    const count = document.getElementById('count');
    const btns = document.getElementById('btns');
    const canvasControls = document.getElementById('canvasControls');

    Object.defineProperty(snake, 'isLose', {
        set: function(v) {
            if (v) {
                setLose();
            }
        },
    });
    btns.addEventListener('click', (e) => {
        const id = e.target.id;
        if (snake.isMoving && id !== 'btns' && id.length > 0) {
            snake.changeDirection(id)
        }
    })
    canvas.addEventListener('dblclick', pauseGame);

    start.addEventListener('click', startGame);


    function startGame() {
        if (isNewGame) {
            canvasControls.classList.add("hidden");
            field.draw();
            snake.move();
            isNewGame = false;
        } else {
            continueGame();
        }

    }
    function pauseGame () {
        if (!isPaused) {
            start.textContent = 'II';
            snake.setPause();
            isPaused = true;
            canvasControls.classList.add("paused-btn");
            canvasControls.classList.remove("hidden");
        }
    }
    function continueGame() {
        if (snake.isMoving) {
            return;
        }
        isPaused = false;
        let x = 3
        let g = setInterval(() => {
            start.textContent = `${x}`;
            if (x === 0) {
                snake.move();
                clearInterval(g);
                canvasControls.classList.remove("paused-btn");
                canvasControls.classList.add("hidden");
            }
            --x;
        }, 500);
    }
    function setLose() {
        isLose = true;
        count.classList.remove('hidden');
        canvas.removeEventListener('dblclick', pauseGame);
    }

})(Field, Snake, SnakeFood);
