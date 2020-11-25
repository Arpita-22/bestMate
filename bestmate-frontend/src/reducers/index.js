import { combineReducers } from "redux";
import loggedReducer from './isLogged';
import userReducer from './user';
import interactionReducer from './interaction';

const allReducers = combineReducers({
    isLogged : loggedReducer,
    user:  userReducer,
    interactionType:  interactionReducer   
})

export default allReducers