import {SET_USER, DELETE_USER, UPDATE_USER} from '../actions/constants';

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
      break;
    case DELETE_USER:
      return {
        ...state,
        user: action.payload,
      };
      break;
    default:
      return state;
  }
};

export default userReducer;
