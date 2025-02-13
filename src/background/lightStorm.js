import { parameters, animations } from "../globalVariables/globalVariables.js";

/** @type {HTMLCanvasElement} */
const rainCanvas = document.getElementById('rainCanvas');
/** @type {HTMLCanvasElement} */
const helperCanvas = window.OffscreenCanvas ? new OffscreenCanvas(screen.width, screen.height) : document.getElementById('helperRainCanvas');

/** @type {CanvasRenderingContext2D} */
const ctx = rainCanvas.getContext('2d');
/** @type {CanvasRenderingContext2D} */
const helperCtx = helperCanvas.getContext('2d');

const drops = [];
const lightningDiv = document.getElementById('lightning');

function drawRain(){
    rainCanvas.width = parameters.standartSize.screen.width;
    rainCanvas.height = parameters.standartSize.screen.height;
    rainCanvas.style.width = parameters.standartSize.screen.width + 'px';
    rainCanvas.style.height = parameters.standartSize.screen.height + 'px';

    helperCanvas.width = parameters.standartSize.screen.width;
    helperCanvas.height = parameters.standartSize.screen.height;
    if (!(helperCanvas instanceof OffscreenCanvas)){
        helperCanvas.style.width = parameters.standartSize.screen.width + 'px';
        helperCanvas.style.height = parameters.standartSize.screen.height + 'px';
    }

    const dropCoord = { x: 0, y: 0 };
    const margin = { x: parameters.standartSize.drop.width * 10, y: parameters.standartSize.drop.height };

    while(dropCoord.y < rainCanvas.height - parameters.standartSize.drop.height){
        while(dropCoord.x < rainCanvas.width){
            const width = Math.round(parameters.standartSize.drop.width);
            const height = Math.round(parameters.standartSize.drop.height * Math.floor(1 + Math.random() * 4) / 3);

            const coordY = dropCoord.y + height * (Math.random() * 0.5 + 1);
            const coordX = dropCoord.x + width * (5 * Math.random() - 2);

            if(coordY + height < rainCanvas.height){
                const color = Math.random() * 0.3 + 0.3;
                drops.push({ x: coordX, y: coordY, width, height, color });

                ctx.strokeStyle = `rgba(255, 255, 255, ${color})`;
                ctx.lineWidth = width;
                ctx.lineCap = 'round';

                ctx.beginPath();
                ctx.moveTo(coordX, coordY);
                ctx.lineTo(coordX, coordY + height);
                ctx.stroke();
            }

            dropCoord.x += margin.x + margin.x * (Math.random() * 0.4 - 0.2);
        }
        dropCoord.y += margin.y + margin.y * (Math.random() * 0.4 - 0.2);
        dropCoord.x = 0;
    }
}

function startRain(deltaStamp) {
    if(animations.moment.lightstrom){
        helperCtx.clearRect(0, 0, helperCanvas.width, helperCanvas.height);

        for(let i = 0; i < drops.length; i++){ // It is faster thar forEach of for...of
            drops[i].y += deltaStamp * parameters.standartSize.drop.speed * (drops[i].height / parameters.standartSize.drop.height);
            
            if(drops[i].y > rainCanvas.height) drops[i].y -= helperCanvas.height;
            else if(drops[i].y + drops[i].height > rainCanvas.height){
                helperCtx.strokeStyle = `rgba(255, 255, 255, ${drops[i].color})`;
                helperCtx.lineWidth = drops[i].width;
                helperCtx.lineCap = 'round';

                helperCtx.beginPath();
                helperCtx.moveTo(drops[i].x, 0);
                helperCtx.lineTo(drops[i].x, drops[i].y + drops[i].height - helperCanvas.height);
                helperCtx.stroke();
            }

            helperCtx.strokeStyle = `rgba(255, 255, 255, ${drops[i].color})`;
            helperCtx.lineWidth = drops[i].width;
            helperCtx.lineCap = 'round';

            helperCtx.beginPath();
            helperCtx.moveTo(drops[i].x, drops[i].y);
            helperCtx.lineTo(drops[i].x, drops[i].y + drops[i].height);
            helperCtx.stroke();
        }

        if(animations.moment.doubleStorm){
            for(let i = 0; i < drops.length; i++){ // It is faster thar forEach of for...of
                let y = drops[i].y + rainCanvas.height / 2;

                if(y > rainCanvas.height) y -= helperCanvas.height;
                else if(y + drops[i].height > rainCanvas.height){
                    helperCtx.strokeStyle = `rgba(255, 255, 255, ${drops[i].color})`;
                    helperCtx.lineWidth = drops[i].width;
                    helperCtx.lineCap = 'round';
    
                    helperCtx.beginPath();
                    helperCtx.moveTo(drops[i].x, 0);
                    helperCtx.lineTo(drops[i].x, y + drops[i].height - helperCanvas.height);
                    helperCtx.stroke();
                }
    
                helperCtx.strokeStyle = `rgba(255, 255, 255, ${drops[i].color})`;
                helperCtx.lineWidth = drops[i].width;
                helperCtx.lineCap = 'round';
    
                helperCtx.beginPath();
                helperCtx.moveTo(drops[i].x, y);
                helperCtx.lineTo(drops[i].x, y + drops[i].height);
                helperCtx.stroke();
            }
        }

        ctx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
        ctx.drawImage(helperCanvas, 0, 0, helperCanvas.width, helperCanvas.height);
    }
}

function lightning(collected){
    if(collected >= 6){
        setTimeout(() => {
            lightningDiv.style.animation = "none";
            void lightningDiv.offsetWidth;
            lightningDiv.style.animation = "lightning 1s linear";

            if(collected === 6) {
                animations.moment.lightstrom = true;
                rainCanvas.style.display = 'block';
            }
            if(collected === 8) animations.moment.doubleStorm = true;
            if(collected === 10){
                animations.moment.fastStorm = true;
                parameters.delay = 0.02;
            }
            if(collected === 11) parameters.delay = 0.03;
            animations.sea.waveSpeed -= 130;
        }, Math.random() * 1000);
    }
}

export { startRain, drawRain, lightning };