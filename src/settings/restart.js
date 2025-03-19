import loading from '../story/loading.js';
import { icebergs } from '../objects/icebergs.js';
import { lights } from '../objects/lights.js';
import { character_moves } from '../character/character_moving.js';
import { animations, parameters } from '../globalVariables/globalVariables.js';
import { drawJoystick } from './joystick.js';
import { drawWhale } from '../objects/whale.js';
import { drawShadows } from '../objects/shadows.js';

const palyground = document.getElementById('game_main_container');
const canvases = document.querySelectorAll('canvas');
const settings = document.querySelectorAll('.settings')
const restart_button = document.querySelectorAll('.restart');
const loading_screen = document.getElementById('loading');
const settingsBar = document.getElementById('settings_bar');
const pauseButtonTopLeft = document.getElementById('pause_button_top_left');
const lightsCounter = document.getElementById('lightsCounter');
const rain = document.getElementById('rain');
const characterCanvas = document.getElementById('character_canvas');
const icebergFront = document.getElementById('iceberg_map_front');
const icebergBack = document.getElementById('iceberg_map_back');
const icebergShadows = document.getElementById('icebergs_shadows');

function restart(characterImagesArray){
    restart_button.forEach(button =>{
        button.addEventListener('click', async () =>{
            restartAllFunctions();
            await startAgain(characterImagesArray);
        });
    });
}

function restartAllFunctions(){
    cancelAnimationFrame(animations.allFrameId);
    clearInterval(animations.generator.interval);
    clearInterval(parameters.timeInterval);

    animations.animationFrameId = false;
    animations.animationFrameFunc = null;
    animations.stunFunc = null;
    animations.stunFrameId = false;
    animations.immutableFunc = null;
    animations.immutableFrameId = false;
    animations.sea.seaAnimationFrameId = true;

    Object.keys(animations.moment).forEach(key => animations.moment[key] = false);
    animations.moment.startSrceen = true;

    animations.sea.waveSpeed = 1000;

    if(parameters.images.lastRainCanvas) parameters.images.lastRainCanvas.style.display = 'none';
    if(parameters.images.lastDoubleRainCanvas) parameters.images.lastDoubleRainCanvas.style.display = 'none';
    if(parameters.images.lastSnowCanvas) parameters.images.lastSnowCanvas.style.display = 'none';
    parameters.images.lastRainCanvas = null;
    parameters.images.lastDoubleRainCanvas = null;
    parameters.images.lastSnowCanvas = null;

    animations.generator.interval = null;
    animations.generator.intervalFunc = null;

    parameters.timeInterval = null;
    parameters.time = 300;
    parameters.delay = 0.01;
    parameters.hearts = 3;
    Object.keys(parameters.speed).forEach(key => parameters.speed[key] = 0);
    parameters.collected = 0;

    parameters.timeChangeFunc = null;
    parameters.immutable = true;

    characterCanvas.style.left = parameters.standartSize.character.width * 2.5 + 'px';
    characterCanvas.style.top = parameters.standartSize.character.height * (2 - 260 / 320) + 'px';

    parameters.position.x = parseFloat(characterCanvas.style.left) + parameters.standartSize.character.width / 2;
    parameters.position.y = parseFloat(characterCanvas.style.top) + characterCanvas.height - parameters.standartSize.character.height;
    parameters.stylePosition.x = parseFloat(characterCanvas.style.left);
    parameters.stylePosition.y = parseFloat(characterCanvas.style.top);

    Array.from(icebergShadows.children).forEach(shadow => icebergShadows.removeChild(shadow));
    Array.from(icebergFront.children).forEach(canvas => icebergFront.removeChild(canvas));
    Array.from(icebergBack.children).forEach(canvas =>{
        if(canvas.id !== 'iceberg_map_walls') icebergBack.removeChild(canvas);
    });
    canvases.forEach(val =>{
        if(val.id != 'waves_left' && val.id != 'waves_right' && val.id != 'sea'){
            const canvas = val.getContext('2d');
            canvas.clearRect(0, 0, val.width, val.height);
        }
    });
    settings.forEach(val => {
        if(val.style.display !== 'none') val.style.display = 'none';
    });
    rain.querySelectorAll('canvas').forEach(canvas => {
        if(canvas.style.display !== 'none') canvas.style.display = 'none';
    });

    loading_screen.style.display = 'flex';
    settingsBar.style.display = 'none';
    pauseButtonTopLeft.style.display = 'inline';
    lightsCounter.querySelector('span').textContent = parameters.collected;

    palyground.scrollTo({
        top: 0,
        left: 0
    });
}

async function startAgain(characterImagesArray){
    animations.allFrameId = requestAnimationFrame(animations.allFrameFunc);
    await loading(5);
    drawWhale();
    await loading(10)
    drawJoystick();
    await loading(40);
    const { icebergCoordinateArr, icebergGridPosition } = await icebergs();
    await loading(60);
    await lights(icebergGridPosition);
    await loading(90);
    drawShadows(icebergCoordinateArr);
    loading(99);
    character_moves(icebergGridPosition, characterImagesArray);
    await loading(100);
}

export { restart, restartAllFunctions, startAgain };