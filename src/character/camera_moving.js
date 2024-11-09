const container = document.getElementById('game_main_container');
const timer = document.getElementById('timer');
let left = 0;
let top = 0;

// on character moving move camera
function camera_moving(character_position, speed){
    const characterX = character_position.x - container.scrollLeft; // get x scroll
    const characterY = character_position.y - container.scrollTop; // get y scroll
    
    // check if he needs to scroll horizontaly
    if(characterX <= 200 && speed.right - speed.left < 0) scrollLeft();
    else if(characterX >= 450 && speed.right - speed.left > 0) scrollLeft();
    // check if he needs to scroll verticaly
    if(characterY <= 150 && speed.down - speed.up < 0) scrollTop();
    else if(characterY >= 300 && speed.down - speed.up > 0) scrollTop();

    function scrollLeft(){ // funct to scroll horizontaly
        left += (speed.right - speed.left);
        if(left >= 1 || left <= -1){
            container.scrollTo({
                left: container.scrollLeft + Math.floor(left),
            });
            left -= Math.floor(left);
        }
    }

    function scrollTop(){ // funct to scroll verticaly
        top += (speed.down - speed.up);
        if(top >= 1 || top <= -1){
            container.scrollTo({
                top: container.scrollTop + Math.floor(top),
            });
            top -= Math.floor(top);
            timer.style.top = container.scrollTop;
        }
    }
}

export default camera_moving;