import { parameters } from "../globalVariables/globalVariables.js";

/** @type {HTMLCanvasElement} */
const onMobile = document.getElementById('on_mobile');

/** @type {CanvasRenderingContext2D} */
const onMobileCanvas = onMobile.getContext('2d');

const settingBar = document.getElementById('settings_bar');
const joystickSetting = settingBar.querySelectorAll('.joystick');

let circleRadius;
let joisticRadius;
let deviceType;
let buttonVal = 'ON';
let joystickActive = false;

let startPointX;
let startPointY;

function drawJoystick(){
    circleRadius = parameters.standartSize.joystick.joisticCircleRadius;
    joisticRadius = parameters.standartSize.joystick.joisticRadius;
    deviceType = parameters.device;

    startPointX = parameters.standartSize.joystick.width / 2;
    startPointY = parameters.standartSize.joystick.height / 2;

    if(deviceType.includes('Mobile') || deviceType.includes('Tablet') || deviceType.includes('Ebook')){
        onMobile.style.display = 'block';
        buttonVal = 'OFF';
        joystickSetting.forEach(joystick => joystick.textContent = 'Joistick ' + buttonVal);
        parameters.joystick = true;
    }
    
    onMobileCanvas.fillStyle = "rgba(20, 20, 20, 0.3)";
    onMobileCanvas.beginPath();

    onMobileCanvas.arc(startPointX, startPointY, joisticRadius, 0, 2 * Math.PI);
    onMobileCanvas.fill();

    onMobile.addEventListener('mousedown', (e) => calculatePosition(e, true));
    onMobile.addEventListener('mousemove', calculatePosition);
    onMobile.addEventListener('mouseup', stopJoystick);
    onMobile.addEventListener('mouseleave', stopJoystick);

    onMobile.addEventListener('touchstart', (e) => calculatePosition(e, true));
    onMobile.addEventListener('touchmove', calculatePosition);
    onMobile.addEventListener("touchend", stopJoystick);

    joystickSetting.forEach(joystick =>{
        joystick.addEventListener('click', () =>{
            if(buttonVal === 'ON'){
                onMobile.style.display = 'block';
                parameters.joystick = true;
                buttonVal = 'OFF';
            }else{
                onMobile.style.display = 'none';
                parameters.joystick = false;
                buttonVal = 'ON';
            }
            joystick.textContent = 'Joystick ' + buttonVal;
        });
    });
}

function drawOnCanvas(diagonal, x, y){
    if(joystickActive){
        if(diagonal < 0.6 * circleRadius){
            onMobileCanvas.fillStyle = "rgba(20, 20, 20, 0.3)";
            onMobileCanvas.beginPath();
            onMobileCanvas.clearRect(0, 0, onMobile.width, onMobile.height);
            onMobileCanvas.arc(startPointX, startPointY, joisticRadius, 0, 2 * Math.PI);
            onMobileCanvas.fill();
        }else{
            onMobileCanvas.fillStyle = "rgba(20, 20, 20, 0.3)";
            onMobileCanvas.beginPath();
            onMobileCanvas.clearRect(0, 0, onMobile.width, onMobile.height);
            onMobileCanvas.arc(startPointX, startPointY, joisticRadius, 0, 2 * Math.PI);
            onMobileCanvas.fill();

            onMobileCanvas.beginPath();
            onMobileCanvas.fillStyle = "rgba(20, 20, 20, 0.7)";
            if(diagonal < joisticRadius){
                onMobileCanvas.arc(x + startPointX, y + startPointY, circleRadius, 0, 2 * Math.PI);
            }else{
                let k = joisticRadius / diagonal;
                onMobileCanvas.arc(k * x + startPointX, k * y + startPointY, circleRadius, 0, 2 * Math.PI);
            }
            onMobileCanvas.fill();
        }
    }
}

function stopJoystick(){
    Object.keys(parameters.charMaxSpeed60FPSMobile).forEach(key => parameters.charMaxSpeed60FPSMobile[key] = 0);
    onMobileCanvas.fillStyle = "rgba(20, 20, 20, 0.3)";
    onMobileCanvas.beginPath();
    onMobileCanvas.clearRect(0, 0, onMobile.width, onMobile.height);
    onMobileCanvas.arc(startPointX, startPointY, joisticRadius, 0, 2 * Math.PI);
    onMobileCanvas.fill();

    parameters.positionMobile.x = 0;
    parameters.positionMobile.y = 0;
    joystickActive = false;
}

function calculatePosition(e, startedActive = false){
    if(startedActive) joystickActive = true;
    if(joystickActive){
        if(deviceType.includes('Mobile') || deviceType.includes('Tablet') || deviceType.includes('Ebook')){
            if(
                e.touches[0].clientX > onMobile.getBoundingClientRect().left + onMobile.getBoundingClientRect().width ||
                e.touches[0].clientX < onMobile.getBoundingClientRect().left ||
                e.touches[0].clientY > onMobile.getBoundingClientRect().top + onMobile.getBoundingClientRect().height ||
                e.touches[0].clientY < onMobile.getBoundingClientRect().top
            ) stopJoystick();

            parameters.positionMobile.x = e.touches[0].clientX - onMobile.getBoundingClientRect().left - startPointX;
            parameters.positionMobile.y = e.touches[0].clientY - onMobile.getBoundingClientRect().top - startPointY;
        }else{
            parameters.positionMobile.x = e.clientX - onMobile.getBoundingClientRect().left - startPointX;
            parameters.positionMobile.y = e.clientY - onMobile.getBoundingClientRect().top - startPointY;
        }
    }
}

export { drawJoystick, drawOnCanvas };