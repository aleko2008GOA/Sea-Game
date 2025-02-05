import { parameters, animations } from "../globalVariables/globalVariables.js";

const rain = document.getElementById('rain');
const lightningDiv = document.getElementById('lightning');
const rainCanvasFrames = [];
const rainCanvasFramesContexts = [];
const dropCoord = { x: 0, y: 0 };

let canvasToDisplayIndex = 0;
let lastCanvas = null;
let lastCanvasDouble = null;

function drawRain(){
    for(let i = 1; i <= 144; i++){
        /** @type {HTMLCanvasElement} */
        const canvas = document.createElement('canvas');

        /** @type {CanvasRenderingContext2D} */
        const ctx = canvas.getContext('2d');

        canvas.width = parameters.standartSize.screen.width;
        canvas.height = parameters.standartSize.screen.height;

        rainCanvasFrames.push(canvas);
        rainCanvasFramesContexts.push(ctx);
        rain.appendChild(canvas);
    }

    const margin = { x: parameters.standartSize.drop.width * 10, y: parameters.standartSize.drop.height };
    
    while(dropCoord.y < rainCanvasFrames[0].height - parameters.standartSize.drop.height){
        while(dropCoord.x < rainCanvasFrames[0].width){
            const width = Math.round(parameters.standartSize.drop.width);
            const height = Math.round(parameters.standartSize.drop.height * Math.floor(1 + Math.random() * 4) / 3);

            let coordY = dropCoord.y + height * (Math.random() * 0.5 + 1);
            let coordX = dropCoord.x + width * (5 * Math.random() - 2);

            rainCanvasFramesContexts.forEach((ctx, index) =>{
                if(coordY + height < rainCanvasFrames[index].height){
                    ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.3})`;
                    ctx.lineWidth = width;
                    ctx.lineCap = 'round';

                    ctx.beginPath();
                    ctx.moveTo(coordX, coordY);
                    ctx.lineTo(coordX, coordY + height);
                    ctx.stroke();
                }

                coordY += rainCanvasFrames[index].height / rainCanvasFramesContexts.length;
                if(coordY > rainCanvasFrames[index].height) coordY = 0;
            });
            dropCoord.x += margin.x + margin.x * (Math.random() * 0.4 - 0.2);
        }
        dropCoord.y += margin.y + margin.y * (Math.random() * 0.4 - 0.2);
        dropCoord.x = 0;
    }
}

function startRain(deltaStamp) {
    deltaStamp = Math.min(deltaStamp, rainCanvasFrames.length / 60);
    
    let index = canvasToDisplayIndex;
    let indexDouble = rainCanvasFrames.length / 2 - 1 >= index ? rainCanvasFrames.length / 2 - 1 + index : index - (rainCanvasFrames.length / 2 - 1);
    
    if(animations.moment.lightstrom){
        if(lastCanvas) lastCanvas.style.display = 'none';
        rainCanvasFrames[Math.floor(index)].style.display = 'block';
        lastCanvas = rainCanvasFrames[Math.floor(index)];
        parameters.images.lastRainCanvas = lastCanvas;
    }
    if(animations.moment.doubleStorm){
        if(lastCanvasDouble) lastCanvasDouble.style.display = 'none';
        rainCanvasFrames[Math.floor(indexDouble)].style.display = 'block';
        lastCanvasDouble = rainCanvasFrames[Math.floor(indexDouble)];
        parameters.images.lastDoubleRainCanvas = lastCanvas;
    }
    const stormSpeed = animations.moment.fastStorm ? 2 * rainCanvasFrames.length / 60 : rainCanvasFrames.length / 60;
    if(index + stormSpeed * deltaStamp < rainCanvasFrames.length) index += stormSpeed * deltaStamp
    else index = stormSpeed * deltaStamp - rainCanvasFrames.length + index;
    canvasToDisplayIndex = index;
}

function lightning(collected){
    if(collected >= 6){
        setTimeout(() => {
            lightningDiv.style.animation = "none";
            void lightningDiv.offsetWidth;
            lightningDiv.style.animation = "lightning 1s linear";

            if(collected === 6) animations.moment.lightstrom = true;
            if(collected === 8) animations.moment.doubleStorm = true;
            if(collected === 10) animations.moment.fastStorm = true;
        }, Math.random() * 1000);
    }
}

export { startRain, drawRain, lightning };