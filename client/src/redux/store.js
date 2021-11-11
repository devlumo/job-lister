import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";

import rootReducer from "./rootReducer";

const middlewares = [logger, thunkMiddleware];
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
