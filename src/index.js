//width: 460px
//height: 470px
import "./styles/styles.css"

import { 
    World, 
    Player, 
    Star, 
    WIDTH, 
    HEIGHT, 
    PREDATOR_QUANTITY,
    ROCKS_QUANTITY,
    STARS_QUANTITY,
    BREAKS_QUANTITY,
    BLOCK_WIDTH,
    sprite,
    sprite2,
    sprite3
} from "./world"

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
window.THE_WORLD = null;
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
            THE_WORLD.tick();
            // show.innerText = THE_WORLD.print();
            prevStates.push(THE_WORLD.print())
            if (prevStates.length > 10) prevStates = prevStates.slice(1, prevStates.length)
        }
      }  
     
      if (!window.pause) window.myReq = window.requestAnimationFrame(draw);   
   
    frames++;
}

window.onkeydown = (e) => {
    console.log(e.keyCode);
    if (e.keyCode === 80) {
        if (window.pause) {
            window.pause = false;
            document.body.removeChild(edit_block);
            draw();
        } else  { 
            window.pause = true;
            document.body.appendChild(edit_block);
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
    if (THE_WORLD.canvas.parentNode) document.body.removeChild(THE_WORLD.canvas);
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

export const createDiv = (img, index) => {
    const div = document.createElement('div');
    div.style.width = BLOCK_WIDTH + 'px';
    div.style.height = BLOCK_WIDTH + 'px';
    div.style.backgroundImage = `url(${img})`;
    div.style.backgroundColor = 'black';
    div.style.backgroundPositionX = BLOCK_WIDTH * index + 'px';
    div.style.margin = '20px';
    div.style.cursor = 'pointer';
    return div
}


const edit_block = document.createElement('div');
edit_block.style.width = '10%';
edit_block.style.border = '1px solid black';
edit_block.style.height = HEIGHT * BLOCK_WIDTH + 'px';
edit_block.style.display = 'flex';
edit_block.style.flexDirection = 'column';
edit_block.style.alignItems = 'center';
for (let i = 0; i < 5; i++) {
    const div = createDiv(sprite2, i)
    edit_block.appendChild(div);
}

const empty = createDiv();
edit_block.appendChild(empty);






start_screen.appendChild(start_btn);
main.appendChild(start_screen);

start_btn.onclick = () => {
    start_screen.style.display = 'none';
    startGame();
}




