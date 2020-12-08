import loggedReducer from "../reducers/isLogged"
import userReducer from "../reducers/user"

export const isLoggedAction = (loggedIn) =>{
    return {
        type:'LogIn',
        payload: loggedIn
    }
}


export default isLoggedAction
