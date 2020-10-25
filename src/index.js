//width: 460px
//height: 470px
import "./styles/styles.css"

import { World } from "./world";
import { Player } from "./player"; 
import { Star } from "./star"; 


import {
    WIDTH, HEIGHT, PREDATOR_QUANTITY,
    ROCKS_QUANTITY, STARS_QUANTITY,
    BREAKS_QUANTITY,
} from "./constants";

let frames = 0;
const show = document.createElement('pre');
window.prevStates = [];
show.style.margin = 0;
const main = document.createElement('div');
document.body.style.display = 'flex';
document.body.style.alignItems = 'center';
document.body.style.justifyContent = 'center';
main.style.margin = 'auto';
main.style.fontFamily = 'Roboto';
main.style.position = 'relative';
main.style.width = '460px';
main.style.height = '470px';
main.id = 'main';
// main.appendChild(show);
document.body.appendChild(main);
window.pause = false;
window.myReq = null;
export let THE_WORLD;
const startGame = () => {
    THE_WORLD = new World(HEIGHT, WIDTH, PREDATOR_QUANTITY, ROCKS_QUANTITY, STARS_QUANTITY, BREAKS_QUANTITY);
    Player.off = false;
    Player.flag = true;
    Star.scores = 0;
    show.innerText = THE_WORLD.print();
    prevStates.push(THE_WORLD.print());
    main.style.display = 'none';
    window.pause = false;
 
    draw();
}

const draw = () => {
    
      if (frames % 5 === 0) {
        if (!window.pause) {
            if (frames % 25 === 0) THE_WORLD.tick();
            // show.innerText = THE_WORLD.print();
            prevStates.push(THE_WORLD.print(frames % 25))
            if (prevStates.length > 10) prevStates = prevStates.slice(1, prevStates.length)
        }
      }  
     
      if (!window.pause) window.myReq = window.requestAnimationFrame(draw);   
   
    frames++;
}

window.onkeydown = (e) => {
    if (e.keyCode === 80) {
        if (window.pause) {
            window.pause = false;
            document.body.removeChild(THE_WORLD.edit_block);
            draw();
        } else  { 
            window.pause = true;
            document.body.appendChild(THE_WORLD.edit_block);
        }

    }
}

export const stopGame = () => {
    THE_WORLD.stopTimer(); 
    window.cancelAnimationFrame(window.myReq);
    window.pause = true;
    start_screen.style.display = 'flex';

    scores.innerHTML = 'Your score: ' + Star.scores + '<br>' + 'Your time: ' + THE_WORLD.getTime();
    start_screen.appendChild(scores);
    if (THE_WORLD.viewport.parentNode) { 
        // document.body.removeChild(THE_WORLD.canvas);
        document.body.removeChild(THE_WORLD.viewport);
    }
    main.style.display = 'block';
}

const start_screen = document.createElement('div');
start_screen.style.display = 'flex';
start_screen.style.position = 'absolute';
start_screen.style.top = 0;
start_screen.style.left = 0;
start_screen.style.width = '460px';
start_screen.style.height = '470px';
start_screen.style.flexDirection = 'column';
start_screen.style.justifyContent = 'center';
start_screen.style.backgroundColor = 'rgba(255,255,255,0.7)';




const start_btn = document.createElement('div');
start_btn.innerText = 'PRESS TO START';

start_btn.style.border = '1px solid lightgreen';
start_btn.style.fontSize = '25px';
start_btn.style.border = '1px solid lightgreen';
start_btn.style.fontFamily = 'Tahoma';
start_btn.style.fontWeight = 'bold';
start_btn.style.color = 'lightgreen';
start_btn.style.margin = 'auto';
start_btn.style.cursor = 'pointer';
start_btn.style.padding = '15px';

const scores = document.createElement('div');
scores.style.fontFamily = 'Tahoma';
scores.style.fontSize = '15px';
scores.style.margin = 'auto';




start_screen.appendChild(start_btn);
main.appendChild(start_screen);

start_btn.onclick = () => {
    start_screen.style.display = 'none';
    startGame();
}




