import { TOGGLE_MUSIC, TOGGLE_ORIENTATION } from "../actions/settingsActions";

const init = {
    music: true,
    orientation: true,
};

export const settingsReducer = (state = init, action) => {
    switch (action.type) {
        case TOGGLE_MUSIC: {
            return {
                ...state,
                music: !state.music
            }
        }
        case TOGGLE_ORIENTATION: {
            return {
                ...state,
                orientation: !state.orientation
            }
        }
        default:
            return state;
    }
}