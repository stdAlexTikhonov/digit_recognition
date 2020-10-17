import { PLAYER, SCISSORS, EMPTY, STARS_QUANTITY } from "./constants";
import { Player } from "./player";

export class Star {
    constructor(y,x) {
        this.x = x;
        this.y = y;
        this.still_here = true;
        this.falling = false;
        this.killer = false;
    }

    check_way_down(world) {
        if (this.falling && world[this.y+1][this.x] === PLAYER) { 
            this.killer = true;
            Player.off = true; 
            
        }
        else if (this.falling && world[this.y+1][this.x].char === SCISSORS) { this.killer = true; }
        this.falling = true;
        return  world[this.y+1] && world[this.y+1][this.x] === EMPTY;
    }

    move_possible(world) {
        return world[this.y+1] && ['+', 'O', '*'].includes(world[this.y+1][this.x]) && !['O', '*'].includes(world[this.y-1][this.x])
    }

    check_way_left(world) {
        this.falling = true;
        return world[this.y][this.x-1] === EMPTY && world[this.y+1][this.x-1] === EMPTY && !['O', '*'].includes(world[this.y-1][this.x-1]);
    }

    check_way_right(world) {
        this.falling = true;
        return world[this.y][this.x+1] === EMPTY && world[this.y+1][this.x+1] === EMPTY && !['O', '*'].includes(world[this.y-1][this.x+1]);
    }

    changeState(world) {
        if (world[this.y][this.x] === PLAYER) { if (this.still_here) { 
            Star.scores += 1; 
            this.still_here = false;
            if (Star.scores === STARS_QUANTITY) Player.off = true
         } }
        else if (this.check_way_down(world)) this.y += 1;
        else if (this.move_possible(world)) {
            if (this.check_way_left(world)) this.x -= 1;
            else if (this.check_way_right(world)) this.x += 1;
            else this.falling = false;
        }
        else this.falling = false;

    }
}

Star.scores = 0;