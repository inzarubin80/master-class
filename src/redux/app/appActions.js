import {
  FETCH_SAVE_ClASS_REQUEST,
  FETCH_SAVE_ClASS_FAILURE,
  FETCH_SAVE_ClASS_SUCCESS
} from '../types'

import  { createMasterClass }  from '../../api/firebaseApi'

export const setSaveRequest = () => {
  return {
    type: FETCH_SAVE_ClASS_REQUEST
  };
};

export const setSaveFailure = (error) => {
  return {
    type: FETCH_SAVE_ClASS_FAILURE,
    payload:error 
  };
};

export const setSaveSUCCESS = () => {
  return {
    type: FETCH_SAVE_ClASS_SUCCESS
  };
};



export const saveMasterClass = (data, addFiles, removeFiles, key, goToClasses ) => {
 
  console.log('saveMasterClass');

  return (dispatch, getState) => {
    
    console.log('saveMasterClass outer');
    createMasterClass(data, addFiles, removeFiles, key, dispatch, goToClasses);

  };

}
