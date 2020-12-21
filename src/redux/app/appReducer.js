import {
    FETCH_SAVE_ClASS_REQUEST,
    FETCH_SAVE_ClASS_FAILURE,

    ADD_ClASS,
    UPDATE_ClASS,
    GET_LISTS_ClASSES,

    SET_QUOTE_TEXT,

    SET_COMMENT_TEXT,
    
    SET_PARENT_ID,
    CANCEL_QUOTE
    
} from '../types'


const initialState = {

    uploading: false,
    error: '',
    masterClasses: [],
    
    quoteText:'',
    parentId:'',
    commentText:''

    

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
         
            return {...state, uploading: false,  masterClasses:[...state.masterClasses, action.payload]}
        }

        case SET_QUOTE_TEXT: {
         
            return {...state, quoteText: action.payload}
        }

        case SET_COMMENT_TEXT: {
         
            return {...state, commentText: action.payload}
        }


        case SET_PARENT_ID: {
         
            return {...state, parentId: action.payload}
        }

        case CANCEL_QUOTE: {
         
            return {...state, parentId: '', quoteText:''}

        }

        case GET_LISTS_ClASSES: {
            return { ...state, masterClasses: action.payload}
        }

        case UPDATE_ClASS: {
            return {
                ...state, uploading: false, masterClasses: state.masterClasses.map(
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

