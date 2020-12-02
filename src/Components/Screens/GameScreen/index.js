import { audio, startGame } from "../../../index";
import { ScoresComponent } from "../../Scores";

export const GameScreen = document.createElement('div');
GameScreen.style.margin = 'auto';
GameScreen.style.fontFamily = 'Roboto';
GameScreen.style.position = 'relative';

const start_screen = document.createElement('div');
start_screen.style.display = 'flex';
start_screen.style.flexDirection = 'column';
start_screen.style.justifyContent = 'center';
start_screen.style.alignItems = 'center';


const start_btn = document.createElement('div');
start_btn.innerText = 'PRESS TO START';

start_btn.style.border = '1px solid lightgreen';
start_btn.style.fontSize = '25px';
start_btn.style.border = '1px solid lightgreen';
start_btn.style.fontFamily = 'Tahoma';
start_btn.style.fontWeight = 'bold';
start_btn.style.color = 'lightgreen';
start_btn.style.cursor = 'pointer';
start_btn.style.padding = '15px';
start_btn.style.margin = '5px';


start_screen.appendChild(start_btn);
start_screen.appendChild(ScoresComponent);

GameScreen.appendChild(start_screen);

start_btn.onclick = () => {
    startGame();
    audio.play();
}