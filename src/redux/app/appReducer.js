import {
    FETCH_SAVE_ClASS_REQUEST,
    FETCH_SAVE_ClASS_FAILURE,
    FETCH_SAVE_ClASS_SUCCESS,
    ADD_ClASS_END,
    ADD_ClASS_START

  } from '../types'


const initialState = {
    
    uploading: false, 
    error: '',
    masterClasses:[]

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

        case ADD_ClASS_END: {
            return {...state, masterClasses:[...state.masterClasses, ...action.payload]}  
        }

        case ADD_ClASS_START: {
            return {...state, masterClasses:[...action.payload, ...state.masterClasses]}   
        }

        default:

            return state
    }
}

