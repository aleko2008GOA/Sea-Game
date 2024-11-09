import win from "../game_over/win.js";

let collected = 0;

function check_getting_lights(lights_ctx, character_position, lights_grid, isImmune){
    // getting is character on border of four chunks
    const x = Math.floor(character_position.x / 300);
    const x1 = Math.floor((character_position.x + 50) / 300);
    const y = Math.floor(character_position.y / 300);
    const y1 = Math.floor((character_position.y + 50) / 300);

    // getting all teh chunks
    const rect_topLeft = lights_grid[y][x]; 
    const rect_topRight = lights_grid[y][x1];
    const rect_bottomLeft = lights_grid[y1][x];
    const rect_bottomRight = lights_grid[y1][x1];

    let immune = isImmune;

    const is_on_light = rect_topLeft && (rect_topLeft.x < character_position.x + 50 && rect_topLeft.x > character_position.x - 50) && (rect_topLeft.y < character_position.y + 50 && rect_topLeft.y > character_position.y - 50)
        || rect_topRight && (rect_topRight.x < character_position.x + 50 && rect_topRight.x > character_position.x - 50) && (rect_topRight.y < character_position.y + 50 && rect_topRight.y > character_position.y - 50)
        || rect_bottomLeft && (rect_bottomLeft.x < character_position.x + 50 && rect_bottomLeft.x > character_position.x - 50) && (rect_bottomLeft.y < character_position.y + 50 && rect_bottomLeft.y > character_position.y - 50)
        || rect_bottomRight && (rect_bottomRight.x < character_position.x + 50 && rect_bottomRight.x > character_position.x - 50) && (rect_bottomRight.y < character_position.y + 50 && rect_bottomRight.y > character_position.y - 50);
    
    // cheking in every chunk
    if(!immune){
        if(is_on_light){
            console.log(++collected + ' lights collected');
        }

        if(rect_topLeft && (rect_topLeft.x < character_position.x + 50 && rect_topLeft.x > character_position.x - 50) && (rect_topLeft.y < character_position.y + 50 && rect_topLeft.y > character_position.y - 50)){
            lights_grid[y][x] = null;
            lights_ctx.clearRect(rect_topLeft.x, rect_topLeft.y, 50, 50); // rempving light image
        }
        if(rect_topRight && (rect_topRight.x < character_position.x + 50 && rect_topRight.x > character_position.x - 50) && (rect_topRight.y < character_position.y + 50 && rect_topRight.y > character_position.y - 50)){
            lights_grid[y][x1] = null;
            lights_ctx.clearRect(rect_topRight.x, rect_topRight.y, 50, 50);
        }
        if(rect_bottomLeft && (rect_bottomLeft.x < character_position.x + 50 && rect_bottomLeft.x > character_position.x - 50) && (rect_bottomLeft.y < character_position.y + 50 && rect_bottomLeft.y > character_position.y - 50)){
            lights_grid[y1][x] = null;
            lights_ctx.clearRect(rect_bottomLeft.x, rect_bottomLeft.y, 50, 50);
        }
        if(rect_bottomRight && (rect_bottomRight.x < character_position.x + 50 && rect_bottomRight.x > character_position.x - 50) && (rect_bottomRight.y < character_position.y + 50 && rect_bottomRight.y > character_position.y - 50)){
            lights_grid[y1][x1] = null;
            lights_ctx.clearRect(rect_bottomRight.x, rect_bottomRight.y, 50, 50);
        }
    }

    if(collected === 12) win();
}

export default check_getting_lights;