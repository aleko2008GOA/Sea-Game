import { animations, parameters } from "../globalVariables/globalVariables.js";
import pause from "./pause.js"

const gameMainContainer = document.getElementById('game_main_container');
const otherInstructions = document.getElementById('other_instructions');
const onMobile = document.getElementById('on_mobile');
const screenWidth = screen.width;
const screenHeight = screen.height;

function setParameters(){
    document.addEventListener('visibilitychange', () =>{
        if(document.hidden && !animations.moment.pause && !animations.moment.gameWinLose && !animations.moment.loseWinPause && !animations.moment.startSrceen) pause();
    });

    document.getElementById('fullScreen').addEventListener('click', () => {
        if(!document.fullscreenElement) document.documentElement.requestFullscreen();
        else document.exitFullscreen();
    });

    let index = Math.floor((screenHeight - 50) / parameters.standartSize.screen.height * 10) / 10;
    Object.keys(parameters.standartSize).forEach(key =>{
        Object.keys(parameters.standartSize[key]).forEach(miniKey => parameters.standartSize[key][miniKey] *= index);
    });
    parameters.charMaxSpeed60FPS *= index;
    parameters.charDeltaSpeed60FPS *= index;
    
    gameMainContainer.querySelectorAll('canvas').forEach(canvas =>{
        canvas.width = parameters.standartSize.canvas.width;
        canvas.height = parameters.standartSize.canvas.height;
        canvas.style.width = parameters.standartSize.canvas.width + 'px';
        canvas.style.height = parameters.standartSize.canvas.height + 'px';
    });
    
    gameMainContainer.style.width = parameters.standartSize.screen.width + 'px';
    gameMainContainer.style.height = parameters.standartSize.screen.height + 'px';
    otherInstructions.style.width = parameters.standartSize.screen.width + 'px';
    otherInstructions.style.height = parameters.standartSize.screen.height + 'px';
    
    onMobile.width = parameters.standartSize.joystick.width;
    onMobile.height = parameters.standartSize.joystick.height;
    onMobile.style.width = parameters.standartSize.joystick.width + 'px';
    onMobile.style.height = parameters.standartSize.joystick.height + 'px';
}

export default setParameters;