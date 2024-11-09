function icebergs(){
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

    const wall = loadImage(`./src/assets/icebergs/WALL.png`);
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
            for(let i = 0; i < Math.ceil(3000 / (w_img.width / (w_img.height / 70))); i++){
                icebergs_background.drawImage(w_img, i * (w_img.width / (w_img.height / 70)), 2940, w_img.width / (w_img.height / 70), 70);
            }

            for(let i = 0; i < Math.ceil(3000 / (b_img.width / (b_img.height / 30))); i++){
                icebergs_background.drawImage(b_img, i * (b_img.width / (b_img.height / 30)), 0, b_img.width / (b_img.height / 30), 30);
            }

            for(let i = 0; i < Math.ceil(v_img.height / (v_img.width / 130)); i++){
                icebergs_background.drawImage(v_img, -50, i * (v_img.height / (v_img.width / 130)), 130, v_img.height / (v_img.width / 130));
            }

            for(let i = 0; i < Math.ceil(v_img.height / (v_img.width / 130)); i++){
                icebergs_background.drawImage(v_img, 2930, i * (v_img.height / (v_img.width / 130)), 130, v_img.height / (v_img.width / 130));
            }

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
                icebergs_background.strokeRect(i * 300, j * 300, 300, 300)
            }
        }

        const arr = [];
        let num_of_double = 0;
        for(let i = 0; i < 50; i++){
            do{
                var x = (Math.floor(Math.random() * 8) + 1) * 300;
                var y = (Math.floor(Math.random() * 8) + 1) * 300;
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
                }while((x1 < x + 50 && x1 > x - 50) && (y1 < y + 50 && y1 > y - 50));

                icebergs_background.strokeRect(x1, y1, 50, 50);

                icebrg_coordinate_arr.push({x: x1, y: y1, width: 50, height: 50});
                iceberg_grid_position[val.y1 / 300][val.x1 / 300].push({x: x1, y: y1, width: 50, height: 50});
            }
            icebergs_background.strokeRect(x, y, 50, 50);

            icebrg_coordinate_arr.push({x, y, width: 50, height: 50});
            iceberg_grid_position[val.y / 300][val.x / 300].push({x, y, width: 50, height: 50});
        });
    }
    
    return {icebrg_coordinate_arr, iceberg_grid_position};
}

export {icebergs};