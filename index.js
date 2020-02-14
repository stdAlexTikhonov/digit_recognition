//width: 460px
//height: 470px
const show = document.createElement('pre');
show.style.margin = 0;
const main = document.createElement('div');
document.body.style.display = 'flex';
main.style.margin = 'auto';
main.style.position = 'relative';
main.style.width = '460px';
main.style.height = '470px';
main.appendChild(show);
document.body.appendChild(main);

let THE_WORLD = null;
let interval = null;
const startGame = () => {
    THE_WORLD = new World(HEIGHT, WIDTH, PREDATOR_QUANTITY, ROCKS_QUANTITY, STARS_QUANTITY, BREAKS_QUANTITY);
    Player.off = false;
    Player.flag = true;
    Star.scores = 0;

    interval = setInterval(() => {
        THE_WORLD.tick();
        show.innerText = THE_WORLD.print();
    },100);
}

const stopGame = () => {
    THE_WORLD.stopTimer(); 
    clearInterval(interval);
    start_screen.style.display = 'flex';
}

const start_screen = document.createElement('div');
start_screen.style.display = 'flex';
start_screen.style.position = 'absolute';
start_screen.style.top = 0;
start_screen.style.left = 0;
start_screen.style.width = '460px';
start_screen.style.height = '470px';



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


start_screen.appendChild(start_btn);
main.appendChild(start_screen);

start_btn.onclick = () => {
    start_screen.style.display = 'none';
    startGame();
}




