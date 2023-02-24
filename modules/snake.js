class Snake extends GameObject{
    #direction = 'left';
    constructor(field, x, y, snakeFood, speed = 500) {
        super(field, x, y);
        this.isMoving = false;
        this.isLose = false;
        this.speed = speed;
        this.snakeBegining = {x, y};
        this.snakeFood = snakeFood;
        field.registerGameObjects(this);
        this.initCoords();
    }
    initCoords() {
        this.coordinates.push(
            {x: this.x, y: this.y},
            {x: this.x + 10, y: this.y},
            {x: this.x + 20, y: this.y}
        )
    };
    changeDirection(direction) {
        this.#direction = direction;
    }
    move() {
        try {
            this.isMoving = setInterval(() => {
                if (this.#direction === 'top') {
                    this.snakeBegining.y -= 10;

                } else if (this.#direction === 'bottom') {
                    this.snakeBegining.y += 10;
                }
                else if (this.#direction === 'left') {
                    this.snakeBegining.x -= 10;
                }
                else if (this.#direction === 'right') {
                    this.snakeBegining.x += 10;
                }
                if (!this.isEating()) {
                    this.coordinates[this.coordinates.length - 1] = {
                        ...this.coordinates[this.coordinates.length - 1],
                        isDel: true,
                    }
                } else {
                    this.snakeFood.setPosition(this.coordinates);
                }
                this.coordinates.unshift({x: this.snakeBegining.x, y: this.snakeBegining.y})
                const myselfEating = this.coordinates.filter((coord, index) =>{
                    return (coord.x === this.snakeBegining.x && coord.y === this.snakeBegining.y) && index !== 0
                });
                if (this.snakeBegining.x < 0
                    || this.snakeBegining.x > this.field.width - 10
                    || this.snakeBegining.y > this.field.width - 10
                    || this.snakeBegining.y < 0
                    || myselfEating.length
                ) {
                    this.isLose = true;
                    this.setPause();
                }
                this.draw();

            }, this.speed);
        } catch (err) {
            console.log(err)
        }

    }
    isEating() {
        return this.snakeFood.coordinates[0].x === this.snakeBegining.x && this.snakeFood.coordinates[0].y === this.snakeBegining.y
    };
    setPause() {
        clearInterval(this.isMoving);
        this.isMoving = '';
    }
}
