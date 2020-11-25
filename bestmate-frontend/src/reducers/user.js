const initialState={
     user:{
        id:'',
        name:"",
        address:"",
        age: '',
        allowed_foods:[],
        relatives:[],
        password:"",
        token:""

    }
}
const userReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'fetchUser':
            return {...state,user: action.user}
        case 'displayUser':
            return {user:state.user}
            // return action.payload
            case "logout":
                return initialState
        default:
            return state
    }

}

export default userReducer