import { parameters } from "../globalVariables/globalVariables.js";

/** @type {HTMLCanvasElement} */
const characterShadow = document.getElementById('character_shadow');

/** @type {CanvasRenderingContext2D} */
const characterCtx = characterShadow.getContext('2d');

const lightShadow = document.getElementById('light_shadow');
const icebergsShadows = document.getElementById('icebergs_shadows');

const charStylePosition = parameters.stylePosition;
const lightPosition = parameters.light.grid;

function drawShadows(icebergsPosition){
    // chracter
    characterShadow.style.width = parameters.standartSize.shadows.character.width + 'px';
    characterShadow.style.height = parameters.standartSize.shadows.character.height + 'px';
    characterShadow.width = parameters.standartSize.shadows.character.width;
    characterShadow.height = parameters.standartSize.shadows.character.height;

    characterShadow.style.left = charStylePosition.x + 'px';
    characterShadow.style.top = charStylePosition.y + parameters.standartSize.styleCharacter.height + 'px';

    characterCtx.globalAlpha = 0.5;
    characterCtx.scale(1, -1);
    characterCtx.drawImage(parameters.images.characterImages[0][0][4], 0, -characterShadow.height, characterShadow.width, characterShadow.height);

    // icebegrs
    for(let i = 0; i < 70; i++) {
        const iceberg = document.createElement('canvas');
        const ctx = iceberg.getContext('2d');

        iceberg.style.width = parameters.standartSize.shadows.iceberg.width + 'px';
        iceberg.style.height = parameters.standartSize.shadows.iceberg.height + 'px';
        iceberg.width = parameters.standartSize.shadows.iceberg.width;
        iceberg.height = parameters.standartSize.shadows.iceberg.height;

        iceberg.style.left = icebergsPosition[i].x + 'px';
        iceberg.style.top = icebergsPosition[i].y + parameters.standartSize.iceberg.height + 'px';

        ctx.globalAlpha = 0.5;
        ctx.scale(1, -1);
        ctx.drawImage(parameters.images.icebergImage, 0, -iceberg.height, iceberg.width, iceberg.height);
        
        icebergsShadows.appendChild(iceberg);
    }
}

function animateCharacterShadows(img, cleared){
    characterCtx.clearRect(0, -characterShadow.height, characterShadow.width, characterShadow.height);
    if(!cleared) 
        characterCtx.drawImage(img, 0, -characterShadow.height, characterShadow.width, characterShadow.height);
    characterShadow.style.left = charStylePosition.x + 'px';
    characterShadow.style.top = charStylePosition.y + parameters.standartSize.styleCharacter.height + 'px';
}

export { drawShadows, animateCharacterShadows };