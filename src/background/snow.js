import { parameters, animations } from "../globalVariables/globalVariables.js";

const snow = document.getElementById('snow');
const snowCanvasFrames = [];
const snowCanvasFramesContexs = [];
const flakeCoord = { x: 0, y: 0 };

let canvasToDisplayIndex = 0;
let lastCanvas = null;

function drawSnow(){
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

            let coordY = flakeCoord.y + radius * (Math.random() * 0.5 + 1);
            let coordX = flakeCoord.x + radius * (Math.random() * 0.5 + 1);

            snowCanvasFramesContexs.forEach((ctx, index) =>{
                if(coordY + radius < snowCanvasFrames[index].height){
                    ctx.fillStyle = `rgb(255, 255, 255)`;

                    ctx.beginPath();
                    ctx.arc(coordX, coordY, radius, 0, Math.PI * 2);
                    ctx.fill();
                }

                coordY += snowCanvasFrames[index].height / snowCanvasFramesContexs.length;
                if(coordY > snowCanvasFrames[index].height) coordY = 0;
            });
            flakeCoord.x += margin + margin * (Math.random() * 2 - 1);
        }
        flakeCoord.y += margin + margin * (Math.random() * 2 - 1);
        flakeCoord.x = 0;
    }
    snowCanvasFrames[0].style.display = 'block'
}

export { drawSnow }