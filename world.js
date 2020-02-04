const WIDTH = 30;
const HEIGHT = 30;

const PLAYER = 'A';
const ROCK = 'O';
const FOOD = '*';
const BREAK = '+';
const WALL = '#';
const GROUND = '.';

const PREDATOR_QUANTITY = 3;

class Predator {

    constructor(x, y) {
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


class World {

    constructor(height, width, predators) {
        this.predators_quantity = predators;
        this.height = height;
        this.width = width;
        this.P1 = new Predator(5,5);
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

        //Predators
        WORLD[this.P1.y][this.P1.x] = this.P1.show;

        return WORLD;
    }

    print() {
        
        return this.world.map(row => row.join(' ')).join('\n');
    }

    tick() {
        this.P1.changeState();
        this.world = this.generate();
    }

}


const THE_WORLD = new World(HEIGHT, WIDTH, PREDATOR_QUANTITY);