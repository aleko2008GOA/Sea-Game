import check_crashing from "./check_crashing.js";
import check_getting_lights from "./check_getting_light.js";
import camera_moving from "./camera_moving.js";
import { immutable } from "../story/starts_playing.js";
import { lose_hearts } from "../game_over/lose_hearts.js";
import useCharacterImages from "../images/useImages/chracter.js";

// canvas
/** @type {HTMLCanvasElement} */
const character_canvas = document.getElementById('main_chracter');

/** @type {CanvasRenderingContext2D} */
const character_background = character_canvas.getContext('2d');

const animations = {
    animationFrameId: null,
    eventListenersAdded: false,
    stunTimeoutId: null,
    flickeringIntervalId: null
}

const normalCharacterImageArray = [];
let characterImage;

function character_moves(iceberg_grid, lights_grid, lights_ctx, imgs){
    characterImage = imgs[4];
    imgs.forEach(img => normalCharacterImageArray.push(img));
    // charcter starts at
    const character_position = {x: 150, y: 100};
    const moving_direction = {left: false, right: false, up: false, down: false};
    const speed = {left: 0, right: 0, up: 0, down: 0};
    // chracter stats
    let isStunned = false;
    let removeStun = true;
    let isImmune = false;
    let removeImmune = true;
    
    let cleared = false;
    // character display
    chraracter_start();

    // moving
    function chraracter_start(){
        character_background.drawImage(characterImage, character_position.x - 15, character_position.y - 30, 80, 80);
        character_background.strokeRect(character_position.x, character_position.y, 50, 50);

        document.addEventListener('keydown', (e) =>{
            if(e.key === 'ArrowLeft') if(!immutable.immutable) moving_direction.left = true;
            if(e.key === 'ArrowRight') if(!immutable.immutable) moving_direction.right = true;
            if(e.key === 'ArrowUp') if(!immutable.immutable) moving_direction.up = true;
            if(e.key === 'ArrowDown') if(!immutable.immutable) moving_direction.down = true;
        });
        document.addEventListener('keyup', (e) =>{
            if(e.key === 'ArrowLeft') moving_direction.left = false;
            if(e.key === 'ArrowRight') moving_direction.right = false;
            if(e.key === 'ArrowUp') moving_direction.up = false;
            if(e.key === 'ArrowDown') moving_direction.down = false;
        });

        animations.animationFrameId = requestAnimationFrame(move);
    }

    // move using arrows
    function move(){
        let moved = false;

        // left
        if(moving_direction.left && !isStunned){
            if(speed.left < 2) speed.left += 0.02;
            else speed.left = 2;
            character_position.x -= speed.left;
            moved = true;
        }else if(speed.left > 0) {
            speed.left -= 0.02;
            character_position.x -= speed.left;
            moved = true;
        }

        // right
        if(moving_direction.right && !isStunned){
            if(speed.right < 2) speed.right += 0.02;
            else speed.right = 2;
            character_position.x += speed.right;
            moved = true;
        }else if(speed.right > 0) {
            speed.right -= 0.02;
            character_position.x += speed.right;
            moved = true;
        }

        // up
        if(moving_direction.up && !isStunned){
            if(speed.up < 2) speed.up += 0.02;
            else speed.up = 2;
            character_position.y -= speed.up;
            moved = true;
        }else if(speed.up > 0) {
            speed.up -= 0.02;
            character_position.y -= speed.up;
            moved = true;
        }

        // down
        if(moving_direction.down && !isStunned){
            if(speed.down < 2) speed.down += 0.02;
            else speed.down = 2;
            character_position.y += speed.down;
            moved = true;
        }else if(speed.down > 0) {
            speed.down -= 0.02;
            character_position.y += speed.down;
            moved = true;
        }

        // if moved
        if(moved){
            camera_moving(character_position, speed);
            character_background.clearRect(0, 0, character_canvas.width, character_canvas.height);
            
            if(!cleared){
                character_background.strokeRect(character_position.x, character_position.y, 50, 50);
                character_background.drawImage(characterImage, character_position.x - 15, character_position.y - 30, 80, 80);
            }
            // getting everythig about lights or crashing
            check_getting_lights(lights_ctx, character_position, lights_grid, isImmune); // check if I get  any light
            let {stun, immune} = check_crashing(character_position, iceberg_grid, speed, isStunned, isImmune); // check if I lose any heart
            characterImage = useCharacterImages(normalCharacterImageArray, characterImage, speed);

            isStunned = stun;
            isImmune = immune;

            // set timeout when stuuned to remove it
            if(isStunned && removeStun){
                removeStun = false;

                animations.stunTimeoutId = setTimeout(() =>{
                    isStunned = false;
                    removeStun = true;
                    lose_hearts();
                }, 2000);
            }
            // remove immune after a while and start flikering
            if(isImmune && removeImmune){
                animations.flickeringIntervalId = setInterval(() => start_flickering(), 200);
                removeImmune = false;

                setTimeout(() =>{
                    clearTimeout(animations.flickeringIntervalId);
                    animations.flickeringIntervalId = null;

                    character_background.clearRect(0, 0, character_canvas.width, character_canvas.height);
                    character_background.strokeRect(character_position.x, character_position.y, 50, 50);
                    character_background.drawImage(characterImage, character_position.x - 15, character_position.y - 30, 80, 80);
                    
                    isImmune = false;
                    removeImmune = true;
                    cleared = false;
                    check_getting_lights(lights_ctx, character_position, lights_grid, isImmune);
                }, 3500);
            }
        }else{
            // if not moved check if it should be a clear canvas
            character_background.clearRect(0, 0, character_canvas.width, character_canvas.height);
            
            if(!cleared){
                character_background.strokeRect(character_position.x, character_position.y, 50, 50);
                character_background.drawImage(characterImage, character_position.x - 15, character_position.y - 30, 80, 80);
            }
        }

        animations.animationFrameId = requestAnimationFrame(move);
    }

    function start_flickering(){
        cleared = cleared ? false : true;
    }
}

export { character_moves, animations }