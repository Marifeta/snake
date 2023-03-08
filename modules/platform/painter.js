const pictures = {};
let foodPicture = null;

class Painter {
    canvas = getElements('painter-canvas');
    context = this.canvas.getContext('2d');
    constructor() {
    }
    createPictures(arrOfPictureData, color) {
        arrOfPictureData.forEach((data) => {
            const image = new Image(10, 10);
            this.draw(data.matrix, color, data.pixelSize)
            image.src = this.canvas.toDataURL();
            pictures[data.name] = image;
            if(data.name === 'apple') {
                foodPicture = image;
            }
        });
    }
    draw(matrix, color, pixelSize) {
        this.context.canvas.width = matrix.length * pixelSize;
        this.context.canvas.height = matrix.length * pixelSize;
        for(let i = 0; i < matrix.length; i++){
            for(let f = 0; f < matrix[i].length; f++){
                this.newRect(f, i, color[matrix[i][f]], pixelSize);
            }
        }
    }
    newRect(col, row, color, pixelSize) {
        this.context.fillStyle = color;
        this.context.fillRect(col * pixelSize, row * pixelSize, pixelSize, pixelSize);
    }
}
