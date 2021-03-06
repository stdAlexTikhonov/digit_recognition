import { GameScreen } from "../GameScreen";
import { LevelsScreen } from "../Levels";
import { Settings } from "../Settings";

export const MainScreen = document.createElement('div');

MainScreen.style.width = '100%';
MainScreen.style.height = '100vh';
MainScreen.style.display = 'flex';
MainScreen.style.flexDirection = 'column';

const createButton = (title) => {
  const link = document.createElement('a');
  link.className = "waves-effect waves-light btn-large";
  link.style.margin = '20px';
  link.style.marginBottom = 0;
  link.innerText = title;
  link.onclick = _ => {
    document.body.removeChild(MainScreen);

    if (title === 'levels') {
      const levels = LevelsScreen();
      document.body.appendChild(levels);
      M.Carousel.init(levels);
    } 
    title === 'settings' && document.body.appendChild(Settings);
  }
  return link;
};

const links = ["levels", "settings"];

links.forEach(link => {
  const btn = createButton(link);
  MainScreen.appendChild(btn);
})