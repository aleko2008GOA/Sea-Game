import { animations } from '../character/character_moving.js';
import loading from '../story/loading.js';
import { icebergs } from '../objects/icebergs.js';
import { lights } from '../objects/lights.js';
import { character_moves } from '../character/character_moving.js';
import { health } from '../game_over/lose_hearts.js';
import { immutable } from '../story/starts_playing.js';
import { seaAnimations } from '../background/sea.js';

const palyground = document.getElementById('game_main_container');
const canvases = document.querySelectorAll('canvas');
const settings = document.querySelectorAll('.settings')
const restart_button = document.querySelectorAll('.restart');
const loading_screen = document.getElementById('loading');

function restart(characterImagesArray){
    restart_button.forEach(button =>{
        button.addEventListener('click', () =>{
            cancelAnimationFrame(animations.animationFrameId);
            clearTimeout(animations.stunTimeoutId);
            clearInterval(animations.flickeringIntervalId);
            clearInterval(immutable.timeInterval);
            clearInterval(seaAnimations.interval);

            animations.animationFrameId = null;
            animations.stunTimeoutId = null;
            animations.flickeringIntervalId = null;
            immutable.timeInterval = null;
            seaAnimations.interval = null;
            seaAnimations.waveSpeed = 1000;
            immutable.time = 300;
            health.hearts = 3;

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