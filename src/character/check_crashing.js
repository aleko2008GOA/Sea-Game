import { parameters } from "../globalVariables/globalVariables.js";

function check_crashing(character_position, iceberg_grid, speed, isStunned, isImmune, deltaStamp){
    const icebergWidth = Math.round(parameters.standartSize.iceberg.width);
    const icebergHeight = Math.round(parameters.standartSize.iceberg.height);
    const charWidth = Math.round(parameters.standartSize.character.width);
    const charHeight = Math.round(parameters.standartSize.character.height);

    const canvasWidth = Math.round(parameters.standartSize.canvas.width);
    const canvasHeight = Math.round(parameters.standartSize.canvas.height);
    const chunkX = canvasWidth / 10;
    const chunkY = canvasHeight / 10;

    const x = Math.floor(character_position.x / chunkX);
    const x1 = Math.floor((character_position.x + charWidth) / chunkX);
    const y = Math.floor(character_position.y / chunkY);
    const y1 = Math.floor((character_position.y + charHeight) / chunkY);

    const rect_topLeft = iceberg_grid[y][x];
    const rect_topRight = iceberg_grid[y][x1];
    const rect_bottomLeft = iceberg_grid[y1][x];
    const rect_bottomRight = iceberg_grid[y1][x1];

    let stun = isStunned;
    let immune = isImmune;

    const check_rects = rect_topLeft.find(iceberg => {
        return (iceberg.x < character_position.x + charWidth && iceberg.x > character_position.x - charWidth) && (iceberg.y < character_position.y + charHeight && iceberg.y > character_position.y - charHeight);
    }) || rect_topRight.find(iceberg => {
        return (iceberg.x < character_position.x + charWidth && iceberg.x > character_position.x - charWidth) && (iceberg.y < character_position.y + charHeight && iceberg.y > character_position.y - charHeight);
    }) || rect_bottomLeft.find(iceberg => {
        return (iceberg.x < character_position.x + charWidth && iceberg.x > character_position.x - charWidth) && (iceberg.y < character_position.y + charHeight && iceberg.y > character_position.y - charHeight);
    }) || rect_bottomRight.find(iceberg => {
        return (iceberg.x < character_position.x + charWidth && iceberg.x > character_position.x - charWidth) && (iceberg.y < character_position.y + charHeight && iceberg.y > character_position.y - charHeight);
    })
    
    // if on iceberg (any part)
    if(check_rects || character_position.x < icebergWidth || character_position.x > canvasWidth - icebergWidth - charWidth || character_position.y > canvasHeight - icebergHeight - charHeight){
        // back flipp
        if(speed.left > speed.right){
            speed.right = speed.left > parameters.charMaxSpeed60FPS * deltaStamp / 2 ? speed.left + parameters.charDeltaSpeed60FPS * deltaStamp ** 2 : parameters.charMaxSpeed60FPS * deltaStamp / 2;
            speed.left = 0;
        }else{
            speed.left = speed.right > parameters.charMaxSpeed60FPS * deltaStamp / 2 ? speed.right + parameters.charDeltaSpeed60FPS * deltaStamp ** 2 : parameters.charMaxSpeed60FPS * deltaStamp / 2;
            speed.right = 0;
        }

        if(speed.up > speed.down){
            speed.down = speed.up > parameters.charMaxSpeed60FPS * deltaStamp / 2 ? speed.up + parameters.charDeltaSpeed60FPS * deltaStamp ** 2 : parameters.charMaxSpeed60FPS * deltaStamp / 2;
            speed.up = 0;
        }else{
            speed.up = speed.down > parameters.charMaxSpeed60FPS * deltaStamp / 2 ? speed.down + parameters.charDeltaSpeed60FPS * deltaStamp ** 2 : parameters.charMaxSpeed60FPS * deltaStamp / 2;
            speed.down = 0;
        }

        // lose herats if not immune
        stun = immune ? false : true;
        immune = true;
    }else if(character_position.y < icebergHeight){
        speed.up = 0;
        character_position.y = icebergHeight;
    }

    return {stun, immune};
}

export default check_crashing;