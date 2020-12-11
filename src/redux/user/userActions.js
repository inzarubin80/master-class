import {
  LOGIN_SUCCESS,
  LOGIN_LOGOUT,
  SET_PASSWORD,
  SET_USERNAME,
  SET_ROLES
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

  return (dispatch, getState) => {api.initAuth((user) => {


  
    
    if (user)
    {  

       dispatch({type: LOGIN_SUCCESS, payload: user});

       const subscriptionRoles = api.getUserInfo(user.uid).onSnapshot(docSnapshot => {

      const roles = docSnapshot.docs.map(doc => (doc.id));
      dispatch({type: SET_ROLES, payload: {roles, subscriptionRoles}})

      } );
    }
    else {

      const subscriptionRoles = getState().user.userRoles.subscriptionRoles;
      if (subscriptionRoles) {
          subscriptionRoles();
      }
      
      dispatch({type: LOGIN_LOGOUT})

    };

  });
}
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

