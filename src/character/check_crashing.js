import { parameters } from "../globalVariables/globalVariables.js";

function check_crashing(character_position, iceberg_grid, speed, isStunned, isImmune, deltaStamp){
    const x = Math.floor(character_position.x / 300);
    const x1 = Math.floor((character_position.x + 50) / 300);
    const y = Math.floor(character_position.y / 300);
    const y1 = Math.floor((character_position.y + 50) / 300);

    const rect_topLeft = iceberg_grid[y][x];
    const rect_topRight = iceberg_grid[y][x1];
    const rect_bottomLeft = iceberg_grid[y1][x];
    const rect_bottomRight = iceberg_grid[y1][x1];

    let stun = isStunned;
    let immune = isImmune;

    const check_rects = rect_topLeft.find(iceberg => {
        return (iceberg.x < character_position.x + 50 && iceberg.x > character_position.x - 50) && (iceberg.y < character_position.y + 50 && iceberg.y > character_position.y - 50);
    }) || rect_topRight.find(iceberg => {
        return (iceberg.x < character_position.x + 50 && iceberg.x > character_position.x - 50) && (iceberg.y < character_position.y + 50 && iceberg.y > character_position.y - 50);
    }) || rect_bottomLeft.find(iceberg => {
        return (iceberg.x < character_position.x + 50 && iceberg.x > character_position.x - 50) && (iceberg.y < character_position.y + 50 && iceberg.y > character_position.y - 50);
    }) || rect_bottomRight.find(iceberg => {
        return (iceberg.x < character_position.x + 50 && iceberg.x > character_position.x - 50) && (iceberg.y < character_position.y + 50 && iceberg.y > character_position.y - 50);
    })
    
    // if on iceberg (any part)
    if(check_rects || character_position.x < 50 || character_position.x > 2900 || character_position.y > 2900){
        // back flipp
        if(speed.left > speed.right){
            speed.right = speed.left > 1 ? speed.left + parameters.charDeltaSpeed60FPS * deltaStamp ** 2 : parameters.charMaxSpeed60FPS * deltaStamp / 2;
            speed.left = 0;
        }else{
            speed.left = speed.right > 1 ? speed.right + parameters.charDeltaSpeed60FPS * deltaStamp ** 2 : parameters.charMaxSpeed60FPS * deltaStamp / 2;
            speed.right = 0;
        }

        if(speed.up > speed.down){
            speed.down = speed.up > 1 ? speed.up + parameters.charDeltaSpeed60FPS * deltaStamp ** 2 : parameters.charMaxSpeed60FPS * deltaStamp / 2;
            speed.up = 0;
        }else{
            speed.up = speed.down > 1 ? speed.down + parameters.charDeltaSpeed60FPS * deltaStamp ** 2 : parameters.charMaxSpeed60FPS * deltaStamp / 2;
            speed.down = 0;
        }

        // lose herats if not immune
        stun = immune ? false : true;
        immune = true;
    }else if(character_position.y < 50){
        speed.up = 0;
        speed.down = parameters.charDeltaSpeed60FPS * deltaStamp ** 2;
    }

    return {stun, immune};
}

export default check_crashing;