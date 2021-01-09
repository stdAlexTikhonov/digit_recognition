import { settingsReducer } from "./settingsReducer";
import { scoreReducer } from "./scoreReducer";

export const appReducer = (state = {}, action) => {
    return {
        settings: settingsReducer(state.settings, action),
        score: scoreReducer,
    }
}