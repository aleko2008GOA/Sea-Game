import { animations, parameters } from "../globalVariables/globalVariables.js";
import pause from "./pause.js"
import { restartAllFunctions, startAgain } from "./restart.js";

const game = document.getElementById('game');
const fullScreenButtonMain = document.getElementById('fullScreenStart');
const startButton = document.getElementById('start');

document.addEventListener('fullscreenchange', exitFullScreen);
document.addEventListener('webkitfullscreenchange', exitFullScreen);
document.addEventListener('mozfullscreenchange', exitFullScreen);
document.addEventListener('msfullscreenchange', exitFullScreen);

document.addEventListener('visibilitychange', () =>{
    if(document.hidden && !animations.moment.pause && !animations.moment.gameWinLose && !animations.moment.loseWinPause && !animations.moment.startSrceen && !animations.moment.notLoaded) 
        pause();
});

function exitFullScreen(){
    if (!document.fullscreenElement) {
        restartAllFunctions(parameters.images.characterImages);
        fullScreenButtonMain.style.display = 'inline';
        animations.moment.notLoaded = true;
        startButton.style.display = 'none';
    }
}

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

            await waitForFullscreenChange(); // To be sure that we are fullscreen
            
            if(parameters.gameStarted){
                await startAgain(parameters.images.characterImages);
                startButton.style.display = 'inline';
            }
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

function waitForFullscreenChange() {
    return new Promise(resolve => {
        const handler = () => {
            document.removeEventListener('fullscreenchange', handler);
            document.removeEventListener('webkitfullscreenchange', handler);
            document.removeEventListener('mozfullscreenchange', handler);
            document.removeEventListener('MSFullscreenChange', handler);
            resolve();
        };
        document.addEventListener('fullscreenchange', handler);
        document.addEventListener('webkitfullscreenchange', handler);
        document.addEventListener('mozfullscreenchange', handler);
        document.addEventListener('MSFullscreenChange', handler);
    });
}

export default fullScreen;