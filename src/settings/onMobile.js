import { parameters } from "../globalVariables/globalVariables.js";

/** @type {HTMLCanvasElement} */
const onMobile = document.getElementById('on_mobile');

/** @type {CanvasRenderingContext2D} */
const onMobileCanvas = onMobile.getContext('2d');

let animation = null;
let position = {x: 0, y: 0};

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

    if(deviceType.includes('Mobile') || deviceType.includes('Notebook')){
        onMobile.style.display = 'block';

        onMobileCanvas.fillStyle = "rgba(20, 20, 20, 0.3)";
        onMobileCanvas.beginPath();

        onMobileCanvas.arc(125, 125, 75, 0, 2 * Math.PI);
        onMobileCanvas.fill();

        onMobile.addEventListener('mousedown', e =>{
            position.x = e.clientX - onMobile.getBoundingClientRect().left - 125;
            position.y = e.clientY - onMobile.getBoundingClientRect().top - 125;
            animation = requestAnimationFrame(moveMobile);
        });
        onMobile.addEventListener('mousemove', e =>{
            position.x = e.clientX - onMobile.getBoundingClientRect().left - 125;
            position.y = e.clientY - onMobile.getBoundingClientRect().top - 125;
        });
        onMobile.addEventListener('mouseup', () =>{
            cancelAnimationFrame(animation);
            onMobileCanvas.fillStyle = "rgba(20, 20, 20, 0.3)";
            onMobileCanvas.beginPath();
            onMobileCanvas.clearRect(0, 0, onMobile.width, onMobile.height);
            onMobileCanvas.arc(125, 125, 75, 0, 2 * Math.PI);
            onMobileCanvas.fill();
        });
    } 
}

function moveMobile(e){
    let x = position.x;
    let y = position.y;
    let diagonal = Math.sqrt(x ** 2 + y ** 2);

    var alpha = (Math.atan2(y, x) * 180 / Math.PI) >= 0 ? (Math.atan2(y, x) * 180 / Math.PI) : Math.atan2(y, x) * 180 / Math.PI + 360;
    console.log(alpha)
    
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
    animation = requestAnimationFrame(() => moveMobile(e));
}

export default checkDevice;