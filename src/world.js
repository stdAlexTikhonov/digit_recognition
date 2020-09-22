import { stopGame } from "./index"
export const WIDTH = 30;
export const HEIGHT = 30;

export const UP = 'UP';
export const DOWN = 'DOWN';
export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';

const PLAYER = 'A';
const ROCK = 'O';
const FOOD = '*';
const BREAK = '+';
const WALL = '#';
const GROUND = '.';
const EMPTY = ' ';

export const PREDATOR_QUANTITY = 3;
export const ROCKS_QUANTITY = 30;
export const STARS_QUANTITY = 30;
export const BREAKS_QUANTITY = 100;
export const GROUND_QUANTITY = 0;

let SEED = 2;

function random() {
    let x = Math.sin(SEED++) * 10000;
    return x - Math.floor(x);
}


export class Player {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.dir = null;
        this.EMPTIES = [];

        this.force = false;
    }

    check(nxt, world) {
        return [EMPTY, '*', '.'].includes(world[nxt.y][nxt.x]);
    }

    check_force_move_left(world) {
        return world[this.y][this.x-1] === ROCK && world[this.y][this.x-2] === EMPTY && this.force;
    }

    check_force_move_right(world) {
        return world[this.y][this.x+1] === ROCK && world[this.y][this.x+2] === EMPTY && this.force;
    }

    changeState(world) {
        if (Player.off) return false;
        switch  (this.dir) {
            case UP:
                if (this.check({x: this.x, y: this.y - 1}, world)) {
                    this.y -= 1;
                    if (!this.EMPTIES.some(point => point.x === this.x && point.y === this.y)) this.EMPTIES.push({ x: this.x, y: this.y});
                }
                break;
            case DOWN:
                if (this.check({x: this.x, y: this.y + 1}, world)) {
                    this.y += 1;
                    if (!this.EMPTIES.some(point => point.x === this.x && point.y === this.y)) this.EMPTIES.push({ x: this.x, y: this.y});
                }
                break;
            case LEFT:
                if (this.check({x: this.x - 1, y: this.y}, world)) {
                    this.x -= 1;
                    if (!this.EMPTIES.some(point => point.x === this.x && point.y === this.y)) this.EMPTIES.push({ x: this.x, y: this.y});
                } else if (this.check_force_move_left(world)) this.x -= 1;
                break;
            case RIGHT:
                if (this.check({x: this.x + 1, y: this.y}, world)) {
                    this.x += 1;
                    if (!this.EMPTIES.some(point => point.x === this.x && point.y === this.y)) this.EMPTIES.push({ x: this.x, y: this.y});
                } else if (this.check_force_move_right(world)) this.x += 1;
                break;
        }

    }

}

Player.off = false;
Player.flag = true;

export class Predator {

    constructor(y,x) {
        this.phases = '/-\\|';
        this.phase = 0;
        this.show = '/';
        this.x = x;
        this.y = y;
        this.dir_down = true;
        this.dir_left = false;
        this.dir_up = false;
        this.dir_right = false;
        this.dir = DOWN;
        this.flag = false;
        this.still_alive = true;
    }


    looking_around(world) {
        this.dir_left = world[this.y][this.x-1] === EMPTY;
        this.dir_up = world[this.y-1][this.x] === EMPTY;
        this.dir_right = world[this.y][this.x+1] === EMPTY;
        this.dir_down = world[this.y+1][this.x] === EMPTY;
    }

    find_player(world) {
        const FOUND_PLAYER_LEFT = world[this.y][this.x-1] === PLAYER;
        const FOUND_PLAYER_TOP = world[this.y-1][this.x] === PLAYER;
        const FOUND_PLAYER_RIGHT = world[this.y][this.x+1] === PLAYER;
        const FOUND_PLAYER_DOWN = world[this.y+1][this.x] === PLAYER;

        return FOUND_PLAYER_DOWN || FOUND_PLAYER_TOP || FOUND_PLAYER_LEFT || FOUND_PLAYER_RIGHT;
    }

    find_rock(world) {
        return world[this.y-1][this.x] === ROCK;
    }


    check_dir() {
        switch (this.dir) {
            case DOWN:
                if (this.dir_left) this.dir = LEFT;
                else if (this.dir_down) this.dir = DOWN;
                else if (this.dir_right) this.dir = RIGHT;
                else this.dir = UP;
                break;
            case RIGHT:
                if (this.dir_down) this.dir = DOWN;
                else if (this.dir_right) this.dir = RIGHT;
                else if (this.dir_up) this.dir = UP;
                else this.dir = LEFT;
                break;
            case UP:
                if (this.dir_right) this.dir = RIGHT;
                else if (this.dir_up) this.dir = UP;
                else if (this.dir_left) this.dir = LEFT;
                else this.dir = DOWN;
                break;
            case LEFT:
                if (this.dir_up) this.dir = UP;
                else if (this.dir_left) this.dir = LEFT;
                else if (this.dir_down) this.dir = DOWN;
                else this.dir = RIGHT;
                break;
        }
    }

    no_way() {
        return !this.dir_up && !this.dir_down && !this.dir_left && !this.dir_right
    }

    changeState(world) {
        this.phase = this.phase < 3 ? this.phase + 1 : 0;
        this.show = this.phases[this.phase];
        this.flag = !this.flag;
        if (this.find_rock(world) || this.no_way())
            this.still_alive = false;

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

export class Rock {
    constructor(y,x) {
        this.x = x;
        this.y = y;
        this.killer = false;
        this.falling = false;
    }

    check_way_down(world) {
        if (this.falling && world[this.y+1][this.x] === PLAYER) { this.killer = true; Player.off = true; }
        else if (this.falling && '/-|\\'.includes(world[this.y+1][this.x])) { this.killer = true; }
        this.falling = true;
        return  world[this.y+1][this.x] === EMPTY;
    }

    move_possible(world) {
        return ['+', 'O', '*'].includes(world[this.y+1][this.x]) && !['O', '*'].includes(world[this.y-1][this.x])
    }

    check_way_left(world) {
        this.falling = true;
        return world[this.y][this.x-1] === EMPTY && world[this.y+1][this.x-1] === EMPTY && !['O', '*'].includes(world[this.y-1][this.x-1]);
    }

    check_way_right(world) {
        this.falling = true;
        return world[this.y][this.x+1] === EMPTY && world[this.y+1][this.x+1] === EMPTY && !['O', '*'].includes(world[this.y-1][this.x+1]);
    }

    check_force_move_left(world) {
        return world[this.y][this.x-1] === EMPTY && world[this.y][this.x+1] === PLAYER;
    }

    check_force_move_right(world) {
        return world[this.y][this.x+1] === EMPTY && world[this.y][this.x-1] === PLAYER;
    }

    changeState(world, force) {
        if (world[this.y][this.x] === PLAYER) { this.killer = true; Player.off = true; }
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

export class Star {
    constructor(y,x) {
        this.x = x;
        this.y = y;
        this.still_here = true;
        this.falling = false;
        this.killer = false;
    }

    check_way_down(world) {
        if (this.falling && world[this.y+1][this.x] === PLAYER) { this.killer = true; Player.off = true; }
        else if (this.falling && '/-|\\'.includes(world[this.y+1][this.x])) { this.killer = true; }
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
        if (world[this.y][this.x] === PLAYER) { if (this.still_here) { Star.scores += 1; this.still_here = false; } }
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


export class World {

    constructor(height, width, predators_q, rocks, stars, breaks) {
        this.rand_positions = [];
        this.height = height;
        this.width = width;
        this.minutes = 0;
        this.seconds = 0;
        this.timer = null;
        //Breaks
        this.BREAKS = [];
        for (let i = 0; i < breaks; i++) {
            const bip = this.rndomizer(); //break init position
            this.BREAKS.push(bip);
        }

        //Predators
        this.PREDATORS = [];
        for (let i = 0; i < predators_q; i++) {
            const pip = this.rndomizer(); //predator init position
            this.PREDATORS.push(new Predator(pip.y, pip.x));
        }


        //Rocks
        this.ROCKS = [];
        for (let i = 0; i < rocks; i++) {
            const rip = this.rndomizer(); //predator init position
            this.ROCKS.push(new Rock(rip.y, rip.x));
            this.ROCKS.sort((a,b) => a.y - b.y);
        }

        //Stars
        this.STARS = [];
        for (let i = 0; i < stars; i++) {
            const rip = this.rndomizer(); //predator init position
            this.STARS.push(new Star(rip.y, rip.x));
            this.STARS.sort((a,b) => a.y - b.y);
        }

        this.GROUND = [];
        for (let i = 0; i < GROUND_QUANTITY; i++) {
            const rip = this.rndomizer(); //predator init position
            this.GROUND.push({y: rip.y, x: rip.x});
        }


        const pp = this.rndomizer();//player position

        this.player = new Player(pp.x,pp.y);

        this.world = this.generate();

        this.startTimer();
    }

    startTimer() {
        this.timer = setTimeout(() => {
            this.seconds++;
            if (this.seconds > 59) {
                this.seconds = 0;
                this.minutes++;
            }
            this.startTimer();
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timer);
    }

    getTime() {
        const minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
        const seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds;
        return minutes + ':' + seconds;
    }

    generate() {
        const FIRST_ROW = new Array(this.width).fill(WALL);
        const LAST_ROW = new Array(this.width).fill(WALL);

        const MIDDLE = new Array(this.width).fill(EMPTY);
        MIDDLE[0] = WALL; MIDDLE[this.width-1] = WALL;

        const WORLD = new Array(this.height)

        for (let i = 0; i < this.height; i++) WORLD[i] = MIDDLE.slice();

        WORLD[0] = FIRST_ROW;
        WORLD[this.height-1] = LAST_ROW;

        this.GROUND.forEach(P => WORLD[P.y][P.x] = GROUND);

        this.player.EMPTIES.forEach(P => WORLD[P.y][P.x] = EMPTY);

        this.PREDATORS.forEach(P => WORLD[P.y][P.x] = P.show);

        this.ROCKS.forEach(R => WORLD[R.y][R.x] = ROCK);

        this.STARS.forEach(S => WORLD[S.y][S.x] = FOOD);

        this.BREAKS.forEach(B => WORLD[B.y][B.x] = BREAK);

        return WORLD;
    }

    rndomizer() {

        let rand_x = Math.floor(random() * (this.width - 2)) + 1;
        let rand_y = Math.floor(random() * (this.width - 2)) + 1;
        let pos = { x: rand_x, y: rand_y };

        while(this.rand_positions.some(el => el.x === pos.x && el.y === pos.y)) {
            rand_x = Math.floor(random() * (this.width - 2)) + 1;
            rand_y = Math.floor(random() * (this.width - 2)) + 1;
            pos = { x: rand_x, y: rand_y };
        }

        this.rand_positions.push(pos);

        return pos;
    }

    print() {
        return this.world.map(row => row.join(EMPTY)).join('\n') + '\nscores: ' + Star.scores + '  Time: ' + this.getTime();
    }

    check_predators() {
       
        this.PREDATORS = this.PREDATORS.filter(predator => predator.still_alive);
    }

    check_food() {
        this.STARS = this.STARS.filter(star => star.still_here);
    }

    check_rocks() {
        this.ROCKS = this.ROCKS.filter(rock => !rock.killer);
    }

    check_player() {
        if (Player.off && Player.flag) {
            
            Player.flag = false;
        } else if (Player.flag) {
            this.world[this.player.y][this.player.x] = PLAYER;
        } else {
            stopGame();
        }


    }

    tick() {
        this.PREDATORS.forEach(PREDATOR => PREDATOR.changeState(this.world));
        this.ROCKS.forEach(ROCK => ROCK.changeState(this.world, this.player.force));
        this.STARS.forEach(STAR => STAR.changeState(this.world));
        this.player.changeState(this.world);
        this.check_predators();
        this.check_food();
        this.check_rocks();
        this.world = this.generate();
        this.check_player();
    }

}



