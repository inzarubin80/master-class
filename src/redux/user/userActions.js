import {
  LOGIN_SUCCESS,
  LOGIN_LOGOUT,
  SET_PASSWORD,
  SET_USERNAME
} from '../types'

import * as api from '../../api/firebaseApi';

export function logInUser(email, password) {
  return api.logInUser(email, password).then(() => ({}));
}

export function signOutUser() {
  return api.signOutUser().then(() => ({}));
}

export function registerUser(email, password) {
  return api.registerUser(email, password).then(() => ({}));
}

export function initAuth() {
  return dispatch => api.initAuth(user => {
      return user ? dispatch({
          type: LOGIN_SUCCESS,
          payload: {
              user
          }
      }) : dispatch({
          type: LOGIN_LOGOUT
      });
  });
}


export const setUserName = (userName) => {
  return {
    type: SET_USERNAME,
    payload: userName,
  };
};

export  const setPassword = (password) => {
  return {
    type: SET_PASSWORD,
    payload: password,
  };
};

