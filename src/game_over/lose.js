import { immutable } from "../story/starts_playing.js";

const lose_text = document.getElementById('lose_text');
const lose_screen = document.getElementById('lose_screen');

function game_lost(text){ // losing screen
    lose_screen.style.display = 'flex';
    lose_text.textContent = text;
    clearInterval(immutable.timeInterval);
}

export default game_lost;