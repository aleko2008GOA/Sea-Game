import start_generation_text from "./start_story.js";
import { animations } from "../globalVariables/globalVariables.js";

const loading_screen = document.getElementById('loading');
const start_button = document.getElementById('start');

start_button.addEventListener('click', () =>{
    animations.moment.startSrceen = false;
    animations.moment.generating = true;

    loading_screen.style.display = 'none';
    start_button.style.display = 'none';
    start_generation_text();
});
let loadingPercent = 0;

function loading(ended, percent){
    animations.moment.startSrceen = true;
    
    loadingPercent += percent;
    if(ended) start_button.style.display = 'inline';
}

export default loading;