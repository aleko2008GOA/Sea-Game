import { parameters } from "../globalVariables/globalVariables.js";
import { promiseIceberg, promiseWalls } from "../images/loadingImages/icebergImages.js";

// canvas
/** @type {HTMLCanvasElement} */
const icebergCanvasFront = document.getElementById('iceberg_map_front');
const icebergCanvasBack = document.getElementById('iceberg_map_back');

/** @type {CanvasRenderingContext2D} */
const icebergsBackgroundFront = icebergCanvasFront.getContext('2d');
const icebergsBackgroundBack = icebergCanvasBack.getContext('2d');

let icebergImage = null;
let walls = null;

async function icebergs(){
    if(!icebergImage) icebergImage = await promiseIceberg;
    if(!walls) walls = await Promise.all(promiseWalls);

    // Dimensions
    const icebergWidth = Math.round(parameters.standartSize.iceberg.width);
    const icebergHeight = Math.round(parameters.standartSize.iceberg.height);
    const canvasWidth = Math.round(parameters.standartSize.canvas.width);
    const canvasHeight = Math.round(parameters.standartSize.canvas.height);
    const chunkX = canvasWidth / 10;
    const chunkY = canvasHeight / 10;

    // prepare grid and coordinate structures
    const icebergCoordinateArr = [];
    const icebergGridPosition = Array.from({ length: 10 }, () => 
        Array.from({ length: 10 }, () => [])
    );

    // draw grid on the background canvas && generate iceberg coordinates
    drawGrid(icebergsBackgroundBack, chunkX, chunkY);
    drawWalls(icebergsBackgroundBack, walls, icebergWidth, icebergHeight, canvasWidth, canvasHeight);
    const coordinates = generateIcebergCoordinates(chunkX, chunkY);

    // draw icebergs
    coordinates.forEach(val => {
        const x = val.x + Math.floor(Math.random() * 251);
        const y = val.y + Math.floor(Math.random() * 251);

        if(val.x1 && val.y1){
            do{
                var x1 = val.x1 + Math.floor(Math.random() * 251);
                var y1 = val.y1 + Math.floor(Math.random() * 251);
            } while(x1 < x + icebergWidth && x1 > x - icebergWidth && y1 < y + icebergHeight && y1 > y - icebergHeight);

            drawIceberg(icebergsBackgroundFront, icebergsBackgroundBack, icebergImage, x, y, icebergWidth, icebergHeight, true, x1, y1);

            icebergCoordinateArr.push({ x: x1, y: y1, width: icebergWidth, height: icebergHeight });
            icebergGridPosition[val.y1 / chunkY][val.x1 / chunkX].push({ x: x1, y: y1, width: icebergWidth, height: icebergHeight });
        }

        drawIceberg(icebergsBackgroundFront, icebergsBackgroundBack, icebergImage, x, y, icebergWidth, icebergHeight);

        icebergCoordinateArr.push({ x, y, width: icebergWidth, height: icebergHeight });
        icebergGridPosition[val.y / chunkY][val.x / chunkX].push({ x, y, width: icebergWidth, height: icebergHeight });
    });

    return { icebergCoordinateArr, icebergGridPosition };
}

// draw the grid on the canvas
function drawGrid(ctx, chunkX, chunkY){
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            ctx.strokeRect(i * chunkX, j * chunkY, chunkX, chunkY);
        }
    }
}

// randomly generate iceberg coordinates
function generateIcebergCoordinates(chunkX, chunkY){
    const arr = [];
    let num_of_double = 0;

    for(let i = 0; i < 50; i++){
        do{
            var x = (Math.floor(Math.random() * 8) + 1) * chunkX;
            var y = (Math.floor(Math.random() * 8) + 1) * chunkY;
        } while(arr.find(elem => elem.x === x && elem.y === y));

        if(Math.random() < 0.5 && num_of_double < 20 || 20 - num_of_double === 50 - i){
            num_of_double++;
            arr.push({x, y, x1: x, y1: y});
        } else arr.push({x, y});
    }
    return arr;
}

// draw a single iceberg on the canvas
function drawIceberg(ctxFront, ctxBack, image, x, y, width, height, isDouble = false, x1 = null, y1 = null) {
    ctxFront.drawImage(image, 0, 0, image.width, image.height * (0.8 / 1.9), x - width * 0.1, y - height * 0.8, width * 1.2, height * 0.8);
    ctxBack.drawImage(image, 0, image.height * (0.8 / 1.9), image.width, image.height * (1.1 / 1.9), x - width * 0.1, y, width * 1.2, height * 1.1);
    ctxFront.strokeRect(x, y, width, height);

    if(isDouble){
        ctxFront.drawImage(image, 0, 0, image.width, image.height * (0.8 / 1.9), x1 - width * 0.1, y1 - height * 0.8, width * 1.2, height * 0.8);
        ctxBack.drawImage(image, 0, image.height * (0.8 / 1.9), image.width, image.height * (1.1 / 1.9), x1 - width * 0.1, y1, width * 1.2, height * 1.1);
        ctxFront.strokeRect(x1, y1, width, height);
    }
}

// draw walls
function drawWalls(ctx, walls, width, height, ctxWidth, ctxHeight){
    const difference = ctxHeight / walls[0].height;
    walls.forEach((wall, index) =>{
        ctx.drawImage(wall, index === 1 ? ctxWidth - wall.width * difference : 0, index === 2 ? ctxHeight - wall.height * difference : 0, wall.width * difference, wall.height * difference);
    });

    ctx.strokeRect(0, 0, ctxWidth, height);
    ctx.strokeRect(0, 0, width, ctxHeight);
    ctx.strokeRect(0, ctxHeight - height, ctxWidth, height);
    ctx.strokeRect(ctxWidth - width, 0, width, ctxHeight);
}

export { icebergs };