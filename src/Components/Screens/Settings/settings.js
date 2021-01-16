import { TOGGLE_MUSIC, TOGGLE_ORIENTATION } from "../../../actions/settingsActions";
import music_off from "../../../assets/images/music_off.png";
import music_on from "../../../assets/images/music_on.png";
import horizontal from "../../../assets/images/horizontal.png";
import portrait from "../../../assets/images/portrait.png";

export const settings = [
  { name: "Music", initial: false, action: TOGGLE_MUSIC, mobile: true, img_on: music_on, img_off: music_off },
  { name: "Orientation", initial: true, action: TOGGLE_ORIENTATION, mobile: false, img_on: portrait, img_off: horizontal } 
]

