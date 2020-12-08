import {
  FETCH_SAVE_ClASS_REQUEST,
  FETCH_SAVE_ClASS_FAILURE,
  FETCH_SAVE_ClASS_SUCCESS,
  ADD_ClASS_END,
  ADD_ClASS_START
} from '../types'

import  { createMasterClass, fetchMasterClas }  from '../../api/firebaseApi'

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




export const addClassesEnd = (masterСlasses) => {
  return {
    type: ADD_ClASS_END,
    payload:masterСlasses 
  };
};

export const addClassesStart = (masterСlasses) => {
  return {
    type: ADD_ClASS_START,
    payload:masterСlasses 
  };
};


export const saveMasterClass = (data, addFiles, removeFiles, key, goToClasses ) => {
 
  console.log('saveMasterClass');

  return (dispatch, getState) => {
    
    createMasterClass(data, addFiles, removeFiles, key, dispatch, goToClasses);

  };
}

export const getMasterClass = () => {
  
  return (dispatch, getState) => {
    
    const masterСlasses = getState().app.masterClasses;
  
    let firstKnownKey = '';

    if (masterСlasses.length) {
      firstKnownKey = masterСlasses[masterСlasses.length - 1].id;
    }

    fetchMasterClas(firstKnownKey, dispatch);

  };

}
