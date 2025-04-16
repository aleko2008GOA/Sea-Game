import check_crashing from "./check_crashing.js";
import checkGettingLights from "./check_getting_light.js";
import camera_moving from "./camera_moving.js";
import { lose_hearts } from "../game_over/lose_hearts.js";
import useCharacterImages from "../images/useImages/character.js";
import { animations, parameters } from "../globalVariables/globalVariables.js";
import { moveMobile } from "../settings/onMobile.js";
import { changeWhale } from "../objects/whale.js";
import { animateCharacterShadows } from "../objects/shadows.js";
import defineDirection from "../objects/lightPointer.js";

/** @type {HTMLCanvasElement} */
const characterCanvas = document.getElementById('character_canvas');

/** @type {CanvasRenderingContext2D} */
const characterBackground = characterCanvas.getContext('2d');

const characterImages = [];
let characterImage;

function character_moves(icebergGrid, imgs){
    const lightGrid = parameters.iceberg.grid;
    const lightPosition = parameters.light.position;
    
    let characterWidth = parameters.standartSize.character.width;
    let characterHeight = parameters.standartSize.character.height;
    
    characterImage = imgs[0][0][0][4];
    characterImages.push(...imgs);
    // charcter starts at
    const characterPosition = parameters.position;
    const characterStylePosition = parameters.stylePosition;

    const movingDirection = { left: false, right: false, up: false, down: false };
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
    chraracterStart();

    // moving
    function chraracterStart(){
        drawOnCanvas();

        document.addEventListener('keydown', (e) =>{
            if(e.key === 'ArrowLeft' || e.key === 'a') if(!parameters.immutable) movingDirection.left = true;
            if(e.key === 'ArrowRight' || e.key === 'd') if(!parameters.immutable) movingDirection.right = true;
            if(e.key === 'ArrowUp' || e.key === 'w') if(!parameters.immutable) movingDirection.up = true;
            if(e.key === 'ArrowDown' || e.key === 's') if(!parameters.immutable) movingDirection.down = true;
        });
        document.addEventListener('keyup', (e) =>{
            if(e.key === 'ArrowLeft' || e.key === 'a') movingDirection.left = false;
            if(e.key === 'ArrowRight' || e.key === 'd') movingDirection.right = false;
            if(e.key === 'ArrowUp' || e.key === 'w') movingDirection.up = false;
            if(e.key === 'ArrowDown' || e.key === 's') movingDirection.down = false;
        });

        animations.animationFrameFunc = move;
        animations.animationFrameId = true;
    }

    // move using arrows
    function move(deltaStamp){
        let moved = false;

        let maxSpeed = parameters.charMaxSpeed60FPS * deltaStamp;
        let deltaSpeed = parameters.charDeltaSpeed60FPS * deltaStamp ** 2;

        changeWhale();
        defineDirection();

        if(parameters.joystick) moved = moveMobile(speed, isStunned, maxSpeed, deltaSpeed);
        else{
            // left
            if(movingDirection.left && !isStunned){
                if(speed.left < maxSpeed) speed.left += deltaSpeed;
                else speed.left = maxSpeed;
                characterPosition.x -= speed.left;
                characterStylePosition.x -= speed.left;
                moved = true;
            }else if(speed.left > 0) {
                speed.left = speed.left - deltaSpeed >= 0 ? speed.left - deltaSpeed : 0;
                characterPosition.x -= speed.left;
                characterStylePosition.x -= speed.left;
                moved = true;
            }else if(speed.left < 0) speed.left = 0;

            // right
            if(movingDirection.right && !isStunned){
                if(speed.right < maxSpeed) speed.right += deltaSpeed;
                else speed.right = maxSpeed;
                characterPosition.x += speed.right;
                characterStylePosition.x += speed.right;
                moved = true;
            }else if(speed.right > 0) {
                speed.right = speed.right - deltaSpeed >= 0 ? speed.right - deltaSpeed : 0;
                characterPosition.x += speed.right;
                characterStylePosition.x += speed.right;
                moved = true;
            }else if(speed.right < 0) speed.right = 0;

            // up
            if(movingDirection.up && !isStunned){
                if(speed.up < maxSpeed) speed.up += deltaSpeed;
                else speed.up = maxSpeed;
                characterPosition.y -= speed.up;
                characterStylePosition.y -= speed.up;
                moved = true;
            }else if(speed.up > 0) {
                speed.up = speed.up - deltaSpeed >= 0 ? speed.up - deltaSpeed : 0;
                characterPosition.y -= speed.up;
                characterStylePosition.y -= speed.up;
                moved = true;
            }else if(speed.up < 0) speed.up = 0;

            // down
            if(movingDirection.down && !isStunned){
                if(speed.down < maxSpeed) speed.down += deltaSpeed;
                else speed.down = maxSpeed;
                characterPosition.y += speed.down;
                characterStylePosition.y += speed.down;
                moved = true;
            }else if(speed.down > 0) {
                speed.down = speed.down - deltaSpeed >= 0 ? speed.down - deltaSpeed : 0;
                characterPosition.y += speed.down;
                characterStylePosition.y += speed.down;
                moved = true;
            }else if(speed.down < 0) speed.down = 0;
        }
        // if moved
        if(moved){
            drawOnCanvas();
            
            camera_moving(characterPosition, speed);
            defineDirection();

            // getting everythig about lights or crashing
            checkGettingLights(icebergGrid, characterPosition, lightGrid, lightPosition, isImmune); // check if I get  any light
            let { stun, immune } = check_crashing(characterPosition, icebergGrid, speed, isStunned, isImmune, deltaStamp); // check if I lose any heart
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
            checkGettingLights(icebergGrid, characterPosition, lightGrid, lightPosition, isImmune);
        }
    }

    function drawOnCanvas(){
        characterBackground.clearRect(0, 0, characterCanvas.width, characterCanvas.height);
        if(!cleared)
            characterBackground.drawImage(characterImage, 0, 0, characterCanvas.width, characterCanvas.height);
        characterBackground.strokeRect(characterPosition.x - parseFloat(characterCanvas.style.left), characterPosition.y - parseFloat(characterCanvas.style.top), characterWidth, characterHeight);
        characterCanvas.style.left = characterStylePosition.x + 'px';
        characterCanvas.style.top = characterStylePosition.y + 'px';

        animateCharacterShadows(characterImage, cleared);
    }
}

export { character_moves }