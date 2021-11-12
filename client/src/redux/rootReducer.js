import { combineReducers } from "redux";

import tokenReducer from "./auth/authReducer";

const rootReducer = combineReducers({
  auth: tokenReducer,
});

export default rootReducer;
