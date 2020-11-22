const loggedReducer = (state = false, action) =>{
    switch(action.type){
        case'Log_in':
        return !state
    }
}

export default loggedReducer