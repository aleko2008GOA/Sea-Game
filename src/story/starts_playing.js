import game_lost from "../game_over/lose.js";
import { seaAnimations } from "../background/sea.js";

const timer = document.getElementById('timer');
const time = document.getElementById('time');

const immutable = {
    immutable: true,
    timeInterval: null,
    time: 300
};

function start_playing(){
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
        start_timer();
    }, 4000);
}

function start_timer(){
    seaAnimations.interval = setInterval(() => {
        if(!document.hidden && seaAnimations.waveSpeed > 100) seaAnimations.waveSpeed -= 3;
        // true: if hidden function pause
    }, 1000);
    immutable.immutable = false;
    timer.style.display = 'block';
    immutable.timeInterval = setInterval(() =>{
        if(immutable.time > 0){
            time.textContent = Math.floor(immutable.time / 60) + ':' + (immutable.time % 60).toFixed(2);
            immutable.time -= 0.01;
        }else{
            clearInterval(immutable.interval);
            immutable.interval = null;
            immutable.immutable = true;
            setTimeout(() =>{
                game_lost('Time is up, you have been eaten by a whale');
            }, 1000);
        }
    }, 10);
}

export { start_playing, immutable };