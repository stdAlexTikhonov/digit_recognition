import { settingsReducer } from "./settingsReducer";

export const appReducer = (state = {}, action) => {
    return {
        settings: settingsReducer(state.settings, action),
    }
}