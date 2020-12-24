import { TOGGLE_MUSIC, TOGGLE_ORIENTATION } from "../../../actions/settingsActions";

export const settings = [
  { name: "Music", initial: true, text_on: "On", text_off: "Off", action: TOGGLE_MUSIC },
  { name: "Orientation", initial: true, text_on: "Vertical", text_off: "Horizontal", action: TOGGLE_ORIENTATION } 
]