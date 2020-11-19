import {
    FETCH_SAVE_ClASS_REQUEST,
    FETCH_SAVE_ClASS_FAILURE,
    FETCH_SAVE_ClASS_SUCCESS
  } from '../types'


const initialState = {
    uploading: false, 
    error: '',
    success:false
   };

export default (state = initialState, action) => {

    switch (action.type) {

        case FETCH_SAVE_ClASS_REQUEST: {
            return {...state, uploading:true, error: ''}
        }

        case FETCH_SAVE_ClASS_SUCCESS: {
            return {...state, uploading:false}     
        }

        case FETCH_SAVE_ClASS_FAILURE: {
            return {...state, uploading:false, error:action.payload}   
        }

        default:

            return state
    }
}

