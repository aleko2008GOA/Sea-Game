import { parameters, animations } from "../globalVariables/globalVariables.js";
import loading from "../story/loading.js";

const snow = document.getElementById('snow');
const snowCanvasFrames = [];
const snowCanvasFramesContexs = [];
const flakeCoord = { x: 0, y: 0 };

let canvasToDisplayIndex = 0;
let lastCanvas = null;

async function drawSnow(){
    for(let i = 1; i <= 432; i++){
        /** @type {HTMLCanvasElement} */
        const canvas = document.createElement('canvas');

        /** @type {CanvasRenderingContext2D} */
        const ctx = canvas.getContext('2d');

        canvas.width = parameters.standartSize.screen.width;
        canvas.height = parameters.standartSize.screen.height;

        snowCanvasFrames.push(canvas);
        snowCanvasFramesContexs.push(ctx);
        snow.appendChild(canvas);
    }

    const margin = parameters.standartSize.snowflake * 10;
    
    while(flakeCoord.y < snowCanvasFrames[0].height){
        while(flakeCoord.x < snowCanvasFrames[0].width){
            const radius = Math.round(parameters.standartSize.snowflake * (Math.random() * 2.7 + 0.3) / 2);
            let diffX = [0 - 2 * margin, 2 * margin][Math.floor(Math.random() * 2)];

            const startY = flakeCoord.y + radius * (Math.random() * 0.5 + 1);
            const startX = flakeCoord.x + radius * (Math.random() * 0.5 + 1);
            let coordY = startY;
            let coordX = startX;

            await new Promise(resolve =>{
                snowCanvasFramesContexs.forEach((ctx, index) =>{
                    if(coordY + radius < snowCanvasFrames[index].height){
                        ctx.fillStyle = `rgb(255, 255, 255)`;

                        ctx.beginPath();
                        ctx.arc(coordX, coordY, radius, 0, Math.PI * 2);
                        ctx.fill();
                    }

                    coordY += snowCanvasFrames[index].height / snowCanvasFramesContexs.length;
                    if(coordY > snowCanvasFrames[index].height) coordY = 0;

                    const N = snowCanvasFrames.length;
                    const factor = index < N / 2 ? (N - index) : (index - N);
                    const realDiffX = diffX * 2 * factor / N;

                    if(diffX > 0) coordX < startX + realDiffX ? coordX += radius * 0.1 : diffX = 0 - diffX;
                    else if(diffX < 0) coordX > startX + realDiffX ? coordX -= radius * 0.1 : diffX = 0 - diffX;
                });
                flakeCoord.x += margin + margin * (Math.random() * 0.2 - 0.4);
                
                setTimeout(resolve, 0);
            });
            await loading(++parameters.loaded);
        }
        flakeCoord.y += margin + margin * (Math.random() * 0.2 - 0.4);
        flakeCoord.x = 0;
    }
}

function startSnow(deltaStamp){
    deltaStamp = Math.min(deltaStamp, snowCanvasFrames.length / 60);
    
    let index = canvasToDisplayIndex;
    
    if(animations.moment.snow){
        if(lastCanvas) lastCanvas.style.display = 'none';
        snowCanvasFrames[Math.floor(index)].style.display = 'block';
        lastCanvas = snowCanvasFrames[Math.floor(index)];
        parameters.images.lastSnowCanvas = lastCanvas;
    }
    
    if(index + deltaStamp < snowCanvasFrames.length) index += deltaStamp
    else index = deltaStamp - snowCanvasFrames.length + index;
    canvasToDisplayIndex = index;
}

export { drawSnow, startSnow }