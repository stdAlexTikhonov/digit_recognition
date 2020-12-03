import { BackButton } from "../../BackButton";
export const LevelsScreen = () => {
  const arr = Array(10).fill(1);
  const levels = document.createElement('div');

  levels.style.width = '100%';
  levels.style.height = '100vh';
  levels.style.display = 'flex';
  levels.style.flexDirection = 'column';

  const createLevel = (num) => `<a class="carousel-item"><div style="width: 200px; height: 170px;border: 2px solid white; font-size: 30px; text-align: center;">Level ${num}</div></a>`;

  const transformed = arr.map((item, i) => createLevel(i + 1));
  levels.innerHTML = `<div class="carousel">${transformed.join('')}</div>`;
  
  levels.appendChild(BackButton());
  return levels;
} 
  