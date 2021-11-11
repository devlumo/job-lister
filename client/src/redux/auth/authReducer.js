const INITIAL_STATE = {
  accessToken: null,
};

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "UPDATE_TOKEN":
      return action.payload;

    default:
      return state;
  }
};

export default tokenReducer;
