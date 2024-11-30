import { animations, parameters } from "../globalVariables/globalVariables.js";

const win_screen = document.getElementById('win_screen');

function win(){ // winning screen
    parameters.immutable = true;
    animations.moment.loseWinPause = true;

    setTimeout(() =>{
        animations.moment.loseWinPause = false;
        animations.moment.gameWinLose = true;

        win_screen.style.display = 'flex';
    }, 2000);
}

export default win;