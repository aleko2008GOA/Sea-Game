import loading from '../story/loading.js';
import { icebergs } from '../objects/icebergs.js';
import { lights } from '../objects/lights.js';
import { character_moves } from '../character/character_moving.js';
import { animations, parameters } from '../globalVariables/globalVariables.js';

const palyground = document.getElementById('game_main_container');
const canvases = document.querySelectorAll('canvas');
const settings = document.querySelectorAll('.settings')
const restart_button = document.querySelectorAll('.restart');
const loading_screen = document.getElementById('loading');
const settingsBar = document.getElementById('settings_bar');
const pauseButtonTopLeft = document.getElementById('pause_button_top_left')

function restart(characterImagesArray){
    restart_button.forEach(button =>{
        button.addEventListener('click', () =>{
            cancelAnimationFrame(animations.animationFrameId);
            cancelAnimationFrame(animations.sea.seaAnimationFrameId);
            clearTimeout(animations.stunTimeoutId);
            clearInterval(animations.flickeringIntervalId);
            clearInterval(animations.generator.interval);

            clearInterval(parameters.timeInterval);

            animations.animationFrameId = null;
            animations.stunTimeoutId = null;
            animations.flickeringIntervalId = null;
            animations.generator.interval = null;
            animations.animationFrameFunc = null;
            animations.sea.waveSpeed = 1000;

            parameters.timeInterval = null;
            parameters.time = 300;
            parameters.hearts = 3;
            parameters.speed = {left: 0, right: 0, up: 0, down: 0};

            canvases.forEach(val =>{
                if(val.id != 'waves_left' && val.id != 'waves_right' && val.id != 'sea'){
                    const canvas = val.getContext('2d');
                    canvas.clearRect(0, 0, val.width, val.height);
                }
            });
            settings.forEach(val =>{
                val.style.display = 'none';
            });

            loading_screen.style.display = 'flex';
            settingsBar.style.display = 'none';
            pauseButtonTopLeft.style.display = 'inline';

            palyground.scrollTo({
                top: 0,
                left: 0
            });

            const {icebrg_coordinate_arr, iceberg_grid_position} = icebergs();
            const {lights_coordinate_arr, lights_grid_position, lights_background} = lights(icebrg_coordinate_arr);
            character_moves(iceberg_grid_position, lights_grid_position, lights_background, characterImagesArray);
            loading(true, 100);
        });
    });
}

export default restart;