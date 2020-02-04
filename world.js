const WIDTH = 30;
const HEIGHT = 30;

const PLAYER = 'A';
const ROCK = 'O';
const FOOD = '*';
const BREAK = '+';
const WALL = '#';
const GROUND = '.';

const PREDATOR_QUANTITY = 3;
const ROCKS_QUANTITY = 20;
const STARS_QUANTITY = 20;

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
    }

    changeState(world) {
        const flag = world[this.y+1][this.x] === ' ';
        if (flag) this.y += 1;
    }
}

class Star {
    constructor(y,x) {
        this.x = x;
        this.y = y;
    }

    changeState(world) {
        const flag = world[this.y+1][this.x] === ' ';
        if (flag) this.y += 1;
    }
}


class World {

    constructor(height, width, predators_q, rocks, stars) {
        this.rand_positions = null;
        this.height = height;
        this.width = width;

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

        this.PREDATORS.forEach(P => WORLD[P.y][P.x] = P.show);

        this.ROCKS.forEach(R => WORLD[R.y][R.x] = ROCK);

        this.STARS.forEach(S => WORLD[S.y][S.x] = FOOD);

        return WORLD;
    }

    rndomizer() {
        this.rand_positions = [];
        let rand_x = Math.floor(Math.random() * (this.width - 2)) + 1;
        let rand_y = Math.floor(Math.random() * (this.height - 2)) + 1;
        let pos = { x: rand_x, y: rand_y };

        while(this.rand_positions.some(el => el.x === pos.x && el.y === pos.y)) {
            rand_x = Math.floor(Math.random() * (this.width - 2)) + 1;
            rand_y = Math.floor(Math.random() * (this.height - 2)) + 1;
            pos = { x: rand_x, y: rand_y };
        }

        this.rand_positions.push(pos);

        return pos;
    }

    print() {
        
        return this.world.map(row => row.join(' ')).join('\n');
    }

    tick() {
        this.PREDATORS.forEach(PREDATOR => PREDATOR.changeState());
        this.ROCKS.forEach(ROCK => ROCK.changeState(this.world));
        this.STARS.forEach(STAR => STAR.changeState(this.world));
        this.world = this.generate();
    }

}


const THE_WORLD = new World(HEIGHT, WIDTH, PREDATOR_QUANTITY, ROCKS_QUANTITY, STARS_QUANTITY);