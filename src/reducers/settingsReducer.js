import { TOGGLE_MUSIC } from "../actions/settingsActions";

const init = {
  music: true
};

export const settingsReducer = (state = init, action) => {
    switch (action.type) {
        case TOGGLE_MUSIC: {
            return {
                ...state,
                music: !state.music
            }
        }
        default:
            return state;
    }
}