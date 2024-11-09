function loadImage(src){
    return new Promise((resolve, reject) =>{
        const char = new Image();
        char.src = src;
        char.onload = () => resolve(char);
        char.onerror = (e) => reject(e);
    });
}

const normalCharacterImagePromises = [];
const movedCharacterImagePromises = [];

for(let i = 1; i <= 16; i++) normalCharacterImagePromises.push(loadImage(`./src/assets/character/boat normal/main position/${i}.png`));
for(let i = 1; i <= 16; i++) movedCharacterImagePromises.push(loadImage(`./src/assets/character/boat normal/second position/${i}.png`));

const normalCharacterImages = Promise.all(normalCharacterImagePromises)
    .then(imgs => imgs)
    .catch(err => console.log('Error: ' + err));

const movedCharacterImages = Promise.all(movedCharacterImagePromises)
    .then(imgs => imgs)
    .catch(err => console.log('Error: ' + err));

const characterImages = Promise.all([normalCharacterImages, movedCharacterImages]);

export default characterImages;