import { parameters } from "../globalVariables/globalVariables.js";

const lightDirection = document.getElementById('light_direction');
const helperLight = document.getElementById('helper_light');
const playground = document.getElementById('game_main_container');

function defineDirection(){
    const helperPosition = calculatePosition();

    if(helperPosition){
        helperLight.style.left = helperPosition.x - 50 + 'px';
        helperLight.style.top = helperPosition.y - 50 + 'px';
    }else{
        helperLight.style.left = parameters.light.position.x - playground.scrollLeft + 'px';
        helperLight.style.top = parameters.light.position.y - playground.scrollTop + 'px';
    }
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
    const topLightY = lightY - playground.scrollTop;
  
    const lengthX = leftLightX - leftX;
    const lengthY = topLightY - leftY;
  
    const alpha = Math.atan2(Math.abs(lengthY), Math.abs(lengthX));
    const beta  = Math.atan2(
        lengthY > 0 ? screen.height - leftY : leftY,
        lengthX > 0 ? screen.width  - leftX : leftX
    );

    const slope = lengthY / lengthX;
    const invSlope = lengthX / lengthY;

    if(leftLightX >= 0 && topLightY >= 0 && leftLightX <= parameters.standartSize.screen.width && topLightY <= parameters.standartSize.screen.height) return null;
  
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