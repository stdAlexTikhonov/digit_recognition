import { MUSIC_ON, MUSIC_OFF } from "../actions/settingsActions";

const init = {
  music: true
};

export const settingsReducer = (state = init, action) => {
    switch (action.type) {
      case MUSIC_ON: 
          return {
              ...state,
              music: true
          }
      case MUSIC_OFF:
          return {
              ...state,
              music: false
          }
        default:
            return state;
    }
}