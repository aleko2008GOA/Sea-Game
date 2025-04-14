import { animations, parameters } from "../globalVariables/globalVariables.js";
import useLightImages from "../images/useImages/lightImages.js";

// canvas
/** @type {HTMLCanvasElement} */
const lightsCanvas = document.getElementById('lights');

/** @type {CanvasRenderingContext2D} */
const lightsBackground = lightsCanvas.getContext('2d');
const container = document.getElementById('game_main_container');

const lightImages = [];
let lightCurrentImage = null;

async function lights(icebergGridPosition, lightsArray){
    animations.lightFrameFunc = animateLights;
    
    if(lightImages.length === 0) lightImages.push(...lightsArray);
    lightCurrentImage = lightsArray[0];
    animations.lightframeId = true;

    const lightWidth = parameters.standartSize.styleLight.width;
    const lightHeight = parameters.standartSize.styleLight.height;
    lightsCanvas.width = lightWidth;
    lightsCanvas.height = lightHeight;
    lightsCanvas.style.width = lightWidth + 'px';
    lightsCanvas.style.height = lightHeight + 'px';
    const chunkX = parameters.standartSize.canvas.width / 10;
    const chunkY = parameters.standartSize.canvas.height / 10;

    createRandomLights(icebergGridPosition, lightWidth, lightHeight, chunkX, chunkY);
}

function animateLights(deltaStamp){
    if(
        parameters.light.position.x - container.scrollLeft + parameters.standartSize.light.width < parameters.standartSize.screen.width &&
        parameters.light.position.y - container.scrollTop + parameters.standartSize.light.height < parameters.standartSize.screen.height
    ){
        lightCurrentImage = useLightImages(lightImages, deltaStamp);

        lightsBackground.clearRect(0, 0, lightsCanvas.width, lightsCanvas.height);
        lightsBackground.drawImage(
            lightCurrentImage,
            0, 
            0, 
            parameters.standartSize.styleLight.width, 
            parameters.standartSize.styleLight.height
        );
        lightsBackground.strokeRect(
            (parameters.standartSize.styleLight.width - parameters.standartSize.light.width) / 2, 
            parameters.standartSize.styleLight.height - parameters.standartSize.light.height, 
            parameters.standartSize.light.width, 
            parameters.standartSize.light.height
        );
    }
}

// creating lights in random position on canvas
function createRandomLights(icebergGridPosition, lightWidth, lightHeight, chunkX, chunkY, lightGrid = null){
    const chunck = { x: Math.floor(Math.random() * 8 + 1), y: Math.floor(Math.random() * 8 + 1) };

    if(lightGrid){
        do {
            var x = Math.floor(Math.random() * 8 + 1);
            var y = Math.floor(Math.random() * 8 + 1);
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
        lightsBackground.drawImage(
            lightCurrentImage,
            0, 
            0, 
            parameters.standartSize.styleLight.width, 
            parameters.standartSize.styleLight.height
        );
        lightsBackground.strokeRect(
            (parameters.standartSize.styleLight.width - parameters.standartSize.light.width) / 2, 
            parameters.standartSize.styleLight.height - parameters.standartSize.light.height, 
            parameters.standartSize.light.width, 
            parameters.standartSize.light.height
        );
    }
    lightsCanvas.style.left = x + 'px';
    lightsCanvas.style.top = y + 'px';

    const lightCoordinate = { x, y };
    const lightGridPosition = chunck;

    parameters.light.grid.x = lightGridPosition.x;
    parameters.light.grid.y = lightGridPosition.y;
    parameters.light.position.x = lightCoordinate.x + (parameters.standartSize.styleLight.width - parameters.standartSize.light.width) / 2;
    parameters.light.position.y = lightCoordinate.y + parameters.standartSize.styleLight.height - parameters.standartSize.light.height;
    console.log(lightCoordinate, lightGridPosition)
}

export { lights, createRandomLights, animateLights };