import { combineReducers } from "redux";

import tokenReducer from "./auth/authReducer";

const rootReducer = combineReducers({
  accessToken: tokenReducer,
});

export default rootReducer;
