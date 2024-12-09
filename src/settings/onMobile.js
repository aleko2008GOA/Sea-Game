import { parameters } from "../globalVariables/globalVariables.js";

/** @type {HTMLCanvasElement} */
const onMobile = document.getElementById('on_mobile');

/** @type {CanvasRenderingContext2D} */
const onMobileCanvas = onMobile.getContext('2d');

function checkDevice(){
    const userAgent = navigator.userAgent.toLowerCase();
    let sensore = navigator.maxTouchPoints;
    let deviceType = null;
    if(userAgent.includes('macintosh') || userAgent.includes('mac os x') || userAgent.includes('linux') || userAgent.includes('windows nt')){
        deviceType = sensore > 0 ? 'Notebook' : 'PC/Notebook';
    }else if(userAgent.includes('iphone') || userAgent.includes('ipod') || userAgent.includes('windows phone')){
        deviceType = 'Mobile';
    }else if(userAgent.includes('ipad')){
        deviceType = 'Tablet';
    }else if(userAgent.includes('android')){
        deviceType = 'Mobile/Tablet';
    }else if(userAgent.includes('kindle') || userAgent.includes('kobo') || userAgent.includes('ebook')){
        deviceType = 'Ebook';
    }else deviceType = 'Unknown';

    parameters.device = deviceType;

    if(deviceType.includes('Mobile') || deviceType.includes('Tablet') || deviceType.includes('Ebook') || deviceType.includes('Notebook')){
        onMobile.style.display = 'block';

        onMobileCanvas.fillStyle = "rgba(20, 20, 20, 0.3)";
        onMobileCanvas.beginPath();

        onMobileCanvas.arc(125, 125, 75, 0, 2 * Math.PI);
        onMobileCanvas.fill();

        onMobile.addEventListener('mousedown', e =>{
            parameters.positionMobile.x = e.clientX - onMobile.getBoundingClientRect().left - 125;
            parameters.positionMobile.y = e.clientY - onMobile.getBoundingClientRect().top - 125;
        });
        onMobile.addEventListener('mousemove', e =>{
            parameters.positionMobile.x = e.clientX - onMobile.getBoundingClientRect().left - 125;
            parameters.positionMobile.y = e.clientY - onMobile.getBoundingClientRect().top - 125;
        });
        onMobile.addEventListener('mouseup', () =>{
            Object.keys(parameters.charMaxSpeed60FPSMobile).forEach(key => parameters.charMaxSpeed60FPSMobile[key] = 0);
            onMobileCanvas.fillStyle = "rgba(20, 20, 20, 0.3)";
            onMobileCanvas.beginPath();
            onMobileCanvas.clearRect(0, 0, onMobile.width, onMobile.height);
            onMobileCanvas.arc(125, 125, 75, 0, 2 * Math.PI);
            onMobileCanvas.fill();
        });
    } 
}

function moveMobile(speed, character_position, isStunned, maxSpeed, deltaSpeed){
    let moved = false;
    let x = parameters.positionMobile.x;
    let y = parameters.positionMobile.y;
    let diagonal = Math.sqrt(x ** 2 + y ** 2);

    if(Math.abs(x) >= Math.abs(y)){
        parameters.charMaxSpeed60FPSMobile.right = x > 0 && diagonal >= 30 ? maxSpeed : 0;
        parameters.charMaxSpeed60FPSMobile.left = x < 0 && diagonal >= 30 ? maxSpeed : 0;

        parameters.charMaxSpeed60FPSMobile.down = y > 0 && diagonal >= 30 ? maxSpeed * Math.abs(y / x) : 0;
        parameters.charMaxSpeed60FPSMobile.up = y < 0 && diagonal >= 30 ? maxSpeed * Math.abs(y / x) : 0;
    }else{
        parameters.charMaxSpeed60FPSMobile.right = x > 0 && diagonal >= 30 ? maxSpeed * Math.abs(x / y) : 0;
        parameters.charMaxSpeed60FPSMobile.left = x < 0 && diagonal >= 30 ? maxSpeed * Math.abs(x / y) : 0;

        parameters.charMaxSpeed60FPSMobile.down = y > 0 && diagonal >= 30 ? maxSpeed : 0;
        parameters.charMaxSpeed60FPSMobile.up = y < 0 && diagonal >= 30 ? maxSpeed : 0;
    }

    if(!isStunned && diagonal >= 30 && !parameters.immutable){
        // left
        if(speed.left < parameters.charMaxSpeed60FPSMobile.left) speed.left += deltaSpeed;
        else speed.left = parameters.charMaxSpeed60FPSMobile.left;
        character_position.x -= speed.left;

        // right
        if(speed.right < parameters.charMaxSpeed60FPSMobile.right) speed.right += deltaSpeed;
        else speed.right = parameters.charMaxSpeed60FPSMobile.right;
        character_position.x += speed.right;

        // up
        if(speed.up < parameters.charMaxSpeed60FPSMobile.up) speed.up += deltaSpeed;
        else speed.up = parameters.charMaxSpeed60FPSMobile.up;
        character_position.y -= speed.up;

        // down 
        if(speed.down < parameters.charMaxSpeed60FPSMobile.down) speed.down += deltaSpeed;
        else speed.down = parameters.charMaxSpeed60FPSMobile.down;
        character_position.y += speed.down;

        moved = true;
    }else{
        if(speed.left > 0) {
            speed.left = speed.left - deltaSpeed >= 0 ? speed.left - deltaSpeed : 0;
            character_position.x -= speed.left;
            moved = true;
        }else if(speed.left < 0) speed.left = 0;
        
        if(speed.right > 0) {
            speed.right = speed.right - deltaSpeed >= 0 ? speed.right - deltaSpeed : 0;
            character_position.x += speed.right;
            moved = true;
        }else if(speed.right < 0) speed.right = 0;
        
        if(speed.up > 0) {
            speed.up = speed.up - deltaSpeed >= 0 ? speed.up - deltaSpeed : 0;
            character_position.y -= speed.up;
            moved = true;
        }else if(speed.up < 0) speed.up = 0;
        
        if(speed.down > 0) {
            speed.down = speed.down - deltaSpeed >= 0 ? speed.down - deltaSpeed : 0;
            character_position.y += speed.down;
            moved = true;
        }else if(speed.down < 0) speed.down = 0;
    }

    drawOnCanvas(diagonal, x, y);

    return moved;
}

function drawOnCanvas(diagonal, x, y){
    if(diagonal < 30){
        onMobileCanvas.fillStyle = "rgba(20, 20, 20, 0.3)";
        onMobileCanvas.beginPath();
        onMobileCanvas.clearRect(0, 0, onMobile.width, onMobile.height);
        onMobileCanvas.arc(125, 125, 75, 0, 2 * Math.PI);
        onMobileCanvas.fill();
    }else{
        onMobileCanvas.fillStyle = "rgba(20, 20, 20, 0.3)";
        onMobileCanvas.beginPath();
        onMobileCanvas.clearRect(0, 0, onMobile.width, onMobile.height);
        onMobileCanvas.arc(125, 125, 75, 0, 2 * Math.PI);
        onMobileCanvas.fill();

        onMobileCanvas.beginPath();
        onMobileCanvas.fillStyle = "rgba(20, 20, 20, 0.7)";
        if(diagonal < 75){
            onMobileCanvas.arc(x + 125, y + 125, 50, 0, 2 * Math.PI);
        }else{
            let k = 75 / diagonal;
            onMobileCanvas.arc(k * x + 125, k * y + 125, 50, 0, 2 * Math.PI);
        }
        onMobileCanvas.fill();
    }
}

export { checkDevice, moveMobile };