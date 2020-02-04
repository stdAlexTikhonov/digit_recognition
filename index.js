const show = document.createElement('pre');

setInterval(() => {
    THE_WORLD.tick();
    show.innerText = THE_WORLD.print();
},100)



document.body.appendChild(show);