import { lightning, startRain } from "../background/lightStorm.js";
import win from "../game_over/win.js";
import { parameters } from "../globalVariables/globalVariables.js";
import { createRandomLights } from "../objects/lights.js";

const lightsCounter = document.getElementById('lightsCounter');

function checkGettingLights(icebergGrid, characterPosition, lightGrid, lightPosition, isImmune){
    const lightWidth = parameters.standartSize.light.width;
    const lightHeight = parameters.standartSize.light.height;
    const charWidth = parameters.standartSize.character.width;
    const charHeight = parameters.standartSize.character.height;

    const chunkX = parameters.standartSize.canvas.width / 10;
    const chunkY = parameters.standartSize.canvas.height / 10;

    // getting is character on border of four chunks
    let immune = isImmune;

    const isOnLight = 
        characterPosition.x < lightPosition.x + lightWidth &&
        characterPosition.x + charWidth > lightPosition.x &&
        characterPosition.y < lightPosition.y + lightHeight &&
        characterPosition.y + charHeight > lightPosition.y;
    
    // cheking in every chunk
    if(!immune && isOnLight){
        console.log(++parameters.collected + ' lights collected');
        lightsCounter.querySelector('span').textContent = parameters.collected;

        if(parameters.collected < 12) createRandomLights(icebergGrid, lightWidth, lightHeight, chunkX, chunkY, lightGrid);
        lightning(parameters.collected);
    }

    if(parameters.collected === 12) win();
}

export default checkGettingLights;