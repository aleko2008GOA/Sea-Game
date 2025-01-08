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

const normalCharacterImagePromisesHalfBoat = [];
const movedCharacterImagePromisesHalfBoat = [];

const normalCharacterImagePromisesBrokenBoat = [];
const movedCharacterImagePromisesBrokenBoat = [];

for(let i = 1; i <= 16; i++){
    normalCharacterImagePromises.push(loadImage(`./src/assets/character/boat normal/main position/${i}.png`));
    movedCharacterImagePromises.push(loadImage(`./src/assets/character/boat normal/second position/${i}.png`));

    normalCharacterImagePromisesHalfBoat.push(loadImage(`./src/assets/character/boat halfBroken/main position/${i}.png`));
    movedCharacterImagePromisesHalfBoat.push(loadImage(`./src/assets/character/boat halfBroken/second position/${i}.png`));

    normalCharacterImagePromisesBrokenBoat.push(loadImage(`./src/assets/character/boat broken/main position/${i}.png`));
    movedCharacterImagePromisesBrokenBoat.push(loadImage(`./src/assets/character/boat broken/second position/${i}.png`));
}

const characterImages = Promise.all([
    Promise.all([
        Promise.all(normalCharacterImagePromises).then(imgs => imgs).catch(err => console.log('Error: ' + err)),
        Promise.all(movedCharacterImagePromises).then(imgs => imgs).catch(err => console.log('Error: ' + err))
    ]),
    Promise.all([
        Promise.all(normalCharacterImagePromisesHalfBoat).then(imgs => imgs).catch(err => console.log('Error: ' + err)),
        Promise.all(movedCharacterImagePromisesHalfBoat).then(imgs => imgs).catch(err => console.log('Error: ' + err))
    ]),
    Promise.all([
        Promise.all(normalCharacterImagePromisesBrokenBoat).then(imgs => imgs).catch(err => console.log('Error: ' + err)),
        Promise.all(movedCharacterImagePromisesBrokenBoat).then(imgs => imgs).catch(err => console.log('Error: ' + err))
    ])
]);

export default characterImages;