import { LOGIN_SUCCESS, LOGIN_LOGOUT, SET_USERNAME, SET_PASSWORD } from '../types'

const  initialState = {
    user:  null ,
    username:   '',
    password: '',
    err:''
};

export default (state = initialState, action) => {

    switch (action.type) {
        
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user
            };

        case LOGIN_LOGOUT:
            return {
                ...state,
                user: null
            };

        
        case SET_USERNAME:
            return {
                ...state,       
                username: action.payload,
   
            };

        case SET_PASSWORD:
            return {
                ...state,       
                password: action.payload,
   
            };
         

        default:

            return state
    }
}
