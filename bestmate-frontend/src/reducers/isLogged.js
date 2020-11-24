const loggedReducer = (state = false, action) =>{
    switch(action.type){
        case 'LogIn':
            return action.payload
        default:
            return state
    }
}

export default loggedReducer