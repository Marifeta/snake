class Snake {
    #intervalId = '';
    label = 'o';
    headLabel = '0';
    tailLabel = 't' // tTpP
    constructor(speed = 500) {
        this.coordinates = [{x: 8, y: 9}, {x: 9, y: 9}, {x: 10, y: 9}];
        this.snakeHead = {x: 8, y: 9};
        this.snakeTail = {x: 10, y: 9};
        this.speed = speed;
        this.direction = DIRECTION.LEFT;
        this.turn = null;
    }
    move() {
        if (this.direction === DIRECTION.TOP) {
            this.label = 'O';
            this.snakeHead.y -= 1;
        } else if (this.direction === DIRECTION.RIGHT) {
            this.snakeHead.x += 1;
        } else if (this.direction === DIRECTION.BOTTOM) {
            this.label = 'O';
            this.snakeHead.y += 1;
        } else if (this.direction === DIRECTION.LEFT) {
            this.snakeHead.x -= 1;
        }
        if (this.turn) {
            this.setLabelInTurn();
        }
        this.coordinates.unshift({x: this.snakeHead.x, y: this.snakeHead.y});
    }
    setLabelInTurn() {
        if (this.turn === 'right_top' || this.turn === 'bottom_left') {
            this.label = '4';
        } else if (this.turn === 'left_top' || this.turn === 'bottom_right') {
            this.label = '3';
        } else if (this.turn === 'top_left' || this.turn === 'right_bottom') {
            this.label = '2';
        } else if (this.turn === 'top_right' || this.turn === 'left_bottom') {
            this.label = '1';
        }
    }
    tailDirection() {
        const prev = this.coordinates[this.coordinates.length - 2];
        if (prev.x > this.snakeTail.x && prev.y === this.snakeTail.y) {
            this.tailLabel = 'T'
        } else if (prev.y > this.snakeTail.y && prev.x === this.snakeTail.x) {
            this.tailLabel = 'p'
        } else if (prev.x < this.snakeTail.x && prev.y === this.snakeTail.y) {
            this.tailLabel = 't'
        } else if (prev.y < this.snakeTail.y && prev.x === this.snakeTail.x) {
            this.tailLabel = 'P'
        }

    }

}
