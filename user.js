document.onkeydown = e => {
    switch (e.keyCode) {
        case 37:
            THE_WORLD.player.dir = LEFT;
            break;
        case 38:
            THE_WORLD.player.dir = UP;
            break;
        case 39:
            THE_WORLD.player.dir = RIGHT;
            break;
        case 40:
            THE_WORLD.player.dir = DOWN;
            break;
    }
};