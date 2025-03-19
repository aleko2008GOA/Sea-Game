function loadImage(src){
    return new Promise((resolve, reject) =>{
        const iceberg = new Image();
        iceberg.src = src;
        iceberg.onload = () => resolve(iceberg);
        iceberg.onerror = (e) => reject(e);
    });
}

const promiseWalls = [];

const promiseIceberg = [loadImage('./src/assets/icebergs/iceberg/iceberg.png'), loadImage('./src/assets/icebergs/iceberg/icebergFront.png'), loadImage('./src/assets/icebergs/iceberg/icebergBack.png')];
for(let i = 0; i < 2; i++)
    promiseWalls.push(loadImage(`./src/assets/icebergs/walls/wall-${i === 0 ? 'left' : i === 1 ? 'right' : i === 2 ? 'bottom' : 'top'}.png`));

export { promiseIceberg, promiseWalls };