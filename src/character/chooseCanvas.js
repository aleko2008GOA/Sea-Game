import { parameters, animations } from "../globalVariables/globalVariables.js";

// canvases
/** @type {HTMLCanvasElement[][]} */

const characterCanvasRowArray = [...document.getElementById('main_character').querySelectorAll('section')];
const characterCanvasChunckArray = characterCanvasRowArray.map(row => [...row.querySelectorAll('canvas')]);

function chooseRightCanvas(characterPosition){
    const arrayOfChuncks = [];
    const arrayOfCoordinates = [];

    const chunckWidth = parameters.standartSize.chunck.width;
    const chunckHeight = parameters.standartSize.chunck.height;

    const charRealWidth = parameters.standartSize.character.width * 1.6;
    const charRealHeight = parameters.standartSize.character.height * 1.6;
    const charWidth = parameters.standartSize.character.width;
    const charHeight = parameters.standartSize.character.height;
    
    const realPosition = {
        chunck0: {
            x: characterPosition.x - 0.3 * charWidth,
            y: characterPosition.y - 0.6 * charHeight
        },
        chunck1: {
            x: characterPosition.x + 1.3 * charWidth,
            y: characterPosition.y - 0.6 * charHeight
        },
        chunck2: {
            x: characterPosition.x - 0.3 * charWidth,
            y: characterPosition.y + charHeight
        },
        chunck3: {
            x: characterPosition.x + 1.3 * charWidth,
            y: characterPosition.y + charHeight
        }
    }
    
    const chunck0 = characterCanvasChunckArray[Math.floor(realPosition.chunck0.y / chunckHeight)][Math.floor(realPosition.chunck0.x / chunckWidth)];
    const chunck1 = characterCanvasChunckArray[Math.floor(realPosition.chunck1.y / chunckHeight)][Math.floor(realPosition.chunck1.x / chunckWidth)];
    const chunck2 = characterCanvasChunckArray[Math.floor(realPosition.chunck2.y / chunckHeight)][Math.floor(realPosition.chunck2.x / chunckWidth)];
    const chunck3 = characterCanvasChunckArray[Math.floor(realPosition.chunck3.y / chunckHeight)][Math.floor(realPosition.chunck3.x / chunckWidth)];

    arrayOfChuncks.push(chunck0);
    arrayOfChuncks.push(Math.floor(realPosition.chunck0.y / chunckHeight) === Math.floor(realPosition.chunck1.y / chunckHeight) && Math.floor(realPosition.chunck0.x / chunckWidth) === Math.floor(realPosition.chunck1.x / chunckWidth) ? null : chunck1);
    arrayOfChuncks.push(Math.floor(realPosition.chunck0.y / chunckHeight) === Math.floor(realPosition.chunck2.y / chunckHeight) && Math.floor(realPosition.chunck0.x / chunckWidth) === Math.floor(realPosition.chunck2.x / chunckWidth) ? null : chunck2);
    arrayOfChuncks.push(Math.floor(realPosition.chunck0.y / chunckHeight) === Math.floor(realPosition.chunck3.y / chunckHeight) && Math.floor(realPosition.chunck0.x / chunckWidth) === Math.floor(realPosition.chunck3.x / chunckWidth) ? null : chunck3);

    arrayOfChuncks.forEach(chunck => {
        if(chunck.width === 0) chunck.width = chunckWidth;
        if(chunck.height === 0) chunck.height = chunckHeight;
    });
    
    arrayOfCoordinates.push([
        realPosition.chunck0.x - Math.floor(realPosition.chunck1.x), 
        realPosition.chunck0.y - Math.floor(realPosition.chunck0.y), 
        charRealWidth, 
        charRealHeight
    ]);
    arrayOfCoordinates.push([
        1 - (realPosition.chunck1.x - Math.floor(realPosition.chunck1.x)) / charRealWidth, 
        0,
        (realPosition.chunck1.x - Math.floor(realPosition.chunck1.x)) / charRealWidth,
        charRealHeight,
        realPosition.chunck1.x - Math.floor(realPosition.chunck1.x), 
        realPosition.chunck1.y - Math.floor(realPosition.chunck1.y), 
        charRealWidth, 
        charRealHeight
    ]);

    return arrayOfChuncks;
}

export default chooseRightCanvas;