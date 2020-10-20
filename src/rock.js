import { PLAYER, SCISSORS, EMPTY, ROCK } from "./constants";
import { Player } from "./player";

export class Rock {
    constructor(y,x) {
        this.x = x;
        this.y = y;
        this.killer = false;
        this.falling = false;
        this.char = ROCK;
    }

    check_way_down(world) {
        if (this.falling && world[this.y+1][this.x].char === PLAYER) { this.killer = true; Player.off = true; }
        else if (this.falling && world[this.y+1][this.x].char === SCISSORS) { this.killer = true; }
        this.falling = true;
        return  world[this.y+1][this.x].char === EMPTY;
    }

    move_possible(world) {
        return ['+', 'O', '*'].includes(world[this.y+1][this.x].char) && !['O', '*'].includes(world[this.y-1][this.x].char)
    }

    check_way_left(world) {
        this.falling = true;
        return world[this.y][this.x-1].char === EMPTY && world[this.y+1][this.x-1].char === EMPTY && !['O', '*'].includes(world[this.y-1][this.x-1].char);
    }

    check_way_right(world) {
        this.falling = true;
        return world[this.y][this.x+1].char === EMPTY && world[this.y+1][this.x+1].char === EMPTY && !['O', '*'].includes(world[this.y-1][this.x+1].char);
    }

    check_force_move_left(world) {
        return world[this.y][this.x-1].char === EMPTY && world[this.y][this.x+1].char === PLAYER;
    }

    check_force_move_right(world) {
        return world[this.y][this.x+1].char === EMPTY && world[this.y][this.x-1].char === PLAYER;
    }

    changeState(world, force) {
        if (world[this.y][this.x].char === PLAYER) { this.killer = true; Player.off = true; }
        if (this.check_way_down(world)) this.y += 1;
        else if (this.check_force_move_left(world) && force) {
            this.x -= 1
        }
        else if (this.check_force_move_right(world) && force) {
            this.x += 1
        }
        else if (this.move_possible(world)) {
            if (this.check_way_left(world)) this.x -= 1;
            else if (this.check_way_right(world)) this.x += 1;
            else this.falling = false;
        } else {
            this.falling = false;
        }

    }
}
