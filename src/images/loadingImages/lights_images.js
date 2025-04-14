function loadImage(src){
    return new Promise((resolve, reject) =>{
        const char = new Image();
        char.src = src;
        char.onload = () => resolve(char);
        char.onerror = (e) => reject(e);
    });
}

async function loadLightImages(){
    const lightsImageArr = [
        await loadImage('./src/assets/lights/lanternMain.png'),
        await loadImage('./src/assets/lights/lanternSecond.png'),
    ];
    return lightsImageArr;
}

export default loadLightImages;