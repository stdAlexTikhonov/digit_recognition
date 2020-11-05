import { stopGame } from "./index"
import "./user";

import { 
    WIDTH, HEIGHT, BLOCK_WIDTH, UP, DOWN, RIGHT, LEFT,
    DIRS, PLAYER, ROCK, FOOD, BREAK,
    WALL, GROUND, EMPTY, SCISSORS, elements,
    GROUND_QUANTITY, SEED, VIEWPORT_HEIGHT, VIEWPORT_WIDTH, MOVE_DOWN, MOVE_UP, STEPS, MOVE_RIGHT, MOVE_LEFT, FORCE_LEFT, FORCE_RIGHT, PLAYERS_QUANTITY, REMOTE_PLAYER, STOP
} from "./constants";
import { Player } from "./player";
import { Star } from "./star";
import { Rock } from "./rock";
import { Predator } from "./predator"

import sprite from './assets/merphy/sprite.png';
import sprite2 from './assets/merphy/sprite2.png';
import sprite3 from './assets/merphy/sprite3.png';

let seed = SEED;

function random() {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

export const generateUID = () => {
    return (
      "_" +
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

export class World {

    constructor(height, width, predators_q, rocks, stars, breaks) {
        this.rand_positions = [];
        this.height = height;
        this.width = width;
        this.minutes = 0;
        this.seconds = 0;
        this.img = new Image();
        this.img.src = sprite2;
        this.timer = null;
        this.pause = false;
        this.start = false;
        // this.canvas = document.createElement('canvas');
        // this.canvas.id = 'canvas';
        // this.canvas.width = WIDTH * BLOCK_WIDTH;
        // this.canvas.height = HEIGHT * BLOCK_WIDTH;
        // this.ctx = this.canvas.getContext("2d");
        this.viewport = document.createElement('canvas');
        this.viewport.id = 'viewport';
        this.viewport.width = VIEWPORT_WIDTH * BLOCK_WIDTH;
        this.viewport.height = VIEWPORT_HEIGHT * BLOCK_WIDTH;
        this.ctx_vp = this.viewport.getContext("2d");
        this.selected_values = [];
        this.mouse_pressed = false;
        this.selected_value = EMPTY;
        this.ws = new WebSocket("ws://192.168.0.172:3000");
        
        
        
        // document.body.appendChild(this.canvas);
        document.body.appendChild(this.viewport);

        // this.canvas.onmousedown = e1 => {
        //     this.mouse_pressed = true;
        // }

        // this.canvas.onmouseup = e1 => {
        //     this.mouse_pressed = false;
        //     this.selected_values = [];
        // }

        // this.canvas.onmousemove = (e) => {
        //     if (this.mouse_pressed && window.pause) {
        //         const rect = e.target.getBoundingClientRect();
        //         const x = e.clientX - rect.left; //x position within the element.
        //         const y = e.clientY - rect.top;  //y position within the element.
        //         const _x = Math.floor(x/BLOCK_WIDTH);
        //         const _y = Math.floor(y/BLOCK_WIDTH);
    
        //         let val = _x + "_" + _y;
                
        //         if (!this.selected_values.includes(val)) { 
        //             this.selected_values = [...this.selected_values, val];
        //             this.GROUND = this.GROUND.filter((val) => !(val.x === _x && val.y === _y));
        //             this.BREAKS = this.BREAKS.filter((val) => !(val.x === _x && val.y === _y));
        //             this.ROCKS = this.ROCKS.filter((val) => !(val.x === _x && val.y === _y));
        //             this.STARS = this.STARS.filter((val) => !(val.x === _x && val.y === _y));
        //             this.WALLS = this.WALLS.filter((val) => !(val.x === _x && val.y === _y));
        //             this.PREDATORS = this.PREDATORS.filter((val) => !(val.x === _x && val.y === _y));
        //             switch(this.selected_value) {
        //                 case GROUND:
        //                     this.GROUND.push({ x: _x, y: _y});
        //                     break;
        //                 case BREAK:
        //                     this.BREAKS.push({ x: _x, y: _y});
        //                     break;
        //                 case ROCK:
        //                     this.ROCKS.push(new Rock(_y, _x));
        //                     break;
        //                 case FOOD:
        //                     this.STARS.push(new Star(_y, _x));
        //                     break;
        //                 case WALL:
        //                     this.WALLS.push({ x: _x, y: _y });
        //                 case SCISSORS:
        //                     this.PREDATORS.push(new Predator(_y, _x));
        //                     break;   
        //                 case PLAYER:
        //                     this.player = new Player(_y,_x);
        //                     this.player.img.addEventListener('load', e => this.print());
        //                     break; 
        //             }
                    
        //             this.world = this.generate();
        //             this.world[this.player.y][this.player.x] = PLAYER;
        //             this.print();

        //         }
        //     }
            
        // }
        



        const createDiv = (img, index) => {
            const div = document.createElement('div');
            div.style.width = BLOCK_WIDTH + 'px';
            div.style.height = BLOCK_WIDTH + 'px';
            div.style.backgroundImage = `url(${img})`;
            div.style.backgroundColor = 'black';
            div.style.backgroundPositionX = BLOCK_WIDTH * index + 'px';
            div.style.margin = '20px';
            div.style.cursor = 'pointer';
            return div
        }
        
        const resetBtns = () => { 
            const items = document.getElementsByClassName('btn');
            for (let i = 0; i < items.length; i++) {
                items[i].style.border = 'none';
            }
        }
        
        const edit_block = document.createElement('div');
        edit_block.style.width = '10%';
        edit_block.style.border = '1px solid black';
        edit_block.style.height = HEIGHT * BLOCK_WIDTH + 'px';
        edit_block.style.display = 'flex';
        edit_block.style.flexDirection = 'column';
        edit_block.style.alignItems = 'center';

        for (let i = 0; i < 5; i++) {
            const div = createDiv(sprite2, i)
            div.className = 'btn';
            div.onmousedown = e =>  { 
                resetBtns();
                this.selected_value = elements[i]
                div.style.border = '3px solid blue';
            };
            edit_block.appendChild(div);
        }
        
        const empty = createDiv();
        empty.onmousedown = e =>  {
            resetBtns();
            empty.style.border = "3px solid blue";
            empty.className = 'btn';
            this.selected_value = EMPTY
        };
        edit_block.appendChild(empty);

        const scissors = createDiv(sprite3, 0);
        scissors.onmousedown = e =>  {
            resetBtns();
            scissors.style.border = "3px solid blue";
            scissors.className = 'btn';
            this.selected_value = SCISSORS;
        };
        edit_block.appendChild(scissors);

        const player = createDiv(sprite, 0);
        player.onmousedown = e =>  {
            resetBtns();
            player.style.border = "3px solid blue";
            player.className = 'btn';
            this.selected_value = PLAYER;
        };
        edit_block.appendChild(player);

        this.edit_block = edit_block;

        //WALLS
        this.WALLS = [];

        //Breaks
        this.BREAKS = [];
        for (let i = 0; i < breaks; i++) {
            const bip = this.rndomizer(); //break init position
            this.BREAKS.push({y: bip.y, x: bip.x, char: BREAK});
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
            this.GROUND.push({y: rip.y, x: rip.x, char: GROUND});
        }

        this.PLAYERS = [];
        // for (let i = 0; i < PLAYERS_QUANTITY; i++) {
        //     const pp = this.rndomizer();//player position
        //     this.PLAYERS.push({y: pp.y, x: pp.x, char: REMOTE_PLAYER});
        // }

        const pp = this.rndomizer();//player position

        this.player = new Player(pp.y,pp.x);
        this.player.token = generateUID();
  
        this.ws.onopen = () => this.ws.send(JSON.stringify({method: "SET_PLAYER_POSITION", token: this.player.token, player: this.player}));

        this.world = this.generate();

        

        this.ws.onmessage = response => {
            
            try {
                const res = JSON.parse(response.data);
                switch(res.method) {
                    case "SET_PLAYERS":
                        //remove current client
                        delete res.players[this.player.token];
                        const filtered = Object.values(res.players);
                        this.PLAYERS = filtered.map(pl => { 
                            const new_pl = new Player(pl.y, pl.x);
                            new_pl.token = pl.token;
                            return new_pl;
                        });
                        if (Object.keys(res.players).length === PLAYERS_QUANTITY - 1) this.start = true;
                        break;
                    case "CD":
                        this.PLAYERS.forEach(player => {
                            if (res.token === player.token) { 
                                player.dir = res.dir;
                                player.x = res.x;
                                player.y = res.y;
                             }
                        })
                        break;
                    case "CLOSE":
                        //remove current client
                        delete res.players[this.player.token];
                        const filtered1 = Object.values(res.players);
                        this.PLAYERS = filtered1.map(pl => { 
                            const new_pl = new Player(pl.y, pl.x);
                            new_pl.token = pl.token;
                            return new_pl;
                        });
                        break;

                }
            } catch (e) {
                console.log(e);
            }
            
        }

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
        const FIRST_ROW = new Array(this.width).fill({ char: WALL});
        const LAST_ROW = new Array(this.width).fill({ char: WALL});

        const MIDDLE = new Array(this.width).fill({char: EMPTY});
        MIDDLE[0] = { char: WALL } ; MIDDLE[this.width-1] = { char: WALL};

        const WORLD = new Array(this.height)

        for (let i = 0; i < this.height; i++) WORLD[i] = MIDDLE.slice();

        WORLD[0] = FIRST_ROW;
        WORLD[this.height-1] = LAST_ROW;

        this.GROUND.forEach(G => WORLD[G.y][G.x] = G);

        this.player.EMPTIES.forEach(P => WORLD[P.y][P.x] = { char: EMPTY});

        this.PLAYERS.forEach(P => { 
            P.EMPTIES.forEach(P => WORLD[P.y][P.x] = { char: EMPTY});
            WORLD[P.y][P.x] = P 
        });

        this.PREDATORS.forEach(P => WORLD[P.y][P.x] = P);

        this.ROCKS.forEach(R => WORLD[R.y][R.x] = R);

        this.STARS.forEach(S => WORLD[S.y][S.x] = S);

        this.BREAKS.forEach(B => WORLD[B.y][B.x] = B);

        this.WALLS.forEach(W => WORLD[W.y][W.x] = W);

        this.PLAYERS.forEach(P => WORLD[P.y][P.x] = P);
        return WORLD;
    }

    rndomizer() {

        let rand_x = Math.floor(random() * (this.width - 2)) + 1;
        let rand_y = Math.floor(random() * (this.height - 2)) + 1;
        let pos = { x: rand_x, y: rand_y };

        while(this.rand_positions.some(el => el.x === pos.x && el.y === pos.y)) {
            rand_x = Math.floor(random() * (this.width - 2)) + 1;
            rand_y = Math.floor(random() * (this.height - 2)) + 1;
            pos = { x: rand_x, y: rand_y };
        }

        this.rand_positions.push(pos);

        return pos;
    }

    print(value) {
        // this.ctx.fillStyle = "black";
        // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        //viewport
        this.ctx_vp.fillStyle = 'black';
        this.ctx_vp.fillRect(0, 0, this.viewport.width, this.viewport.height);

        const viewport_start_x = this.player.x - Math.floor(VIEWPORT_WIDTH/2);
        const viewport_start_y = this.player.y - Math.floor(VIEWPORT_HEIGHT/2);
        const viewport_end_x = viewport_start_x + VIEWPORT_WIDTH;
        const viewport_end_y = viewport_start_y + VIEWPORT_HEIGHT;

        this.world.forEach((row,i) => {
            const draw_view_y_flag = i >= viewport_start_y && i <= viewport_end_y;
            row.forEach((el,j) => { 
                const draw_view_x_flag = j >= viewport_start_x && j <= viewport_end_x;
                if (draw_view_y_flag && draw_view_x_flag) {
                    let pos_x = (j - viewport_start_x)*BLOCK_WIDTH;
                    let pos_y = (i - viewport_start_y)*BLOCK_WIDTH;

                    switch(this.player.merphy_state) {
                        case MOVE_RIGHT:
                            pos_x -= BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                            break;
                        case MOVE_LEFT:
                            pos_x += BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                            break;
                        case MOVE_UP:
                            pos_y += BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                            break;
                        case MOVE_DOWN:
                            pos_y -= BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                            break;
                    }

                    switch (el.char) {
                        case SCISSORS:
                            switch(el.dir) {
                                case RIGHT:
                                    pos_x += BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                                    break;
                                case LEFT:
                                    pos_x -= BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                                    break;
                                case UP:
                                    pos_y -= BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                                    break;
                                case DOWN:
                                    pos_y += BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                                    break;
                            }
                            this.ctx_vp.drawImage(el.img, BLOCK_WIDTH * el.state, DIRS.indexOf(el.dir) * BLOCK_WIDTH, BLOCK_WIDTH, BLOCK_WIDTH, pos_x, pos_y,BLOCK_WIDTH, BLOCK_WIDTH);
                            break;
                        case GROUND:
                            this.ctx_vp.drawImage(this.img, BLOCK_WIDTH*4, 0, BLOCK_WIDTH, BLOCK_WIDTH, pos_x, pos_y,BLOCK_WIDTH, BLOCK_WIDTH);
                            break;
                        case WALL:
                            this.ctx_vp.drawImage(this.img, 0, 0, BLOCK_WIDTH, BLOCK_WIDTH, pos_x, pos_y,BLOCK_WIDTH, BLOCK_WIDTH);
                            break;
                        case BREAK:
                            this.ctx_vp.drawImage(this.img, BLOCK_WIDTH*2, 0, BLOCK_WIDTH, BLOCK_WIDTH, pos_x, pos_y,BLOCK_WIDTH, BLOCK_WIDTH);
                            break;
                        case ROCK:
                            
                            if (el.right) pos_x += BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                            else if (el.left) pos_x -= BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                            else if (el.falling) pos_y += BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH; 
                            this.ctx_vp.drawImage(this.img, BLOCK_WIDTH*3, 0, BLOCK_WIDTH, BLOCK_WIDTH, pos_x, pos_y,BLOCK_WIDTH, BLOCK_WIDTH);
                            break;
                        case FOOD:
                            if (el.right) pos_x += BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                            else if (el.left) pos_x -= BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                            else if (el.falling) pos_y += BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH; 
                            this.ctx_vp.drawImage(this.img, BLOCK_WIDTH, 0, BLOCK_WIDTH, BLOCK_WIDTH, pos_x, pos_y,BLOCK_WIDTH, BLOCK_WIDTH);
                            break;
                        case PLAYER:
                            switch(el.merphy_state) {
                                case MOVE_RIGHT:
                                case FORCE_RIGHT:
                                    pos_x += BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                                    break;
                                case MOVE_LEFT:
                                case FORCE_LEFT:
                                    pos_x -= BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                                    break;
                                case MOVE_UP:
                                    pos_y -= BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                                    break;
                                case MOVE_DOWN:
                                    pos_y += BLOCK_WIDTH/STEPS * value - BLOCK_WIDTH;
                                    break;
                            }
                            this.ctx_vp.drawImage(el.img, el.state * BLOCK_WIDTH, el.dy * BLOCK_WIDTH, BLOCK_WIDTH, BLOCK_WIDTH, pos_x, pos_y,BLOCK_WIDTH, BLOCK_WIDTH);
                            break;
                        // case REMOTE_PLAYER:
                        //     this.ctx_vp.drawImage(this.player.img, 0, BLOCK_WIDTH, BLOCK_WIDTH, BLOCK_WIDTH, pos_x, pos_y,BLOCK_WIDTH, BLOCK_WIDTH);
                        //     break;

                    }
               
                               
                }
                
            })
        })

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
            this.world[this.player.y][this.player.x] = this.player;
        } else {
            stopGame();
        }


    }

    tick() {
        this.PREDATORS.forEach(PREDATOR => PREDATOR.changeState(this.world));
        this.ROCKS.forEach(ROCK => ROCK.changeState(this.world, this.player));
        this.STARS.forEach(STAR => STAR.changeState(this.world));
        this.PLAYERS.forEach(PLAYER => {
            PLAYER.changeState(this.world);
            PLAYER.changePic();
        });
        this.player.changeState(this.world);
        this.player.changePic();
        this.check_food();
        this.check_rocks();
        this.world = this.generate();
        this.check_player();
        this.check_predators();
    }

}



