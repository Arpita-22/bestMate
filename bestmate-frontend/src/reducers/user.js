const loggedReducer = (state = '', action) =>{
    switch(action.type){
        case 'display':
            return true
        default:
            return state
    }
}

export default loggedReducer