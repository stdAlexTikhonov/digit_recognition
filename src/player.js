import { 
    ROCK, SCISSORS, EMPTY, LEFT, RIGHT,
    UP, DOWN, STOP, MOVE_LEFT, MOVE_RIGHT,
    MOVE_UP, MOVE_DOWN 
} from "./constants"

import sprite from './assets/merphy/sprite.png';

export class Player {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.dir = null;
        this.EMPTIES = [];
        this.state = 0;
        this.force = false;
        this.time_to_sleep = false;
        this.img = new Image();
        this.img.src = sprite;
        this.img.width = 100;
        this.img.height = 32;
        this.merphy_state = STOP;
        this.dy = 0;
        
    }

    check(nxt, world) {
        return [EMPTY, '*', '.'].includes(world[nxt.y][nxt.x]);
    }

    check_predator(nxt, world) {
        return world[nxt.y][nxt.x].char === SCISSORS;
    }

    check_force_move_left(world) {
        return world[this.y][this.x-1] === ROCK && world[this.y][this.x-2] === EMPTY && this.force;
    }

    check_force_move_right(world) {
        return world[this.y][this.x+1] === ROCK && world[this.y][this.x+2] === EMPTY && this.force;
    }

    changePic(seconds) {

        if( this.state < 2) this.state +=1;
        else this.state = 0;

        switch (this.merphy_state) {
            case STOP:
                this.dy = 1;
                break;
            case MOVE_LEFT:
                this.dy = 0;
                break;
            case MOVE_RIGHT:
                this.dy = 2;
                break;
            default:
                this.dy = 0;
                break;
        }
        
        // switch (this.merphy_state) {
        //     case STOP:
        //         // if (seconds % 10 === 0) this.time_to_sleep = true;
        //         // if(this.time_to_sleep && this.state < 12) this.state +=1;
        //         // else { this.state = 0; this.time_to_sleep = false; }
        //         this.img.src = merphy_sleep[0];
        //         break;
        //     case MOVE_LEFT:
        //         if( this.state < 2) this.state +=1;
        //         else this.state = 0;
        //         this.img.src = merphy_left[this.state];
        //         this.pic_sequence = merphy_left;
        //         break;
        //     case MOVE_RIGHT:
        //         if( this.state < 2) this.state +=1;
        //         else this.state = 0;
        //         this.img.src = merphy_right[this.state];
        //         this.pic_sequence = merphy_right;
        //         break;
        //     case FORCE_LEFT:
        //         this.img.src = meprhy_force_left;
        //         break;
        //     case FORCE_RIGHT:
        //         this.img.src = meprhy_force_right;
        //         break;
        //     case MOVE_UP:
        //     case MOVE_DOWN:
        //         if( this.state < 2) this.state +=1;
        //         else this.state = 0;
        //         this.img.src = this.pic_sequence[this.state];
        //         break;
        // }

    }

    changeState(world) {
        if (Player.off) return false;
        
        switch  (this.dir) {
            case UP:
                if (this.check_predator({x: this.x, y: this.y - 1}, world))  {
                    Player.off = true;
                }
                else if (this.check({x: this.x, y: this.y - 1}, world)) {
                    this.merphy_state = MOVE_UP;
                    this.y -= 1;
                    if (!this.EMPTIES.some(point => point.x === this.x && point.y === this.y)) this.EMPTIES.push({ x: this.x, y: this.y});
                }
                else this.merphy_state = STOP;
                break;
            case DOWN:
                if (this.check_predator({x: this.x, y: this.y + 1}, world))  {
                    Player.off = true;
                }
                else if (this.check({x: this.x, y: this.y + 1}, world)) {
                    this.y += 1;
                    this.merphy_state = MOVE_DOWN;
                    if (!this.EMPTIES.some(point => point.x === this.x && point.y === this.y)) this.EMPTIES.push({ x: this.x, y: this.y});
                } else this.merphy_state = STOP;
                break;
            case LEFT:
                if (this.check_predator({x: this.x - 1, y: this.y}, world))  {
                    Player.off = true;
                }
                else if (this.check({x: this.x - 1, y: this.y}, world)) {
                    this.merphy_state = MOVE_LEFT;
                    this.x -= 1;
                    if (!this.EMPTIES.some(point => point.x === this.x && point.y === this.y)) this.EMPTIES.push({ x: this.x, y: this.y});
                } else if (this.check_force_move_left(world)) this.x -= 1;
                else this.merphy_state = STOP;
                break;
            case RIGHT:
                if (this.check_predator({x: this.x + 1, y: this.y}, world))  {
                    Player.off = true;
                }
                else if (this.check({x: this.x + 1, y: this.y}, world)) {
                    this.merphy_state = MOVE_RIGHT;
                    this.x += 1;
                    if (!this.EMPTIES.some(point => point.x === this.x && point.y === this.y)) this.EMPTIES.push({ x: this.x, y: this.y});
                } else if (this.check_force_move_right(world)) this.x += 1;
                else this.merphy_state = STOP;
                break;
        }

    }

}

Player.off = false;
Player.flag = true;