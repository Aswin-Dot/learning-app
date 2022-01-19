import { TOGGLE_THEME_BEGIN, TOGGLE_THEME_FAILURE, TOGGLE_THEME_SUCCESS } from "./type";
import { darkTheme, lightTheme } from "../../../constants";

export const toggleTheme = (themeType) => (dispatch) => {
    dispatch({ type: TOGGLE_THEME_BEGIN })

    switch (themeType) {
        case "dark": 
            dispatch({
                type: TOGGLE_THEME_SUCCESS,
                payload: darkTheme
            })
            break;
        case "light": 
            dispatch({
                type: TOGGLE_THEME_SUCCESS,
                payload: lightTheme
            })
            break;
        default:
            dispatch({
                type: TOGGLE_THEME_FAILURE,
                payload: "Invalid theme type" 
            })
            break;
    }

}