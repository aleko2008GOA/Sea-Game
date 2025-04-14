import { parameters } from "../globalVariables/globalVariables.js";

const lightDirection = document.getElementById('light_direction');
const helperLight = document.getElementById('helper_light');
const playground = document.getElementById('game_main_container');

function defineDirection(){
    const helperPosition = calculatePosition();

    helperLight.style.left = helperPosition.x - 50 + 'px';
    helperLight.style.top = helperPosition.y - 50 + 'px';
}

function calculatePosition() {
    const { screen, character, light } = parameters.standartSize;
  
    const charX  = parameters.position.x + character.width  / 2;
    const charY  = parameters.position.y + character.height / 2;
    const lightX = parameters.light.position.x + light.width / 2;
    const lightY = parameters.light.position.y + light.height / 2;
  
    const leftX = charX - playground.scrollLeft;
    const leftY = charY - playground.scrollTop;
    const leftLightX = lightX - playground.scrollLeft;
    const leftLightY = lightY - playground.scrollTop;
  
    const lengthX = leftLightX - leftX;
    const lengthY = leftLightY - leftY;
  
    const alpha = Math.atan2(Math.abs(lengthY), Math.abs(lengthX));
    const beta  = Math.atan2(
        lengthY > 0 ? screen.height - leftY : leftY,
        lengthX > 0 ? screen.width  - leftX : leftX
    );

    const slope = lengthY / lengthX;
    const invSlope = lengthX / lengthY;
  
    if(alpha < beta){
        var x = lengthX > 0 ? screen.width : 0;
        var y = leftY + (x - leftX) * slope;
    }else{
        var y = lengthY > 0 ? screen.height : 0;
        var x = leftX + (y - leftY) * invSlope;
    }
  
    return { x, y };
}

export default defineDirection;