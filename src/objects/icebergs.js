import { parameters } from "../globalVariables/globalVariables.js";
import { promiseIceberg, promiseWalls } from "../images/loadingImages/icebergImages.js";

// canvas
/** @type {HTMLCanvasElement} */
const icebergMapWalls = document.getElementById('iceberg_map_walls');

/** @type {CanvasRenderingContext2D} */
const icebergMapWallsCtx = icebergMapWalls.getContext('2d');

const icebergFront = document.getElementById('iceberg_map_front');
const icebergBack = document.getElementById('iceberg_map_back');

let icebergImageFront = null;
let icebergImageBack = null;
let walls = null;

async function icebergs(){
    if(!icebergImageFront || !icebergImageBack){
        icebergImageFront = await promiseIceberg[1];
        icebergImageBack = await promiseIceberg[2];

        parameters.images.icebergImage = await promiseIceberg[0];
        parameters.images.icebergFrontImage = icebergImageFront;
        parameters.images.icebergBackImage = icebergImageBack;
    } 
    if(!walls) walls = await Promise.all(promiseWalls);

    // Dimensions
    const icebergWidth = parameters.standartSize.iceberg.width;
    const icebergHeight = parameters.standartSize.iceberg.height;
    const canvasWidth = parameters.standartSize.canvas.width;
    const canvasHeight = parameters.standartSize.canvas.height;
    const chunkX = canvasWidth / 10;
    const chunkY = canvasHeight / 10;

    // prepare grid and coordinate structures
    const icebergCoordinateArr = [];
    const icebergGridPosition = Array.from({ length: 10 }, () => 
        Array.from({ length: 10 }, () => [])
    );

    // draw grid on the background canvas && generate iceberg coordinates
    drawGrid(icebergMapWallsCtx, chunkX, chunkY);
    drawWalls(icebergMapWallsCtx, walls, icebergWidth, icebergHeight, canvasWidth, canvasHeight);
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

            drawIceberg(icebergFront, icebergBack, x, y, icebergWidth, icebergHeight, true, x1, y1);

            icebergCoordinateArr.push({ x: x1, y: y1, width: icebergWidth, height: icebergHeight });
            icebergGridPosition[val.y1 / chunkY][val.x1 / chunkX].push({ x: x1, y: y1, width: icebergWidth, height: icebergHeight });
        }

        drawIceberg(icebergFront, icebergBack, x, y, icebergWidth, icebergHeight);

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
function drawIceberg(divFront, divBack, x, y, width, height, isDouble = false, x1 = null, y1 = null) {
    const iceFront = document.createElement('canvas');
    const iceBack = document.createElement('canvas');

    const ctxFront = iceFront.getContext('2d');
    const ctxBack = iceBack.getContext('2d');

    iceFront.style.width = parameters.standartSize.icebergStyle.front.width + 'px';
    iceFront.style.height = parameters.standartSize.icebergStyle.front.height + 'px';
    iceFront.width = parameters.standartSize.icebergStyle.front.width;
    iceFront.height = parameters.standartSize.icebergStyle.front.height;

    iceBack.style.width = parameters.standartSize.icebergStyle.back.width + 'px';
    iceBack.style.height = parameters.standartSize.icebergStyle.back.height + 'px';
    iceBack.width = parameters.standartSize.icebergStyle.back.width;
    iceBack.height = parameters.standartSize.icebergStyle.back.height;

    iceFront.style.left = x + 'px';
    iceFront.style.top = y - parameters.standartSize.icebergStyle.front.height + 'px';
    iceBack.style.left = x + 'px';
    iceBack.style.top = y + 'px';

    ctxFront.drawImage(icebergImageFront, 0, 0, iceFront.width, iceFront.height);
    ctxBack.drawImage(icebergImageBack, 0, 0, iceBack.width, iceBack.height);
    ctxFront.strokeRect(0, 0, width, height);

    divFront.appendChild(iceFront);
    divBack.appendChild(iceBack);

    if(isDouble){
        const iceFrontSec = document.createElement('canvas');
        const iceBackSec = document.createElement('canvas');

        const ctxFrontSec = iceFrontSec.getContext('2d');
        const ctxBackSec = iceBackSec.getContext('2d');

        iceFrontSec.style.width = parameters.standartSize.icebergStyle.front.width + 'px';
        iceFrontSec.style.height = parameters.standartSize.icebergStyle.front.height + 'px';
        iceFrontSec.width = parameters.standartSize.icebergStyle.front.width;
        iceFrontSec.height = parameters.standartSize.icebergStyle.front.height;

        iceBackSec.style.width = parameters.standartSize.icebergStyle.back.width + 'px';
        iceBackSec.style.height = parameters.standartSize.icebergStyle.back.height + 'px';
        iceBackSec.width = parameters.standartSize.icebergStyle.back.width;
        iceBackSec.height = parameters.standartSize.icebergStyle.back.height;
    
        iceFrontSec.style.left = x1 + 'px';
        iceFrontSec.style.top = y1 - parameters.standartSize.icebergStyle.front.height + 'px';
        iceBackSec.style.left = x1 + 'px';
        iceBackSec.style.top = y1 + 'px';

        ctxFrontSec.drawImage(icebergImageFront, 0, 0, iceFrontSec.width, iceFrontSec.height);
        ctxBackSec.drawImage(icebergImageBack, 0, 0, iceBackSec.width, iceBackSec.height);
        ctxFrontSec.strokeRect(0, 0, width, height);

        divFront.appendChild(iceFrontSec);
        divBack.appendChild(iceBackSec);
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