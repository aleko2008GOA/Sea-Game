function loadImage(src){
    return new Promise((resolve, reject) =>{
        const char = new Image();
        char.src = src;
        char.onload = () => resolve(char);
        char.onerror = (e) => reject(e);
    });
}

async function loadCharacters(){
    const fullCharacterImagesPromises = [];
    const boatState = ["boat normal", "boat halfBroken", "boat broken"];

    for(let i = 0; i <= 3; i++){
        fullCharacterImagesPromises.push([]);

        for(let j = 0; j < 3; j++){
            fullCharacterImagesPromises[i].push([[], []]);

            for(let k = 1; k <= 16; k++){
                fullCharacterImagesPromises[i][j][0].push(await loadImage(`./src/assets/character/${"shine " + i}/${boatState[j]}/main position/${k}.png`));
                fullCharacterImagesPromises[i][j][1].push(await loadImage(`./src/assets/character/${"shine " + i}/${boatState[j]}/second position/${k}.png`));
            }
        }
    }

    async function promiseImages(arr){
        if(Array.isArray(arr[0]))
            return Promise.all(arr.map(promiseImages));
        return await Promise.all(arr);
    }
    const fullCharacterImages = await promiseImages(fullCharacterImagesPromises);

    return fullCharacterImages;
}

export default loadCharacters;