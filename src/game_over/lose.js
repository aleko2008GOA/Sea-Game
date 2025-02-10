import { parameters, animations } from "../globalVariables/globalVariables.js";

const lose_text = document.getElementById('lose_text');
const lose_screen = document.getElementById('lose_screen');

function game_lost(text){ // losing screen
    animations.moment.loseWinPause = false;
    animations.moment.gameProcess = false;
    animations.moment.gameWinLose = true;

    lose_screen.style.display = 'flex';
    lose_text.textContent = text;
    clearInterval(parameters.timeInterval);
}

export default game_lost;