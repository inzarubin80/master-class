import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_LOGOUT,

  SET_PASSWORD,
  SET_USERNAME
} from '../types'

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

/*
import { executeAuthenticationService, getHash } from '../../api/EventDataService';
import AsyncStorage from '@react-native-community/async-storage';

const setLoginSuccess = (loginData) => {

  setLoginLocal(loginData);

  return {
    type: LOGIN_SUCCESS,
    payload: loginData,
  };
};






const setLoginRequest = (loginData) => {
  return {
    type: LOGIN_REQUEST,
    payload: loginData,
  };
};

const setLoginFailure = (loginData) => {

  setLoginLocal(null);

  return {
    type: LOGIN_FAILURE,
    payload: loginData,
  };
};

export const logOut = (loginData) => {
  
  setLoginLocal(null);

  return {
    type: LOGIN_LOGOUT
  };
};




export const login = (username, password, navigation) => {
  return (dispatch) => {

   const hash = getHash(username, password);

    let loginData = { username: username, password: password, hash: hash, err: ''};

    dispatch(setLoginRequest(loginData));

    return executeAuthenticationService(hash)
      .then(response => {

        console.log(response.status);

        if (response.status == 401){
        console.log(response.status);
          return {msg: 'Ошибка ввода имени или пароля'}
        }
        else {
          return response.json()
        }
      })

      .then((json) => {

        if (json.msg === 'success') {

          

          
          dispatch(setLoginSuccess(loginData));

          navigation.navigate('Calendar');

        } else {

          loginData.err = json.msg;
          dispatch(setLoginFailure(loginData));

        }
      })
      .catch((err) => {
               
        dispatch(setLoginFailure({ username: username, password: password, err:'Сервис недоступен, попробуйте позже'}));
        console.log('Login Failed', 'Some error occurred, please retry');
        console.log(err);
      });
  };
}



export const loginFromAsyncStorage = () => {
  return (dispatch) => {
    return AsyncStorage.getItem('session').then(loginString => JSON.parse(loginString))
      .then((loginData) => {
        dispatch(setLoginSuccess(loginData));
     
      })
      .catch((err) => {  
        
        dispatch(setLoginFailure({ username: '', password: '', err:'', hash: ''}));
        console.log(err);
      });
  };
}

const setLoginLocal = async (loginData) => {
  try {

    const session = JSON.stringify(loginData);

    console.log(session);

    await AsyncStorage.setItem('session', session );

  } catch (err) {
    console.log(err);
  }
};
*/


