
document.onkeydown = e => {
    window.shiftPressed = e.shiftKey;
    
    switch (e.keyCode) {
        case 37:
            if (window.THE_WORLD.player.dir === "LEFT") window.THE_WORLD.player.force = true;
            else window.THE_WORLD.player.dir = "LEFT";
            break;
        case 38:
            if (window.THE_WORLD.player.dir === "UP") window.THE_WORLD.player.force = true;
            else window.THE_WORLD.player.dir = "UP";
            break;
        case 39:
            if (window.THE_WORLD.player.dir === "RIGHT") window.THE_WORLD.player.force = true;
            else window.THE_WORLD.player.dir = "RIGHT";
            break;
        case 40:
            if (window.THE_WORLD.player.dir === "DOWN") window.THE_WORLD.player.force = true;
            else window.THE_WORLD.player.dir = "DOWN";
            break;
    }
    
};

document.onkeyup = e => {
    window.shiftPressed = e.shiftKey;
    
    window.THE_WORLD.player.force = false;
}