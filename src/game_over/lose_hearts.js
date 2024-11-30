import game_lost from "./lose.js";
import { animations, parameters } from "../globalVariables/globalVariables.js";

function lose_hearts(){ // losing hearts
    parameters.hearts --;
    console.log(parameters.hearts + " you have lives")
    if(parameters.hearts == 0){
        parameters.immutable = true;
        animations.moment.loseWinPause = true;

        setTimeout(() =>{
            game_lost('Your ship was broken, you die');
        }, 1000);
    }
}

export { lose_hearts };