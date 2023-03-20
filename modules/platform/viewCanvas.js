class ViewCanvas extends ViewControl {
    canvas = getElements('view-canvas');
    context = this.canvas.getContext('2d');
    constructor() {
        super('viewCanvas', getElements('view-canvas'));
        this.el.addEventListener('dblclick', this.clickHandler.bind(this));
        this.context.mozImageSmoothingEnabled = false;
        this.context.webkitImageSmoothingEnabled = false;
        this.context.msImageSmoothingEnabled = false;
        this.context.imageSmoothingEnabled = false;
    }
    draw(matrix, color, pixelSize) {
        this.context.canvas.width = matrix.length * pixelSize;
        this.context.canvas.height = matrix.length * pixelSize;
        for(let i = 0; i < matrix.length; i++){
            for(let f = 0; f < matrix[i].length; f++){
                if (matrix[i][f] === 'A') {
                    this.drawImage('apple', f, i, pixelSize, true);
                } else if (matrix[i][f] === '1') {
                    this.drawImage('turnUpRight', f, i, pixelSize);
                } else if (matrix[i][f] === '2') {
                    this.drawImage('turnUpLeft', f, i, pixelSize);
                } else if (matrix[i][f] === '3') {
                    this.drawImage('turnDownRight', f, i, pixelSize);
                } else if (matrix[i][f] === '4') {
                    this.drawImage('turnDownLeft', f, i, pixelSize);
                } else if (matrix[i][f] === '0') {
                    this.drawImage('head', f, i, pixelSize);
                } else if (matrix[i][f] === 'o') {
                    this.drawImage('bodyHz', f, i, pixelSize);
                } else if (matrix[i][f] === 'O') {
                    this.drawImage('bodyVt', f, i, pixelSize);
                }  else if (matrix[i][f] === 't') {
                    this.drawImage('tailL', f, i, pixelSize);
                } else if (matrix[i][f] === 'T') {
                    this.drawImage('tailR', f, i, pixelSize);
                } else if (matrix[i][f] === 'p') {
                    this.drawImage('tailHz', f, i, pixelSize);
                } else if (matrix[i][f] === 'P') {
                    this.drawImage('tailVt', f, i, pixelSize);
                } else if (matrix[i][f] === 'G') {
                    this.drawImage('poop', f, i, pixelSize);
                } else {
                    this.newRect(f, i, color[matrix[i][f]], pixelSize);
                }
            }
        }
    }
    newRect(col, row, color, pixelSize) {
        this.context.fillStyle = color;
        this.context.fillRect(col * pixelSize, row * pixelSize, pixelSize, pixelSize);
    }
    drawImage(name, col, row, pixelSize, isFood) {
        if (isFood) {
            this.context.drawImage(foodPicture, col * pixelSize, row * pixelSize, pixelSize, pixelSize);
        } else {
            this.context.drawImage(pictures[name], col * pixelSize, row * pixelSize, pixelSize, pixelSize);
        }
    }
}
