class SnakeFood {
    label = 'A';
    picture = null;
    constructor() {
        this.coordinates = [];
    }
    setPosition(coordsForChose) {
        this.coordinates = [coordsForChose[Math.floor(Math.random() * coordsForChose.length - 1)]]
    }
}
