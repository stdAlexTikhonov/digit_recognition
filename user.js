document.onkeydown = e => {

    switch (e.keyCode) {
        case 37:
            if (THE_WORLD.player.dir === LEFT) THE_WORLD.player.force = true;
            else THE_WORLD.player.dir = LEFT;
            break;
        case 38:
            if (THE_WORLD.player.dir === UP) THE_WORLD.player.force = true;
            else THE_WORLD.player.dir = UP;
            break;
        case 39:
            if (THE_WORLD.player.dir === RIGHT) THE_WORLD.player.force = true;
            else THE_WORLD.player.dir = RIGHT;
            break;
        case 40:
            if (THE_WORLD.player.dir === DOWN) THE_WORLD.player.force = true;
            else THE_WORLD.player.dir = DOWN;
            break;
    }
    
};

document.onkeyup = e => {
    THE_WORLD.player.force = false;
}
