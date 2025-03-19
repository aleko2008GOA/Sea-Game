import { animations, parameters } from "../globalVariables/globalVariables.js";

const whale = document.getElementById('whale');
const latestPosition = { x: 0, y: 0 };
const position = parameters.position;

let lastTime = 0;

function drawWhale(){
    whale.style.opacity = 0;
    whale.style.width = parameters.standartSize.whale.width + 'px';
    whale.style.height = parameters.standartSize.whale.height + 'px';
    whale.style.left = position.x + parameters.standartSize.character.width / 2 - parameters.standartSize.whale.width / 2 + 'px';
    whale.style.top = position.y + parameters.standartSize.character.height / 2 - parameters.standartSize.whale.height / 2 + 'px';
}

function changeWhale(){
    if(position.x !== latestPosition.x || position.y !== latestPosition.y){
        whale.style.left = position.x + parameters.standartSize.character.width / 2 - parameters.standartSize.whale.width / 2 + 'px';
        whale.style.top = position.y + parameters.standartSize.character.height / 2 - parameters.standartSize.whale.height / 2 + 'px';
    }
    if(parameters.time <= 100 && Math.floor(parameters.time) < lastTime) whale.style.opacity = (100 - parameters.time) * 0.005;
    lastTime = Math.floor(parameters.time);
}

export { drawWhale, changeWhale };