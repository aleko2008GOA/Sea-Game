import { setParameters, fullScreen } from './settings/setParameters.js';
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

setParameters();
document.querySelectorAll('.fullScreen').forEach(but => {
    but.addEventListener('click', () => {
        screen.width > screen.height ? fullScreen().then(() =>{
            if(!parameters.gameStarted){
                parameters.gameStarted = true;
                animations.allFrameId = requestAnimationFrame(animations.allFrameFunc);
                checkDevice();
                background_sea();
                const {icebrg_coordinate_arr, iceberg_grid_position} = icebergs();
                const {lights_coordinate_arr, lights_grid_position, lights_background} = lights(icebrg_coordinate_arr);
                characterImages
                    .then(characterImagesArray =>{
                        character_moves(iceberg_grid_position, lights_grid_position, lights_background, characterImagesArray);
                        parameters.images.characterImages = characterImagesArray;
                        return characterImagesArray || null;
                    })
                    .then(characterImagesArray => {
                        restart(characterImagesArray);
                    });
                loading(true, 100);
            }
        }) : alert("Rotate your devise!");
    });
});