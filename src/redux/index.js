import { combineReducers, createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

const reducers = combineReducers({

});

export const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
