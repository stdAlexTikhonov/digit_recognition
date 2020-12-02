import { draw } from "../../index";
export const pause = document.createElement('i');
pause.className = "material-icons waves-effect waves-light";
pause.innerHTML = 'pause';
pause.style.position = 'absolute';
pause.style.color = 'white';
pause.style.right = 10;
pause.style.top = 10;

pause.onclick = _ => {
  if (window.pause) {
    window.pause = false;
    pause.innerHTML = 'pause';
    draw();
  } else {
    window.pause = true;  
    pause.innerHTML = 'play_arrow';
    window.cancelAnimationFrame(window.myReq);
  }

}
