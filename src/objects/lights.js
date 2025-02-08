import light_normal_image from "../images/loadingImages/lights_images.js";
import { parameters } from "../globalVariables/globalVariables.js";

// canvas
/** @type {HTMLCanvasElement} */
const lightsCanvas = document.getElementById('lights');

/** @type {CanvasRenderingContext2D} */
const lightsBackground = lightsCanvas.getContext('2d');

let lightImage = null;

async function lights(icebergGridPosition){
    if(!lightImage) lightImage = await light_normal_image;

    const lightWidth = parameters.standartSize.light.width;
    const lightHeight = parameters.standartSize.light.height;
    lightsCanvas.width = lightWidth;
    lightsCanvas.height = lightHeight;
    lightsCanvas.style.width = lightWidth + 'px';
    lightsCanvas.style.height = lightHeight + 'px';
    const chunkX = parameters.standartSize.canvas.width / 10;
    const chunkY = parameters.standartSize.canvas.height / 10;

    createRandomLights(icebergGridPosition, lightWidth, lightHeight, chunkX, chunkY);
}

// creating lights in random position on canvas
function createRandomLights(icebergGridPosition, lightWidth, lightHeight, chunkX, chunkY, lightGrid = null){
    const chunck = { x: Math.floor(Math.random() * 9 + 1), y: Math.floor(Math.random() * 9 + 1) };

    if(lightGrid){
        do {
            var x = Math.floor(Math.random() * 9 + 1);
            var y = Math.floor(Math.random() * 9 + 1);
        } while(Math.abs(lightGrid.x - x) <= 1 && Math.abs(lightGrid.y - y) <= 1);

        chunck.x = x;
        chunck.y = y;
    }
    const icebergsPosition = icebergGridPosition[chunck.y][chunck.x];
    
    do {
        var x = Math.floor(Math.random() * (chunkX - lightWidth)) + chunck.x * chunkX;
        var y = Math.floor(Math.random() * (chunkY - lightHeight)) + chunck.y * chunkY;
    } while(
        Array.isArray(icebergsPosition) ?
        icebergsPosition.some(iceberg => 
            iceberg.x < x + lightWidth && iceberg.x > x - lightWidth && 
            iceberg.y < y + lightHeight && iceberg.y > y - lightHeight
        ) :
        icebergsPosition.x < x + lightWidth && icebergsPosition.x > x - lightWidth && 
        icebergsPosition.y < y + lightHeight && icebergsPosition.y > y - lightHeight
    );

    if(!lightGrid){
        lightsBackground.strokeRect(0, 0, lightsCanvas.width, lightsCanvas.height);
        lightsBackground.drawImage(lightImage, 0, 0, lightsCanvas.width, lightsCanvas.height);
    }
    lightsCanvas.style.left = x + 'px';
    lightsCanvas.style.top = y + 'px';

    const lightCoordinate = { x, y };
    const lightGridPosition = chunck;

    parameters.iceberg.grid.x = lightGridPosition.x;
    parameters.iceberg.grid.y = lightGridPosition.y;
    parameters.iceberg.position.x = lightCoordinate.x;
    parameters.iceberg.position.y = lightCoordinate.y;
    console.log(lightCoordinate, lightGridPosition)
}

export { lights, createRandomLights };