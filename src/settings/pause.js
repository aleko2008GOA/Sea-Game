import { animations, parameters } from "../globalVariables/globalVariables.js";

const pauseButton = document.querySelectorAll('.pause_button');
const pauseButtonTopLeft = document.getElementById('pause_button_top_left');
const pauseButtonOnscreen = document.getElementById('pause_button_onscreen');
const settingsBar = document.getElementById('settings_bar');

let needToBeStunned = false;
let needToBeImmune = false;

pauseButton.forEach(but => {
    but.addEventListener('click', pause);
});

function pause(){
    if(window.getComputedStyle(settingsBar).display === 'none'){
        animations.moment.pause = true;

        if(animations.moment.generating && animations.generator.interval){
            clearInterval(animations.generator.interval);
            animations.generator.interval = null;
        }else if(animations.moment.gameProcess){
            if(animations.animationFrameId) animations.animationFrameId = false;
            if(parameters.timeInterval){
                clearInterval(parameters.timeInterval);
                parameters.timeInterval = null;
            }
            if(animations.stunFrameId){
                animations.stunFrameId = false;
                needToBeStunned = true;
            }
            if(animations.immutableFrameId){
                animations.immutableFrameId = false;
                needToBeImmune = true;
            }
        }
        if(animations.sea.seaAnimationFrameId) animations.sea.seaAnimationFrameId = false;

        cancelAnimationFrame(animations.allFrameId);
        animations.allFrameId = null;

        settingsBar.style.display = 'flex';
        pauseButtonTopLeft.style.display = 'none';
    }else{
        animations.moment.pause = false;
        parameters.lastStamp = performance.now();

        if(animations.moment.generating && !animations.generator.interval)
            animations.generator.intervalFunc();
        else if(animations.moment.gameProcess){
            if(!animations.animationFrameId)
                animations.animationFrameId = true;
            if(!parameters.timeInterval)
                parameters.timeInterval = setInterval(() => parameters.timeChangeFunc(), 10);
            if(!animations.stunFrameId && needToBeStunned){
                needToBeStunned = false;
                animations.stunFrameId = true;
            }
            if(!animations.immutableFrameId && needToBeImmune){
                needToBeImmune = false;
                animations.immutableFrameId = true;
            }
        }
        if(!animations.sea.seaAnimationFrameId) animations.sea.seaAnimationFrameId = true;

        animations.allFrameId = requestAnimationFrame(animations.allFrameFunc);

        settingsBar.style.display = 'none';
        pauseButtonTopLeft.style.display = 'inline';
    }
}

export default pause;