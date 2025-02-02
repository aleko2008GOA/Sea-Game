import { lightning, startRain } from "../background/lightStorm.js";
import win from "../game_over/win.js";
import { parameters } from "../globalVariables/globalVariables.js";

function check_getting_lights(lights_ctx, character_position, lights_grid, isImmune){
    const lightWidth = Math.round(parameters.standartSize.light.width);
    const lightHeight = Math.round(parameters.standartSize.light.height);
    const charWidth = Math.round(parameters.standartSize.character.width);
    const charHeight = Math.round(parameters.standartSize.character.height);

    const canvasWidth = Math.round(parameters.standartSize.canvas.width);
    const canvasHeight = Math.round(parameters.standartSize.canvas.height);
    const chunkX = canvasWidth / 10;
    const chunkY = canvasHeight / 10;

    // getting is character on border of four chunks
    const x = Math.floor(character_position.x / chunkX);
    const x1 = Math.floor((character_position.x + charWidth) / chunkX);
    const y = Math.floor(character_position.y / chunkY);
    const y1 = Math.floor((character_position.y + charHeight) / chunkY);

    // getting all teh chunks
    const rect_topLeft = lights_grid[y][x]; 
    const rect_topRight = lights_grid[y][x1];
    const rect_bottomLeft = lights_grid[y1][x];
    const rect_bottomRight = lights_grid[y1][x1];

    let immune = isImmune;

    const is_on_light = rect_topLeft && (rect_topLeft.x < character_position.x + charWidth && rect_topLeft.x > character_position.x - charWidth) && (rect_topLeft.y < character_position.y + charHeight && rect_topLeft.y > character_position.y - charHeight)
        || rect_topRight && (rect_topRight.x < character_position.x + charWidth && rect_topRight.x > character_position.x - charWidth) && (rect_topRight.y < character_position.y + charHeight && rect_topRight.y > character_position.y - charHeight)
        || rect_bottomLeft && (rect_bottomLeft.x < character_position.x + charWidth && rect_bottomLeft.x > character_position.x - charWidth) && (rect_bottomLeft.y < character_position.y + charHeight && rect_bottomLeft.y > character_position.y - charHeight)
        || rect_bottomRight && (rect_bottomRight.x < character_position.x + charWidth && rect_bottomRight.x > character_position.x - charWidth) && (rect_bottomRight.y < character_position.y + charHeight && rect_bottomRight.y > character_position.y - charHeight);
    
    // cheking in every chunk
    if(!immune){
        if(is_on_light){
            console.log(++parameters.collected + ' lights collected');
            lightning(parameters.collected);
        }

        if(rect_topLeft && (rect_topLeft.x < character_position.x + lightWidth && rect_topLeft.x > character_position.x - lightWidth) && (rect_topLeft.y < character_position.y + lightHeight && rect_topLeft.y > character_position.y - lightHeight)){
            lights_grid[y][x] = null;
            lights_ctx.clearRect(rect_topLeft.x, rect_topLeft.y, lightWidth, lightHeight); // rempving light image
        }
        if(rect_topRight && (rect_topRight.x < character_position.x + lightWidth && rect_topRight.x > character_position.x - lightWidth) && (rect_topRight.y < character_position.y + lightHeight && rect_topRight.y > character_position.y - lightHeight)){
            lights_grid[y][x1] = null;
            lights_ctx.clearRect(rect_topRight.x, rect_topRight.y, lightWidth, lightHeight);
        }
        if(rect_bottomLeft && (rect_bottomLeft.x < character_position.x + lightWidth && rect_bottomLeft.x > character_position.x - lightWidth) && (rect_bottomLeft.y < character_position.y + lightHeight && rect_bottomLeft.y > character_position.y - lightHeight)){
            lights_grid[y1][x] = null;
            lights_ctx.clearRect(rect_bottomLeft.x, rect_bottomLeft.y, lightWidth, lightHeight);
        }
        if(rect_bottomRight && (rect_bottomRight.x < character_position.x + lightWidth && rect_bottomRight.x > character_position.x - lightWidth) && (rect_bottomRight.y < character_position.y + lightHeight && rect_bottomRight.y > character_position.y - lightHeight)){
            lights_grid[y1][x1] = null;
            lights_ctx.clearRect(rect_bottomRight.x, rect_bottomRight.y, lightWidth, lightHeight);
        }
    }

    if(parameters.collected === 12) win();
}

export default check_getting_lights;