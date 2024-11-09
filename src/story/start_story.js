import { start_playing } from "./starts_playing.js";

const shown_text = document.getElementById('text');
const instructions = document.getElementById('instructions');
const continue_button = document.getElementById('continue');
const text = ['Welcome! My name is fishermen and i want to give you something hsdusdh sdh sdjhd sjhds jsdh', 'today we are gonna', 'lets start!'];

let interval = null;

function start_generation_text(){
    let index = 0;

    instructions.style.display = 'flex';
    continue_button.addEventListener('click', continue_dialog);
    generating();

    function continue_dialog(){
        if(interval){
            clearInterval(interval);
            shown_text.textContent = text[index];
            interval = null;
        }else{
            index++;
            if(index < text.length){
                generating();
            }else{
                continue_button.removeEventListener('click', continue_dialog);
                setTimeout(() =>{
                    instructions.style.display = 'none';
                    start_playing();
                }, 1000);
            }
        }
    }

    function generating(){
        let simbols = 0;
        shown_text.textContent = '';
        
        interval = setInterval(() =>{
            if(simbols < text[index].length) shown_text.textContent += text[index][simbols]; 
            else{
                clearInterval(interval);
                interval = null;
            }
            simbols++;
        }, 50);
    }
}

export default start_generation_text;