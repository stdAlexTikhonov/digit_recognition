import { audio, store } from "../../../index";
import { BackButton } from "../../BackButton";
import { settings } from "./settings";

const isMobile = // will be true if running on a mobile device
  navigator.userAgent.indexOf("Mobile") !== -1 ||
  navigator.userAgent.indexOf("iPhone") !== -1 ||
  navigator.userAgent.indexOf("Android") !== -1 ||
  navigator.userAgent.indexOf("Windows Phone") !== -1;

export const Settings = document.createElement('div');
Settings.style.display = 'flex';
Settings.style.flexDirection = 'column';
Settings.style.justifyContent = 'flex-start';
Settings.style.fontFamily = 'Roboto';
Settings.style.position = 'relative';
Settings.style.width = "100%";
Settings.style.height = "100vh";
Settings.style.paddingTop = '50px';
Settings.style.overflow = 'auto';

const filtered = isMobile ? settings.filter(item => item.mobile) : settings;

filtered.forEach((setting) => {
  const setting_block = document.createElement('div');
  setting_block.innerText = `${setting.name}: `;
  setting_block.style.fontSize = '25px';
  setting_block.style.fontWeight = 'bold';
  setting_block.style.color = 'white';
  setting_block.style.cursor = 'pointer';
  setting_block.style.margin = '20px';
  setting_block.style.marginBottom = 0;
  setting_block.style.display = 'flex';
  setting_block.style.justifyContent = 'space-around';
  setting_block.style.alignItems = "center";

  const elem = document.createElement('div');
  elem.className = "switch";

  const label = document.createElement('label');

  const text1 = document.createTextNode(setting.text_off);
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = setting.initial;
  checkbox.onclick = (e) => {
    store.dispatch({ type: setting.action });
  }

  const lever = document.createElement('span');
  lever.className = 'lever';
  const text2 = document.createTextNode(setting.text_on);

  label.appendChild(text1);
  label.appendChild(checkbox);
  label.appendChild(lever);
  label.appendChild(text2);
  elem.appendChild(label);

  setting_block.appendChild(elem);
  Settings.appendChild(setting_block);
});

Settings.appendChild(BackButton());

