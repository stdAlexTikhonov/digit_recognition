import { draw, audio, store } from "../../index";
export const Pause = document.createElement('i');
Pause.className = "material-icons waves-effect waves-light";
Pause.innerHTML = 'pause';
Pause.style.color = 'white';


Pause.onclick = _ => {
  const { settings } = store.getState();
  if (window.pause) {
    window.pause = false;
    Pause.innerHTML = 'pause';
    settings.music && audio.play();
    draw();
  } else {
    settings.music && audio.pause();
    window.pause = true;  
    Pause.innerHTML = 'play_arrow';
    window.cancelAnimationFrame(window.myReq);
  }

}
