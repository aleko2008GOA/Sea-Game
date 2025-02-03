import game_lost from "../game_over/lose.js";
import { animations, parameters } from "../globalVariables/globalVariables.js";

const timer = document.getElementById('timer');
const time = document.getElementById('time');

function start_playing(){
    parameters.timeChangeFunc = timeChangeFunction;
    setTimeout(() =>{
        console.log(3);
    }, 1000);
    setTimeout(() =>{
        console.log(2);
    }, 2000);
    setTimeout(() =>{
        console.log(1);
    }, 3000);
    setTimeout(() =>{
        console.log('start');

        animations.moment.loseWinPause = false;
        animations.moment.gameProcess = true;

        start_timer();
        document.getElementById('pause_button_top_left').style.display = 'inline';
        document.getElementById('lightsCounter').style.display = 'block';
    }, 4000);
}

function start_timer(){
    parameters.immutable = false;
    timer.style.display = 'block';
    parameters.timeInterval = setInterval(() => timeChangeFunction(), 10);
}

function timeChangeFunction(){
    if(parameters.time > 0){
        time.textContent = Math.floor(parameters.time / 60) + ':' + (parameters.time % 60).toFixed(2);
        parameters.time -= 0.01;
    }else{
        clearInterval(parameters.timeInterval);
        parameters.timeInterval = null;
        parameters.immutable = true;

        animations.moment.gameProcess = false;
        animations.moment.loseWinPause = true;

        setTimeout(() =>{
            game_lost('Time is up, you have been eaten by a whale');
        }, 1000);
    }
}

export { start_playing };