import { audio, startGame, store } from "../../../index";
import { ScoresComponent } from "../../Scores";
import { checkbox, Settings } from "../Settings";
import { BackButton } from "../../BackButton";
import { settings } from "../Settings/settings";


export const GameScreen = document.createElement('div');
GameScreen.style.display = 'flex';
GameScreen.style.flexDirection = 'column';
GameScreen.style.justifyContent = 'center';
GameScreen.style.alignItems = 'center';
GameScreen.style.fontFamily = 'Roboto';
GameScreen.style.position = 'relative';
GameScreen.style.width = "100%";
GameScreen.style.height = "100vh";


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
start_btn.style.textTransform = 'uppercase';
start_btn.style.minWidth = '250px'

const settings_btn = start_btn.cloneNode(true);
settings_btn.innerText = "Settings";


GameScreen.appendChild(start_btn);
GameScreen.appendChild(settings_btn);
GameScreen.appendChild(ScoresComponent);

start_btn.onclick = () => {
    const { settings } = store.getState();
    startGame();
    settings.music && audio.play();
}

settings_btn.onclick = () => {
    document.body.appendChild(Settings);
}