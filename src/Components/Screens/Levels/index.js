import { BackButton } from "../../BackButton";
import { GameScreen } from "../GameScreen";
export const LevelsScreen = () => {
  const arr = Array(10).fill(1);
  const container = document.createElement('div');

  container.style.width = '100%';
  container.style.height = '100vh';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';

  const levels = document.createElement('div');
  levels.className = "carousel";

  const handleClick = () => {
    document.body.innerHTML = "";
    document.body.appendChild(GameScreen);
  }

  const createLevel2 = num => {
    const item = document.createElement('a');
    item.className = "carousel-item";
    item.style.width = '200px';
    item.style.height = '150px';
    item.style.border = "2px solid white";
    item.style.fontSize = "30px";
    item.style.textAlign = "center";
    item.innerHTML = "Level " + num;
    item.onclick = handleClick;
    return item;
  }


  arr.forEach((item, i) => {
    levels.appendChild(createLevel2(i + 1));
  });
  
  container.appendChild(levels);
  
  container.appendChild(BackButton());
  return container;
} 
  