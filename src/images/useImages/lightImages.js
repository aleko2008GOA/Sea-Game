let fps = 0;
let index = 0;

function useLightImages(imgArr, deltaStemp){
    fps ++;
    if(fps >= 30 / deltaStemp){
        fps = 0;
        index = index === 0 ? 1 : 0;
    }
    return imgArr[index];
}

export default useLightImages;