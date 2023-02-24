class Field{
    constructor(context, width, height) {
        this.context = context;
        this.width = width;
        this.height = height;
        this.gameObjects = [];
        this.matrix = [];
        this.createMatrix(width, height);
    }
    setSplashScreen() {
        let self = this,
            opts = {
                pixelSize: 10
            },

            color = {
                b: "black",
                g: "#4f914c",
                r: "red",
                d: "#508a4d",
                h: '#407046',
                y: "#c9c977",
                "-": "rgba(0,0,0,0)"
            },

            picture = [
                "------------------------------",
                "------------------------------",
                "------------------------------",
                "----------bbbbbbbb------------",
                "--------bb-bggb-bgbb----------",
                "-------b---bgb---bggb---------",
                "------b---bggb----bgb---------",
                "-----b---bbgbb----bgb---------",
                "-----b--bbbgbbb---bghb--------",
                "-----b--bbbgbbb---bghb--------",
                "-----b--bbggbbb---bghb--------",
                "-----b---bggbb---bgghb--------",
                "-----bbbbgggb---bggghb--------",
                "-----bdddggggbbbggghhb--------",
                "------bddddddddddbhhb---------",
                "-------bbbbbbbbbbhhgb---------",
                "-------rrrrbhhhhhggb----------",
                "------rrrr-bbhhhggb-----------",
                "----rrrrr--byyhhggbbbb--------",
                "--rrrrrr--bgggghgbbgggb-------",
                "rrrrrr----byyyyhgbhggggb------",
                "---rr-----bggghggbggggggbbbb--",
                "--rr------byyyhgghggghhgbgggb-",
                "----------bggghgggggbhhgggghb-",
                "----------byyhgggggbgggggghb--",
                "----------bggghgggb-bygghhb---",
                "-----------bggghhb---byhbb----",
                "------------bbbbb-----bb------",
                "------------------------------",
                "------------------------------",
                ];

        function initArt(){
            for(let i = 0; i < picture.length; i++){
                for(let f = 0; f < picture[i].length; f++){
                    newRect(f, i, color[picture[i][f]])
                }
            }
        }

        function getMaxLength(array) {
            let allLengths = [];
            for( let i = 0; i < array.length; i++ ) {
                allLengths.push(array[i].length)
            }
            return Math.max.apply(null, allLengths);
        }

        function newRect(col, row, color) {
            self.context.fillStyle = color;
            self.context.fillRect(col*opts.pixelSize, row*opts.pixelSize, opts.pixelSize, opts.pixelSize);
        }

        function init(){
            self.context.canvas.width = getMaxLength(picture) * opts.pixelSize;
            self.context.canvas.height = picture.length * opts.pixelSize;
            initArt()
        }

        init()
    }
    createMatrix(width, height) {
        for(let i = 0; i < width; i += 10){
            for(let j = 0; j < height; j += 10){
                this.matrix.push({ x: j, y: i });
            }
        }
    }
    registerGameObjects(object) {
        try {
            if (!object) {
                // TODO что-то тут не так, надо поправить
                throw new Error('snake or snakeFood is not defined!');
            } else {
                this.gameObjects.push(object);
            }
        } catch (err) {
            console.log(err);
        }
    }
    unregisterGameObjects() {
        this.gameObjects = new Array(2);
    }
    draw() {
        this.context.canvas.width  = this.width;
        this.context.canvas.height = this.height;
        this.context.fillStyle = "#ffffff";
        this.context.fillRect(0, 0, this.width, this.height);
         for (let objects = this.gameObjects, i = 0, n = objects.length; i < n; i++) {
             objects[i].draw();
        }
    }
}

