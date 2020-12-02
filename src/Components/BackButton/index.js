import { GameScreen } from "../Screens/GameScreen";
import { MainScreen } from "../Screens/MainScreen";

export const BackButton = document.createElement('i');
BackButton.className = "material-icons waves-effect waves-light";
BackButton.innerHTML = 'navigate_before';
BackButton.style.position = 'absolute';
BackButton.style.color = 'white';
BackButton.style.left = 10;
BackButton.style.top = 10;

BackButton.onclick = _ => {
  document.body.removeChild(GameScreen);
  document.body.appendChild(MainScreen);
}
