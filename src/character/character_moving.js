import check_crashing from "./check_crashing.js";
import check_getting_lights from "./check_getting_light.js";
import camera_moving from "./camera_moving.js";
import { lose_hearts } from "../game_over/lose_hearts.js";
import useCharacterImages from "../images/useImages/character.js";
import { animations, parameters } from "../globalVariables/globalVariables.js";
import { moveMobile } from "../settings/onMobile.js";

/** @type {HTMLCanvasElement} */
const characterCanvas = document.getElementById('character_canvas');

/** @type {CanvasRenderingContext2D} */
const characterBackground = characterCanvas.getContext('2d');

const characterImages = [];
let characterImage;

function character_moves(iceberg_grid, lights_grid, lights_ctx, imgs){
    let characterWidth = parameters.standartSize.character.width;
    let characterHeight = parameters.standartSize.character.height;
    
    characterImage = imgs[0][0][4];
    characterImages.push(...imgs);
    // charcter starts at
    const character_position = {x: 3 * characterWidth, y: 2 * characterHeight};
    const moving_direction = {left: false, right: false, up: false, down: false};
    const speed = parameters.speed;
    // chracter stats
    let isStunned = false;
    let removeStun = true;
    let isImmune = false;
    let removeImmune = true;
    
    let cleared = false;

    let stunIndex = 0;
    animations.stunFunc = stunFunc;

    let immutableIndex = 0;
    let lastImmutableIndex = 0;
    animations.immutableFunc = immutableFunc;

    // character display
    chraracter_start();

    // moving
    function chraracter_start(){
        drawOnCanvas();

        document.addEventListener('keydown', (e) =>{
            if(e.key === 'ArrowLeft' || e.key === 'a') if(!parameters.immutable) moving_direction.left = true;
            if(e.key === 'ArrowRight' || e.key === 'd') if(!parameters.immutable) moving_direction.right = true;
            if(e.key === 'ArrowUp' || e.key === 'w') if(!parameters.immutable) moving_direction.up = true;
            if(e.key === 'ArrowDown' || e.key === 's') if(!parameters.immutable) moving_direction.down = true;
        });
        document.addEventListener('keyup', (e) =>{
            if(e.key === 'ArrowLeft' || e.key === 'a') moving_direction.left = false;
            if(e.key === 'ArrowRight' || e.key === 'd') moving_direction.right = false;
            if(e.key === 'ArrowUp' || e.key === 'w') moving_direction.up = false;
            if(e.key === 'ArrowDown' || e.key === 's') moving_direction.down = false;
        });

        animations.animationFrameFunc = move;
        animations.animationFrameId = true;
    }

    // move using arrows
    function move(deltaStamp){
        let moved = false;

        let maxSpeed = parameters.charMaxSpeed60FPS * deltaStamp;
        let deltaSpeed = parameters.charDeltaSpeed60FPS * deltaStamp ** 2;

        if(parameters.device.includes('Mobile') || parameters.device.includes('Tablet') || parameters.device.includes('Ebook'))
            moved = moveMobile(speed, character_position, isStunned, maxSpeed, deltaSpeed);
        else{
            // left
            if(moving_direction.left && !isStunned){
                if(speed.left < maxSpeed) speed.left += deltaSpeed;
                else speed.left = maxSpeed;
                character_position.x -= speed.left;
                moved = true;
            }else if(speed.left > 0) {
                speed.left = speed.left - deltaSpeed >= 0 ? speed.left - deltaSpeed : 0;
                character_position.x -= speed.left;
                moved = true;
            }else if(speed.left < 0) speed.left = 0;

            // right
            if(moving_direction.right && !isStunned){
                if(speed.right < maxSpeed) speed.right += deltaSpeed;
                else speed.right = maxSpeed;
                character_position.x += speed.right;
                moved = true;
            }else if(speed.right > 0) {
                speed.right = speed.right - deltaSpeed >= 0 ? speed.right - deltaSpeed : 0;
                character_position.x += speed.right;
                moved = true;
            }else if(speed.right < 0) speed.right = 0;

            // up
            if(moving_direction.up && !isStunned){
                if(speed.up < maxSpeed) speed.up += deltaSpeed;
                else speed.up = maxSpeed;
                character_position.y -= speed.up;
                moved = true;
            }else if(speed.up > 0) {
                speed.up = speed.up - deltaSpeed >= 0 ? speed.up - deltaSpeed : 0;
                character_position.y -= speed.up;
                moved = true;
            }else if(speed.up < 0) speed.up = 0;

            // down
            if(moving_direction.down && !isStunned){
                if(speed.down < maxSpeed) speed.down += deltaSpeed;
                else speed.down = maxSpeed;
                character_position.y += speed.down;
                moved = true;
            }else if(speed.down > 0) {
                speed.down = speed.down - deltaSpeed >= 0 ? speed.down - deltaSpeed : 0;
                character_position.y += speed.down;
                moved = true;
            }else if(speed.down < 0) speed.down = 0;
        }
        // if moved
        if(moved){
            drawOnCanvas();
            
            camera_moving(character_position, speed);

            // getting everythig about lights or crashing
            check_getting_lights(lights_ctx, character_position, lights_grid, isImmune); // check if I get  any light
            let { stun, immune } = check_crashing(character_position, iceberg_grid, speed, isStunned, isImmune, deltaStamp); // check if I lose any heart
            characterImage = useCharacterImages(characterImages, characterImage, speed, deltaStamp);

            isStunned = stun;
            isImmune = immune;

            // set timeout when stuuned to remove it
            if(isStunned && removeStun){
                removeStun = false;
                animations.stunFrameId = true;
            }
            // remove immune after a while and start flikering
            if(isImmune && removeImmune){
                removeImmune = false;
                animations.immutableFrameId = true;
            }
        } else if(isImmune)
            drawOnCanvas();
    }

    function stunFunc(deltaStamp){
        if(stunIndex < 120) stunIndex += deltaStamp;
        else{
            stunIndex = 0;
            animations.stunFrameId = false;
    
            isStunned = false;
            removeStun = true;
            lose_hearts();
        }
    }

    function immutableFunc(deltaStamp){
        if(Math.floor(immutableIndex) % 12 === 0 && Math.floor(immutableIndex) !== lastImmutableIndex){
            cleared = !cleared;
            lastImmutableIndex = Math.floor(immutableIndex);
        }
        if(immutableIndex < 210) immutableIndex += deltaStamp;
        else{
            immutableIndex = 0;
            lastImmutableIndex = 0;
            animations.immutableFrameId = false;

            cleared = false;
            isImmune = false;
            removeImmune = true;
            
            drawOnCanvas();
            check_getting_lights(lights_ctx, character_position, lights_grid, isImmune);
        }
    }

    function drawOnCanvas(){
        characterBackground.clearRect(0, 0, characterCanvas.width, characterCanvas.height)
        characterBackground.drawImage(characterImage, 0, 0, characterCanvas.width, characterCanvas.height);
        characterCanvas.style.left = (character_position.x - parameters.standartSize.character.width / 2) + 'px';
        characterCanvas.style.top = (character_position.y - parameters.standartSize.character.height * (260 / 320)) + 'px';
    }
}

export { character_moves }