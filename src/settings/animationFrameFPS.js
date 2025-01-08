import { animations, parameters } from "../globalVariables/globalVariables.js";

animations.allFrameFunc = startFrames;

function startFrames(timeStamp){
    if(animations.animationFrameId) animations.animationFrameFunc(timeStamp);
    if(animations.sea.seaAnimationFrameId) animations.sea.seaFrameFunc(timeStamp);

    if(animations.stunFrameId) animations.stunFunc(timeStamp);
    if(animations.immutableFrameId) animations.immutableFunc(timeStamp);

    animations.allFrameId = requestAnimationFrame(startFrames);
}

export default startFrames;