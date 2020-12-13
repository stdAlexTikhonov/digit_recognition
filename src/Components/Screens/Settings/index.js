import { audio, store } from "../../../index";
import { MUSIC_ON, MUSIC_OFF } from "../../../actions/settingsActions";
import { BackButton } from "../../BackButton";

export const Settings = document.createElement('div');
Settings.style.display = 'flex';
Settings.style.flexDirection = 'column';
Settings.style.justifyContent = 'flex-start';
Settings.style.fontFamily = 'Roboto';
Settings.style.position = 'relative';
Settings.style.width = "100%";
Settings.style.height = "100vh";
Settings.style.paddingTop = '50px';

const start_btn = document.createElement('div');
start_btn.innerText = 'MUSIC: ';
start_btn.style.fontSize = '25px';
start_btn.style.fontWeight = 'bold';
start_btn.style.color = 'white';
start_btn.style.cursor = 'pointer';
start_btn.style.margin = '20px';
start_btn.style.marginBottom = 0;
start_btn.style.display = 'flex';
start_btn.style.justifyContent = 'space-around';
start_btn.style.alignItems = "center";

const elem = document.createElement('div');
elem.className = "switch";

const label = document.createElement('label');

const text1 = document.createTextNode("Off");
export const checkbox = document.createElement('input');
checkbox.type = 'checkbox';
checkbox.checked = true;
checkbox.onclick = (e) => {
  if (e.target.checked) store.dispatch({ type: MUSIC_ON });
  else store.dispatch({ type: MUSIC_OFF});
}

const lever = document.createElement('span');
lever.className = 'lever';
const text2 = document.createTextNode("On");

label.appendChild(text1);
label.appendChild(checkbox);
label.appendChild(lever);
label.appendChild(text2);
elem.appendChild(label);

start_btn.appendChild(elem);


Settings.appendChild(start_btn);
Settings.appendChild(BackButton());

