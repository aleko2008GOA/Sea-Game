import start_generation_text from "./start_story.js";
import { animations, parameters } from "../globalVariables/globalVariables.js";

const loading_screen = document.getElementById('loading');
const start_button = document.getElementById('start');
const progressBar = document.getElementById('loadingProgressBar');

start_button.addEventListener('click', () =>{
    animations.moment.startSrceen = false;
    animations.moment.generating = true;

    loading_screen.style.display = 'none';
    start_button.style.display = 'none';
    start_generation_text();
});

async function loading(percent){
    if(percent < 100){
        progressBar.value = percent;
        await new Promise(resolve => setTimeout(resolve, 0));
    }else if(!animations.moment.notLoaded){
        progressBar.value = percent;

        animations.loadingTimeout = setTimeout(() => {
            animations.moment.startSrceen = true;
            start_button.style.display = 'inline';
        }, 1000);
    }
}

export default loading;