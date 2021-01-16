import { store } from "../../../index";
import { settings as settings_ } from "./settings";
import { isMobile } from "../../../helpers";

export const Settings = document.createElement('div');
Settings.style.display = 'flex';
Settings.style.justifyContent = 'space-around';
Settings.style.alignItems = 'flex-start';
Settings.style.fontFamily = 'Roboto';
Settings.style.position = 'relative';
Settings.style.width = "100%";
Settings.style.height = "100vh";
Settings.style.paddingTop = '50px';
Settings.style.overflow = 'auto';
Settings.style.position = 'absolute';
Settings.style.top = 0;
Settings.style.left = 0;
Settings.style.background = 'black';

const filtered = isMobile ? settings_.filter(item => item.mobile) : settings_;

filtered.forEach((setting) => {
  const setting_block = document.createElement('button');
  setting_block.style.height = '50px';
  setting_block.style.width = '50px';
  setting_block.style.padding = 0;
  setting_block.style.overflow = 'hidden';
  setting_block.style.outline = 'none';
  const img = new Image(50, 50);
  img.src = setting.initial ? setting.img_on : setting.img_off;
  setting_block.appendChild(img);
  
  setting_block.onclick = (e) => {
    store.dispatch({ type: setting.action });
    const { settings } = store.getState();
    if (setting.name === 'Music') {
      img.src = settings.music ? setting.img_on : setting.img_off;
    } else if (setting.name === 'Orientation') {
      img.src = settings.orientation ? setting.img_on : setting.img_off;
    }

  }

  Settings.appendChild(setting_block);
});


const close = document.createElement('div');
close.style.color = 'white';
close.innerHTML = 'x';
close.style.position = 'absolute';
close.style.top = '10px';
close.style.right = '10px';
close.style.fontSize = '40px'
close.style.lineHeight = '20px';

close.onclick = () => {
  document.body.removeChild(Settings);
}

Settings.appendChild(close);