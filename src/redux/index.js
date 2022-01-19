import { combineReducers, createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import themeReducer from "./Theme/reducer";

const reducers = combineReducers({
  theme: themeReducer,
});

export const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
