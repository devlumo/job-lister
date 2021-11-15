const INITIAL_STATE = {
  accessToken: null,
  loggedIn: false,
  user: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "UPDATE_TOKEN":
      return {
        ...state,
        accessToken: action.payload,
      };
    case "SET_LOGGED_IN":
      return {
        ...state,
        loggedIn: action.payload,
      };
    case "SET_USER_DATA":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
