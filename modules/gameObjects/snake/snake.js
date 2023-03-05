class Snake {
    #intervalId = '';
    label = 'o';
    constructor(speed = 500) {
        this.coordinates = [{x: 8, y: 9}, {x: 9, y: 9}, {x: 10, y: 9}];
        this.snakeHead = {x: 8, y: 9};
        this.snakeTail = {x: 10, y: 9};
        this.speed = speed;
        this.direction = DIRECTION.LEFT;
    }
    move() {
        if (this.direction === DIRECTION.TOP) {
            this.snakeHead.y -= 1;
        } else if (this.direction === DIRECTION.RIGHT) {
            this.snakeHead.x += 1;
        } else if (this.direction === DIRECTION.BOTTOM) {
            this.snakeHead.y += 1;
        } else if (this.direction === DIRECTION.LEFT) {
            this.snakeHead.x -= 1;
        }
        this.coordinates.unshift({x: this.snakeHead.x, y: this.snakeHead.y});
    }
}
