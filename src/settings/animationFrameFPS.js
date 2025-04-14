import { animations, parameters } from "../globalVariables/globalVariables.js";
import { animateLights } from "../objects/lights.js";

let sumStamp = 0;

animations.allFrameFunc = startFrames;

function startFrames(timestamp){
    if(!parameters.lastStamp) parameters.lastStamp = performance.now();
    let deltaStamp = (timestamp - parameters.lastStamp) / (1000 / 60);
    parameters.lastStamp = timestamp;

    let index = parameters.FPS === 'auto' ? null : 60 / parameters.FPS;
    sumStamp += deltaStamp;
    
    if(index){
        while(sumStamp > index){
            sumStamp -= index;

            if(animations.animationFrameId) animations.animationFrameFunc(index);
            if(animations.sea.seaAnimationFrameId) animations.sea.seaFrameFunc(index);

            if(animations.stunFrameId) animations.stunFunc(index);
            if(animations.immutableFrameId) animations.immutableFunc(index);

            if(animations.lightframeId) animations.lightFrameFunc(index);
        }
    }else{
        if(animations.animationFrameId) animations.animationFrameFunc(deltaStamp);
        if(animations.sea.seaAnimationFrameId) animations.sea.seaFrameFunc(deltaStamp);

        if(animations.stunFrameId) animations.stunFunc(deltaStamp);
        if(animations.immutableFrameId) animations.immutableFunc(deltaStamp);

        if(animations.lightframeId) animations.lightFrameFunc(deltaStamp);
    }

    animations.allFrameId = requestAnimationFrame(startFrames);
}

export default startFrames;