import { parameters } from "../globalVariables/globalVariables.js";

function icebergs(){
    const icebergWidth = Math.round(parameters.standartSize.iceberg.width);
    const icebergHeight = Math.round(parameters.standartSize.iceberg.height);
    const canvasWidth = Math.round(parameters.standartSize.canvas.width);
    const canvasHeight = Math.round(parameters.standartSize.canvas.height);
    const chunkX = canvasWidth / 10;
    const chunkY = canvasHeight / 10;

    const icebrg_coordinate_arr = [];
    const iceberg_grid_position = [
        [[], [], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], [], []],
        [[], [], [], [], [], [], [], [], [], []]
    ];
    // canvas
    /** @type {HTMLCanvasElement} */
    const iceberg_canvas = document.getElementById('iceberg_map');

    /** @type {CanvasRenderingContext2D} */
    const icebergs_background = iceberg_canvas.getContext('2d');

    const wall = loadImage(`./src/assets/icebergs/wall.png`);
    const vertical_wall = loadImage(`./src/assets/icebergs/iceberg_wall_vertical.png`);
    const beach = loadImage(`./src/assets/icebergs/beach.png`);
    const arr_of_icbergs = [];

    for(let i = 0; i < 12; i++){
        arr_of_icbergs.push(loadImage(`./src/assets/icebergs/iceberg${i}.png`));
    }

    create_random_icebergs();

    // promice images generating
    Promise.all([wall, beach, vertical_wall, ...arr_of_icbergs])
        .then(([w_img, b_img, v_img, ...i_imgs]) =>{
            for(let i = 0; i < Math.ceil(canvasWidth / (w_img.width / (w_img.height / icebergHeight))); i++){
                icebergs_background.drawImage(w_img, i * (w_img.width / (w_img.height / icebergHeight)), canvasHeight - icebergHeight, w_img.width / (w_img.height / icebergHeight), icebergHeight);
            }

            for(let i = 0; i < Math.ceil(canvasWidth / (b_img.width / (b_img.height / icebergHeight))); i++){
                icebergs_background.drawImage(b_img, i * (b_img.width / (b_img.height / icebergHeight)), 0, b_img.width / (b_img.height / icebergHeight), icebergHeight);
            }

            for(let i = 0; i < Math.ceil(v_img.height / (v_img.width / icebergWidth)); i++){
                icebergs_background.drawImage(v_img, 0, i * (v_img.height / (v_img.width / icebergWidth)), icebergWidth, v_img.height / (v_img.width / icebergWidth));
            }

            for(let i = 0; i < Math.ceil(v_img.height / (v_img.width / icebergWidth)); i++){
                icebergs_background.drawImage(v_img, canvasWidth - icebergWidth, i * (v_img.height / (v_img.width / icebergWidth)), icebergWidth, v_img.height / (v_img.width / icebergWidth));
            }

            icebergs_background.strokeRect(0, 0, icebergWidth, canvasHeight);
            icebergs_background.strokeRect(0, 0, canvasWidth, icebergHeight);
            icebergs_background.strokeRect(canvasWidth - icebergWidth, 0, icebergWidth, canvasHeight);
            icebergs_background.strokeRect(0, canvasHeight - icebergHeight, canvasWidth, icebergHeight);

            create_random_iceberg_images(i_imgs);
        })
        .catch(err => console.error("Image-iceberg-wall error: " + err));
    
    // load images in promice
    function loadImage(src){
        return new Promise((resolve, reject) =>{
            const iceberg = new Image();
            iceberg.src = src;
            iceberg.onload = () => resolve(iceberg);
            iceberg.onerror = (e) => reject(e);
        });
    }

    // drawing images using promice
    function create_random_iceberg_images(i_imgs){
        icebrg_coordinate_arr.forEach(val =>{
            icebergs_background.drawImage(i_imgs[Math.floor(Math.random() * i_imgs.length)], val.x, val.y, val.width, val.height);
        });
    }

    // adding icebergs in random position on the canvas
    function create_random_icebergs(){
        icebergs_background.strokeStyle = 'black';
        icebergs_background.lineWidth = 2;
        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                icebergs_background.strokeRect(i * chunkX, j * chunkY, chunkX, chunkY);
            }
        }

        const arr = [];
        let num_of_double = 0;
        for(let i = 0; i < 50; i++){
            do{
                var x = (Math.floor(Math.random() * 8) + 1) * chunkX;
                var y = (Math.floor(Math.random() * 8) + 1) * chunkY;
            } while(arr.find(elem => elem.x == x && elem.y == y));

            if(Math.random() < 0.5 && num_of_double < 20 || 20 - num_of_double == 50 - i){
                num_of_double++;
                arr.push({x, y, x1: x, y1: y});
            }else arr.push({x, y});
        }
        
        arr.forEach(val =>{
            let x = val.x + Math.floor(Math.random() * 251);
            let y = val.y + Math.floor(Math.random() * 251);
            if(val.x1 && val.y1){
                do{
                    var x1 = val.x1 + Math.floor(Math.random() * 251);
                    var y1 = val.y1 + Math.floor(Math.random() * 251);
                }while((x1 < x + icebergWidth && x1 > x - icebergWidth) && (y1 < y + icebergHeight && y1 > y - icebergHeight));

                icebergs_background.strokeRect(x1, y1, icebergWidth, icebergHeight);

                icebrg_coordinate_arr.push({x: x1, y: y1, width: icebergWidth, height: icebergHeight});
                iceberg_grid_position[val.y1 / chunkY][val.x1 / chunkX].push({x: x1, y: y1, width: icebergWidth, height: icebergHeight});
            }
            icebergs_background.strokeRect(x, y, icebergWidth, icebergHeight);

            icebrg_coordinate_arr.push({x, y, width: icebergWidth, height: icebergHeight});
            iceberg_grid_position[val.y / chunkY][val.x / chunkX].push({x, y, width: icebergWidth, height: icebergHeight});
        });
    }
    
    return {icebrg_coordinate_arr, iceberg_grid_position};
}

export {icebergs};