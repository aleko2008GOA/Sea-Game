import { animations, parameters } from "../globalVariables/globalVariables.js";
import { lightning, startRain } from "./lightStorm.js";
import { startSnow } from "./snow.js";
// canvases
/** @type {HTMLCanvasElement} */
const seaCanvasWavesLeft = document.getElementById('waves_left');
const seaCanvasWavesRight = document.getElementById('waves_right');

/** @type {CanvasRenderingContext2D} */
const seaWavesLeft = seaCanvasWavesLeft.getContext('2d');
const seaWavesRight = seaCanvasWavesRight.getContext('2d');

let left_display = 'block';
let right_display = 'none';

let index = 0;

function background_sea(){
    loadImages('./src/assets/waves/wave-left.png', './src/assets/waves/wave-right.png')
        .then(([img_left, img_right]) =>{
            wave_animation(img_left, img_right);
            animations.sea.seaFrameFunc = startAnimation;
            animations.sea.seaAnimationFrameId = true;
        })
        .catch((err) => console.log('Waves generating error: ' + err));

    // images
    function loadImages(src_left, src_right){
        return new Promise((resolve, reject) =>{ 
            const waveLeftImg = new Image();
            const waveRightImg = new Image();
            
            waveLeftImg.src = src_left;
            waveRightImg.src = src_right;

            let loadedImages = 0;
            const images = [];

            function checkResolve() {
                if (loadedImages === 2) resolve(images);
            }
    
            waveLeftImg.onload = () => {
                loadedImages++;
                images[0] = waveLeftImg;
                checkResolve();
            };
    
            waveRightImg.onload = () => {
                loadedImages++;
                images[1] = waveRightImg;
                checkResolve();
            };

            waveLeftImg.onerror = (e) => reject(e);
            waveRightImg.onerror = (e) => reject(e);
        });
    }

    // wave animation
    const waveWidth = parameters.standartSize.wave.fullWidth;
    const waveHeight = parameters.standartSize.wave.fullHeight;

    const imgWidth = parameters.standartSize.wave.imgWidth;
    const imgHeight = parameters.standartSize.wave.imgHeight;
    let waves = 0;

    // wave animation function
    function wave_animation(img_left, img_right){
        for (let i = 0; i < 201; i++) {
            for (let j = 0; j < 101; j++) {
                let x1 = i % 2 == waves ? waveWidth * (j - 1) + 5 : waveWidth * (j - 1) + 5 + waveWidth - imgWidth;
                let y1 = waveHeight * (i - 1) + imgHeight;

                if (j % 2 == waves) {
                    seaWavesLeft.drawImage(img_left, x1, y1, imgWidth, imgHeight);
                } else {
                    seaWavesLeft.drawImage(img_right, x1, y1 + imgHeight, imgWidth, imgHeight);
                }
            }
        }

        for (let i = 0; i < 201; i++) {
            for (let j = 0; j < 101; j++) {
                let x1 = i % 2 == waves ? waveWidth * (j - 1) + 5 : waveWidth * (j - 1) + 5 + waveWidth - imgWidth;
                let y1 = waveHeight * (i - 1) + imgHeight;

                if (j % 2 != waves) {
                    seaWavesRight.drawImage(img_left, x1, y1, imgWidth, imgHeight);
                } else {
                    seaWavesRight.drawImage(img_right, x1, y1 + imgHeight, imgWidth, imgHeight);
                }
            }
        }
    }

    function startAnimation(deltaStamp){
        startRain(deltaStamp);
        startSnow(deltaStamp);

        if(index < animations.sea.waveSpeed / 1000 * (60 / deltaStamp)) index++;
        else{
            index = 0;

            seaCanvasWavesLeft.style.display = left_display;
            seaCanvasWavesRight.style.display = right_display;
    
            left_display = left_display == 'block' ? 'none' : 'block';
            right_display = right_display == 'block' ? 'none' : 'block';
        }
    }
}

export { background_sea };