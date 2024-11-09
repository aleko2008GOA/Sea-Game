let fps = 0;
let index = 0;

function useCharacterImages(imgArr, img, speed){
    fps ++;
    if(fps === 30){
        fps = 0;
        index = index === 0 ? 1 : 0;
    }

    const quarter = 
        speed.right - speed.left > 1e-9 && speed.up - speed.down > 1e-9 ? 1 
        : speed.right - speed.left > 1e-9 && speed.up - speed.down < -1e-9 ? 2
        : speed.right - speed.left < -1e-9 && speed.up - speed.down < -1e-9 ? 3
        : speed.right - speed.left < -1e-9 && speed.up - speed.down > 1e-9 ? 4
        : 0;

    let a;
    const horizontal = Math.abs(speed.right - speed.left);
    const vertical = Math.abs(speed.up - speed.down);

    if(quarter === 1) a = vertical !== 0 ? Math.atan(horizontal / vertical) * 180 / Math.PI : 90;
    else if(quarter === 2) horizontal !== 0 ? a = Math.atan(vertical / horizontal) * 180 / Math.PI + 90 : 180;
    else if(quarter === 3) horizontal !== 0 ? a = Math.atan(horizontal / vertical) * 180 / Math.PI + 180 : 270;
    else if(quarter === 4) vertical !== 0 ? a = Math.atan(vertical / horizontal) * 180 / Math.PI + 270 : 0;
    else {
        if(speed.up - speed.down > 1e-9) a = 0; 
        else if(speed.right - speed.left > 1e-9) a = 90;
        else if(speed.up - speed.down < -1e-9) a = 180;
        else if(speed.right - speed.left < -1e-9) a = 270;
        else return img;
    };

    return imgArr[index][a >= 11.5 ? Math.round((a - 11.25) / 22.5) % 16 : 0];
}

export default useCharacterImages;