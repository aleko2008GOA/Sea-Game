// canvases
/** @type {HTMLCanvasElement} */
const sea_canvas_waves_left = document.getElementById('waves_left');
const sea_canvas_waves_right = document.getElementById('waves_right');

/** @type {CanvasRenderingContext2D} */
const sea_waves_left = sea_canvas_waves_left.getContext('2d');
const sea_waves_right = sea_canvas_waves_right.getContext('2d');

let left_display = 'block';
let right_display = 'none';

const seaAnimations = { waveSpeed: 1000, interval: null };

function background_sea(){
    loadImages('./src/assets/waves/wave-left.png', './src/assets/waves/wave-right.png')
        .then(([img_left, img_right]) =>{
            wave_animation(img_left, img_right);
        })
        .catch((err) => console.log('Waves generating error: ' + err));

    // images
    function loadImages(src_left, src_right){
        return new Promise((resolve, reject) =>{ 
            const wave_left_img = new Image();
            wave_left_img.src = src_left;
            const wave_right_img = new Image();
            wave_right_img.src = src_right;

            wave_left_img.onload = () => {
                wave_right_img.onload = () => resolve([wave_left_img, wave_right_img]);
            }

            wave_left_img.onerror = (e) => reject(e);
            wave_right_img.onerror = (e) => reject(e);
        });
    }

    // wave animation
    const waveWidth = 30;
    const waveHeight = 15;
    let waves = 0;

    // wave animation function
    function wave_animation(img_left, img_right){
        for (let i = 0; i < 201; i++) {
            for (let j = 0; j < 101; j++) {
                let x1 = i % 2 == waves ? waveWidth * (j - 1) + 5 : waveWidth * (j - 1) + 15;
                let y1 = waveHeight * (i - 1) + 5;

                if (j % 2 == waves) {
                    sea_waves_left.drawImage(img_left, x1, y1, 20, 5);
                } else {
                    sea_waves_left.drawImage(img_right, x1, y1 + 5, 20, 5);
                }
            }
        }

        for (let i = 0; i < 201; i++) {
            for (let j = 0; j < 101; j++) {
                let x1 = i % 2 == waves ? waveWidth * (j - 1) + 5 : waveWidth * (j - 1) + 15;
                let y1 = waveHeight * (i - 1) + 5;

                if (j % 2 != waves) {
                    sea_waves_right.drawImage(img_left, x1, y1, 20, 5);
                } else {
                    sea_waves_right.drawImage(img_right, x1, y1 + 5, 20, 5);
                }
            }
        }
    }

    function startAnimation(){
        setTimeout(() =>{
            sea_canvas_waves_left.style.display = left_display;
            sea_canvas_waves_right.style.display = right_display;

            left_display = left_display == 'block' ? 'none' : 'block';
            right_display = right_display == 'block' ? 'none' : 'block';

            startAnimation();
        }, seaAnimations.waveSpeed);
    }
    startAnimation();
}

export { background_sea, seaAnimations };