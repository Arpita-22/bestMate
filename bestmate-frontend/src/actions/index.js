import loggedReducer from "../reducers/isLogged"
import userReducer from "../reducers/user"

export const isLoggedAction = (loggedIn) =>{
    return {
        type:'LogIn',
        payload: loggedIn
    }
}
//  export const userAction = (user) =>{
//      return{
//      type: 'setUser',
//      payload: user
//     }
//  }



export default isLoggedAction
