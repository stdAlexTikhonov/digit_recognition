//width: 460px
//height: 470px
import "./styles/styles.css"
import background_audio from './assets/audio/back.mp3';
import { World } from "./world";
import { Player } from "./player"; 
import { Star } from "./star";

import {
    WIDTH, HEIGHT, PREDATOR_QUANTITY,
    ROCKS_QUANTITY, STARS_QUANTITY,
    BREAKS_QUANTITY, STEPS
} from "./constants";

export const audio = new Audio(background_audio);

let frames = 0;
const show = document.createElement('pre');
window.prevStates = [];
show.style.margin = 0;
const main = document.createElement('div');
document.body.style.display = 'flex';
document.body.style.alignItems = 'center';
document.body.style.justifyContent = 'center';
document.body.style.background = 'black';
main.style.margin = 'auto';
main.style.fontFamily = 'Roboto';
main.style.position = 'relative';
main.id = 'main';
// main.appendChild(show);
document.body.appendChild(main);
window.pause = false;
window.myReq = null;
export let THE_WORLD;
const startGame = (ip, players_quantity) => {
    THE_WORLD = new World(HEIGHT, WIDTH, PREDATOR_QUANTITY, ROCKS_QUANTITY, STARS_QUANTITY, BREAKS_QUANTITY, ip, players_quantity);
    Player.off = false;
    Player.flag = true;
    Star.scores = 0;
    show.innerText = THE_WORLD.print();
    prevStates.push(THE_WORLD.print());
    main.style.display = 'none';
    window.pause = false;
    THE_WORLD.startTimer();
    draw();
}

let frame = 0;

export const draw = () => {
    
 
        // console.log(frame);
    if (!window.pause) {
        if (frames % STEPS === 0 && THE_WORLD.start) THE_WORLD.tick(); 
            
        // show.innerText = THE_WORLD.print();
        prevStates.push(THE_WORLD.print(frame))
        if (prevStates.length > 10) prevStates = prevStates.slice(1, prevStates.length)
        frame = frame < STEPS - 1 ? frame + 1 : 0;
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
            window.cancelAnimationFrame(window.myReq);
        }
    }
}

export const stopGame = () => {
    THE_WORLD.stopTimer(); 
    THE_WORLD.ws && THE_WORLD.ws.send(JSON.stringify({ method: "CLOSE", token: THE_WORLD.player.token}));
  
    window.cancelAnimationFrame(window.myReq);
    window.pause = true;
    start_screen.style.display = 'flex';

    scores.innerHTML = 'Your score: ' + Star.scores + '<br>' + 'Your time: ' + THE_WORLD.getTime();
    start_screen.appendChild(scores);
    if (THE_WORLD.container.parentNode) { 
        // document.body.removeChild(THE_WORLD.canvas);
        document.body.removeChild(THE_WORLD.container);
    }
    main.style.display = 'block';
}

const start_screen = document.createElement('div');
start_screen.style.display = 'flex';
start_screen.style.flexDirection = 'column';
start_screen.style.justifyContent = 'center';
start_screen.style.alignItems = 'center';




const start_btn = document.createElement('div');
start_btn.innerText = 'PRESS TO START';

start_btn.style.border = '1px solid lightgreen';
start_btn.style.fontSize = '25px';
start_btn.style.border = '1px solid lightgreen';
start_btn.style.fontFamily = 'Tahoma';
start_btn.style.fontWeight = 'bold';
start_btn.style.color = 'lightgreen';
start_btn.style.cursor = 'pointer';
start_btn.style.padding = '15px';
start_btn.style.margin = '5px';

const scores = document.createElement('div');
scores.style.color = 'white';
scores.style.fontFamily = 'Tahoma';
scores.style.fontSize = '15px';
scores.style.margin = 'auto';


start_screen.appendChild(start_btn);


main.appendChild(start_screen);

start_btn.onclick = () => {
    start_screen.style.display = 'none';
    startGame();
    audio.play();

}





