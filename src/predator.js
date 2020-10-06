import { 
    EMPTY, PLAYER, UP, DOWN,
    RIGHT, LEFT, NO_WAY,
    SCISSORS, ROCK
} from "./constants";
import sprite3 from "./assets/merphy/sprite3.png";
import { Player } from "./player";

export class Predator {

    constructor(y,x) {
        this.state = 0;
        this.x = x;
        this.y = y;
        this.dir_down = true;
        this.dir_left = false;
        this.dir_up = false;
        this.dir_right = false;
        this.dir = DOWN;
        this.flag = false;
        this.still_alive = true;
        this.img = new Image();
        this.img.src = sprite3;
        this.char = SCISSORS;
    }


    looking_around(world) {
        this.dir_left = world[this.y][this.x-1] === EMPTY && !"*O".includes(world[this.y-1][this.x-1]);
        this.dir_up = world[this.y-1][this.x] === EMPTY;
        this.dir_right = world[this.y][this.x+1] === EMPTY && !"*O".includes(world[this.y-1][this.x+1]);
        this.dir_down = world[this.y+1][this.x] === EMPTY;
    }

    find_player(world) {
        let FOUND_PLAYER = false;

        const up = world[this.y-1][this.x] === PLAYER;
        const down = world[this.y+1][this.x] === PLAYER;
        const left = world[this.y][this.x-1] === PLAYER;
        const right = world[this.y][this.x+1] === PLAYER;
        switch (this.dir) {
            case UP:
                FOUND_PLAYER = up;
                break;
            case DOWN:
                FOUND_PLAYER = down;
                break;
            case LEFT:
                FOUND_PLAYER = left;
                break;
            case RIGHT:
                FOUND_PLAYER = right;
                break;
            case NO_WAY:
                FOUND_PLAYER = up || down || left || right;
                break;
        }

        return FOUND_PLAYER;
    }

    find_rock(world) {
        return world[this.y-1][this.x] === ROCK;
    }


    check_dir() {
        switch (this.dir) {
            case DOWN:
                if (!this.dir_down) this.dir = NO_WAY;
                if (this.dir_left) this.dir = LEFT;
                else if (this.dir_down) this.dir = DOWN;
                else if (this.dir_right) this.dir = RIGHT;
                else this.dir = UP;
                break;
            case RIGHT:
                if (!this.dir_right) this.dir = NO_WAY;
                if (this.dir_down) this.dir = DOWN;
                else if (this.dir_right) this.dir = RIGHT;
                else if (this.dir_up) this.dir = UP;
                else this.dir = LEFT;
                break;
            case UP:
                if (!this.dir_up) this.dir = NO_WAY;
                if (this.dir_right) this.dir = RIGHT;
                else if (this.dir_up) this.dir = UP;
                else if (this.dir_left) this.dir = LEFT;
                else this.dir = DOWN;
                break;
            case LEFT:
                if (!this.dir_left) this.dir = NO_WAY;
                if (this.dir_up) this.dir = UP;
                else if (this.dir_left) this.dir = LEFT;
                else if (this.dir_down) this.dir = DOWN;
                else this.dir = RIGHT;
                break;
            case NO_WAY:
                if (this.dir_up) this.dir = UP;
                else if (this.dir_left) this.dir = LEFT;
                else if (this.dir_down) this.dir = DOWN;
                else if (this.dir_right) this.dir = RIGHT;
                break;
        }
    }

    no_way() {
        return !this.dir_up && !this.dir_down && !this.dir_left && !this.dir_right
    }

    changeState(world) {
        this.state = this.state < 7 ? this.state + 1 : 0;
        this.flag = !this.flag;
        if (this.find_rock(world))
            this.still_alive = false;
        
        if (this.no_way()) this.dir = NO_WAY;

        if (this.find_player(world)) {
            this.still_alive = false;
            Player.off = true;
        }

        this.flag && this.looking_around(world);
        this.flag && this.check_dir();

        switch (this.dir) {
            case DOWN:
                if (this.flag && world[this.y+1][this.x] === EMPTY) this.y += 1;
                break;
            case RIGHT:
                if (this.flag && world[this.y][this.x+1] === EMPTY) this.x += 1;
                break;
            case UP:
                if (this.flag && world[this.y-1][this.x] === EMPTY) this.y -= 1;
                break;
            case LEFT:
                if (this.flag && world[this.y][this.x-1] === EMPTY) this.x -= 1;
                break;
        }

    }

}