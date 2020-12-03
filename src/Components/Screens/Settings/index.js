import { audio, startGame } from "../../../index";
import { BackButton } from "../../BackButton";

export const Settings = document.createElement('div');
Settings.style.display = 'flex';
Settings.style.flexDirection = 'column';
Settings.style.justifyContent = 'flex-start';
Settings.style.alignItems = 'center';
Settings.style.fontFamily = 'Roboto';
Settings.style.position = 'relative';
Settings.style.width = "100%";
Settings.style.height = "100vh";


const start_btn = document.createElement('div');
start_btn.innerText = 'Music: ';
start_btn.style.fontSize = '25px';
start_btn.style.fontWeight = 'bold';
start_btn.style.color = 'white';
start_btn.style.cursor = 'pointer';
start_btn.style.padding = '15px';
start_btn.style.margin = '5px';



Settings.appendChild(start_btn);
Settings.appendChild(BackButton());

start_btn.onclick = () => {
    startGame();
    audio.play();
}