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
        this.still_alive = true;
        this.img = new Image();
        this.img.src = sprite3;
        this.char = SCISSORS;
        this.prev_dir = null;
        this.animation = false;
    }


    looking_around(world) {
        this.dir_left = world[this.y][this.x-1].char === EMPTY && !"*O".includes(world[this.y-1][this.x-1].char);
        this.dir_up = world[this.y-1][this.x].char === EMPTY;
        this.dir_right = world[this.y][this.x+1].char === EMPTY && !"*O".includes(world[this.y-1][this.x+1].char);
        this.dir_down = world[this.y+1][this.x].char === EMPTY;
    }

    find_player(world) {
        let FOUND_PLAYER = false;

        const up = world[this.y-1][this.x].char === PLAYER;
        const down = world[this.y+1][this.x].char === PLAYER;
        const left = world[this.y][this.x-1].char === PLAYER;
        const right = world[this.y][this.x+1].char === PLAYER;
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
        return world[this.y-1][this.x].char === ROCK;
    }


    check_dir() {
        debugger;
        switch (this.dir) {
            case DOWN:
                if (this.dir_left) this.dir = LEFT;
                else if (this.dir_down) this.dir = DOWN;
                else if (this.dir_right) this.dir = RIGHT;
                else this.dir = LEFT;
                this.prev_dir = DOWN;
                break;
            case RIGHT:
                if (this.dir_down) this.dir = DOWN;
                else if (this.dir_right) this.dir = RIGHT;
                else if (this.dir_up) this.dir = UP;
                else this.dir = DOWN;
                this.prev_dir = RIGHT;
                break;
            case UP:
                if (this.dir_right) this.dir = RIGHT;
                else if (this.dir_up) this.dir = UP;
                else if (this.dir_left) this.dir = LEFT;
                else this.dir = RIGHT;
                this.prev_dir = UP;
                break;
            case LEFT:
                if (this.dir_up) this.dir = UP;
                else if (this.dir_left) this.dir = LEFT;
                else if (this.dir_down) this.dir = DOWN;
                else this.dir = UP;
                this.prev_dir = LEFT;
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
   
        if (this.find_rock(world))
            this.still_alive = false;
        
        if (this.no_way()) this.dir = NO_WAY;

        if (this.find_player(world)) {
            this.still_alive = false;
            Player.off = true;
        }

         this.looking_around(world);
         this.check_dir();
        
        
        switch (this.dir) {
            case DOWN:
                if (world[this.y+1][this.x].char === EMPTY) this.y += 1;
                break;
            case RIGHT:
                if (world[this.y][this.x+1].char === EMPTY) this.x += 1;
                break;
            case UP:
                if (world[this.y-1][this.x].char === EMPTY) this.y -= 1;
                break;
            case LEFT:
                if (world[this.y][this.x-1].char === EMPTY) this.x -= 1;
                break;
        }

    }

}