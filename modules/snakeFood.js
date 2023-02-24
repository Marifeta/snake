class SnakeFood extends GameObject{
    constructor(field, x, y,) {
        super(field, x, y, 'green');
        field.registerGameObjects(this);
        this.initCoords();
    }
    setPosition(snakeCoords) {
        const s = new Set(snakeCoords.map(e => JSON.stringify(e)));
        const freeCoords = this.field.matrix.filter(e => !s.has(JSON.stringify(e)));
        this.coordinates = [freeCoords[Math.floor(Math.random() * freeCoords.length - 1)]];
        this.draw();
    }
}
