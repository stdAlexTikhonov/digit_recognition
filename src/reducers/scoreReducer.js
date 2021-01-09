import { PLUS_ONE, RESET_SCORE } from "../actions/scoreActions";

const init = 0

export const settingsReducer = (state = init, action) => {
    switch (action.type) {
      case PLUS_ONE: {
        return state + 1;
      }
      case RESET_SCORE:
        return init;
      default:
          return state;
  }
}