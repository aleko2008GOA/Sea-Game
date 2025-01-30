import { parameters, animations } from "../globalVariables/globalVariables.js";

const rain = document.getElementById('rain');
const rainCanvasFrames = [];
const rainCanvasFramesContexts = [];
const dropCoord = { x: 0, y: 0 };

let canvasToDisplayIndex = 0;
let lastCanvas = null;

function drawRain(){
    for(let i = 1; i <= 240; i++){
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
    
    while(dropCoord.y < rainCanvasFrames[0].height){
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
            dropCoord.x += margin.x + margin.x * (Math.random() * 2 - 1);
        }
        dropCoord.y += margin.y + margin.y * (Math.random() * 2 - 1);
        dropCoord.x = 0;
    }
    lastCanvas = rainCanvasFrames[0];
}

function startRain(deltaStamp) {
    lastCanvas.style.display = 'none';
    rainCanvasFrames[Math.floor(canvasToDisplayIndex)].style.display = 'block';

    lastCanvas = rainCanvasFrames[Math.floor(canvasToDisplayIndex)];
    canvasToDisplayIndex + 4 * deltaStamp < rainCanvasFrames.length ? 
        canvasToDisplayIndex += 4 * deltaStamp : 
        canvasToDisplayIndex = 4 * deltaStamp - rainCanvasFrames.length + canvasToDisplayIndex;
}

export { startRain, drawRain };
