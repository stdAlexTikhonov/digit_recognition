import { PLAYER, SCISSORS, EMPTY, STARS_QUANTITY, FOOD, FIRE } from "./constants";
import { Player } from "./player";
import { PLUS_ONE } from "./actions/scoreActions";
import { store } from "./index";

import explosion_sprite from "./assets/merphy/explosion_sprite.png";

export class Explosion {
    constructor(y,x) {
      this.x = x;
      this.y = y;
      this.state = 0;
      this.char = FIRE;
      this.img = new Image();
      this.img.src = explosion_sprite;
    }


    changeState() {
      this.state = this.state > 6 ? 0 : this.state + 1;
    }
}