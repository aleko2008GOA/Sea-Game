import { setParameters } from './settings/setParameters.js';
import fullScreen from './settings/fullScreenMode.js';
import loading from './story/loading.js';
import { background_sea } from './background/sea.js';
import { icebergs } from './objects/icebergs.js';
import { lights } from './objects/lights.js';
import { character_moves } from './character/character_moving.js';
import { restart } from './settings/restart.js';
import characterImages from './images/loadingImages/character_images.js';
import './settings/pause.js';
import { checkDevice } from './settings/onMobile.js';
import { animations, parameters } from './globalVariables/globalVariables.js';
import './settings/animationFrameFPS.js';
import './settings/setFPS.js';
import { drawRain } from './background/lightStorm.js';

setParameters();
document.querySelectorAll('.fullScreen').forEach(but => {
    but.addEventListener('click', async () => {
        if(screen.width > screen.height){
            await fullScreen();
            if(!parameters.gameStarted){
                parameters.gameStarted = true;
                animations.allFrameId = requestAnimationFrame(animations.allFrameFunc);
                checkDevice();
                drawRain();
                background_sea();

                const { icebergCoordinateArr, icebergGridPosition } = await icebergs();
                const { lightsCoordinateArr, lightsGridPosition, lightsBackground } = await lights(icebergCoordinateArr);
                
                const characterImagesArray = await characterImages;
                character_moves(icebergGridPosition, lightsGridPosition, lightsBackground, characterImagesArray);
                parameters.images.characterImages = characterImagesArray;
                
                restart(characterImagesArray);
                loading(true, 100);
            }
        }else{
            alert("Rotate your devise!");
        }
    });
}); 