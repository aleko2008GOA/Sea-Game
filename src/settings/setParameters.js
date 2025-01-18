import { animations, parameters } from "../globalVariables/globalVariables.js";
import pause from "./pause.js"
import { restartAllFunctions } from "./restart.js";
import { changedSize } from "../character/chooseCanvas.js";

const defaultCanvases = document.getElementById('defaultCanvases');
const otherInstructions = document.getElementById('other_instructions');
const game = document.getElementById('game');
const onMobile = document.getElementById('on_mobile');
const fullScreenButtonMain = document.getElementById('fullScreenStart');
const mainCharacter = document.getElementById('main_character');

const screenWidth = Math.max(screen.width, screen.height);
const screenHeight = Math.min(screen.width, screen.height);

document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        restartAllFunctions(parameters.images.characterImages);
        fullScreenButtonMain.style.display = 'inline';
        animations.moment.notLoaded = true;
    }
});
document.addEventListener('webkitfullscreenchange', () => {
    if (!document.webkitFullscreenElement) {
        restartAllFunctions(parameters.images.characterImages);
        fullScreenButtonMain.style.display = 'inline';
        animations.moment.notLoaded = true;
    }
});
document.addEventListener('mozfullscreenchange', () => {
    if (!document.mozFullScreenElement) {
        restartAllFunctions(parameters.images.characterImages);
        fullScreenButtonMain.style.display = 'inline';
        animations.moment.notLoaded = true;
    }
});
document.addEventListener('msfullscreenchange', () => {
    if (!document.msFullscreenElement) {
        restartAllFunctions(parameters.images.characterImages);
        fullScreenButtonMain.style.display = 'inline';
        animations.moment.notLoaded = true;
    }
});

async function fullScreen(){
    try{
        if(!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement && !document.msFullscreenElement){
            if(game.requestFullscreen) // modern
                await game.requestFullscreen();
            else if(game.mozRequestFullScreen) // Firefox
                await game.mozRequestFullScreen();
            else if(game.webkitRequestFullscreen) // Chrome, Safari, Opera
                await game.webkitRequestFullscreen();
            else if(game.msRequestFullscreen) // Internet Explorer / Edge
                await game.msRequestFullscreen();

            fullScreenButtonMain.style.display = 'none';
            animations.moment.notLoaded = false;
        }else{
            if(document.exitFullscreen) // modern
                await document.exitFullscreen();
            else if (document.mozCancelFullScreen) // Firefox
                await document.mozCancelFullScreen();
            else if (document.webkitExitFullscreen) // Chrome, Safari, Opera
                await document.webkitExitFullscreen();
            else if (document.msExitFullscreen) // Internet Explorer / Edge
                await document.msExitFullscreen();

            restartAllFunctions(parameters.images.characterImages);
            fullScreenButtonMain.style.display = 'inline';
            animations.moment.notLoaded = true;
        }
    }catch(err){
        console.error('Your browser does not support out game, check for updates');
        console.error(new Error(err));
    }
}

function setParameters(){
    document.addEventListener('visibilitychange', () =>{
        if(document.hidden && !animations.moment.pause && !animations.moment.gameWinLose && !animations.moment.loseWinPause && !animations.moment.startSrceen && !animations.moment.notLoaded) 
            pause();
    });
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
    
    mainCharacter.style.width = parameters.standartSize.canvas.width + 'px';
    mainCharacter.style.height = parameters.standartSize.canvas.height + 'px';

    mainCharacter.querySelectorAll('section').forEach(section => getComputedStyle(section));
    mainCharacter.querySelectorAll('canvas').forEach(miniCanvas =>{
        miniCanvas.width = 0;
        miniCanvas.height = 0;
        getComputedStyle(miniCanvas);
    });
    
    onMobile.width = parameters.standartSize.joystick.width;
    onMobile.height = parameters.standartSize.joystick.height;
    onMobile.style.width = parameters.standartSize.joystick.width + 'px';
    onMobile.style.height = parameters.standartSize.joystick.height + 'px';

    changedSize();
}

export { fullScreen, setParameters };