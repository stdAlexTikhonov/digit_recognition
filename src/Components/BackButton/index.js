import { MainScreen } from "../Screens/MainScreen";

export const BackButton = () => {
  const btn = document.createElement('i');
  btn.className = "material-icons waves-effect waves-light";
  btn.innerHTML = 'navigate_before';
  btn.style.position = 'absolute';
  btn.style.color = 'white';
  btn.style.left = 10;
  btn.style.top = 10;

  btn.onclick = _ => {
    document.body.innerHTML = "";
    document.body.appendChild(MainScreen);
  }
  return btn;
}