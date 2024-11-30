import check_crashing from "./check_crashing.js";
import check_getting_lights from "./check_getting_light.js";
import camera_moving from "./camera_moving.js";
import { lose_hearts } from "../game_over/lose_hearts.js";
import useCharacterImages from "../images/useImages/character.js";
import { animations, parameters } from "../globalVariables/globalVariables.js";

// canvas
/** @type {HTMLCanvasElement} */
const character_canvas = document.getElementById('main_chracter');

/** @type {CanvasRenderingContext2D} */
const character_background = character_canvas.getContext('2d');

const characterImages = [];
let characterImage;

function character_moves(iceberg_grid, lights_grid, lights_ctx, imgs){
    characterImage = imgs[0][0][4];
    characterImages.push(...imgs);
    // charcter starts at
    const character_position = {x: 150, y: 100};
    const moving_direction = {left: false, right: false, up: false, down: false};
    const speed = parameters.speed;
    // chracter stats
    let isStunned = false;
    let removeStun = true;
    let isImmune = false;
    let removeImmune = true;
    
    let cleared = false;

    let stunIndex = 0;
    let immutableIndex = 0;

    let lastStamp = 0;

    animations.immutableFunc = immutableFunc;
    animations.stunFunc = stunFunc;
    // character display
    chraracter_start();

    // moving
    function chraracter_start(){
        character_background.drawImage(characterImage, character_position.x - 15, character_position.y - 30, 80, 80);
        character_background.strokeRect(character_position.x, character_position.y, 50, 50);

        document.addEventListener('keydown', (e) =>{
            if(e.key === 'ArrowLeft') if(!parameters.immutable) moving_direction.left = true;
            if(e.key === 'ArrowRight') if(!parameters.immutable) moving_direction.right = true;
            if(e.key === 'ArrowUp') if(!parameters.immutable) moving_direction.up = true;
            if(e.key === 'ArrowDown') if(!parameters.immutable) moving_direction.down = true;
        });
        document.addEventListener('keyup', (e) =>{
            if(e.key === 'ArrowLeft') moving_direction.left = false;
            if(e.key === 'ArrowRight') moving_direction.right = false;
            if(e.key === 'ArrowUp') moving_direction.up = false;
            if(e.key === 'ArrowDown') moving_direction.down = false;
        });

        animations.animationFrameFunc = move;
        animations.animationFrameId = requestAnimationFrame(move);
    }

    // move using arrows
    function move(timestamp){
        let moved = false;
        let deltatime = (timestamp - lastStamp) / 1000 * 60;
        lastStamp = timestamp;

        let maxSpeed = parameters.charMaxSpeed60FPS * deltatime;
        let deltaSpeed = parameters.charMaxSpeed60FPS * deltatime;

        // left
        if(moving_direction.left && !isStunned){
            if(speed.left < maxSpeed) speed.left += deltaSpeed;
            else speed.left = maxSpeed;
            character_position.x -= speed.left;
            moved = true;
        }else if(speed.left > 0) {
            speed.left -= deltaSpeed;
            character_position.x -= speed.left;
            moved = true;
        }

        // right
        if(moving_direction.right && !isStunned){
            if(speed.right < maxSpeed) speed.right += deltaSpeed;
            else speed.right = maxSpeed;
            character_position.x += speed.right;
            moved = true;
        }else if(speed.right > 0) {
            speed.right -= deltaSpeed;
            character_position.x += speed.right;
            moved = true;
        }

        // up
        if(moving_direction.up && !isStunned){
            if(speed.up < maxSpeed) speed.up += deltaSpeed;
            else speed.up = maxSpeed;
            character_position.y -= speed.up;
            moved = true;
        }else if(speed.up > 0) {
            speed.up -= deltaSpeed;
            character_position.y -= speed.up;
            moved = true;
        }

        // down
        if(moving_direction.down && !isStunned){
            if(speed.down < maxSpeed) speed.down += deltaSpeed;
            else speed.down = maxSpeed;
            character_position.y += speed.down;
            moved = true;
        }else if(speed.down > 0) {
            speed.down -= deltaSpeed;
            character_position.y += speed.down;
            moved = true;
        }

        // if moved
        if(moved){
            camera_moving(character_position, speed);
            console.log(character_position, speed)
            character_background.clearRect(0, 0, character_canvas.width, character_canvas.height);
            
            if(!cleared){
                character_background.strokeRect(character_position.x, character_position.y, 50, 50);
                character_background.drawImage(characterImage, character_position.x - 15, character_position.y - 30, 80, 80);
            }
            // getting everythig about lights or crashing
            check_getting_lights(lights_ctx, character_position, lights_grid, isImmune); // check if I get  any light
            let {stun, immune} = check_crashing(character_position, iceberg_grid, speed, isStunned, isImmune); // check if I lose any heart
            characterImage = useCharacterImages(characterImages, characterImage, speed);

            isStunned = stun;
            isImmune = immune;

            // set timeout when stuuned to remove it
            if(isStunned && removeStun){
                removeStun = false;
                animations.stunFrameId = requestAnimationFrame(stunFunc);
            }
            // remove immune after a while and start flikering
            if(isImmune && removeImmune){
                removeImmune = false;
                animations.immutableFrameId = requestAnimationFrame(immutableFunc);
            }
        }else{
            // if not moved check if it should be a clear canvas
            character_background.clearRect(0, 0, character_canvas.width, character_canvas.height);
            
            if(!cleared){
                character_background.strokeRect(character_position.x, character_position.y, 50, 50);
                character_background.drawImage(characterImage, character_position.x - 15, character_position.y - 30, 80, 80);
            }
        }

        requestAnimationFrame(move);
    }

    function start_flickering(){
        cleared = cleared ? false : true;
    }

    function stunFunc(){
        if(stunIndex < 120) {
            stunIndex ++;
            animations.stunFrameId = requestAnimationFrame(stunFunc);
        }else{
            stunIndex = 0;
            cancelAnimationFrame(animations.stunFrameId);
            animations.stunFrameId = null;

            isStunned = false;
            removeStun = true;
            lose_hearts();
        }
    }

    function immutableFunc(){
        if(immutableIndex % 12 == 0) start_flickering();
        if(immutableIndex < 210){
            immutableIndex ++;
            animations.immutableFrameId = requestAnimationFrame(immutableFunc);
        }else{
            immutableIndex = 0;
            cancelAnimationFrame(animations.immutableFrameId);
            animations.immutableFrameId = null;

            character_background.clearRect(0, 0, character_canvas.width, character_canvas.height);
            character_background.strokeRect(character_position.x, character_position.y, 50, 50);
            character_background.drawImage(characterImage, character_position.x - 15, character_position.y - 30, 80, 80);
            
            isImmune = false;
            removeImmune = true;
            cleared = false;
            check_getting_lights(lights_ctx, character_position, lights_grid, isImmune);
        }
    }
}

export { character_moves }