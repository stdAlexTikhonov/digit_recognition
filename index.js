//width: 460px
//height: 470px
const show = document.createElement('pre');
show.style.margin = 0;
const main = document.createElement('div');
document.body.style.display = 'flex';
main.style.margin = 'auto';
main.appendChild(show);
document.body.appendChild(main);

let interval = null;
const startGame = () => {
    interval = setInterval(() => {
        THE_WORLD.tick();
        show.innerText = THE_WORLD.print();
    },100);
}

const stopGame = () => {
    THE_WORLD.startTimer(); 
    clearInterval(interval);
}

startGame();



