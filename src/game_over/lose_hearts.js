import game_lost from "./lose.js";
import { immutable } from "../story/starts_playing.js";

let health = {
    hearts: 3
}

function lose_hearts(){ // losing hearts
    health.hearts --;
    console.log(health.hearts + " you have lives")
    if(health.hearts == 0){
        immutable.immutable = true;
        setTimeout(() =>{
            game_lost('Your ship was broken, you die');
        }, 1000);
    }
}

export { lose_hearts, health };