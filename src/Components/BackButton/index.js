import { MainScreen } from "../Screens/MainScreen";
import { LevelsScreen } from "../Screens/Levels";

export const BackButton = (to) => {
  const btn = document.createElement('i');
  btn.className = "material-icons waves-effect waves-light";
  btn.innerHTML = 'navigate_before';
  btn.style.position = 'absolute';
  btn.style.color = 'white';
  btn.style.left = 10;
  btn.style.top = 10;

  btn.onclick = _ => {
    document.body.innerHTML = "";
    if (to === 'levels') {
      const levels = LevelsScreen();
      document.body.appendChild(levels);
      M.Carousel.init(levels);
    }
    else document.body.appendChild(MainScreen);
  }
  return btn;
}