import { animations, parameters } from "../globalVariables/globalVariables.js";

animations.allFrameFunc = startFrames;

function startFrames(timestamp){
    if(!parameters.lastStamp) parameters.lastStamp = performance.now();
    let deltaStamp = (timestamp - parameters.lastStamp) / (1000 / 60);
    parameters.lastStamp = timestamp;

    if(animations.animationFrameId) animations.animationFrameFunc(deltaStamp);
    if(animations.sea.seaAnimationFrameId) animations.sea.seaFrameFunc(deltaStamp);

    if(animations.stunFrameId) animations.stunFunc(deltaStamp);
    if(animations.immutableFrameId) animations.immutableFunc(deltaStamp);

    animations.allFrameId = requestAnimationFrame(startFrames);
}

export default startFrames;