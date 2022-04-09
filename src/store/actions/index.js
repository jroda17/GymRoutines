import {SET_USER, DELETE_USER, UPDATE_USER} from './constants';

export const setUser = data => {
  return {
    type: SET_USER,
    payload: data,
  };
};

export const deleteUser = () => {
  return {
    type: DELETE_USER,
    payload: null,
  };
};

export const updateUser = data => {
  return {
    type: UPDATE_USER,
    payload: data,
  };
};
