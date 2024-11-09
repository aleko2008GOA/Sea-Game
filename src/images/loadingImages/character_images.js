function loadImage(src){
    return new Promise((resolve, reject) =>{
        const char = new Image();
        char.src = src;
        char.onload = () => resolve(char);
        char.onerror = (e) => reject(e);
    });
}

const characterImages = [];
const normalCharacterImagePromises = [];
for(let i = 1; i <= 16; i++) normalCharacterImagePromises.push(loadImage(`./src/assets/character/main position/${i}.png`));

const normalCharacterImages = Promise.all(normalCharacterImagePromises)
    .then(imgs => {
        imgs.forEach(img => characterImages.push(img));
        return characterImages;
    })
    .catch(err => console.log('Error: ' + err));

export default normalCharacterImages;