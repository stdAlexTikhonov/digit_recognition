//784 spaces
const WIDTH = 30;
const HEIGHT = 30;

const UP = 'UP';
const DOWN = 'DOWN';
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';

const PLAYER = 'A';
const ROCK = 'O';
const FOOD = '*';
const BREAK = '+';
const WALL = '#';
const GROUND = '.';
const EMPTY = ' ';

const PREDATOR_QUANTITY = 0;
const ROCKS_QUANTITY = 30;
const STARS_QUANTITY = 30;
const BREAKS_QUANTITY = 100;
const EMPTY_CHARS = 0;

class Player {
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

class Predator {

    constructor(y,x) {
        this.phases = '/-\\|';
        this.phase = 0;
        this.show = '/';
        this.x = x;
        this.y = y;
    }

    changeState() {
        this.phase = this.phase < 3 ? this.phase + 1 : 0;
        this.show = this.phases[this.phase];
    }

}

class Rock {
    constructor(y,x) {
        this.x = x;
        this.y = y;
        this.killer = false;
        this.falling = false;
    }

    static boom = false;

    check_way_down(world) {
        if (this.falling && world[this.y+1][this.x] === PLAYER) { this.killer = true; Rock.boom = true; }
        this.falling = true;
        return  world[this.y+1][this.x] === EMPTY;
    }

    move_possible(world) {
        return ['+', 'O', '*'].includes(world[this.y+1][this.x])
    }

    check_way_left(world) {
        this.falling = true;
        return world[this.y][this.x-1] === EMPTY && world[this.y+1][this.x-1] === EMPTY;
    }

    check_way_right(world) {
        this.falling = true;
        return world[this.y][this.x+1] === EMPTY && world[this.y+1][this.x+1] === EMPTY;
    }

    check_force_move_left(world) {
        return world[this.y][this.x-1] === EMPTY && world[this.y][this.x+1] === PLAYER;
    }

    check_force_move_right(world) {
        return world[this.y][this.x+1] === EMPTY && world[this.y][this.x-1] === PLAYER;
    }

    changeState(world, force) {
        if (world[this.y][this.x] === PLAYER) { Rock.boom = true; this.killer = true; }
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

class Star {
    constructor(y,x) {
        this.x = x;
        this.y = y;
        this.still_here = true;
    }

    static scores = 0;

    check_way_down(world) {
        return  world[this.y+1][this.x] === EMPTY;
    }

    move_possible(world) {
        return ['+', 'O', '*'].includes(world[this.y+1][this.x])
    }

    check_way_left(world) {
        return world[this.y][this.x-1] === EMPTY && world[this.y+1][this.x-1] === EMPTY;
    }

    check_way_right(world) {
        return world[this.y][this.x+1] === EMPTY && world[this.y+1][this.x+1] === EMPTY;
    }

    changeState(world) {
        if (world[this.y][this.x] === PLAYER) { if (this.still_here) { Star.scores += 1; this.still_here = false; } }
        else if (this.check_way_down(world)) this.y += 1;
        else if (this.move_possible(world)) {
            if (this.check_way_left(world)) this.x -= 1;
             else if (this.check_way_right(world)) this.x += 1;
        }

    }
}


class World {

    constructor(height, width, predators_q, rocks, stars, breaks) {
        this.rand_positions = [];
        this.height = height;
        this.width = width;
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
        }

        //Stars
        this.STARS = [];
        for (let i = 0; i < stars; i++) {
            const rip = this.rndomizer(); //predator init position
            this.STARS.push(new Star(rip.y, rip.x));
        }


        const pp = this.rndomizer();//player position

        this.player = new Player(pp.x,pp.y);

        for (let i = 0; i < EMPTY_CHARS; i++) {
            const eip = this.rndomizer(); //predator init position
            this.player.EMPTIES.push({y: eip.y, x: eip.x});
        }

        this.world = this.generate();


    }

    generate() {
        const FIRST_ROW = new Array(this.width).fill(WALL);
        const LAST_ROW = new Array(this.width).fill(WALL);

        const MIDDLE = new Array(this.width).fill(GROUND);
        MIDDLE[0] = WALL; MIDDLE[this.width-1] = WALL;

        const WORLD = new Array(this.height)

        for (let i = 0; i < this.height; i++) WORLD[i] = MIDDLE.slice();

        WORLD[0] = FIRST_ROW;
        WORLD[this.height-1] = LAST_ROW;

        this.player.EMPTIES.forEach(P => WORLD[P.y][P.x] = EMPTY);

        this.PREDATORS.forEach(P => WORLD[P.y][P.x] = P.show);

        this.ROCKS = this.ROCKS.filter(rock => !rock.killer);


        this.ROCKS.forEach(R => WORLD[R.y][R.x] = ROCK);

        this.STARS.forEach(S => { if(S.still_here) WORLD[S.y][S.x] = FOOD });

        this.BREAKS.forEach(B => WORLD[B.y][B.x] = BREAK);

        if (!Rock.boom) WORLD[this.player.y][this.player.x] = PLAYER;
        else {
            this.STARS.push(new Star(this.player.y, this.player.x));
            this.player.dir = null;
        }

        return WORLD;
    }

    rndomizer() {

        let rand_x = Math.floor(Math.random() * (this.width - 2)) + 1;
        let rand_y = Math.floor(Math.random() * (this.width - 2)) + 1;
        let pos = { x: rand_x, y: rand_y };

        while(this.rand_positions.some(el => el.x === pos.x && el.y === pos.y)) {
            rand_x = Math.floor(Math.random() * (this.width - 2)) + 1;
            rand_y = Math.floor(Math.random() * (this.width - 2)) + 1;
            pos = { x: rand_x, y: rand_y };
        }

        this.rand_positions.push(pos);

        return pos;
    }

    print() {
        return this.world.map(row => row.join(EMPTY)).join('\n') + '\nscores: ' + Star.scores + '  Rock: ' + Rock.boom;
    }

    tick() {
        this.PREDATORS.forEach(PREDATOR => PREDATOR.changeState());
        this.ROCKS.forEach(ROCK => ROCK.changeState(this.world, this.player.force));
        this.STARS.forEach(STAR => STAR.changeState(this.world));
        this.player.changeState(this.world);
        this.world = this.generate();
    }

}


const THE_WORLD = new World(HEIGHT, WIDTH, PREDATOR_QUANTITY, ROCKS_QUANTITY, STARS_QUANTITY, BREAKS_QUANTITY);
