class GameObject {
    constructor(field, x, y, color = 'black') {
        this.field = field;
        this.x = x;
        this.y = y;
        this.coordinates = [];
        this.color = color;
    }
    initCoords() {
        this.coordinates.push({x: this.x, y: this.y});
    };
    draw() {
        this.field.context.fillStyle = this.color;
        this.coordinates.forEach((coords) => {
            if (coords.isDel) {
                this.field.context.clearRect(coords.x, coords.y, 10, 10);
                this.coordinates.pop();
            } else {
                this.field.context.fillRect(coords.x, coords.y, 10, 10);
            }
        });
    }
}

