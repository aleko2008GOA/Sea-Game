import { parameters } from "../globalVariables/globalVariables.js";

const FPSContainer = document.getElementById('fps');
const buttons = FPSContainer.querySelectorAll('button');

const showFpsButton = document.querySelectorAll('.fps');
const mainSettings = document.getElementById('main-settings');
const fpsSection = document.getElementById('fps');
const back = document.getElementById('back');

buttons.forEach((button, index) =>{
    if(!(button.id).includes('back')){
        button.addEventListener('click', () =>{
            if(index === 0) parameters.FPS = 30;
            else if(index === 1) parameters.FPS = 60;
            else if(index === 2) parameters.FPS = 90;
            else if(index === 3) parameters.FPS = 144;
            else if(index === 3) parameters.FPS = 'auto';

            buttons.forEach(button => button.classList.remove('active-button'));
            button.classList.add('active-button');
        });
    }
});

showFpsButton.forEach(button => {
    button.addEventListener('click', () =>{
        mainSettings.style.display = 'none';
        fpsSection.style.display = 'flex';
    });
});

back.addEventListener('click', () =>{
    fpsSection.style.display = 'none';
    mainSettings.style.display = 'flex';
});