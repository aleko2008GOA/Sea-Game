import { parameters } from "../globalVariables/globalVariables.js";
import { drawOnCanvas } from "./joystick.js";

function checkDevice(){
    const userAgent = navigator.userAgent.toLowerCase();
    const sensore = navigator.maxTouchPoints;

    if((userAgent.includes('macintosh') || userAgent.includes('mac os x') || userAgent.includes('linux') || userAgent.includes('windows nt')) && !userAgent.includes('mobile'))
        var deviceType = sensore > 0 ? 'Notebook' : 'PC/Notebook';
    else if(userAgent.includes('iphone') || userAgent.includes('ipod') || userAgent.includes('windows phone') || userAgent.includes('mobile'))
        var deviceType = 'Mobile';
    else if(userAgent.includes('ipad'))
        var deviceType = 'Tablet';
    else if((userAgent.includes('android') || userAgent.includes('linux')) && userAgent.includes('mobile'))
        var deviceType = 'Mobile/Tablet';
    else if(userAgent.includes('kindle') || userAgent.includes('kobo') || userAgent.includes('ebook'))
        var deviceType = 'Ebook';
    else var deviceType = 'Unknown';

    if(deviceType.includes('Mobile') || deviceType.includes('Tablet') || deviceType.includes('Ebook'))
        for(const key in parameters.standartSize.joystick) parameters.standartSize.joystick[key] *= 1.6;
    parameters.device = deviceType;
}

function moveMobile(speed, isStunned, maxSpeed, deltaSpeed){
    const circleRadius = parameters.standartSize.joystick.joisticCircleRadius;
    const characterPosition = parameters.position;
    const characterStylePosition = parameters.stylePosition;

    let moved = false;
    let x = parameters.positionMobile.x;
    let y = parameters.positionMobile.y;
    let diagonal = Math.sqrt(x ** 2 + y ** 2);

    if(Math.abs(x) >= Math.abs(y)){
        parameters.charMaxSpeed60FPSMobile.right = x > 0 && diagonal >= 0.6 * circleRadius ? maxSpeed : 0;
        parameters.charMaxSpeed60FPSMobile.left = x < 0 && diagonal >= 0.6 * circleRadius ? maxSpeed : 0;

        parameters.charMaxSpeed60FPSMobile.down = y > 0 && diagonal >= 0.6 * circleRadius ? maxSpeed * Math.abs(y / x) : 0;
        parameters.charMaxSpeed60FPSMobile.up = y < 0 && diagonal >= 0.6 * circleRadius ? maxSpeed * Math.abs(y / x) : 0;
    }else{
        parameters.charMaxSpeed60FPSMobile.right = x > 0 && diagonal >= 0.6 * circleRadius ? maxSpeed * Math.abs(x / y) : 0;
        parameters.charMaxSpeed60FPSMobile.left = x < 0 && diagonal >= 0.6 * circleRadius ? maxSpeed * Math.abs(x / y) : 0;

        parameters.charMaxSpeed60FPSMobile.down = y > 0 && diagonal >= 0.6 * circleRadius ? maxSpeed : 0;
        parameters.charMaxSpeed60FPSMobile.up = y < 0 && diagonal >= 0.6 * circleRadius ? maxSpeed : 0;
    }

    if(!isStunned && diagonal >= 0.6 * circleRadius && !parameters.immutable){
        // left
        if(speed.left < parameters.charMaxSpeed60FPSMobile.left) speed.left += deltaSpeed;
        else speed.left = parameters.charMaxSpeed60FPSMobile.left;
        characterPosition.x -= speed.left;
        characterStylePosition.x -= speed.left;

        // right
        if(speed.right < parameters.charMaxSpeed60FPSMobile.right) speed.right += deltaSpeed;
        else speed.right = parameters.charMaxSpeed60FPSMobile.right;
        characterPosition.x += speed.right;
        characterStylePosition.x += speed.right;

        // up
        if(speed.up < parameters.charMaxSpeed60FPSMobile.up) speed.up += deltaSpeed;
        else speed.up = parameters.charMaxSpeed60FPSMobile.up;
        characterPosition.y -= speed.up;
        characterStylePosition.y -= speed.up;

        // down 
        if(speed.down < parameters.charMaxSpeed60FPSMobile.down) speed.down += deltaSpeed;
        else speed.down = parameters.charMaxSpeed60FPSMobile.down;
        characterPosition.y += speed.down;
        characterStylePosition.y += speed.down;

        moved = true;
    }else{
        if(speed.left > 0) {
            speed.left = speed.left - deltaSpeed >= 0 ? speed.left - deltaSpeed : 0;
            characterPosition.x -= speed.left;
            characterStylePosition.x -= speed.left;
            moved = true;
        }else if(speed.left < 0) speed.left = 0;
        
        if(speed.right > 0) {
            speed.right = speed.right - deltaSpeed >= 0 ? speed.right - deltaSpeed : 0;
            characterPosition.x += speed.right;
            characterStylePosition.x += speed.right;
            moved = true;
        }else if(speed.right < 0) speed.right = 0;
        
        if(speed.up > 0) {
            speed.up = speed.up - deltaSpeed >= 0 ? speed.up - deltaSpeed : 0;
            characterPosition.y -= speed.up;
            characterStylePosition.y -= speed.up;
            moved = true;
        }else if(speed.up < 0) speed.up = 0;
        
        if(speed.down > 0) {
            speed.down = speed.down - deltaSpeed >= 0 ? speed.down - deltaSpeed : 0;
            characterPosition.y += speed.down;
            characterStylePosition.y += speed.down;
            moved = true;
        }else if(speed.down < 0) speed.down = 0;
    }

    drawOnCanvas(diagonal, x, y);
    return moved;
}

export { checkDevice, moveMobile };