class SnakeFood {
    label = 'A';
    constructor() {
        this.coordinates = [];
    }
    setPosition(coordsForChose) {
        this.coordinates = [coordsForChose[Math.floor(Math.random() * coordsForChose.length - 1)]]
    }
}
