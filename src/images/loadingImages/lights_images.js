function loadImage(src){
    return new Promise((resolve, reject) =>{
        const char = new Image();
        char.src = src;
        char.onload = () => resolve(char);
        char.onerror = (e) => reject(e);
    });
}

const light_normal_image = loadImage('./src/assets/lights/light1.png');

export default light_normal_image;