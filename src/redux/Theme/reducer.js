import {
  TOGGLE_THEME_BEGIN,
  TOGGLE_THEME_FAILURE,
  TOGGLE_THEME_SUCCESS,
} from "./type";
import { selectedTheme } from "../../../constants";

const initialState = {
  appTheme: selectedTheme,
  error: "",
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME_BEGIN:
      return { ...state, error: "" };
    case TOGGLE_THEME_SUCCESS:
      return { ...state, appTheme: action.payload };
    case TOGGLE_THEME_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default themeReducer;
