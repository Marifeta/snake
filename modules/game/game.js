class Game {
    #intervalId = 0;
    #isChangeDirection = false;
    state = STATE.START;
    mode = MODE.CLASSIC;
    speed = SPEED.NORMAL;
    food = FOOD.BANANA
    label = '-';
    render = false;
    objects = {
        snake: new Snake(450),
        snakeFood: new SnakeFood(),
        poop: new Poop(),
    };
    matrix = [];
    settings = {
        pixelSize: 15,
        color: {
            b: "#000000",
            g: "#4f914c",
            r: "red",
            d: "#508a4d",
            h: '#407046',
            y: "#c9c977",
            "-": "rgba(0,0,0,0)",
            'i': 'brown',
            'x': 'green',
            'f': 'pink',
            's': 'yellow',
            'q': 'darkred',
            'm': '#f66727',
            'n': '#f58f1b',
            'v': 'green',
            'z': '#205229',
            'J': 'darkgray',
            'j': 'gray',
            u: 'pink'
        }
    };
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.initGame();
    }
    initGame() {
        this.createMatrix();
        this.changeMatrix(this.objects.snake.coordinates, this.objects.snake.label)
        this.objects.snakeFood.setPosition(this.getEmptyCoords());
        this.changeMatrix(this.objects.snakeFood.coordinates, this.objects.snakeFood.label)
    }
    start() {
        console.log('mode', this.mode.description);
        this.state = STATE.CONTINUE;
        this.#intervalId = setInterval(() => {
                this.objects.snake.move();
                if (this.mode === MODE.CLASSIC) {
                    this.classicPlay();
                } else if (this.mode === MODE.POOP) {
                    this.poopPlay();
                } else if (this.mode === MODE.GOD) {
                    this.godPlay();
                }
                this.objects.snake.tailDirection();
                this.addToMatrix(this.objects.snake.snakeTail, this.objects.snake.tailLabel);
                this.objects.snake.turn = null;
                this.objects.snake.label = 'o';
                this.render = true;
                this.#isChangeDirection = false;
            }, this.speed.description);
    }
    pending() {
        this.state = STATE.PENDING;
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
        if (directionKey in DIRECTION && !this.#isChangeDirection) {
            this.objects.snake.turn = `${this.objects.snake.direction.description}_${DIRECTION[directionKey].description}`;
            this.objects.snake.direction = DIRECTION[directionKey];
            this.#isChangeDirection = true;
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
                if (this.matrix[y][x] === '-') {
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
    #isEatBorder() {
        return !(this.matrix[this.objects.snake.snakeHead.y] && this.matrix[this.objects.snake.snakeHead.y][this.objects.snake.snakeHead.x]);
    }
    #isEatMyself() {
        const nextStep = this.matrix[this.objects.snake.snakeHead.y][this.objects.snake.snakeHead.x];
        return nextStep !== this.label;
    }
    addToMatrix(coords, label) {
        this.matrix[coords.y][coords.x] = label;
    }
    removeFromMatrix(coords) {
        this.matrix[coords.y][coords.x] = this.label;
    }
    isLose() {
        if(this.mode === MODE.CLASSIC || this.mode === MODE.POOP) {
            return this.#isEatBorder() || this.#isEatMyself()
        } else if (this.mode === MODE.GOD) {
            return this.objects.snake.coordinates.length > 300;
        }
        return false;
    }
    godPlay() {
        if (this.isEatFood()) {
            this.moveSnake(true);
            this.addFood();
        } else if (this.isLose()) {
            this.end();
        } else if (this.objects.snake.snakeHead.y < 0 || this.objects.snake.snakeHead.x < 0
            || this.objects.snake.snakeHead.y > this.matrix.length - 1 || this.objects.snake.snakeHead.x > this.matrix.length - 1) {
            this.setGodSnakePosition();
        } else {
            this.moveSnake();
        }
    }
    poopPlay() {
        if (this.isEatFood()) {
            this.moveSnake();
            this.addFood();
            this.objects.poop.addCoords({...this.objects.snake.snakeHead});
        } else if (this.isLose()) {
            this.end();
        } else {
            this.moveSnake();
        }
        this.objects.poop.coordinates.forEach((coords, index) => {
            if (this.matrix[coords.y][coords.x] === '-') {
                this.addToMatrix(coords, 'G');
                this.objects.poop.coordinates.splice(index, 1);
            }
        });
    }
    setGodSnakePosition() {
        if (this.objects.snake.snakeHead.y < 0) {
            this.objects.snake.snakeHead = {x: this.objects.snake.snakeHead.x, y: this.matrix.length - 1};
            this.objects.snake.coordinates[0] = {x: this.objects.snake.snakeHead.x, y: this.matrix.length - 1};
        } else if (this.objects.snake.snakeHead.x < 0) {
            this.objects.snake.snakeHead = {x: this.matrix.length - 1, y: this.objects.snake.snakeHead.y };
            this.objects.snake.coordinates[0] = {x: this.matrix.length - 1, y: this.objects.snake.snakeHead.y };
        } else if (this.objects.snake.snakeHead.y > this.matrix.length - 1) {
            this.objects.snake.snakeHead = {x: this.objects.snake.snakeHead.x, y: 0};
            this.objects.snake.coordinates[0] = {x: this.objects.snake.snakeHead.x, y: 0};
        } else if (this.objects.snake.snakeHead.x > this.matrix.length) {
            this.objects.snake.snakeHead = {x: 0, y: this.objects.snake.snakeHead.y};
            this.objects.snake.coordinates[0] = {x: 0, y: this.objects.snake.snakeHead.y};
        }
        this.moveSnake();
    }
    classicPlay() {
        if (this.isEatFood()) {
            this.moveSnake(true);
            this.addFood();
        } else if (this.isLose()) {
            this.end();
        } else {
            this.moveSnake();
        }
    }
    moveSnake(isGrow = false) {
        this.addToMatrix(this.objects.snake.snakeHead, this.objects.snake.headLabel);
        this.addToMatrix(this.objects.snake.coordinates[1], this.objects.snake.label);
        if (!isGrow) {
            this.removeFromMatrix(this.objects.snake.snakeTail);
            this.objects.snake.coordinates.pop();
            this.objects.snake.snakeTail = this.objects.snake.coordinates[this.objects.snake.coordinates.length - 1];
        }
    }
    addFood() {
        this.objects.snakeFood.setPosition(this.getEmptyCoords());
        this.addToMatrix(this.objects.snakeFood.coordinates[0], this.objects.snakeFood.label);
    }
}


