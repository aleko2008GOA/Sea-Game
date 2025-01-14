import { parameters, animations } from "../globalVariables/globalVariables.js";

// canvases
/** @type {HTMLCanvasElement[][]} */

const characterCanvasRowArray = [...document.getElementById('main_character').querySelectorAll('section')];
const characterChunckArray = characterCanvasRowArray.map(row => [...row.querySelectorAll('canvas')]);
const characterCanvasChunckArray = characterChunckArray.map(row => row.map(canvas => canvas.getContext('2d')));

function chooseRightCanvas(characterPosition){
    const arrayOfChuncks = [];
    const arrayOfCanvases = [];
    const arrayOfCoordinates = [];

    const chunckWidth = parameters.standartSize.chunck.width;
    const chunckHeight = parameters.standartSize.chunck.height;

    const charRealWidth = parameters.standartSize.character.width * 1.6;
    const charRealHeight = parameters.standartSize.character.height * 1.6;
    const charWidth = parameters.standartSize.character.width;
    const charHeight = parameters.standartSize.character.height;
    
    const realPosition = {
        chunck0: { x: characterPosition.x - 0.3 * charWidth, y: characterPosition.y - 0.6 * charHeight },
        chunck1: { x: characterPosition.x + 1.3 * charWidth, y: characterPosition.y - 0.6 * charHeight },
        chunck2: { x: characterPosition.x - 0.3 * charWidth, y: characterPosition.y + charHeight},
        chunck3: { x: characterPosition.x + 1.3 * charWidth, y: characterPosition.y + charHeight}
    }
    realPosition.index0 = { x: Math.floor(realPosition.chunck0.x / chunckWidth), y: Math.floor(realPosition.chunck0.y / chunckHeight) },
    realPosition.index1 = { x: Math.floor(realPosition.chunck1.x / chunckWidth), y: Math.floor(realPosition.chunck1.y / chunckHeight) },
    realPosition.index2 = { x: Math.floor(realPosition.chunck2.x / chunckWidth), y: Math.floor(realPosition.chunck2.y / chunckHeight) },
    realPosition.index3 = { x: Math.floor(realPosition.chunck3.x / chunckWidth), y: Math.floor(realPosition.chunck3.y / chunckHeight) }
    
    const chunck0 = characterChunckArray[realPosition.index0.y][realPosition.index0.x];
    const chunck1 = characterChunckArray[realPosition.index1.y][realPosition.index1.x];
    const chunck2 = characterChunckArray[realPosition.index2.y][realPosition.index2.x];
    const chunck3 = characterChunckArray[realPosition.index3.y][realPosition.index3.x];

    const canvas0 = characterCanvasChunckArray[realPosition.index0.y][realPosition.index0.x];
    const canvas1 = characterCanvasChunckArray[realPosition.index1.y][realPosition.index1.x];
    const canvas2 = characterCanvasChunckArray[realPosition.index2.y][realPosition.index2.x];
    const canvas3 = characterCanvasChunckArray[realPosition.index3.y][realPosition.index3.x];

    arrayOfChuncks.push(chunck0);
    arrayOfChuncks.push(realPosition.index0.y === realPosition.index1.y && realPosition.index0.x === realPosition.index1.x ? null : chunck1);
    arrayOfChuncks.push(realPosition.index0.y === realPosition.index2.y && realPosition.index0.x === realPosition.index2.x ? null : chunck2);
    arrayOfChuncks.push(realPosition.index0.y === realPosition.index3.y && realPosition.index0.x === realPosition.index3.x ? null : chunck3);
    
    arrayOfCanvases.push(canvas0);
    arrayOfCanvases.push(realPosition.index0.y === realPosition.index1.y && realPosition.index0.x === realPosition.index1.x ? null : canvas1);
    arrayOfCanvases.push(realPosition.index0.y === realPosition.index2.y && realPosition.index0.x === realPosition.index2.x ? null : canvas2);
    arrayOfCanvases.push(realPosition.index0.y === realPosition.index3.y && realPosition.index0.x === realPosition.index3.x ? null : canvas3);
    
    arrayOfChuncks.forEach(chunck => {
        if(chunck && chunck.width === 0) chunck.width = chunckWidth;
        if(chunck && chunck.height === 0) chunck.height = chunckHeight;
    });
    
    arrayOfCoordinates.push([
        realPosition.chunck0.x - realPosition.index0.x * chunckWidth, 
        realPosition.chunck0.y - realPosition.index0.y * chunckHeight, 
        charRealWidth, 
        charRealHeight
    ]);
    arrayOfCoordinates.push([
        1 - (realPosition.chunck1.x - realPosition.index1.x * chunckWidth) / charRealWidth, 
        0,
        (realPosition.chunck1.x - realPosition.index1.x * chunckWidth) / charRealWidth,
        1,
        0, 
        realPosition.chunck1.y - realPosition.index1.y * chunckHeight, 
        realPosition.chunck1.x - realPosition.index1.x * chunckWidth, 
        charRealHeight
    ]);

    return { arrayOfChuncks, arrayOfCoordinates, arrayOfCanvases };
}

export default chooseRightCanvas;