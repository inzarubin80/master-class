
import {combineReducers} from 'redux'
import appReducer from './app/appReducer'
import userReducer from './user/userReducer'
import profilesReducer from './profiles/profilesReducer'


const rootReducer = combineReducers({app:appReducer, user: userReducer, profiles:profilesReducer})
export default rootReducer