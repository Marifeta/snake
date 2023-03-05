class Game {
    #intervalId = 0;
    state = STATE.START;
    label = '-';
    render = false;
    objects = {
        snake: new Snake(),
        snakeFood: new SnakeFood(),
    };
    matrix = [];
    settings = {
        pixelSize: 10,
        color: {
            b: "black",
            g: "#4f914c",
            r: "red",
            d: "#508a4d",
            h: '#407046',
            y: "#c9c977",
            "-": "rgba(0,0,0,0)",
            'o': 'brown',
            'x': 'green',
            'f': 'pink',
        }
    };
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.initGame();
    }
    initGame() {
        this.createMatrix();
        this.objects.snakeFood.setPosition(this.getEmptyCoords());
        this.changeMatrix(this.objects.snake.coordinates, this.objects.snake.label)
        this.changeMatrix(this.objects.snakeFood.coordinates, this.objects.snakeFood.label)
    }
    start() {
        this.state = STATE.CONTINUE;
        this.#intervalId = setInterval(() => {
                this.objects.snake.move();
                if (this.isEatFood()) {
                    this.changeMatrix(this.objects.snake.coordinates, this.objects.snake.label);
                    this.objects.snakeFood.setPosition(this.getEmptyCoords());
                    this.changeMatrix(this.objects.snakeFood.coordinates, this.objects.snakeFood.label);
                } else if (!this.isContinueGame()) {
                    this.end();
                } else {
                    this.changeMatrix(this.objects.snake.coordinates, this.objects.snake.label, this.objects.snake.snakeTail);
                    this.objects.snake.coordinates.pop();
                    this.objects.snake.snakeTail = this.objects.snake.coordinates[this.objects.snake.coordinates.length - 1];
                }
                this.render = true;
            }, this.objects.snake.speed);
    }
    pause() {
        clearInterval(this.#intervalId);
        this.state = STATE.PAUSE;
    }
    continue() {
        this.state = STATE.CONTINUE;
    }
    end() {
        clearInterval(this.#intervalId);
        this.state = STATE.END;
    }
    createMatrix() {
        for(let i = 0; i < this.width; i += 1){
            this.matrix[i] = [];
            for(let j = 0; j < this.height; j += 1){
                this.matrix[i][j] = '-';
            }
        }
    }
    changeSnakeDirection(directionKey) {
        if (directionKey in DIRECTION) {
            this.objects.snake.direction = DIRECTION[directionKey];
        }
    }
    changeMatrix(coordsArr, label, coordsToRemove) {
        coordsArr.forEach((coords) => {
            try {
                this.matrix[coords.y][coords.x] = label;
            } catch (err) {
                console.log(err, this.matrix, coords, coordsArr);
            }

        })
        if (coordsToRemove) {
            this.matrix[coordsToRemove.y][coordsToRemove.x] = this.label;
        }
    }
    getEmptyCoords() {
        const emptyCoords = [];
        for (let y = 0; y < this.matrix.length; y += 1) {
            for (let x = 0; x < this.matrix.length; x += 1) {
                if (this.matrix[y][x] !== 'o') {
                    emptyCoords.push({x, y});
                }
            }
        }
        return emptyCoords;
    }
    isEatFood() {
        return this.objects.snake.snakeHead.x === this.objects.snakeFood.coordinates[0].x
            && this.objects.snake.snakeHead.y === this.objects.snakeFood.coordinates[0].y;
    }
    isContinueGame() {
        if (!this.matrix[this.objects.snake.snakeHead.y] || !this.matrix[this.objects.snake.snakeHead.y][this.objects.snake.snakeHead.x]) {
            return false;
        }
        const nextStep = this.matrix[this.objects.snake.snakeHead.y][this.objects.snake.snakeHead.x];
        return nextStep === this.label;
    }
}


