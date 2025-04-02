import { animations, parameters } from "../globalVariables/globalVariables.js";

const defaultCanvases = document.getElementById('defaultCanvases');
const onMobile = document.getElementById('on_mobile');
const mainCharacter = document.getElementById('main_character');
const characterCanvas = document.getElementById('character_canvas');
const shadows = document.getElementById('shadows');
const rain = document.getElementById('rain');
const icebergFront = document.getElementById('iceberg_map_front');
const icebergBack = document.getElementById('iceberg_map_back');
const icebergMapWalls = document.getElementById('iceberg_map_walls');
const icebergsShadows = document.getElementById('icebergs_shadows');

const screenWidth = Math.max(screen.width, screen.height);
const screenHeight = Math.min(screen.width, screen.height);

function setParameters(){
    let index = screenWidth / screenHeight >= 16 / 9 
        ? screenHeight / parameters.standartSize.screen.height 
        : screenWidth / parameters.standartSize.screen.width;

    function setSize(obj) {
        for (const key in obj) {
            if(obj[key] && typeof obj[key] === "object") setSize(obj[key]);
            else if(typeof obj[key] === "number") obj[key] *= index;
        }
    }
    setSize(parameters.standartSize);

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
    
    shadows.style.width = parameters.standartSize.canvas.width + 'px';
    shadows.style.height = parameters.standartSize.canvas.height + 'px';
    icebergsShadows.style.width = parameters.standartSize.canvas.width + 'px';
    icebergsShadows.style.height = parameters.standartSize.canvas.height + 'px';

    icebergFront.style.width = parameters.standartSize.canvas.width + 'px';
    icebergFront.style.height = parameters.standartSize.canvas.height + 'px';
    icebergBack.style.width = parameters.standartSize.canvas.width + 'px';
    icebergBack.style.height = parameters.standartSize.canvas.height + 'px';

    icebergMapWalls.style.width = parameters.standartSize.canvas.width + 'px';
    icebergMapWalls.style.height = parameters.standartSize.canvas.height + 'px';
    icebergMapWalls.width = parameters.standartSize.canvas.width;
    icebergMapWalls.height = parameters.standartSize.canvas.height;

    characterCanvas.width = parameters.standartSize.styleCharacter.width;
    characterCanvas.height = parameters.standartSize.styleCharacter.height;
    characterCanvas.style.width = parameters.standartSize.styleCharacter.width + 'px';
    characterCanvas.style.height = parameters.standartSize.styleCharacter.height + 'px';
    characterCanvas.style.left = parameters.standartSize.character.width * 2.5 + 'px';
    characterCanvas.style.top = parameters.standartSize.character.height * (2 - 260 / 320) + 'px';
    
    parameters.position.x = parseFloat(characterCanvas.style.left) + (parameters.standartSize.styleCharacter.width - parameters.standartSize.character.width) / 2;
    parameters.position.y = parseFloat(characterCanvas.style.top) + characterCanvas.height - parameters.standartSize.character.height;
    parameters.stylePosition.x = parseFloat(characterCanvas.style.left);
    parameters.stylePosition.y = parseFloat(characterCanvas.style.top);
    
    onMobile.width = parameters.standartSize.joystick.width;
    onMobile.height = parameters.standartSize.joystick.height;
    onMobile.style.width = parameters.standartSize.joystick.width + 'px';
    onMobile.style.height = parameters.standartSize.joystick.height + 'px';
}

export { setParameters };