import { animations, parameters } from "../globalVariables/globalVariables.js";

const defaultCanvases = document.getElementById('defaultCanvases');
const onMobile = document.getElementById('on_mobile');
const mainCharacter = document.getElementById('main_character');
const characterCanvas = document.getElementById('character_canvas');
const rain = document.getElementById('rain');

const screenWidth = Math.max(screen.width, screen.height);
const screenHeight = Math.min(screen.width, screen.height);

function setParameters(){
    let index = screenWidth / screenHeight >= 16 / 9 
        ? screenHeight / parameters.standartSize.screen.height 
        : screenWidth / parameters.standartSize.screen.width;
    Object.keys(parameters.standartSize).forEach(key =>{
        Object.keys(parameters.standartSize[key]).forEach(miniKey => parameters.standartSize[key][miniKey] *= index);
    });
    parameters.charMaxSpeed60FPS *= index;
    parameters.charDeltaSpeed60FPS *= index;
    parameters.standartSize.screen.width = screenWidth;
    parameters.standartSize.screen.height = screenHeight;
    
    defaultCanvases.querySelectorAll('canvas').forEach(canvas =>{
        canvas.width = parameters.standartSize.canvas.width;
        canvas.height = parameters.standartSize.canvas.height;
        canvas.style.width = parameters.standartSize.canvas.width + 'px';
        canvas.style.height = parameters.standartSize.canvas.height + 'px';
    });

    rain.querySelectorAll('canvas').forEach(canvas =>{
        canvas.style.width = parameters.standartSize.screenWidth + 'px';
        canvas.style.height = parameters.standartSize.screenHeight + 'px';
    });
    
    mainCharacter.style.width = parameters.standartSize.canvas.width + 'px';
    mainCharacter.style.height = parameters.standartSize.canvas.height + 'px';

    characterCanvas.width = parameters.standartSize.character.width * 2;
    characterCanvas.height = parameters.standartSize.character.height * 2 * (260 / 320);
    characterCanvas.style.width = parameters.standartSize.character.width * 2 + 'px';
    characterCanvas.style.height = parameters.standartSize.character.height * 2 * (260 / 320) + 'px';
    characterCanvas.style.left = parameters.standartSize.character.width * 2.5 + 'px';
    characterCanvas.style.top = parameters.standartSize.character.height * (2 - 260 / 320) + 'px';

    parameters.position.x = parseFloat(characterCanvas.style.left) + parameters.standartSize.character.width / 2;
    parameters.position.y = parseFloat(characterCanvas.style.top) + characterCanvas.height - parameters.standartSize.character.height;
    parameters.stylePosition.x = parseFloat(characterCanvas.style.left);
    parameters.stylePosition.y = parseFloat(characterCanvas.style.top);
    
    onMobile.width = parameters.standartSize.joystick.width;
    onMobile.height = parameters.standartSize.joystick.height;
    onMobile.style.width = parameters.standartSize.joystick.width + 'px';
    onMobile.style.height = parameters.standartSize.joystick.height + 'px';
}

export { setParameters };