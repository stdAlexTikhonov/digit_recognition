const show = document.createElement('pre');

const interval = setInterval(() => {
    THE_WORLD.tick();
    show.innerText = THE_WORLD.print();
},100);

document.body.appendChild(show);
