import { immutable } from "../story/starts_playing.js";

const win_screen = document.getElementById('win_screen');

function win(){ // winning screen
    immutable.immutable = true;
    setTimeout(() =>{
        win_screen.style.display = 'flex';
    }, 2000);
}

export default win;