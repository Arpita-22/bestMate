import loggedReducer from "../reducers/isLogged"

export const isLoggedAction = (loggedIn) =>{
    return {
        type:'LogIn',
        payload: loggedIn
    }
}


export default isLoggedAction