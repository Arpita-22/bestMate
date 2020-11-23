const loggedReducer = (state = false, action) =>{
    switch(action.type){
        case 'LogIn':
            return true
        default:
            return state
    }
}

export default loggedReducer