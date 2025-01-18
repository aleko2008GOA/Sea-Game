import { parameters, animations } from "../globalVariables/globalVariables.js";

// canvases
/** @type {HTMLCanvasElement[][]} */

const characterCanvasRowArray = [...document.getElementById('main_character').querySelectorAll('section')];
const characterChunckArray = characterCanvasRowArray.map(row => [...row.querySelectorAll('canvas')]);
const characterCanvasChunckArray = characterChunckArray.map(row => row.map(canvas => canvas.getContext('2d')));

const realPosition = {
    chunck0: { x: 0, y: 0 },
    chunck1: { x: 0, y: 0 },
    chunck2: { x: 0, y: 0 },
    chunck3: { x: 0, y: 0 },
    index0: { x: 0, y: 0 },
    index1: { x: 0, y: 0 },
    index2: { x: 0, y: 0 },
    index3: { x: 0, y: 0 }
};

let charRealWidth = parameters.standartSize.character.width * 1.6;
let charRealHeight = parameters.standartSize.character.height * 1.6;
let charWidth = parameters.standartSize.character.width;
let charHeight = parameters.standartSize.character.height;

let chunckWidth = parameters.standartSize.chunck.width;
let chunckHeight = parameters.standartSize.chunck.height;

function chooseRightCanvas(characterPosition, characterImage, cleared){
    realPosition.chunck0 = { x: characterPosition.x - 0.3 * charWidth, y: characterPosition.y - 0.6 * charHeight };
    realPosition.chunck1 = { x: characterPosition.x + 1.3 * charWidth, y: characterPosition.y - 0.6 * charHeight };
    realPosition.chunck2 = { x: characterPosition.x - 0.3 * charWidth, y: characterPosition.y + charHeight };
    realPosition.chunck3 = { x: characterPosition.x + 1.3 * charWidth, y: characterPosition.y + charHeight };

    realPosition.index0 = { x: Math.floor(realPosition.chunck0.x / chunckWidth), y: Math.floor(realPosition.chunck0.y / chunckHeight) },
    realPosition.index1 = { x: Math.floor(realPosition.chunck1.x / chunckWidth), y: Math.floor(realPosition.chunck1.y / chunckHeight) },
    realPosition.index2 = { x: Math.floor(realPosition.chunck2.x / chunckWidth), y: Math.floor(realPosition.chunck2.y / chunckHeight) },
    realPosition.index3 = { x: Math.floor(realPosition.chunck3.x / chunckWidth), y: Math.floor(realPosition.chunck3.y / chunckHeight) }
    
    characterChunckArray.forEach((section, y) => {
        return section.forEach((canvas, x) =>{
            if((realPosition.index0.y === y && realPosition.index0.x === x)
                || (realPosition.index1.y === y && realPosition.index1.x === x)
                || (realPosition.index2.y === y && realPosition.index2.x === x)
                || (realPosition.index3.y === y && realPosition.index3.x === x)){
                canvas.width = chunckWidth;
                canvas.height = chunckHeight;
            }else{
                canvas.width = 0;
                canvas.height = 0;
            }
        });
    });

    drawChunckTopLeft(characterCanvasChunckArray[realPosition.index0.y][realPosition.index0.x], characterImage, cleared);
    if(realPosition.index0.y !== realPosition.index1.y || realPosition.index0.x !== realPosition.index1.x) 
        drawChunckTopRight(characterCanvasChunckArray[realPosition.index1.y][realPosition.index1.x], characterImage, cleared);
    if(realPosition.index0.y !== realPosition.index2.y || realPosition.index0.x !== realPosition.index2.x) 
        drawChunckBottomLeft(characterCanvasChunckArray[realPosition.index2.y][realPosition.index2.x], characterImage, cleared);
    if(realPosition.index0.y !== realPosition.index3.y || realPosition.index0.x !== realPosition.index3.x) 
        drawChunckBottomRight(characterCanvasChunckArray[realPosition.index3.y][realPosition.index3.x], characterImage, cleared);
}

function drawChunckTopLeft(canvas, image, cleared){
    canvas.clearRect(
        realPosition.chunck0.x - realPosition.index0.x * chunckWidth, 
        realPosition.chunck0.y - realPosition.index0.y * chunckHeight, 
        charRealWidth, 
        charRealHeight
    );
    if(!cleared)
        canvas.drawImage(
            image,
            realPosition.chunck0.x - realPosition.index0.x * chunckWidth, 
            realPosition.chunck0.y - realPosition.index0.y * chunckHeight, 
            charRealWidth, 
            charRealHeight
        );
}

function drawChunckTopRight(canvas, image, cleared){
    canvas.clearRect(
        0, 
        realPosition.chunck1.y - realPosition.index1.y * chunckHeight, 
        realPosition.chunck1.x - realPosition.index1.x * chunckWidth, 
        charRealHeight
    );
    if(!cleared)
        canvas.drawImage(
            image,
            (1 - (realPosition.chunck1.x - realPosition.index1.x * chunckWidth) / charRealWidth) * image.width, 
            0,
            ((realPosition.chunck1.x - realPosition.index1.x * chunckWidth) / charRealWidth) * image.width,
            image.height,
            0, 
            realPosition.chunck1.y - realPosition.index1.y * chunckHeight, 
            realPosition.chunck1.x - realPosition.index1.x * chunckWidth, 
            charRealHeight
        );
}

function drawChunckBottomLeft(canvas, image, cleared){
    canvas.clearRect(
        realPosition.chunck2.x - realPosition.index2.x * chunckWidth, 
        0, 
        charRealWidth, 
        realPosition.chunck2.y - realPosition.index2.y * chunckHeight
    );
    if(!cleared)
        canvas.drawImage(
            image,
            0, 
            (1 - (realPosition.chunck2.y - realPosition.index2.y * chunckHeight) / charRealHeight) * image.height,
            image.width,
            ((realPosition.chunck2.y - realPosition.index2.y * chunckHeight) / charRealHeight) * image.height,
            realPosition.chunck2.x - realPosition.index2.x * chunckWidth, 
            0, 
            charRealWidth, 
            realPosition.chunck2.y - realPosition.index2.y * chunckHeight
        );
}

function drawChunckBottomRight(canvas, image, cleared){
    canvas.clearRect(
        0,
        0, 
        realPosition.chunck3.x - realPosition.index3.x * chunckWidth, 
        realPosition.chunck3.y - realPosition.index3.y * chunckHeight
    );
    if(!cleared)
        canvas.drawImage(
            image,
            (1 - (realPosition.chunck3.x - realPosition.index3.x * chunckWidth) / charRealWidth) * image.width, 
            (1 - (realPosition.chunck3.y - realPosition.index3.y * chunckHeight) / charRealHeight) * image.height,
            ((realPosition.chunck3.x - realPosition.index3.x * chunckWidth) / charRealWidth) * image.width,
            ((realPosition.chunck3.y - realPosition.index3.y * chunckHeight) / charRealHeight) * image.height,
            0,
            0, 
            realPosition.chunck3.x - realPosition.index3.x * chunckWidth, 
            realPosition.chunck3.y - realPosition.index3.y * chunckHeight
        );
}

function changedSize(){
    charRealWidth = parameters.standartSize.character.width * 1.6;
    charRealHeight = parameters.standartSize.character.height * 1.6;
    charWidth = parameters.standartSize.character.width;
    charHeight = parameters.standartSize.character.height;
    
    chunckWidth = parameters.standartSize.chunck.width;
    chunckHeight = parameters.standartSize.chunck.height;
}

export { chooseRightCanvas, changedSize };