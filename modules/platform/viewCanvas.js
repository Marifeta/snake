class ViewCanvas extends ViewControl {
    canvas = getElements('view-canvas');
    context = this.canvas.getContext('2d');
    constructor() {
        super('viewCanvas', getElements('view-canvas'));
        this.el.addEventListener('dblclick', this.clickHandler.bind(this));
    }
    draw(matrix, color, pixelSize) {
        this.context.canvas.width = matrix.length * pixelSize;
        this.context.canvas.height = matrix.length * pixelSize;
        for(let i = 0; i < matrix.length; i++){
            for(let f = 0; f < matrix[i].length; f++){
                this.newRect(f, i, color[matrix[i][f]], pixelSize)
            }
        }
    }
    newRect(col, row, color, pixelSize) {
        this.context.fillStyle = color;
        this.context.fillRect(col * pixelSize, row * pixelSize, pixelSize, pixelSize);
    }
}
