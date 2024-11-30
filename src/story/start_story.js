import { start_playing } from "./starts_playing.js";
import { animations } from "../globalVariables/globalVariables.js";

const shown_text = document.getElementById('text');
const instructions = document.getElementById('instructions');
const continue_button = document.getElementById('continue');
const text = ['Welcome! My name is fishermen and i want to give you something hsdusdh sdh sdjhd sjhds jsdh', 'today we are gonna', 'lets start!'];

function start_generation_text(){
    let index = 0;
    animations.generator.intervalFunc = generating;

    instructions.style.display = 'flex';
    continue_button.addEventListener('click', continue_dialog);
    generating();

    function continue_dialog(){
        if(animations.generator.interval){
            clearInterval(animations.generator.interval);
            shown_text.textContent = text[index];
            animations.generator.interval = null;
        }else{
            index++;
            if(index < text.length){
                generating();
            }else{
                document.getElementById('pause_button_top_left').style.display = 'none';
                continue_button.removeEventListener('click', continue_dialog);
                setTimeout(() =>{
                    animations.moment.generating = false;
                    animations.moment.loseWinPause = true;

                    instructions.style.display = 'none';
                    start_playing();
                }, 1000);
            }
        }
    }

    function generating(){
        let simbols = 0;
        shown_text.textContent = '';
        
        animations.generator.interval = setInterval(() =>{
            if(simbols < text[index].length) shown_text.textContent += text[index][simbols]; 
            else{
                clearInterval(animations.generator.interval);
                animations.generator.interval = null;
            }
            simbols++;
        }, 50);
    }
}

export default start_generation_text;