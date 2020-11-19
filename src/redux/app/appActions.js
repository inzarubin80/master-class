import {
  FETCH_SAVE_ClASS_REQUEST,
  FETCH_SAVE_ClASS_FAILURE,
  FETCH_SAVE_ClASS_SUCCESS
} from '../types'

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

export const setSaveRequest = () => {
  return {
    type: FETCH_SAVE_ClASS_REQUEST
  };
};

