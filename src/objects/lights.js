import light_normal_image from "../images/loadingImages/lights_images.js";
import { parameters } from "../globalVariables/globalVariables.js";

// canvas
/** @type {HTMLCanvasElement} */
const lightsCanvas = document.getElementById('lights');

/** @type {CanvasRenderingContext2D} */
const lightsBackground = lightsCanvas.getContext('2d');

let lightImage = null;

async function lights(icebergCoordinateArr){
    if(!lightImage) lightImage = await light_normal_image;

    const lightWidth = Math.round(parameters.standartSize.light.width);
    const lightHeight = Math.round(parameters.standartSize.light.height);
    const canvasWidth = Math.round(parameters.standartSize.canvas.width);
    const canvasHeight = Math.round(parameters.standartSize.canvas.height);
    const chunkX = canvasWidth / 10;
    const chunkY = canvasHeight / 10;

    const { lightsCoordinateArr, lightsGridPosition } = createRandomLights(icebergCoordinateArr, lightWidth, lightHeight, chunkX, chunkY);
    
    return { lightsCoordinateArr, lightsGridPosition, lightsBackground };
}

// creating lights in random position on canvas
function createRandomLights(icebergCoordinateArr, lightWidth, lightHeight, chunkX, chunkY){
    const lightsCoordinateArr = [];
    const lightsGridPosition = Array.from({ length: 10 }, () => 
        Array.from({ length: 10 }, () => null)
    );
    const lights = [];

    for(let y = 0; y < 8; y++){
        for(let x = 0; x < 8; x++){
            let coord = {x: (x + 1) * chunkX, y: (y + 1) * chunkY};
            lights.push(coord);
        }
    }

    const setOfLights = new Set(lights);

    for(let i = 0; i < 12; i++){
        const lightCoord = Array.from(setOfLights)[Math.floor(Math.random() * Array.from(setOfLights).length)];
        
        do {
            var x = Math.floor(Math.random() * 251) + lightCoord.x;
            var y = Math.floor(Math.random() * 251) + lightCoord.y;
        }while(icebergCoordinateArr.find(val => {
            return (val.x < x + lightWidth && val.x > x - lightWidth) && (val.y < y + lightHeight && val.y > y - lightHeight);
        }));
        setOfLights.delete(lightCoord);

        lightsBackground.strokeRect(x, y, lightWidth, lightHeight);
        lightsBackground.drawImage(lightImage, x, y, lightWidth, lightHeight);

        lightsCoordinateArr.push({x, y});
        lightsGridPosition[Math.floor(y / chunkY)][Math.floor(x / chunkX)] = {x, y};
    }

    return { lightsCoordinateArr, lightsGridPosition };
}

export { lights };