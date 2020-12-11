import {
    FETCH_SAVE_ClASS_REQUEST,
    FETCH_SAVE_ClASS_FAILURE,

    ADD_ClASS,
    UPDATE_ClASS,
    GET_LISTS_ClASSES

} from '../types'


const initialState = {

    uploading: false,
    error: '',
    masterClasses: []

};

export default (state = initialState, action) => {

    switch (action.type) {

        case FETCH_SAVE_ClASS_REQUEST: {
            return { ...state, uploading: true, error: '' }
        }

        case FETCH_SAVE_ClASS_FAILURE: {
            return { ...state, uploading: false, error: action.payload }
        }

        case ADD_ClASS: {
         
            return {...state,  masterClasses:[...state.masterClasses, action.payload]}
        }

        case GET_LISTS_ClASSES: {
            return { ...state, masterClasses: action.payload}
        }

        case UPDATE_ClASS: {
            return {
                ...state, masterClasses: state.masterClasses.map(
                    (item) => {
                        if (item.id == action.payload.id) {
                            return {...item, base:action.payload}
                        }
                        else {
                            return item
                        }
                    }
                )

            }
        }

        default:

            return state
    }
}

