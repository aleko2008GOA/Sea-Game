import light_normal_image from "../images/loadingImages/lights_images.js";
import { parameters } from "../globalVariables/globalVariables.js";

// canvas
/** @type {HTMLCanvasElement} */
const lights_canvas = document.getElementById('lights');

/** @type {CanvasRenderingContext2D} */
const lights_background = lights_canvas.getContext('2d');

let light_image = light_normal_image;
let imagesLoaded = false;

function lights(icebrg_coordinate_arr){
    const lightWidth = Math.round(parameters.standartSize.light.width);
    const lightHeight = Math.round(parameters.standartSize.light.height);
    const canvasWidth = Math.round(parameters.standartSize.canvas.width);
    const canvasHeight = Math.round(parameters.standartSize.canvas.height);
    const chunkX = canvasWidth / 10;
    const chunkY = canvasHeight / 10;

    const lights_coordinate_arr = [];
    const lights_grid_position = [
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null]
    ];

    create_random_lights();

    // promice for generating images
    if(!imagesLoaded){
        light_image
            .then(l_img =>{
                light_image = l_img;
                imagesLoaded = true;
                create_random_lights_images();
            })
            .catch(err => console.error('Lights images generating Error: ' + err));
    }else create_random_lights_images();

    // creating lights in random position on canvas
    function create_random_lights(){
        const lights = [];

        for(let y = 0; y < 8; y++){
            for(let x = 0; x < 8; x++){
                let coord = {x: (x + 1) * chunkX, y: (y + 1) * chunkY};
                lights.push(coord);
            }
        }

        const set_of_lights = new Set(lights);

        for(let i = 0; i < 12; i++){
            const light_coord = Array.from(set_of_lights)[Math.floor(Math.random() * Array.from(set_of_lights).length)];
            
            do {
                var x = Math.floor(Math.random() * 251) + light_coord.x;
                var y = Math.floor(Math.random() * 251) + light_coord.y;
            }while(icebrg_coordinate_arr.find(val => {
                return (val.x < x + lightWidth && val.x > x - lightWidth) && (val.y < y + lightHeight && val.y > y - lightHeight);
            }));
            set_of_lights.delete(light_coord);

            lights_background.strokeRect(x, y, lightWidth, lightHeight);
            lights_coordinate_arr.push({x, y});
            lights_grid_position[Math.floor(y / chunkY)][Math.floor(x / chunkX)] = {x, y};
        }
    }

    // drawing images on canvas
    function create_random_lights_images(){
        lights_coordinate_arr.forEach(val =>{
            lights_background.drawImage(light_image, val.x, val.y, lightWidth, lightHeight);
        });
    }
    
    return {lights_coordinate_arr, lights_grid_position, lights_background};
}

export {lights};