import { animations, parameters } from "../globalVariables/globalVariables.js";
// canvases
/** @type {HTMLCanvasElement} */
const sea_canvas_waves_left = document.getElementById('waves_left');
const sea_canvas_waves_right = document.getElementById('waves_right');

/** @type {CanvasRenderingContext2D} */
const sea_waves_left = sea_canvas_waves_left.getContext('2d');
const sea_waves_right = sea_canvas_waves_right.getContext('2d');

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
            const wave_left_img = new Image();
            const wave_right_img = new Image();
            
            wave_left_img.src = src_left;
            wave_right_img.src = src_right;

            let loadedImages = 0;
            const images = [];

            function checkResolve() {
                if (loadedImages === 2) resolve(images);
            }
    
            wave_left_img.onload = () => {
                loadedImages++;
                images[0] = wave_left_img;
                checkResolve();
            };
    
            wave_right_img.onload = () => {
                loadedImages++;
                images[1] = wave_right_img;
                checkResolve();
            };

            wave_left_img.onerror = (e) => reject(e);
            wave_right_img.onerror = (e) => reject(e);
        });
    }

    // wave animation
    const waveWidth = parameters.standartSize.wave.fullWidth;
    const waveHeight = parameters.standartSize.wave.fullHeight;

    const imgWidth = parameters.standartSize.wave.imgWidth;
    const imgHeight = parameters.standartSize.wave.imgHeight;
    let waves = 0;

    let lastStamp = 0;
    let seconds = 0;

    // wave animation function
    function wave_animation(img_left, img_right){
        for (let i = 0; i < 201; i++) {
            for (let j = 0; j < 101; j++) {
                let x1 = i % 2 == waves ? waveWidth * (j - 1) + 5 : waveWidth * (j - 1) + 5 + waveWidth - imgWidth;
                let y1 = waveHeight * (i - 1) + imgHeight;

                if (j % 2 == waves) {
                    sea_waves_left.drawImage(img_left, x1, y1, imgWidth, imgHeight);
                } else {
                    sea_waves_left.drawImage(img_right, x1, y1 + imgHeight, imgWidth, imgHeight);
                }
            }
        }

        for (let i = 0; i < 201; i++) {
            for (let j = 0; j < 101; j++) {
                let x1 = i % 2 == waves ? waveWidth * (j - 1) + 5 : waveWidth * (j - 1) + 5 + waveWidth - imgWidth;
                let y1 = waveHeight * (i - 1) + imgHeight;

                if (j % 2 != waves) {
                    sea_waves_right.drawImage(img_left, x1, y1, imgWidth, imgHeight);
                } else {
                    sea_waves_right.drawImage(img_right, x1, y1 + imgHeight, imgWidth, imgHeight);
                }
            }
        }
    }

    function startAnimation(deltaStamp){
        if(animations.moment.gameProcess && !animations.moment.pause && animations.sea.waveSpeed > 200) seconds += deltaStamp;
        
        if(seconds >= 1){
            animations.sea.waveSpeed -= 2.5 * Math.floor(seconds);
            seconds -= Math.floor(seconds);
        }

        if(index < animations.sea.waveSpeed / 1000 * (60 / deltaStamp)) index++;
        else{
            index = 0;

            sea_canvas_waves_left.style.display = left_display;
            sea_canvas_waves_right.style.display = right_display;
    
            left_display = left_display == 'block' ? 'none' : 'block';
            right_display = right_display == 'block' ? 'none' : 'block';
        }
    }
}

export { background_sea };