let frame = 9;

document.onkeydown = e => {
    window.shiftPressed = e.shiftKey;
    if (e.shiftKey) window.THE_WORLD.stopTimer(); 
    
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
        case 190:
            if (window.shiftPressed) {
                
                if (frame < 9) { 
                    frame++; 
                    document.getElementsByTagName('pre')[0].innerText = window.prevStates[frame]
                }
                else {
                    window.THE_WORLD.tick();
                    document.getElementsByTagName('pre')[0].innerText = window.THE_WORLD.print();
                    prevStates.push(THE_WORLD.print())
                    if (prevStates.length > 10) prevStates = prevStates.slice(1, prevStates.length)
                }
            }
            break;
        case 188:
            if (window.shiftPressed) {
                if (frame > 0) { frame--; console.log(frame); }
                document.getElementsByTagName('pre')[0].innerText = window.prevStates[frame];
            }
            break;
    }
    
};

document.onkeyup = e => {
    window.shiftPressed = e.shiftKey;
    if (e.shiftKey === false) frame = 9;
    window.THE_WORLD.player.force = false;
}