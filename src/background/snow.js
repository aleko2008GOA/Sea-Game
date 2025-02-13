import { parameters, animations } from "../globalVariables/globalVariables.js";

/** @type {HTMLCanvasElement} */
const snowCanvas = document.getElementById('snowCanvas');
/** @type {HTMLCanvasElement} */
const helperCanvas = window.OffscreenCanvas ? new OffscreenCanvas(screen.width, screen.height) : document.getElementById('helperRainCanvas');

/** @type {CanvasRenderingContext2D} */
const ctx = snowCanvas.getContext('2d');
/** @type {CanvasRenderingContext2D} */
const helperCtx = helperCanvas.getContext('2d');

const flakes = [];

function drawSnow(){
    snowCanvas.width = parameters.standartSize.screen.width;
    snowCanvas.height = parameters.standartSize.screen.height;
    snowCanvas.style.width = parameters.standartSize.screen.width + 'px';
    snowCanvas.style.height = parameters.standartSize.screen.height + 'px';

    helperCanvas.width = parameters.standartSize.screen.width;
    helperCanvas.height = parameters.standartSize.screen.height;
    if (!(helperCanvas instanceof OffscreenCanvas)){
        helperCanvas.style.width = parameters.standartSize.screen.width + 'px';
        helperCanvas.style.height = parameters.standartSize.screen.height + 'px';
    }

    const flakeCoord = { x: 0, y: 0 };
    const margin = parameters.standartSize.snowflake.radius * 10;
    
    while(flakeCoord.y < snowCanvas.height){
        while(flakeCoord.x < snowCanvas.width){
            const color = Math.random() * 0.3 + 0.7;
            const radius = Math.round(parameters.standartSize.snowflake.radius * (Math.random() * 2.7 + 0.3) / 2);

            const startY = flakeCoord.y + radius * (Math.random() * 0.5 + 1);
            const startX = flakeCoord.x + radius * (Math.random() * 0.5 + 1);
            const coordY = startY;
            const coordX = startX;

            if(coordY + radius < snowCanvas.height){
                flakes.push({ x: coordX, y: coordY, radius, startX, dir: Math.random() < 0.5 ? 'left' : 'right', color });

                ctx.fillStyle = `rgba(255, 255, 255, ${color})`;

                ctx.beginPath();
                ctx.arc(coordX, coordY, radius, 0, Math.PI * 2);
                ctx.fill();
            }

            flakeCoord.x += margin + margin * (Math.random() * 0.2 - 0.4);
        }
        flakeCoord.y += margin + margin * (Math.random() * 0.2 - 0.4);
        flakeCoord.x = 0;
    }
}

function startSnow(deltaStamp){
    helperCtx.clearRect(0, 0, helperCanvas.width, helperCanvas.height);

    if(animations.moment.snow){
        for(let i = 0; i < flakes.length; i++){ // It is faster thar forEach of for...of
            const diff = deltaStamp * parameters.standartSize.snowflake.speed * (flakes[i].radius / parameters.standartSize.snowflake.radius);

            if(Math.abs(flakes[i].startX - flakes[i].x) > parameters.standartSize.snowflake.radius * 10){
                flakes[i].dir = flakes[i].dir === 'right' ? 'left' : 'right';
                flakes[i].startX = flakes[i].x + Math.random() * 6 * flakes[i].radius - 3 * flakes[i].radius;
            }

            flakes[i].dir === 'right' ? flakes[i].x += diff / 5 : flakes[i].x -= diff / 5; 
            flakes[i].y += diff;

            if(flakes[i].y > snowCanvas.height) flakes[i].y -= snowCanvas.height;
            helperCtx.fillStyle = `rgba(255, 255, 255, ${flakes[i].color})`;

            helperCtx.beginPath();
            helperCtx.arc(flakes[i].x, flakes[i].y, flakes[i].radius, 0, Math.PI * 2);
            helperCtx.fill();
        }

        ctx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
        ctx.drawImage(helperCanvas, 0, 0, helperCanvas.width, helperCanvas.height);
    }
}

export { drawSnow, startSnow }