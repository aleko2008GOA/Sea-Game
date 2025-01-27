import { parameters } from "../globalVariables/globalVariables.js";

const container = document.getElementById('game_main_container');
const timer = document.getElementById('timer');

let left = 0;
let right = 0;
let top = 0;
let down = 0;

// on character moving move camera
function camera_moving(character_position, speed){
    const minLeft = parameters.standartSize.screen.width * 3 / 10;
    const maxLeft = parameters.standartSize.screen.width * 7 / 10 - parameters.standartSize.character.width;
    const minTop = parameters.standartSize.screen.height * 3 / 10;
    const maxTop = parameters.standartSize.screen.height * 7 / 10 - parameters.standartSize.character.height;

    const characterX = character_position.x - container.scrollLeft; // get x scroll
    const characterY = character_position.y - container.scrollTop; // get y scroll
    
    // check if he needs to scroll horizontaly
    if(characterX <= minLeft && speed.right - speed.left < 0) scrollLeft();
    else if(characterX >= maxLeft && speed.right - speed.left > 0) scrollRight();
    // check if he needs to scroll verticaly
    if(characterY <= minTop && speed.down - speed.up < 0) scrollTop();
    else if(characterY >= maxTop && speed.down - speed.up > 0) scrollDown();

    function scrollLeft(){ // funct to scroll left
        left += (speed.left - speed.right);
        if(left >= 1){
            container.scrollTo({
                left: container.scrollLeft - Math.floor(left),
            });
            left -= Math.floor(left);
        }
    }

    function scrollRight(){ // func to scroll right
        right += (speed.right - speed.left);
        if(right >= 1){
            container.scrollTo({
                left: container.scrollLeft + Math.floor(right),
            });
            right -= Math.floor(right);
        }
    }

    function scrollTop(){ // funct to scroll up
        top += (speed.up - speed.down);
        if(top >= 1){
            container.scrollTo({
                top: container.scrollTop - Math.floor(top),
            });
            top -= Math.floor(top);
            timer.style.top = container.scrollTop;
        }
    }

    function scrollDown(){ // funct to scroll down
        down += (speed.down - speed.up);
        if(down >= 1){
            container.scrollTo({
                top: container.scrollTop + Math.floor(down),
            });
            down -= Math.floor(down);
            timer.style.top = container.scrollTop;
        }
    }
}

export default camera_moving;